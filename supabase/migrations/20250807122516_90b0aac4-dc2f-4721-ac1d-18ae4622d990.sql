-- Insert missing default blog entries for experience, skills, education, and professional summary

-- Experience entries
INSERT INTO blogs (title, content, excerpt, category, published, slug) VALUES
('UI/UX Designer at DesignStudio', 'Created user interfaces and experiences for various client projects, focusing on user-centered design principles and modern design trends. Collaborated with development teams to ensure seamless implementation of designs.', 'Created user interfaces and experiences', 'experience', true, 'ui-ux-designer-designstudio'),
('Junior Developer at CodeAgency', 'Developed responsive websites using HTML, CSS, JavaScript, and React. Gained valuable experience in front-end development and collaborated with senior developers on various client projects.', 'Developed responsive websites', 'experience', true, 'junior-developer-codeagency'),
('Freelance Web Developer', 'Worked with various clients on custom web development projects, ranging from simple static websites to complex web applications. Managed client relationships and project timelines independently.', 'Worked with various clients on custom projects', 'experience', true, 'freelance-web-developer');

-- Skills entries
INSERT INTO blogs (title, content, excerpt, category, published, slug) VALUES
('JavaScript & TypeScript', 'Proficient in modern JavaScript ES6+ and TypeScript for building scalable web applications with type safety and enhanced developer experience.', 'Modern JavaScript and TypeScript expertise', 'skills', true, 'javascript-typescript'),
('React & Vue.js', 'Expert in React and Vue.js frameworks for building dynamic user interfaces with component-based architecture and state management.', 'Frontend frameworks and libraries', 'skills', true, 'react-vuejs'),
('Node.js & Express', 'Backend development with Node.js and Express for building RESTful APIs and server-side applications.', 'Backend development capabilities', 'skills', true, 'nodejs-express'),
('Database Management', 'Experience with SQL and NoSQL databases including PostgreSQL, MongoDB, and MySQL for data storage and management.', 'Database design and management', 'skills', true, 'database-management'),
('Cloud & DevOps', 'Deployment and management of applications on cloud platforms like AWS, Google Cloud, and Azure with CI/CD pipelines.', 'Cloud computing and deployment', 'skills', true, 'cloud-devops');

-- Education entry
INSERT INTO blogs (title, content, excerpt, category, published, slug) VALUES
('Bachelor of Computer Science', 'Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and computer systems. Graduated with honors and actively participated in coding competitions and hackathons.', 'Computer Science degree with focus on software development', 'education', true, 'bachelor-computer-science');

-- Professional Summary entries
INSERT INTO blogs (title, content, excerpt, category, published, slug) VALUES
('Career Overview', 'Passionate full-stack developer with 5+ years of experience in building modern web applications. Specialized in React, Node.js, and cloud technologies with a strong focus on user experience and performance optimization.', 'Comprehensive overview of my development career', 'professional_summary', true, 'career-overview'),
('Technical Expertise', 'Deep expertise in modern web technologies including JavaScript, TypeScript, React, Node.js, and various databases. Experienced in agile development methodologies and collaborative team environments.', 'Technical skills and expertise summary', 'professional_summary', true, 'technical-expertise'),
('Project Achievements', 'Successfully delivered 20+ web applications for clients across various industries. Led development teams and mentored junior developers while maintaining high code quality standards.', 'Key project achievements and leadership experience', 'professional_summary', true, 'project-achievements');