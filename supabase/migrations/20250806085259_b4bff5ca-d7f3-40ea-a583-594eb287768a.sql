-- Create sections table to manage homepage sections
CREATE TABLE public.sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_type TEXT NOT NULL, -- 'hero', 'about', 'projects', 'cv', 'contact'
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  data JSONB, -- For storing section-specific data
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin can manage all sections" 
ON public.sections 
FOR ALL 
USING (true);

CREATE POLICY "Published sections are viewable by everyone" 
ON public.sections 
FOR SELECT 
USING (published = true);

-- Add trigger for timestamps
CREATE TRIGGER update_sections_updated_at
BEFORE UPDATE ON public.sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add attachments column to blogs table
ALTER TABLE public.blogs 
ADD COLUMN attachments JSONB DEFAULT '[]'::jsonb;

-- Insert default sections data
INSERT INTO public.sections (section_type, title, subtitle, content, data, order_index) VALUES
('hero', 'Hi, I''m Chethan Raj', 'Full Stack Developer & UI/UX Designer', 'I create exceptional digital experiences through innovative web applications, mobile solutions, and user-centered design. Passionate about turning ideas into reality.', '{"welcome_text": "Welcome to my portfolio", "social_links": [{"platform": "github", "url": "#"}, {"platform": "linkedin", "url": "#"}, {"platform": "mail", "url": "#"}]}', 1),
('about', 'About Me', 'Passionate Developer & Designer', 'I am a dedicated full-stack developer with a passion for creating innovative digital solutions. With expertise in modern web technologies and a keen eye for design, I bring ideas to life through code.', '{}', 2),
('projects', 'Featured Projects', 'Innovative Digital Solutions', 'Here are some of my recent projects that showcase my skills and passion for creating innovative digital solutions.', '{}', 3),
('cv', 'My Journey', 'Experience & Education', 'Explore my professional journey, skills, and achievements that have shaped my career in technology.', '{}', 4),
('contact', 'Get In Touch', 'Let''s Work Together', 'I''m always interested in new opportunities and exciting projects. Feel free to reach out!', '{}', 5);