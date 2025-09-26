import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export default function BlogPost() {
  const { slug, category } = useParams<{ slug?: string; category?: string }>();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentBlog, setCurrentBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category && !slug) {
      fetchCategoryBlogs();
    } else if (slug) {
      fetchBlogBySlug();
    }
  }, [slug, category]);

  const fetchCategoryBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching category blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogBySlug = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setCurrentBlog(data);
      
      // Fetch suggested posts from same category
      const { data: suggestedData } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .eq('category', data.category)
        .neq('slug', slug)
        .limit(3);
      
      setBlogs(suggestedData || []);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If category route, show all posts in that category
  if (category && !slug) {
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
            {blogs.map((blog) => (
              <Link 
                key={blog.id} 
                to={`/blog/${blog.slug}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-elegant transition-smooth">
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
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-smooth">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Chethan Raj U</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blogs found in this category.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Individual blog post
  if (!currentBlog) {
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

  return (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-primary hover:text-primary/80 transition-smooth">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gradient">{currentBlog.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(currentBlog.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Chethan Raj U</span>
            </div>
            <Badge variant="secondary">
              {currentBlog.category}
            </Badge>
          </div>
          {currentBlog.image_url && (
            <img 
              src={currentBlog.image_url} 
              alt={currentBlog.title}
              className="w-full h-64 object-cover rounded-xl shadow-elegant mb-6"
            />
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          {currentBlog.excerpt && (
            <p className="text-xl leading-relaxed mb-8 text-foreground/90">
              {currentBlog.excerpt}
            </p>
          )}

          <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90">
            {currentBlog.content}
          </div>

          {currentBlog.attachments && currentBlog.attachments.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold mb-4">Attachments</h3>
              <div className="grid gap-4">
                {currentBlog.attachments.map((attachment: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{attachment.filename}</p>
                        <p className="text-sm text-muted-foreground">{attachment.file_type}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          Download
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Suggested Posts */}
        {blogs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <h3 className="text-2xl font-semibold mb-8 text-center">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {blogs.map((suggestedBlog) => (
                <Link 
                  key={suggestedBlog.id} 
                  to={`/blog/${suggestedBlog.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-elegant transition-smooth">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={suggestedBlog.image_url || "/placeholder.svg"} 
                        alt={suggestedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {suggestedBlog.category}
                      </Badge>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-smooth text-sm line-clamp-2">
                        {suggestedBlog.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(suggestedBlog.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}