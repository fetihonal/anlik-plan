-- Create event_formats table
CREATE TABLE IF NOT EXISTS event_formats (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on id
CREATE INDEX IF NOT EXISTS idx_event_formats_id ON event_formats(id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_event_formats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_event_formats_updated_at
BEFORE UPDATE ON event_formats
FOR EACH ROW
EXECUTE FUNCTION update_event_formats_updated_at();

-- Insert sample data
INSERT INTO event_formats (id, title, description, image) VALUES
  ('quiz-night', 'Quiz Night', 'Eğlenceli sorular ve takım çalışması ile bilginizi test edin. Kazanan takıma sürpriz ödüller!', '/images/quiz-night.jpg'),
  ('fake-dugun', 'Fake Düğün', 'Gerçek düğün atmosferinde eğlenceli bir gece. Gelin, damat, nikah, pasta kesimi ve daha fazlası!', '/images/fake-wedding.jpg'),
  ('temali-partiler', 'Temalı Partiler', '80''ler, retro, film karakterleri ve daha birçok temada kostümlü partiler.', '/images/themed-party.jpg'),
  ('speed-meeting', 'Speed Meeting', 'Kısa süreli sohbetlerle yeni insanlarla tanışın. Arkadaşlık ve networking için ideal!', '/images/speed-meeting.jpg'),
  ('workshop', 'Workshop', 'Yeni beceriler öğrenin ve yaratıcılığınızı keşfedin. Sanat, yemek ve el işi atölyeleri.', '/images/workshop.jpg'),
  ('standup-openmic', 'Stand-Up & Open Mic', 'Yeteneklerinizi gösterin veya komedi performanslarını izleyin. Herkes için açık sahne!', '/images/standup.jpg'),
  ('gizli-konseptler', 'Gizli Konseptler', 'Sürpriz etkinlikler ve gizli konseptler. Ne olacağını bilmeden katılın ve şaşırın!', '/images/secret-concept.jpg');
