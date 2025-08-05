
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = {
  "web-development-experience": {
    title: "5+ Years of Web Development Excellence",
    date: "2025-01-11",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/experience.jpg",
    intro: "With over five years of dedicated experience in web development, I've had the privilege of working on diverse projects that have shaped my expertise in modern web technologies. My journey has been marked by continuous learning, innovative problem-solving, and delivering exceptional user experiences.",
    content: [
      {
        heading: "The Evolution of My Skills",
        text: "Starting with basic HTML and CSS, I've evolved to master complex frameworks and architectures. React became my specialty, allowing me to build dynamic, responsive applications that users love to interact with.",
        image: "/src/assets/skills-cv.jpg"
      },
      {
        heading: "Notable Projects and Achievements",
        text: "From e-commerce platforms handling thousands of users to real-time collaboration tools, each project has contributed to my growth as a developer. I've consistently delivered scalable solutions that exceed client expectations.",
        image: "/src/assets/project1.jpg"
      }
    ],
    summary: "My five years in web development have been a journey of constant growth, learning, and innovation. I'm passionate about creating digital solutions that make a real impact and look forward to taking on even more challenging projects in the future."
  },
  "react-expertise": {
    title: "Mastering React and Modern JavaScript Frameworks",
    date: "2025-01-10",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/skills-cv.jpg",
    intro: "React has revolutionized how I approach frontend development. My expertise in React, combined with modern JavaScript frameworks, allows me to create highly interactive and performant web applications.",
    content: [
      {
        heading: "Component-Driven Development",
        text: "I've mastered the art of building reusable, maintainable components that form the backbone of scalable applications. From simple UI elements to complex state management, React has been my go-to solution.",
        image: "/src/assets/project2.jpg"
      },
      {
        heading: "Modern JavaScript Ecosystem",
        text: "Beyond React, I'm well-versed in the entire JavaScript ecosystem including Node.js, TypeScript, and various testing frameworks. This comprehensive knowledge allows me to build full-stack solutions efficiently.",
        image: "/src/assets/project3.jpg"
      }
    ],
    summary: "React and modern JavaScript continue to be the foundation of my development work. The constant evolution of these technologies keeps me excited about the possibilities they offer for creating amazing user experiences."
  },
  "nodejs-backend": {
    title: "Building Scalable Backend Systems with Node.js",
    date: "2025-01-09",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/project1.jpg",
    intro: "Node.js has been instrumental in my full-stack development journey. My expertise in building robust backend systems has enabled me to create efficient, scalable server-side applications.",
    content: [
      {
        heading: "API Development Excellence",
        text: "I've built numerous RESTful APIs and GraphQL endpoints that power modern web applications. My focus on clean architecture and performance optimization ensures reliable backend systems.",
        image: "/src/assets/experience.jpg"
      },
      {
        heading: "Database Integration",
        text: "Working with various databases including MongoDB, PostgreSQL, and Redis, I've developed expertise in data modeling and optimization for high-performance applications.",
        image: "/src/assets/skills-cv.jpg"
      }
    ],
    summary: "Node.js has empowered me to build complete full-stack solutions. The non-blocking, event-driven architecture continues to be my preferred choice for building scalable backend systems."
  },
  "ux-design-expertise": {
    title: "Creating Intuitive User Experiences",
    date: "2025-01-08",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/project2.jpg",
    intro: "My strong background in user experience design has been crucial in creating interfaces that not only look great but also provide exceptional usability and accessibility.",
    content: [
      {
        heading: "Design Thinking Process",
        text: "I follow a comprehensive design thinking approach, from user research and wireframing to prototyping and user testing. This ensures every interface I create truly serves the user's needs.",
        image: "/src/assets/project3.jpg"
      },
      {
        heading: "Accessibility First",
        text: "Building inclusive web experiences is a priority. I ensure all my designs meet WCAG guidelines and provide excellent usability for users with diverse needs and abilities.",
        image: "/src/assets/cv-preview.jpg"
      }
    ],
    summary: "User experience design remains at the heart of everything I build. Creating interfaces that are both beautiful and functional continues to drive my passion for web development."
  },
  "scalable-applications": {
    title: "Delivering Scalable Web Applications",
    date: "2025-01-07",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/project3.jpg",
    intro: "Throughout my career, I've consistently delivered scalable web applications that grow with business needs. My focus on architecture and performance has resulted in applications that handle increasing loads gracefully.",
    content: [
      {
        heading: "Architecture Planning",
        text: "Every scalable application starts with solid architecture. I plan for growth from day one, considering factors like load distribution, caching strategies, and modular design patterns.",
        image: "/src/assets/experience.jpg"
      },
      {
        heading: "Performance Optimization",
        text: "I implement various optimization techniques including code splitting, lazy loading, and efficient state management to ensure applications remain fast and responsive at scale.",
        image: "/src/assets/project1.jpg"
      }
    ],
    summary: "Building scalable applications requires foresight and planning. My experience in this area has taught me that good architecture decisions early in development pay dividends as applications grow."
  },
  "techcorp-senior-developer": {
    title: "Leading Frontend Development at TechCorp",
    date: "2025-01-06",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/experience.jpg",
    intro: "As a Senior Developer at TechCorp since 2022, I've had the opportunity to lead a talented frontend development team and drive the technical direction of multiple high-impact projects.",
    content: [
      {
        heading: "Team Leadership",
        text: "Leading a team of 6 frontend developers, I've focused on mentoring junior developers, establishing coding standards, and fostering a collaborative development environment that promotes continuous learning.",
        image: "/src/assets/project2.jpg"
      },
      {
        heading: "Technical Innovation",
        text: "I've spearheaded the adoption of modern development practices including TypeScript integration, component library development, and automated testing frameworks that improved our development velocity by 40%.",
        image: "/src/assets/skills-cv.jpg"
      }
    ],
    summary: "My role at TechCorp has been transformative, allowing me to grow as both a technical leader and mentor. The experience has reinforced my passion for building great teams and exceptional software."
  },
  "startupxyz-fullstack": {
    title: "Full Stack Innovation at StartupXYZ",
    date: "2025-01-05",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/project1.jpg",
    intro: "During my time at StartupXYZ (2020-2022), I wore multiple hats as a Full Stack Developer, contributing to both frontend and backend systems while helping scale the company from startup to established business.",
    content: [
      {
        heading: "Rapid Prototyping",
        text: "In the fast-paced startup environment, I excelled at rapidly prototyping new features and iterating based on user feedback. This agile approach helped us validate ideas quickly and efficiently.",
        image: "/src/assets/project3.jpg"
      },
      {
        heading: "System Scalability",
        text: "As the user base grew from hundreds to thousands, I was instrumental in refactoring and optimizing our systems to handle increased load while maintaining performance.",
        image: "/src/assets/experience.jpg"
      }
    ],
    summary: "StartupXYZ taught me the value of adaptability and rapid iteration. The experience shaped my ability to work effectively in dynamic environments and deliver results under pressure."
  },
  "computer-science-degree": {
    title: "Academic Excellence in Computer Science",
    date: "2025-01-04",
    author: "Chethan Raj U",
    category: "Education",
    image: "/src/assets/education-cv.jpg",
    intro: "My Bachelor of Science in Computer Science from the University of Technology has provided me with a solid theoretical foundation that complements my practical development skills.",
    content: [
      {
        heading: "Core Curriculum Mastery",
        text: "Excelling in courses like Data Structures, Algorithms, and Database Systems gave me the fundamental knowledge needed to build efficient, well-architected software solutions.",
        image: "/src/assets/skills-cv.jpg"
      },
      {
        heading: "Capstone Project Success",
        text: "My capstone project, an e-commerce platform with real-time analytics, demonstrated my ability to apply academic knowledge to real-world problems and earned recognition from faculty.",
        image: "/src/assets/project2.jpg"
      }
    ],
    summary: "My computer science education provided the theoretical framework that supports all my practical development work. The combination of academic rigor and hands-on experience continues to serve me well."
  },
  "aws-cloud-skills": {
    title: "Mastering Cloud Technologies with AWS",
    date: "2025-01-03",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/project3.jpg",
    intro: "My expertise in AWS and cloud technologies has been crucial in building and deploying scalable applications that can handle varying loads and provide reliable service to users worldwide.",
    content: [
      {
        heading: "Infrastructure as Code",
        text: "I've become proficient in using AWS CloudFormation and Terraform to manage infrastructure as code, ensuring consistent, reproducible deployments across different environments.",
        image: "/src/assets/experience.jpg"
      },
      {
        heading: "Serverless Architecture",
        text: "Leveraging AWS Lambda, API Gateway, and other serverless services, I've built cost-effective, automatically scaling solutions that require minimal maintenance while providing excellent performance.",
        image: "/src/assets/project1.jpg"
      }
    ],
    summary: "Cloud technologies, particularly AWS, have revolutionized how I approach application architecture and deployment. The scalability and reliability of cloud services continue to be game-changers in modern development."
  },
  "docker-kubernetes": {
    title: "Containerization and Orchestration Excellence",
    date: "2025-01-02",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/skills-cv.jpg",
    intro: "Docker and Kubernetes have transformed how I package, deploy, and manage applications. My expertise in containerization has led to more reliable deployments and easier scaling.",
    content: [
      {
        heading: "Container Strategy",
        text: "I've developed comprehensive containerization strategies that improve development workflow, ensure consistency across environments, and simplify deployment processes.",
        image: "/src/assets/project2.jpg"
      },
      {
        heading: "Orchestration Mastery",
        text: "Using Kubernetes for container orchestration, I've built resilient systems that can automatically recover from failures and scale based on demand.",
        image: "/src/assets/project3.jpg"
      }
    ],
    summary: "Containerization and orchestration technologies have become essential tools in my development arsenal, enabling me to build more reliable and scalable applications."
  }
};

