import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Image, Award, Briefcase, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BlogForm from "@/components/BlogForm";

const Admin = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('admin_session');
    if (!session) {
      window.location.href = '/';
      return;
    }

    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.href = '/';
  };

  const handleNewBlog = (category?: string) => {
    setEditingBlog(category ? { category } : null);
    setShowBlogForm(true);
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });

      fetchBlogs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    }
  };

  const handleCloseBlogForm = () => {
    setShowBlogForm(false);
    setEditingBlog(null);
  };

  const categories = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'participations', label: 'Participations', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Portfolio Admin</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="participations">Participations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const categoryBlogs = blogs.filter(b => b.category === category.id);
                const Icon = category.icon;
                
                return (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {category.label}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{categoryBlogs.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Published blogs
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs.slice(0, 5).map((blog) => (
                    <div key={blog.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{blog.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {blog.category} • {new Date(blog.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{category.label}</h2>
                <Button onClick={() => handleNewBlog(category.id)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New {category.label.slice(0, -1)}
                </Button>
              </div>

              <div className="grid gap-6">
                {blogs
                  .filter(blog => blog.category === category.id)
                  .map((blog) => (
                    <Card key={blog.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{blog.title}</CardTitle>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditBlog(blog)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteBlog(blog.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Status: {blog.published ? 'Published' : 'Draft'}</span>
                          <span>Created: {new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {showBlogForm && (
          <BlogForm
            blog={editingBlog}
            onSave={fetchBlogs}
            onClose={handleCloseBlogForm}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;