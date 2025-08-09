-- Seed missing blog posts for experience and skills
INSERT INTO blogs (title, slug, content, excerpt, category, published, image_url) VALUES
-- Experience blogs
('5+ Years in Web Development', 'web-development-experience', 
'Over the past 5 years, I have been deeply involved in web development, working across various technologies and frameworks. My journey began with basic HTML and CSS, but quickly evolved to encompass modern frameworks like React, Vue, and Angular.

I have worked on numerous projects ranging from simple landing pages to complex enterprise applications. My experience includes:

- **Frontend Development**: Proficient in React, Vue.js, and Angular with TypeScript
- **State Management**: Redux, Vuex, and modern React hooks
- **Styling**: CSS3, Sass, Tailwind CSS, and CSS-in-JS solutions
- **Build Tools**: Webpack, Vite, and Parcel for optimized development workflows
- **Testing**: Jest, React Testing Library, and Cypress for comprehensive testing

One of my most challenging projects was developing a real-time collaborative platform that required WebSocket integration and complex state synchronization across multiple users. This project taught me the importance of scalable architecture and performance optimization.

I believe in writing clean, maintainable code and following best practices. I regularly contribute to open-source projects and stay updated with the latest trends in web development.',
'Comprehensive experience in modern web development technologies and frameworks over 5+ years.',
'experience', true, '/src/assets/experience.jpg'),

('React Expertise & Advanced Patterns', 'react-expertise',
'React has been my primary frontend framework for the past 4 years. I have deep expertise in both class components and modern functional components with hooks. My React skills include:

## Core React Concepts
- Component lifecycle and state management
- Hooks (useState, useEffect, useContext, useReducer, custom hooks)
- Context API for state sharing
- Error boundaries and suspense

## Advanced Patterns
- **Render Props**: For flexible component composition
- **Higher-Order Components (HOCs)**: For cross-cutting concerns
- **Compound Components**: For building flexible APIs
- **Custom Hooks**: For reusable stateful logic

## Performance Optimization
- React.memo for preventing unnecessary re-renders
- useMemo and useCallback for expensive calculations
- Code splitting with React.lazy and Suspense
- Bundle optimization and tree shaking

## Ecosystem Integration
- Next.js for server-side rendering and static generation
- React Router for client-side routing
- Redux and Zustand for complex state management
- Styled-components and Emotion for CSS-in-JS

I have built numerous production applications using React, including e-commerce platforms, dashboard applications, and content management systems. My approach focuses on creating reusable components and maintaining a consistent design system.',
'Deep expertise in React ecosystem, advanced patterns, and performance optimization techniques.',
'experience', true, '/src/assets/skills-cv.jpg'),

('UX/UI Design Philosophy', 'ux-design-expertise',
'Design is not just about making things look good—it''s about creating intuitive, accessible, and delightful user experiences. My design philosophy centers around user-centered design principles and accessibility-first thinking.

## Design Process
1. **Research & Discovery**: Understanding user needs through interviews and analytics
2. **Information Architecture**: Organizing content for optimal user flow
3. **Wireframing & Prototyping**: Creating low and high-fidelity prototypes
4. **Visual Design**: Applying design systems and brand guidelines
5. **Testing & Iteration**: Continuous improvement based on user feedback

## Key Principles
- **Accessibility First**: Ensuring designs work for all users, including those with disabilities
- **Mobile-First**: Designing for mobile devices and scaling up
- **Performance**: Optimizing for fast loading and smooth interactions
- **Consistency**: Maintaining design systems and pattern libraries

## Tools & Technologies
- **Design**: Figma, Sketch, Adobe Creative Suite
- **Prototyping**: Framer, Principle, InVision
- **Research**: UserTesting, Hotjar, Google Analytics
- **Development**: Translating designs to responsive code

## Notable Projects
I designed and developed a healthcare platform that improved patient engagement by 40%. The project required extensive accessibility considerations and complex data visualization. The design system I created is now used across multiple products in the organization.',
'User-centered design approach focusing on accessibility, usability, and modern design principles.',
'experience', true, '/src/assets/cv-preview.jpg'),

