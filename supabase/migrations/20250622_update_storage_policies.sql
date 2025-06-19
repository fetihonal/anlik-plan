-- Önce mevcut politikaları kaldır
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users Can Upload" ON storage.objects;
DROP POLICY IF EXISTS "Users Can Update Own Files" ON storage.objects;
DROP POLICY IF EXISTS "Users Can Delete Own Files" ON storage.objects;

-- Herkesin okuma erişimi
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-images');

-- Herkesin yükleme yapabilmesi için politika
CREATE POLICY "Anyone Can Upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'event-images');

-- Herkesin güncelleme yapabilmesi için politika
CREATE POLICY "Anyone Can Update" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'event-images');

-- Herkesin silme yapabilmesi için politika
CREATE POLICY "Anyone Can Delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'event-images');
