-- Create a storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the event-images bucket
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-images');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated Users Can Upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-images');

-- Allow users to update and delete their own files
CREATE POLICY "Users Can Update Own Files" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-images' AND auth.uid() = owner);

CREATE POLICY "Users Can Delete Own Files" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-images' AND auth.uid() = owner);
