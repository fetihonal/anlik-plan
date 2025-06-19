-- Ekip üyeleri tablosu
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL,
  bio TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Herkes ekip üyelerini görebilir" ON team_members
  FOR SELECT USING (true);

-- Sadece admin kullanıcılar düzenleyebilir
CREATE POLICY "Sadece adminler ekip üyelerini düzenleyebilir" ON team_members
  FOR ALL USING (auth.role() = 'authenticated' AND auth.uid() IN (
    SELECT user_id FROM admin_users
  ));

-- Örnek veriler
INSERT INTO team_members (name, role, image, bio, order_index)
VALUES 
  ('Ahmet Yılmaz', 'Kurucu & Etkinlik Koordinatörü', '/images/team-1.jpg', 'Sosyal topluluklar ve etkinlik organizasyonu konusunda 5 yıllık deneyime sahip.', 1),
  ('Zeynep Kaya', 'Kreatif Direktör', '/images/team-2.jpg', 'Yaratıcı konseptler ve benzersiz etkinlik formatları geliştirmede uzman.', 2),
  ('Burak Demir', 'İş Geliştirme', '/images/team-3.jpg', 'Sponsorluk anlaşmaları ve stratejik ortaklıklar konusunda deneyimli.', 3),
  ('Elif Şahin', 'Topluluk Yöneticisi', '/images/team-4.jpg', 'Sosyal medya ve topluluk yönetimi konusunda uzman.', 4);
