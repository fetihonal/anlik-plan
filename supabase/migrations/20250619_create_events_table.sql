-- First, check if the events table exists and drop it if it does
DROP TABLE IF EXISTS events CASCADE;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create events table with the structure matching our Event type
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  spots_left INTEGER NOT NULL,
  total_spots INTEGER NOT NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  host JSONB NOT NULL,
  included_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Create index for faster queries
CREATE INDEX events_category_idx ON events(category);
CREATE INDEX events_is_featured_idx ON events(is_featured);
CREATE INDEX events_is_published_idx ON events(is_published);

-- Create trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Insert sample data
INSERT INTO events (
  title, description, date, time, location, price, category, 
  spots_left, total_spots, images, host, included_items, 
  requirements, faq, is_featured, is_published
) VALUES 
(
  'Kahve & Sohbet Buluşması',
  'Yeni insanlarla tanışmak ve keyifli sohbetler etmek için harika bir fırsat! Bu etkinliğimizde, Kadıköy''ün en sevilen kahvecilerinden Brew Coffeeworks''te buluşuyoruz. Özel kahve çeşitleri eşliğinde, farklı konularda sohbet edecek, yeni arkadaşlıklar kuracağız. Etkinlik moderatörümüz, herkesin kendini rahat hissedeceği bir ortam yaratacak ve sohbetin akıcı olmasını sağlayacak. Kahve tutkunları ve yeni insanlarla tanışmak isteyenler için ideal bir Cumartesi aktivitesi! Kontenjan sınırlı, yerinizi şimdiden ayırtın.',
  '15 Haziran 2024',
  '14:00 - 16:30',
  'Brew Coffeeworks, Kadıköy',
  '75 ₺',
  'Kahve',
  8,
  15,
  '["\/images\/event-coffee-1.jpg", "\/images\/event-coffee-2.jpg", "\/images\/event-coffee-3.jpg"]',
  '{"name": "Ahmet Yılmaz", "image": "\/images\/team-1.jpg", "bio": "Sosyal topluluklar ve etkinlik organizasyonu konusunda 5 yıllık deneyime sahip."}',
  '["Özel filtre kahve veya espresso bazlı içecek", "Ev yapımı kurabiye ikramı", "Sohbet kartları aktivitesi", "Etkinlik sonrası WhatsApp grubu"]',
  '["Herhangi bir ön hazırlık gerekmiyor", "Pozitif enerji ve sohbet etmeye açık olmak yeterli"]',
  '[{"question": "Etkinliğe tek başıma katılabilir miyim?", "answer": "Kesinlikle! Katılımcılarımızın çoğu tek başına geliyor. Etkinlik başlangıcında tanışma aktivitesi yapıyoruz."}, {"question": "Etkinlik ücreti neyi kapsıyor?", "answer": "Etkinlik ücreti bir adet kahve, kurabiye ikramı ve etkinlik organizasyon bedelini kapsamaktadır."}, {"question": "Rezervasyon iptali yapabilir miyim?", "answer": "Etkinlikten 48 saat öncesine kadar iptal edebilirsiniz. Daha sonraki iptallerde ücret iadesi yapılmamaktadır."}]',
  true,
  true
),
(
  'Karaoke Gecesi',
  'Şarkı söylemeyi seven veya sadece eğlenmek isteyen herkes için muhteşem bir gece! Beşiktaş''ın en popüler karaoke mekanında özel bir oda kiraladık. İster grup halinde, ister solo performanslarla gecenin yıldızı olabilirsiniz. 5000''den fazla şarkı seçeneği ve profesyonel ses sistemi ile unutulmaz bir deneyim yaşayacaksınız. Türkçe ve yabancı pop, rock, 90''lar, 2000''ler - her tarzda müzik mevcut! Çekingen olanlar merak etmesin, kimseyi zorlamıyoruz ama genellikle herkes cesaretini toplayıp en az bir şarkı söylüyor. Yeni arkadaşlıklar, bol kahkaha ve müzik dolu bir gece için hemen katılın!',
  '22 Haziran 2024',
  '20:00 - 23:30',
  'Sing & Fun Karaoke Bar, Beşiktaş',
  '150 ₺',
  'Müzik',
  4,
  20,
  '["\/images\/event-karaoke-1.jpg", "\/images\/event-karaoke-2.jpg", "\/images\/event-karaoke-3.jpg"]',
  '{"name": "Elif Şahin", "image": "\/images\/team-4.jpg", "bio": "Sosyal medya ve topluluk yönetimi konusunda uzman."}',
  '["Özel karaoke odası kullanımı", "Bir adet içecek (alkollü veya alkolsüz)", "Atıştırmalık tabağı", "Profesyonel ses sistemi ve 5000+ şarkı seçeneği"]',
  '["Şarkı söyleme zorunluluğu yok, sadece izlemek de mümkün", "18 yaş ve üzeri katılımcılar için uygundur"]',
  '[{"question": "Şarkı söylemek zorunda mıyım?", "answer": "Hayır, kesinlikle zorunda değilsiniz. Sadece izleyici olarak katılabilir ve atmosferin tadını çıkarabilirsiniz."}, {"question": "Ne tür şarkılar mevcut?", "answer": "Türkçe ve yabancı pop, rock, 90''lar, 2000''ler dahil 5000''den fazla şarkı seçeneği bulunmaktadır."}, {"question": "Ek içecek siparişi verebilir miyim?", "answer": "Evet, etkinlik ücretine bir içecek dahildir. Ek içecekler için mekanda ayrıca ödeme yapabilirsiniz."}]',
  true,
  true
),
(
  'Bisiklet Turu: Adalar',
  'İstanbul''un gürültüsünden uzaklaşıp doğayla baş başa kalmak için harika bir fırsat! Büyükada''da yapacağımız bu bisiklet turunda, adanın eşsiz manzaralarını keşfedecek, temiz havada spor yapmanın keyfini çıkaracağız. Bostancı İskelesi''nde buluşup feribotla adaya geçeceğiz. Adada bisikletlerimizi kiralayıp, rehber eşliğinde yaklaşık 15 km''lik keyifli bir rota izleyeceğiz. Tur sırasında tarihi köşkler, çam ormanları ve muhteşem deniz manzaraları eşliğinde molalar vereceğiz. Öğle yemeğimizi adanın meşhur restoranlarından birinde yiyeceğiz. Orta zorlukta bir rota olup, düzenli bisiklet kullanmayanlar için de uygundur. Doğa, spor ve yeni arkadaşlıklar için ideal bir hafta sonu aktivitesi!',
  '29 Haziran 2024',
  '09:00 - 17:00',
  'Bostancı İskelesi, Kadıköy',
  '250 ₺',
  'Spor',
  6,
  12,
  '["\/images\/event-bike-1.jpg", "\/images\/event-bike-2.jpg", "\/images\/event-bike-3.jpg"]',
  '{"name": "Burak Demir", "image": "\/images\/team-3.jpg", "bio": "Sponsorluk anlaşmaları ve stratejik ortaklıklar konusunda deneyimli."}',
  '["Vapur bileti (gidiş-dönüş)", "Bisiklet kiralama ücreti", "Profesyonel rehber eşliğinde tur", "Su ve atıştırmalık ikramları"]',
  '["Rahat kıyafet ve spor ayakkabı", "Şapka, güneş kremi ve güneş gözlüğü", "Temel bisiklet kullanma becerisi (profesyonel seviye gerekmiyor)"]',
  '[{"question": "Daha önce hiç bisiklet kullanmadım, katılabilir miyim?", "answer": "Temel bisiklet kullanma becerisine sahip olmanız yeterli. Çok dik yokuşlar olmayan bir rota seçiyoruz."}, {"question": "Kendi bisikletimi getirebilir miyim?", "answer": "Evet, ancak vapurda ekstra ücret ödemeniz gerekebilir. Etkinlik ücretine ada içinde bisiklet kiralama dahildir."}, {"question": "Yağmur yağarsa ne olacak?", "answer": "Hava durumu elverişsiz olduğunda etkinlik bir sonraki uygun tarihe ertelenecek veya ücret iadesi yapılacaktır."}]',
  true,
  true
);
