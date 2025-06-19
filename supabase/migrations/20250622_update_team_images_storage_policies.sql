-- Create team-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'team-images', 'team-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE name = 'team-images');

-- Remove any existing policies for team-images bucket
DROP POLICY IF EXISTS "team-images policy" ON storage.objects;

-- Create policy to allow public read access to team-images bucket
CREATE POLICY "team-images policy read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'team-images');

-- Create policy to allow authenticated users to insert/update/delete objects in team-images bucket
CREATE POLICY "team-images policy write" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'team-images' AND auth.role() = 'authenticated');

CREATE POLICY "team-images policy update" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'team-images' AND auth.role() = 'authenticated')
  WITH CHECK (bucket_id = 'team-images' AND auth.role() = 'authenticated');

CREATE POLICY "team-images policy delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'team-images' AND auth.role() = 'authenticated');
