<?php

namespace App\Services;

use App\Models\Image;
use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Intervention\Image\Interfaces\ImageInterface;

class ImageService
{
  protected string $disk;

  public function __construct()
  {
    $this->disk = config('filesystems.default');
  }

  public function upload(
    UploadedFile $file,
    string $folder,
    bool $compress = true,
    bool $watermark = true
  ): array {
    $folder = trim($folder, '/');

    $isImage = str_starts_with($file->getMimeType(), 'image/');

    // File non-image langsung upload
    if (! $isImage) {
      return $this->uploadStorage($file, $folder);
    }

    $manager = new ImageManager(new Driver());

    // Auto orientasi berdasarkan EXIF
    $image = $manager->read($file->getRealPath())->orient();

    // Resize maksimal 1920px
    if ($image->width() > 1920) {
      $image->scaleDown(width: 1920);
    }

    // Watermark hanya untuk image baru
    if ($watermark) {
      $this->addWatermark($image, $manager);
    }

    $extension = strtolower($file->extension());

    // Encode + compress
    $binary = match ($extension) {
      'jpg', 'jpeg' => $compress
        ? $image->toJpeg(85)
        : $image->toJpeg(),

      'png' => $image->toPng(),

      'webp' => $compress
        ? $image->toWebp(85)
        : $image->toWebp(),

      default => $image->toJpeg(85),
    };

    $extension = in_array($extension, ['jpg', 'jpeg', 'png', 'webp'])
      ? $extension
      : 'jpg';

    $filename = Str::uuid() . '.' . $extension;

    // Simpan ke Cloudinary atau Storage biasa
    if ($this->disk === 'cloudinary') {
      return $this->uploadCloudinaryBinary(
        (string) $binary,
        $filename,
        $folder,
        $file->getMimeType()
      );
    }

    Storage::disk($this->disk)->put(
      $folder . '/' . $filename,
      (string) $binary
    );

    return [
      'name'   => $filename,
      'folder' => $folder,
      'disk'   => $this->disk,
      'type'   => 'image',
      'url'    => Storage::disk($this->disk)
        ->url($folder . '/' . $filename),
    ];
  }

  /**
   * Upload file biasa (PDF, DOCX, ZIP, dll)
   */
  protected function uploadStorage(
    UploadedFile $file,
    string $folder
  ): array {
    $filename = Str::uuid() . '.' . $file->extension();

    Storage::disk($this->disk)
      ->putFileAs($folder, $file, $filename);

    return [
      'name'   => $filename,
      'folder' => $folder,
      'disk'   => $this->disk,
      'type'   => 'file',
      'url'    => Storage::disk($this->disk)
        ->url($folder . '/' . $filename),
    ];
  }

  /**
   * Upload binary hasil kompres ke Cloudinary
   */
  protected function uploadCloudinaryBinary(
    string $binary,
    string $filename,
    string $folder,
    string $mime
  ): array {
    $tmp = tempnam(sys_get_temp_dir(), 'img_');
    file_put_contents($tmp, $binary);

    $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));

    $upload = $cloudinary->uploadApi()->upload(
      $tmp,
      [
        'folder'         => $folder,
        'public_id'      => pathinfo($filename, PATHINFO_FILENAME),
        'resource_type'  => 'image',
        'overwrite'      => true,
      ]
    );

    @unlink($tmp);

    return [
      'name'   => $upload['public_id'],
      'folder' => $folder,
      'disk'   => 'cloudinary',
      'type'   => 'image',
      'url'    => $upload['secure_url'],
    ];
  }

  public function delete(Image $image): bool
  {
    if ($image->disk === 'cloudinary') {
      $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));

      $cloudinary->uploadApi()->destroy(
        $image->name,
        ['resource_type' => 'image']
      );

      return true;
    }

    return Storage::disk($image->disk)
      ->delete($image->folder . '/' . $image->name);
  }

  /**
   * Tambah watermark logo semi-transparan.
   */
  private function addWatermark(
    ImageInterface $image,
    ImageManager $manager
  ): void {

    $logoPath = public_path('images/logo.png');

    if (! file_exists($logoPath)) {
      return;
    }

    // Buat logo transparan dengan GD
    $logoResource = imagecreatefrompng($logoPath);

    imagealphablending($logoResource, false);
    imagesavealpha($logoResource, true);

    // 0 = solid, 127 = transparan penuh
    $opacity = 90; // sekitar 30% terlihat

    for ($x = 0; $x < imagesx($logoResource); $x++) {
      for ($y = 0; $y < imagesy($logoResource); $y++) {

        $rgba = imagecolorat($logoResource, $x, $y);

        $a = ($rgba >> 24) & 0x7F;
        $r = ($rgba >> 16) & 0xFF;
        $g = ($rgba >> 8) & 0xFF;
        $b = $rgba & 0xFF;

        $newAlpha = max($a, $opacity);

        $color = imagecolorallocatealpha(
          $logoResource,
          $r,
          $g,
          $b,
          $newAlpha
        );

        imagesetpixel($logoResource, $x, $y, $color);
      }
    }

    $logo = $manager->read($logoResource);

    $logoWidth = (int) ($image->width() * 0.07);

    $logo = $logo->scale(width: $logoWidth);

    $padding = max(
      20,
      (int) ($image->width() * 0.02)
    );

    $image->place(
      $logo,
      'bottom-right',
      $padding,
      $padding
    );

    imagedestroy($logoResource);
  }
}