export default function BlogPost() {
  const { slug, category } = useParams<{ slug?: string; category?: string }>();
  
  // If category route, show all posts in that category
  if (category && !slug) {
    const categoryPosts = Object.entries(blogPosts).filter(([_, post]) => 
      post.category.toLowerCase() === category.toLowerCase()
    );

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-primary hover:text-primary/80 transition-smooth">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gradient capitalize">{category} Blogs</h1>
            <p className="text-lg text-muted-foreground">
              Explore my {category.toLowerCase()} journey through these detailed articles
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map(([key, post]) => (
              <Link 
                key={key} 
                to={`/blog/${key}`}
                className="group block bg-card rounded-xl border border-border hover:shadow-elegant transition-smooth overflow-hidden"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {post.category}
                  </span>
                  <h3 className="font-semibold mt-3 mb-2 group-hover:text-primary transition-smooth">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {post.intro}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Individual blog post
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const suggestedPosts = Object.entries(blogPosts)
    .filter(([key, suggestedPost]) => key !== slug && suggestedPost.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-primary hover:text-primary/80 transition-smooth">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gradient">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {post.category}
            </span>
          </div>
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-xl shadow-elegant mb-6"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed mb-8 text-foreground/90">
            {post.intro}
          </p>

          {post.content.map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {section.heading}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg leading-relaxed text-foreground/90">
                    {section.text}
                  </p>
                </div>
                <div>
                  <img 
                    src={section.image} 
                    alt={section.heading}
                    className="w-full h-48 object-cover rounded-lg shadow-card"
                  />
                </div>
              </div>
            </section>
          ))}

          <div className="bg-card p-6 rounded-xl border border-border mt-12">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <p className="text-lg leading-relaxed text-foreground/90">
              {post.summary}
            </p>
          </div>
        </div>

        {suggestedPosts.length > 0 && (
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-6">More {post.category} Posts</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {suggestedPosts.map(([key, suggestedPost]) => (
                <Link 
                  key={key} 
                  to={`/blog/${key}`}
                  className="group block p-6 bg-card rounded-xl border border-border hover:shadow-elegant transition-smooth"
                >
                  <img 
                    src={suggestedPost.image} 
                    alt={suggestedPost.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-smooth">
                    {suggestedPost.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(suggestedPost.date).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
