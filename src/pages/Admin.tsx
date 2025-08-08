import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Image, Award, Briefcase, Edit, Trash2, Settings, Layout } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BlogForm from "@/components/BlogForm";
import SectionForm from "@/components/SectionForm";

const Admin = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [editingSection, setEditingSection] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('admin_session');
    if (!session) {
      window.location.href = '/';
      return;
    }

    fetchBlogs();
    fetchSections();
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

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch sections",
        variant: "destructive",
      });
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

  const handleNewSection = () => {
    setEditingSection(null);
    setShowSectionForm(true);
  };

  const handleEditSection = (section: any) => {
    setEditingSection(section);
    setShowSectionForm(true);
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    try {
      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Section deleted successfully",
      });

      fetchSections();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete section",
        variant: "destructive",
      });
    }
  };

  const handleCloseSectionForm = () => {
    setShowSectionForm(false);
    setEditingSection(null);
  };

  const categories = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'participations', label: 'Participations', icon: Image },
    { id: 'skills', label: 'Skills', icon: Settings },
    { id: 'education', label: 'Education', icon: Award },
    { id: 'services', label: 'What I Do', icon: Settings },
    { id: 'professional_summary', label: 'Professional Summary', icon: FileText },
    { id: 'key_achievements', label: 'Key Achievements', icon: Award },
  ];

  const sectionTypes = [
    { id: 'services', label: 'What I Do', icon: Settings },
    { id: 'professional_summary', label: 'Professional Summary', icon: FileText },
    { id: 'key_achievements', label: 'Key Achievements', icon: Award },
    { id: 'cv_download', label: 'CV Download', icon: FileText },
    { id: 'hero', label: 'Hero Section', icon: Image },
    { id: 'about', label: 'About Section', icon: FileText },
    { id: 'contact', label: 'Contact Section', icon: Settings },
  ];

  // Add missing tabs to the categories array for proper handling
  const allTabs = [
    ...categories,
    { id: 'cv_download', label: 'CV Download', icon: FileText }
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
          <div className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
            </TabsList>
            
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="experience" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Experience</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Projects</TabsTrigger>
              <TabsTrigger value="certifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Certifications</TabsTrigger>
              <TabsTrigger value="participations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Participations</TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Skills</TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Education</TabsTrigger>
            </TabsList>
            
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2">
              <TabsTrigger value="services" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">What I Do</TabsTrigger>
              <TabsTrigger value="professional_summary" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Summary</TabsTrigger>
              <TabsTrigger value="key_achievements" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Achievements</TabsTrigger>
              <TabsTrigger value="cv_download" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">CV Download</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogs.length}</div>
                  <p className="text-xs text-muted-foreground">All content entries</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sections</CardTitle>
                  <Layout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sections.length}</div>
                  <p className="text-xs text-muted-foreground">Homepage sections</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogs.filter(b => b.published).length}</div>
                  <p className="text-xs text-muted-foreground">Live content</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
                        Published entries
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

          <TabsContent value="sections">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Homepage Sections</h2>
              <Button onClick={handleNewSection}>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Section
              </Button>
            </div>

            <div className="grid gap-6">
              {sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {section.title}
                          <span className="text-sm bg-muted px-2 py-1 rounded">
                            {section.section_type}
                          </span>
                        </CardTitle>
                        {section.subtitle && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {section.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditSection(section)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{section.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Status: {section.published ? 'Published' : 'Draft'}</span>
                      <span>Order: {section.order_index}</span>
                      <span>Created: {new Date(section.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {allTabs.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{category.label}</h2>
                <Button onClick={() => handleNewBlog(category.id)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New {category.label.endsWith('s') ? category.label.slice(0, -1) : category.label}
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
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span>Status: {blog.published ? 'Published' : 'Draft'}</span>
                          <span>Created: {new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                        {blog.attachments && blog.attachments.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Attachments: {blog.attachments.length}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                {blogs.filter(blog => blog.category === category.id).length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">No {category.label.toLowerCase()} entries yet.</p>
                      <p className="text-sm text-muted-foreground mt-2">Click "New {category.label.endsWith('s') ? category.label.slice(0, -1) : category.label}" to add your first entry.</p>
                    </CardContent>
                  </Card>
                )}
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

        {showSectionForm && (
          <SectionForm
            section={editingSection}
            onSave={fetchSections}
            onClose={handleCloseSectionForm}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;