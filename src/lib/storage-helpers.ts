import { createBrowserClient } from './supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Supabase Storage'a dosya yükler
 * @param file Yüklenecek dosya
 * @param bucket Storage bucket adı
 * @param folder Storage içindeki klasör yolu (opsiyonel)
 * @returns Yüklenen dosyanın URL'i veya hata durumunda null
 */
export async function uploadFileToStorage(
  file: File,
  bucket: string = 'event-images',
  folder: string = ''
): Promise<string | null> {
  try {
    const supabase = createBrowserClient();
    
    // Dosya adını benzersiz yap
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    
    // Dosyayı yükle
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Dosya yükleme hatası:', error);
      return null;
    }
    
    // Dosya URL'ini al
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Dosya yükleme işleminde hata:', error);
    return null;
  }
}

/**
 * Supabase Storage'dan dosya siler
 * @param url Silinecek dosyanın tam URL'i
 * @param bucket Storage bucket adı
 * @returns İşlem başarılı ise true, değilse false
 */
export async function deleteFileFromStorage(
  url: string,
  bucket: string = 'event-images'
): Promise<boolean> {
  try {
    const supabase = createBrowserClient();
    
    // URL'den dosya yolunu çıkar
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const filePath = pathParts.slice(pathParts.indexOf(bucket) + 1).join('/');
    
    // Dosyayı sil
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    
    if (error) {
      console.error('Dosya silme hatası:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Dosya silme işleminde hata:', error);
    return false;
  }
}
