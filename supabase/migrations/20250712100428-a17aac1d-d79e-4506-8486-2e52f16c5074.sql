-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL CHECK (category IN ('experience', 'projects', 'certifications', 'participations')),
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_sessions table for OTP authentication
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create file uploads table
CREATE TABLE public.uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published blogs
CREATE POLICY "Published blogs are viewable by everyone" 
ON public.blogs 
FOR SELECT 
USING (published = true);

-- Create policies for admin access (we'll use a simple email check)
CREATE POLICY "Admin can manage all blogs" 
ON public.blogs 
FOR ALL 
USING (true);

CREATE POLICY "Admin can manage sessions" 
ON public.admin_sessions 
FOR ALL 
USING (true);

CREATE POLICY "Admin can manage uploads" 
ON public.uploads 
FOR ALL 
USING (true);

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-uploads', 'blog-uploads', true);

-- Create storage policies
CREATE POLICY "Anyone can view uploaded files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-uploads');

CREATE POLICY "Admin can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-uploads');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample blog data
INSERT INTO public.blogs (title, slug, content, excerpt, category, published) VALUES
('5+ Years of Web Development Experience', 'web-development-experience', 
'## My Journey in Web Development

Over the past five years, I have immersed myself in the world of web development, building a diverse portfolio of projects that span from simple static websites to complex full-stack applications.

![Web Development](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600)

### The Beginning

My journey started with curiosity about how websites work. What began as a simple interest in HTML and CSS quickly evolved into a passion for creating dynamic, interactive web experiences.

### Key Milestones

- **Year 1-2**: Mastered HTML, CSS, and JavaScript fundamentals
- **Year 3**: Dove deep into React and modern frameworks
- **Year 4-5**: Expanded to full-stack development with Node.js and databases

### Current Focus

Today, I specialize in creating scalable, user-centered applications that solve real-world problems. My experience spans across various industries and project scales.

## Summary

These five years have been transformative, teaching me not just technical skills but also the importance of user experience, code quality, and continuous learning in the rapidly evolving field of web development.',
'A deep dive into my five years of web development experience, from learning the basics to building scalable applications.',
'experience', true),

('React and Modern JavaScript Expertise', 'react-expertise',
'## Mastering React and Modern JavaScript

React has been my framework of choice for building dynamic user interfaces. My expertise encompasses the entire React ecosystem and modern JavaScript development practices.

![React Development](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600)

### Core React Skills

My React journey includes mastering hooks, context API, component composition, and state management patterns that create maintainable and scalable applications.

### Modern JavaScript

Beyond React, I stay current with ES6+ features, async programming, and modern development tools that enhance productivity and code quality.

### Best Practices

I emphasize clean code, testing, and performance optimization in all React applications I build.

## Summary

My React and JavaScript expertise enables me to create sophisticated, performant web applications that provide excellent user experiences while maintaining clean, maintainable codebases.',
'Exploring my expertise in React, Node.js, and modern JavaScript frameworks.',
'experience', true);