-- Skills blogs  
('Building Scalable Applications', 'scalable-applications',
'Scalability is crucial for modern web applications. Throughout my career, I have developed expertise in building applications that can handle growth in both user base and complexity.

## Architecture Principles
- **Microservices**: Breaking down monolithic applications into smaller, manageable services
- **API Design**: RESTful and GraphQL APIs with proper versioning
- **Database Design**: Normalized schemas with proper indexing strategies
- **Caching**: Redis and CDN implementation for improved performance

## Performance Optimization
- **Code Splitting**: Dynamic imports and lazy loading
- **Image Optimization**: WebP format, responsive images, and lazy loading
- **Bundle Analysis**: Webpack bundle analyzer for optimization opportunities
- **CDN Integration**: Global content delivery for faster load times

## Monitoring & Analytics
- **Error Tracking**: Sentry for production error monitoring
- **Performance Monitoring**: Google Analytics and custom metrics
- **User Behavior**: Heatmaps and user session recordings
- **A/B Testing**: Data-driven decision making

## DevOps Integration
- **CI/CD Pipelines**: Automated testing and deployment
- **Container Orchestration**: Docker and Kubernetes
- **Infrastructure as Code**: Terraform and AWS CloudFormation
- **Load Balancing**: Auto-scaling and traffic distribution

I have successfully scaled applications from handling hundreds of users to supporting millions of monthly active users. The key is planning for scale from the beginning and implementing proper monitoring to identify bottlenecks early.',
'Expertise in building scalable web applications with modern architecture patterns and performance optimization.',
'skills', true, '/src/assets/project1.jpg'),

-- Experience blogs for professional summary
('Senior Developer at TechCorp', 'techcorp-senior-developer',
'As a Senior Frontend Developer at TechCorp, I led the development of their next-generation customer portal, serving over 100,000 active users. This role challenged me to balance technical excellence with business requirements.

## Key Responsibilities
- **Team Leadership**: Mentored junior developers and conducted code reviews
- **Architecture Decisions**: Designed scalable frontend architecture using React and TypeScript
- **Performance Optimization**: Reduced page load times by 60% through code splitting and caching
- **Cross-functional Collaboration**: Worked closely with UX designers and backend engineers

## Major Achievements
- Migrated legacy jQuery application to modern React stack
- Implemented comprehensive testing strategy with 85% code coverage
- Established component library used across 5 different products
- Led adoption of modern development practices including CI/CD

## Technical Highlights
The customer portal handled complex data visualizations and real-time updates. I implemented a custom state management solution that efficiently handled data synchronization across multiple components. The application supported multiple themes and languages, requiring careful consideration of performance and maintainability.

## Challenges Overcome
One of the biggest challenges was maintaining backward compatibility while modernizing the codebase. I developed a gradual migration strategy that allowed us to update components incrementally without disrupting the user experience.

This role significantly expanded my leadership skills and deep technical expertise in React ecosystem.',
'Led frontend development for a large-scale customer portal at TechCorp, serving 100K+ users with modern React architecture.',
'experience', true, '/src/assets/project2.jpg'),

('Full-Stack Developer at StartupXYZ', 'startupxyz-fullstack',
'Working at StartupXYZ as a Full-Stack Developer gave me the opportunity to work across the entire technology stack and directly impact product decisions. In a fast-paced startup environment, I had to be versatile and deliver results quickly.

## Full-Stack Responsibilities
- **Frontend Development**: React and Vue.js applications with responsive design
- **Backend Development**: Node.js APIs with Express and MongoDB
- **Database Design**: Schema design and optimization for performance
- **DevOps**: AWS deployment and CI/CD pipeline setup

## Startup Challenges
- **Rapid Prototyping**: Building MVPs quickly to validate business ideas
- **Resource Constraints**: Maximizing efficiency with limited resources
- **Scalability Planning**: Designing for growth from day one
- **Wearing Multiple Hats**: UI/UX design, project management, and technical decisions

## Key Projects
### E-commerce Platform
Built a complete e-commerce solution from scratch including:
- Product catalog with search and filtering
- Shopping cart and checkout process
- Payment integration with Stripe
- Order management system
- Admin dashboard for inventory management

### Analytics Dashboard
Developed a real-time analytics dashboard that processed thousands of events per minute:
- Real-time data visualization with D3.js
- WebSocket implementation for live updates
- Complex aggregation queries
- Export functionality for reports

## Learning & Growth
The startup environment taught me to be resourceful and think creatively about solutions. I learned to balance technical debt with feature delivery and make pragmatic decisions under pressure.

This experience significantly broadened my technical skills and business acumen.',
'Full-stack development experience at a fast-paced startup, building scalable solutions and wearing multiple technical hats.',
'experience', true, '/src/assets/project3.jpg')

ON CONFLICT (slug) DO NOTHING;