'use client';

import { useState } from 'react';
import { uploadFileToStorage, deleteFileFromStorage } from '@/lib/storage-helpers';
import Image from 'next/image';

interface ImageUploaderProps {
  currentImageUrl: string;
  onImageUploaded: (url: string) => void;
  folder?: string;
  bucket?: string;
}

export default function ImageUploader({
  currentImageUrl,
  onImageUploaded,
  folder = 'formats',
  bucket = 'event-images'
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Dosya boyutu 5MB\'dan küçük olmalıdır.');
      return;
    }

    // Dosya tipi kontrolü
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Sadece JPEG, PNG ve WEBP formatları desteklenmektedir.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      // Önizleme için geçici URL oluştur
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Supabase'e yükle
      const imageUrl = await uploadFileToStorage(file, bucket, folder);
      
      if (!imageUrl) {
        throw new Error('Görsel yüklenemedi.');
      }

      // Başarılı yükleme
      onImageUploaded(imageUrl);
      
      // Eğer önceki bir görsel varsa ve Supabase'de ise sil
      if (currentImageUrl && currentImageUrl.includes('supabase')) {
        await deleteFileFromStorage(currentImageUrl, bucket);
      }
      
    } catch (error) {
      console.error('Görsel yükleme hatası:', error);
      setUploadError('Görsel yüklenirken bir hata oluştu.');
      // Hata durumunda önizlemeyi eski haline getir
      setPreviewUrl(currentImageUrl);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
          {isUploading ? 'Yükleniyor...' : 'Görsel Seç'}
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
        <span className="text-sm text-gray-500">
          JPEG, PNG veya WEBP. Max 5MB.
        </span>
      </div>

      {uploadError && (
        <div className="text-red-500 text-sm">{uploadError}</div>
      )}

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Önizleme</p>
          <div className="relative h-40 w-full md:w-1/2 lg:w-1/3 border rounded overflow-hidden">
            <Image
              src={previewUrl}
              alt="Görsel önizleme"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
