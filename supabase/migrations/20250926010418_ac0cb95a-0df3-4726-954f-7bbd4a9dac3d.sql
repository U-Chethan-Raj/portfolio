-- Insert default "What I Do" section with services
INSERT INTO sections (section_type, title, published, order_index, data) VALUES 
('what-i-do', 'What I Do', true, 1, '[
  {
    "title": "Web Development",
    "description": "Building responsive and performant web applications using modern frameworks and technologies.",
    "icon": "Code"
  },
  {
    "title": "Mobile Development", 
    "description": "Creating cross-platform mobile applications with React Native and native technologies.",
    "icon": "Smartphone"
  },
  {
    "title": "UI/UX Design",
    "description": "Designing intuitive and beautiful user interfaces with focus on user experience.", 
    "icon": "Palette"
  },
  {
    "title": "Full Stack Solutions",
    "description": "End-to-end development from database design to deployment and maintenance.",
    "icon": "Server"
  }
]');

-- Insert default Skills section with technologies
INSERT INTO sections (section_type, title, published, order_index, data) VALUES 
('skills', 'Skills & Technologies', true, 2, '[
  "React",
  "Next.js", 
  "TypeScript",
  "Node.js",
  "Python", 
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Figma",
  "Tailwind CSS",
  "GraphQL"
]');

-- Insert default Professional Summary section with blog links
INSERT INTO sections (section_type, title, published, order_index, data) VALUES 
('professional-summary', 'Professional Summary', true, 3, '[
  {
    "text": "Full-stack developer with extensive experience in modern web technologies",
    "blogSlug": "web-development-experience"
  },
  {
    "text": "Specialized in React ecosystem and component-based architecture",
    "blogSlug": "react-expertise"
  },
  {
    "text": "Strong background in UI/UX design principles and user-centered development",
    "blogSlug": "ux-design-expertise"
  },
  {
    "text": "Experience building scalable applications with microservices architecture",
    "blogSlug": "scalable-applications"
  },
  {
    "text": "Led development teams at TechCorp as Senior Developer",
    "blogSlug": "techcorp-senior-developer"
  },
  {
    "text": "Full-stack engineer at StartupXYZ focusing on rapid prototyping",
    "blogSlug": "startupxyz-fullstack"
  }
]');