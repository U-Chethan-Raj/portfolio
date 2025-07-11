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
    title: "Mastering React and Modern JavaScript",
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
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
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
    .filter(([key]) => key !== slug)
    .slice(0, 2);

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

        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Other Blog Posts</h3>
          <div className="grid md:grid-cols-2 gap-6">
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
      </article>
    </div>
  );
}