-- Mevcut politikaları kaldır
DROP POLICY IF EXISTS "Sadece adminler ekip üyelerini düzenleyebilir" ON team_members;

-- Daha basit bir politika ekle - tüm kimlik doğrulaması yapılmış kullanıcılar düzenleyebilir
CREATE POLICY "Kimlik doğrulaması yapılmış kullanıcılar ekip üyelerini düzenleyebilir" ON team_members
  FOR ALL USING (auth.role() = 'authenticated');
