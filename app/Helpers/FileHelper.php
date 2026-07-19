<?php

namespace App\Helpers;

use App\Services\ImageService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileHelper
{
    /**
     * Upload file / image
     */
    public static function upload(
        UploadedFile $file,
        string $folder,
        bool $compress = true,
        bool $watermark = true
    ): array {
        return app(ImageService::class)
            ->upload(
                $file,
                trim($folder, '/'),
                $compress,
                $watermark
            );
    }

    /**
     * Delete file.
     */
    public static function delete(Model|array|null $image): bool
    {
        return app(ImageService::class)->delete($image);
    }

    /**
     * Replace file.
     */
    public static function replace(
        Model|array|null $oldImage,
        UploadedFile $newFile,
        string $folder,
        bool $compress = true,
        bool $watermark = true
    ): array {

        self::delete($oldImage);

        return self::upload(
            file: $newFile,
            folder: $folder,
            compress: $compress,
            watermark: $watermark
        );
    }

    /**
     * Upload multiple.
     */
    public static function uploadMany(
        array $files,
        string $folder,
        bool $compress = true,
        bool $watermark = true
    ): array {

        $result = [];

        foreach ($files as $file) {

            $result[] = self::upload(
                file: $file,
                folder: $folder,
                compress: $compress,
                watermark: $watermark
            );
        }

        return $result;
    }
}
