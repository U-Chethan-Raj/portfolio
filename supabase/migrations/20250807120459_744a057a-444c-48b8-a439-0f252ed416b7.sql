-- Add upload support for CV files
INSERT INTO storage.buckets (id, name, public) VALUES ('cv-files', 'cv-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for CV files
CREATE POLICY "CV files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cv-files');

CREATE POLICY "Admin can upload CV files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cv-files');

CREATE POLICY "Admin can update CV files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cv-files');

CREATE POLICY "Admin can delete CV files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'cv-files');

-- Add cv_file_url column to sections table for CV management
ALTER TABLE public.sections ADD COLUMN IF NOT EXISTS cv_file_url TEXT;

-- Insert default sections for missing categories
INSERT INTO public.sections (section_type, title, subtitle, content, order_index, published) VALUES
('services', 'What I Do', 'My expertise and services', 'Services and expertise section', 10, true),
('professional_summary', 'Professional Summary', 'About my professional journey', 'Professional summary section', 5, true),
('key_achievements', 'Key Achievements', 'My accomplishments', 'Key achievements section', 15, true),
('cv_download', 'CV Download', 'Download my complete CV', 'CV download section', 20, true)
ON CONFLICT DO NOTHING;