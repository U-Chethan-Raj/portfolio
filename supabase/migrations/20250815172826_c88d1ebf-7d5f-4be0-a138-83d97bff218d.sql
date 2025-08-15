-- Add new section types for better content management
INSERT INTO sections (section_type, title, subtitle, content, data, order_index, published) VALUES
-- Skills section
('skills', 'Skills & Technologies', NULL, NULL, '{"skills": ["React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB", "PostgreSQL", "AWS", "Docker", "Figma", "Tailwind CSS", "GraphQL"]}', 1, true),

-- What I Do section with services
('what-i-do', 'What I Do', NULL, NULL, '{"services": [
  {"title": "Web Development", "description": "Building responsive and performant web applications using modern frameworks and technologies.", "icon": "Code"},
  {"title": "Mobile Development", "description": "Creating cross-platform mobile applications with React Native and native technologies.", "icon": "Smartphone"},
  {"title": "UI/UX Design", "description": "Designing intuitive and beautiful user interfaces with focus on user experience.", "icon": "Palette"},
  {"title": "Full Stack Solutions", "description": "End-to-end development from database design to deployment and maintenance.", "icon": "Globe"}
]}', 2, true),

-- Professional Summary with linked blogs
('professional-summary', 'Professional Summary', 'My Journey', NULL, '{"experiences": [
  {"text": "5+ years of experience in full-stack development", "blogSlug": "web-development-experience"},
  {"text": "Expert in React, Next.js, and modern JavaScript frameworks", "blogSlug": "react-expertise"},
  {"text": "Strong background in UI/UX design and user experience", "blogSlug": "ux-design-expertise"},
  {"text": "Experience building scalable applications for enterprise clients", "blogSlug": "scalable-applications"},
  {"text": "Senior Developer at TechCorp (2021-2024)", "blogSlug": "techcorp-senior-developer"},
  {"text": "Full Stack Developer at StartupXYZ (2019-2021)", "blogSlug": "startupxyz-fullstack"}
]}', 3, true)

ON CONFLICT (section_type) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content = EXCLUDED.content,
  data = EXCLUDED.data,
  order_index = EXCLUDED.order_index,
  published = EXCLUDED.published,
  updated_at = now();