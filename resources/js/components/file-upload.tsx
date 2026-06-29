import axios from 'axios';
import {
  Upload,
  X,
  Eye,
  FileText,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface UploadedFile {
  id?: string | number;
  file?: File;
  name: string;
  url: string;
  type?: string;
  size?: number;
  uploading?: boolean;
  progress?: number;
  error?: string;
  controller?: AbortController;
}

interface FileUploadProps {
  value?: UploadedFile | UploadedFile[] | null;
  uploadUrl?: string;
  deleteUrl?: string;
  headers?: Record<string, string>;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  className?: string;
  maxSize?: number;
  error?: string;
  onChange?: (files: UploadedFile[]) => void;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024;

function ImageThumbnail({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}

      <img
        src={src}
        alt={alt}
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={cn(`h-full w-full object-cover transition-opacity duration-300`, loaded ? 'opacity-100' : 'opacity-0',)}
      />
    </div>
  );
}

const normalizeValue = (value?: UploadedFile | UploadedFile[] | null) => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export default function FileUpload({
  value = [],
  uploadUrl = "",
  headers,
  multiple = false,
  accept = '*',
  disabled = false,
  className,
  maxSize = DEFAULT_MAX_SIZE,
  error,
  onChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const draggingImage = useRef(false);
  const touchDistance = useRef<number | null>(null);
  const startPoint = useRef({
    x: 0,
    y: 0,
  });

  const [items, setItems] = useState<UploadedFile[]>(normalizeValue(value));
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<UploadedFile | null>(null);
  const [scale, setScale] = useState<number | null>(1);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });


  useEffect(() => {
    queueMicrotask(() => {
      setItems(normalizeValue(value));
    });
  }, [value]);

  useEffect(() => {
    if (!preview) {
      return;
    }

    queueMicrotask(() => {
      setScale(1);

      setPosition({
        x: 0,
        y: 0,
      });
    });
  }, [preview]);

  const updateFiles = useCallback(
    (files: UploadedFile[]) => {
      setItems(files);

      if (multiple) {
        onChange?.(files);
      } else {
        onChange?.(files[0] ? (files[0] as any) : null);
      }
    },
    [onChange, multiple],
  );

  const isImage = (file: UploadedFile) => {
    return (
      file.type?.startsWith('image') ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.url)
    );
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes) {
      return '-';
    }

    const units = ['B', 'KB', 'MB', 'GB'];

    let size = bytes;

    let unit = 0;

    while (size >= 1024 && unit < units.length - 1) {
      size /= 1024;

      unit++;
    }

    return `${size.toFixed(1)} ${units[unit]}`;
  };

  const validateFile = (file: File) => {
    if (maxSize && file.size > maxSize) {
      return `Maximum size ${formatBytes(maxSize)}`;
    }

    if (accept !== '*' && accept.length > 0) {
      const accepted = accept.split(',').map((v) => v.trim());

      const valid = accepted.some((type) => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }

        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', ''));
        }

        return file.type === type;
      });

      if (!valid) {
        return 'Unsupported file format';
      }
    }

    return null;
  };

  const replaceFile = (
    id: string | number,
    payload: Partial<UploadedFile>,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            ...payload,
          }
          : item,
      ),
    );
  };

  const removeFile = (index: number) => {
    const clone = [...items];

    const removed = clone[index];

    if (removed?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(removed.url);
    }

    clone.splice(index, 1);

    updateFiles(clone);
  };

  const uploadSingleFile = async (
    tempId: string | number,
    file: File,
    controller: AbortController,
  ) => {
    const formData = new FormData();

    formData.append('file', file);

    try {
      const response = await axios.post(uploadUrl, formData, {
        signal: controller.signal,

        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },

        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) /
            (progressEvent.total || 1),
          );

          replaceFile(tempId, {
            progress: percent,
          });
        },
      });

      const uploaded = response.data.data;

      setItems((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? {
              ...item,

              id: uploaded.id ?? tempId,

              name: uploaded.name ?? item.name,

              url: uploaded.url,

              uploading: false,

              progress: 100,

              error: undefined,

              controller: undefined,
            }
            : item,
        ),
      );
    } catch (error: any) {
      if (
        error?.code === 'ERR_CANCELED' ||
        error?.name === 'CanceledError'
      ) {
        setItems((prev) => prev.filter((item) => item.id !== tempId));

        return;
      }

      replaceFile(tempId, {
        uploading: false,
        progress: 0,
        error: 'Upload failed',
      });
    }
  };

  const uploadFiles = async (files: File[]) => {
    if (!files.length) {
      return;
    }

    setLoading(true);

    try {
      let current = [...items];

      for (const file of files) {
        const validation = validateFile(file);

        if (validation) {
          const invalidId = Date.now() + Math.random();

          const invalidItem: UploadedFile = {
            id: invalidId,

            file,

            name: file.name,

            url: URL.createObjectURL(file),

            type: file.type,

            size: file.size,

            uploading: false,

            error: validation,
          };

          current = multiple
            ? [...current, invalidItem]
            : [invalidItem];

          updateFiles(current);

          continue;
        }

        const tempId = Date.now() + Math.random();

        const controller = new AbortController();

        const previewUrl = URL.createObjectURL(file);

        const temp: UploadedFile = {
          id: tempId,

          file,

          name: file.name,

          url: previewUrl,

          type: file.type,

          size: file.size,

          uploading: true,

          progress: 0,

          controller,
        };

        current = multiple ? [...current, temp] : [temp];

        updateFiles(current);

        uploadSingleFile(tempId, file, controller);
      }
    } finally {
      setLoading(false);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const retryUpload = (id: string | number | undefined) => {
    const file = items.find((item) => item.id === id);

    if (!file || !file.file) {
      return;
    }

    const controller = new AbortController();

    replaceFile(id!, {
      uploading: true,
      progress: 0,
      error: undefined,
      controller,
    });

    uploadSingleFile(id!, file.file, controller);
  };

  const cancelUpload = (id: string | number | undefined) => {
    const file = items.find((item) => item.id === id);

    file?.controller?.abort();
  };

  const handleFiles = (files: File[]) => {
    if (!files.length) {
      return;
    }

    if (!multiple) {
      const file = files[0];

      const error = validateFile(file);

      const previewUrl = URL.createObjectURL(file);

      updateFiles([
        {
          id: Date.now(),

          file,

          name: file.name,

          url: previewUrl,

          type: file.type,

          size: file.size,

          error: error ?? undefined,
        },
      ]);

      return;
    }

    uploadFiles(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDragging(false);

    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(Array.from(e.target.files || []));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(5, (prev ?? 0) + 0.25));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(1, (prev ?? 0) - 0.25));
  };

  const resetZoom = () => {
    setScale(1);

    setPosition({
      x: 0,
      y: 0,
    });
  };

  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;

    const dy = touches[0].clientY - touches[1].clientY;

    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.url?.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [items]);

  return (
    <>
      <div className={cn(`w-full space-y-4`, className)}>
        <div
          onDragOver={(e) => {
            e.preventDefault();

            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => {
            if (disabled) {
              return;
            }

            inputRef.current?.click();
          }}
          className={cn(
            "cursor-pointer rounded-xl border-2 border-dashed bg-background p-8 text-center transition-all",
            dragging && "border-primary bg-primary/5",
            disabled && "pointer-events-none opacity-50",
            error && "border-destructive",
          )}
        >
          <Upload className="mx-auto mb-3 h-10 w-10" />

          <h3 className="text-sm font-medium">
            {loading ? 'Uploading...' : 'Upload Files'}
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Drag & drop atau klik untuk memilih file
          </p>

          <input
            hidden
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleSelect}
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {items.length > 0 && (
          <div className="rounded-xl border p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">
                {items.length} file
              </span>
            </div>

            <div className="max-h-[450px] overflow-x-hidden overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                {items.map((file, index) => (
                  <div
                    key={file.id ?? index}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted"
                  >
                    {isImage(file) ? (
                      <ImageThumbnail
                        src={file.url}
                        alt={file.name}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FileText className="h-10 w-10" />
                      </div>
                    )}

                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        type="button"
                        className="h-8 w-8 bg-black/70 hover:bg-black"
                        onClick={(e) => {
                          e.stopPropagation();

                          setPreview(file);
                        }}
                      >
                        <Eye className="h-4 w-4 text-white" />
                      </Button>

                      {!!file.error && (
                        <Button
                          size="icon"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            retryUpload(file.id);
                          }}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}

                      {file.uploading && (
                        <Button
                          size="icon"
                          type="button"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();

                            cancelUpload(file.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}

                      {!file.uploading && (
                        <Button
                          size="icon"
                          type="button"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();

                            removeFile(index);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="absolute right-0 bottom-0 left-0 bg-black/60 p-2 text-white">
                      <div className="truncate text-xs">
                        {file.name}
                      </div>

                      <div className="text-[10px] opacity-80">
                        {formatBytes(file.size)}
                      </div>

                      {file.uploading && (
                        <div className="mt-2">
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                            <div
                              className="h-full bg-green-400"
                              style={{
                                width: `${file.progress || 0}%`,
                              }}
                            />
                          </div>

                          <div className="mt-1 text-[10px]">
                            {file.progress || 0}%
                          </div>
                        </div>
                      )}

                      {!!file.error && (
                        <div className="mt-1 text-[10px] text-red-300">
                          {file.error}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="h-screen w-screen max-w-none border-0 bg-black p-0">
          <div className="absolute top-4 right-4 z-50 flex gap-2">
            <Button size="icon" type="button" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>

            <Button size="icon" type="button" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>

            <Button type="button" onClick={resetZoom}>
              Reset
            </Button>

            <Button
              size="icon"
              variant="destructive"
              type="button"
              onClick={() => setPreview(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute top-4 left-4 z-50 rounded bg-black/50 px-3 py-1 text-sm text-white">
            {Math.round((scale ?? 0) * 100)}%
          </div>

          <div
            className="flex h-full w-full touch-none items-center justify-center overflow-hidden"
            onWheel={(e) => {
              e.preventDefault();

              setScale((prev) =>
                Math.min(
                  5,
                  Math.max(
                    1,
                    (prev ?? 0) + (e.deltaY < 0 ? 0.15 : -0.15),
                  ),
                ),
              );
            }}
            onTouchStart={(e) => {
              if (e.touches.length === 2) {
                touchDistance.current = getTouchDistance(
                  e.touches,
                );
              }

              if (e.touches.length === 1) {
                draggingImage.current = true;
                setIsDraggingImage(true);

                startPoint.current = {
                  x: e.touches[0].clientX - position.x,

                  y: e.touches[0].clientY - position.y,
                };
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2) {
                const distance = getTouchDistance(e.touches);

                if (touchDistance.current) {
                  const diff =
                    distance - touchDistance.current;

                  setScale((prev) =>
                    Math.min(
                      5,
                      Math.max(1, (prev ?? 0) + diff * 0.005),
                    ),
                  );
                }

                touchDistance.current = distance;
              }

              if (e.touches.length === 1 && (scale ?? 0) > 1) {
                setPosition({
                  x:
                    e.touches[0].clientX -
                    startPoint.current.x,

                  y:
                    e.touches[0].clientY -
                    startPoint.current.y,
                });
              }
            }}
            onTouchEnd={() => {
              draggingImage.current = false;
              setIsDraggingImage(false);

              touchDistance.current = null;
            }}
          >
            {preview && (
              <img
                src={preview.url}
                alt={preview.name}
                draggable={false}
                onDoubleClick={() => {
                  if (scale === 1) {
                    setScale(2);
                  } else {
                    resetZoom();
                  }
                }}
                onMouseDown={(e) => {
                  if ((scale ?? 0) <= 1) {
                    return;
                  }

                  draggingImage.current = true;
                  setIsDraggingImage(true);

                  startPoint.current = {
                    x: e.clientX - position.x,

                    y: e.clientY - position.y,
                  };
                }}
                onMouseMove={(e) => {
                  if (!draggingImage.current) {
                    return;
                  }

                  if ((scale ?? 0) <= 1) {
                    return;
                  }

                  setPosition({
                    x: e.clientX - startPoint.current.x,

                    y: e.clientY - startPoint.current.y,
                  });
                }}
                onMouseUp={() => {
                  draggingImage.current = false;
                  setIsDraggingImage(false);
                }}
                onMouseLeave={() => {
                  draggingImage.current = false;
                  setIsDraggingImage(false);
                }}
                className="max-h-full max-w-full select-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: isDraggingImage
                    ? 'none'
                    : 'transform .15s ease',
                  cursor: (scale ?? 0) > 1 ? 'grab' : 'default',
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
