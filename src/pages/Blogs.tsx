
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: "web-development-experience",
    title: "5+ Years of Web Development Excellence",
    excerpt: "With over five years of dedicated experience in web development, I've had the privilege of working on diverse projects...",
    date: "2025-01-11",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/experience.jpg",
    featured: true
  },
  {
    id: "react-expertise",
    title: "Mastering React and Modern JavaScript Frameworks",
    excerpt: "React has revolutionized how I approach frontend development. My expertise in React, combined with modern JavaScript...",
    date: "2025-01-10",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/skills-cv.jpg",
    featured: true
  },
  {
    id: "nodejs-backend",
    title: "Building Scalable Backend Systems with Node.js",
    excerpt: "Node.js has been instrumental in my full-stack development journey. My expertise in building robust backend systems...",
    date: "2025-01-09",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/project1.jpg",
    featured: false
  },
  {
    id: "ux-design-expertise",
    title: "Creating Intuitive User Experiences",
    excerpt: "My strong background in user experience design has been crucial in creating interfaces that not only look great...",
    date: "2025-01-08",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/project2.jpg",
    featured: false
  },
  {
    id: "scalable-applications",
    title: "Delivering Scalable Web Applications",
    excerpt: "Throughout my career, I've consistently delivered scalable web applications that grow with business needs...",
    date: "2025-01-07",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/project3.jpg",
    featured: false
  },
  {
    id: "techcorp-senior-developer",
    title: "Leading Frontend Development at TechCorp",
    excerpt: "As a Senior Developer at TechCorp since 2022, I've had the opportunity to lead a talented frontend development team...",
    date: "2025-01-06",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/experience.jpg",
    featured: false
  },
  {
    id: "startupxyz-fullstack",
    title: "Full Stack Innovation at StartupXYZ",
    excerpt: "During my time at StartupXYZ (2020-2022), I wore multiple hats as a Full Stack Developer, contributing to both frontend...",
    date: "2025-01-05",
    author: "Chethan Raj U",
    category: "Experience",
    image: "/src/assets/project1.jpg",
    featured: false
  },
  {
    id: "computer-science-degree",
    title: "Academic Excellence in Computer Science",
    excerpt: "My Bachelor of Science in Computer Science from the University of Technology has provided me with a solid theoretical foundation...",
    date: "2025-01-04",
    author: "Chethan Raj U",
    category: "Education",
    image: "/src/assets/education-cv.jpg",
    featured: false
  },
  {
    id: "aws-cloud-skills",
    title: "Mastering Cloud Technologies with AWS",
    excerpt: "My expertise in AWS and cloud technologies has been crucial in building and deploying scalable applications...",
    date: "2025-01-03",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/project3.jpg",
    featured: false
  },
  {
    id: "docker-kubernetes",
    title: "Containerization and Orchestration Excellence",
    excerpt: "Docker and Kubernetes have transformed how I package, deploy, and manage applications. My expertise in containerization...",
    date: "2025-01-02",
    author: "Chethan Raj U",
    category: "Skills",
    image: "/src/assets/skills-cv.jpg",
    featured: false
  }
];

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Experience", count: blogPosts.filter(p => p.category === "Experience").length },
  { name: "Skills", count: blogPosts.filter(p => p.category === "Skills").length },
  { name: "Education", count: blogPosts.filter(p => p.category === "Education").length },
  { name: "Projects", count: 0 },
  { name: "Certifications", count: 0 },
  { name: "Participations", count: 0 }
];

export default function Blogs() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, experiences, and knowledge from my journey in web development, 
            technology, and professional growth.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.name === "All" ? "/blogs" : `/blog/category/${category.name.toLowerCase()}`}
              className="group"
            >
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-smooth cursor-pointer"
              >
                {category.name} ({category.count})
              </Badge>
            </Link>
          ))}
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="card-gradient overflow-hidden hover:shadow-glow transition-smooth">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-smooth">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="card-gradient overflow-hidden hover:shadow-card transition-smooth group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-smooth">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Read <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="text-center">
          <Card className="card-gradient p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get notified when I publish new articles about web development, technology trends, 
              and professional insights.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero">
                Subscribe
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
