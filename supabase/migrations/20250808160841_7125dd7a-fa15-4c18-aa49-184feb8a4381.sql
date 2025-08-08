-- Allow new blog categories used by the Admin panel
ALTER TABLE public.blogs DROP CONSTRAINT IF EXISTS blogs_category_check;
ALTER TABLE public.blogs ADD CONSTRAINT blogs_category_check CHECK (
  category IN (
    'experience',
    'projects',
    'certifications',
    'participations',
    'skills',
    'education',
    'services',
    'professional_summary',
    'key_achievements'
  )
);
