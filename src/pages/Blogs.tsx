
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: "All", count: blogs.length },
    { name: "Experience", count: blogs.filter(b => b.category === "experience").length },
    { name: "Skills", count: blogs.filter(b => b.category === "skills").length },
    { name: "Education", count: blogs.filter(b => b.category === "education").length },
    { name: "Projects", count: blogs.filter(b => b.category === "projects").length },
    { name: "Certifications", count: blogs.filter(b => b.category === "certifications").length },
    { name: "Participations", count: blogs.filter(b => b.category === "participations").length }
  ];

  const featuredBlogs = blogs.filter(blog => blog.category === "experience" || blog.category === "skills").slice(0, 4);
  const recentBlogs = blogs.slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    );
  }

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
            {featuredBlogs.map((blog) => (
              <Card key={blog.id} className="card-gradient overflow-hidden hover:shadow-glow transition-smooth">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={blog.image_url || "/placeholder.svg"} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-smooth">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Chethan Raj U</span>
                      </div>
                    </div>
                    <Link to={`/blog/${blog.slug}`}>
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
            {recentBlogs.map((blog) => (
              <Card key={blog.id} className="card-gradient overflow-hidden hover:shadow-card transition-smooth group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={blog.image_url || "/placeholder.svg"} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="text-xs">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-smooth">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/blog/${blog.slug}`}>
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
