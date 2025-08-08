-- First, check what categories are allowed
SELECT constraint_name, pg_get_constraintdef(oid) as definition 
FROM pg_constraint 
WHERE conrelid = 'blogs'::regclass AND contype = 'c';

-- Insert missing blog entries one by one to avoid constraint issues
INSERT INTO blogs (title, content, excerpt, category, published, slug) VALUES 
('UI/UX Designer at DesignStudio', 'Created user interfaces and experiences for various client projects, focusing on user-centered design principles and modern design trends. Collaborated with development teams to ensure seamless implementation of designs.', 'Created user interfaces and experiences', 'experience', true, 'ui-ux-designer-designstudio');

INSERT INTO blogs (title, content, excerpt, category, published, slug) VALUES 
('Junior Developer at CodeAgency', 'Developed responsive websites using HTML, CSS, JavaScript, and React. Gained valuable experience in front-end development and collaborated with senior developers on various client projects.', 'Developed responsive websites', 'experience', true, 'junior-developer-codeagency');

INSERT INTO blogs (title, content, excerpt, category, published, slug) VALUES 
('Freelance Web Developer', 'Worked with various clients on custom web development projects, ranging from simple static websites to complex web applications. Managed client relationships and project timelines independently.', 'Worked with various clients on custom projects', 'experience', true, 'freelance-web-developer');