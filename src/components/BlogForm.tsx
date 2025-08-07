import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Upload, Trash2, Eye, Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogFormProps {
  blog?: any;
  onSave: () => void;
  onClose: () => void;
}

const BlogForm = ({ blog, onSave, onClose }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image_url: "",
    published: false,
    attachments: [] as any[],
  });
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "experience", label: "Experience" },
    { value: "projects", label: "Projects" },
    { value: "certifications", label: "Certifications" },
    { value: "participations", label: "Participations" },
    { value: "skills", label: "Skills" },
    { value: "education", label: "Education" },
    { value: "services", label: "What I Do" },
    { value: "professional_summary", label: "Professional Summary" },
    { value: "key_achievements", label: "Key Achievements" },
  ];

  useEffect(() => {
    if (blog) {
        setFormData({
          title: blog.title || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          category: blog.category || "",
          image_url: blog.image_url || "",
          published: blog.published || false,
          attachments: blog.attachments || [],
        });
    }
  }, [blog]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = generateSlug(formData.title);
      
      if (blog) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update({
            ...formData,
            slug,
            updated_at: new Date().toISOString(),
          })
          .eq('id', blog.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog updated successfully",
        });
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([{
            ...formData,
            slug,
          }]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog created successfully",
        });
      }

      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-uploads')
        .getPublicUrl(filePath);

      const newAttachment = {
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        url: publicUrl,
      };

      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment]
      }));

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const removeAttachment = async (attachmentId: string, filePath: string) => {
    try {
      await supabase.storage
        .from('blog-uploads')
        .remove([filePath]);

      setFormData(prev => ({
        ...prev,
        attachments: prev.attachments.filter(att => att.id !== attachmentId)
      }));

      toast({
        title: "Success",
        description: "File removed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{blog ? "Edit Blog" : "Create New Blog"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag files here or click to upload
                  </p>
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={uploadingFile}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploadingFile}
                      asChild
                    >
                      <span>
                        {uploadingFile ? "Uploading..." : "Choose File"}
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
              
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Files:</p>
                  {formData.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{attachment.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(attachment.file_size)} • {attachment.file_type}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(attachment.url, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(attachment.id, attachment.file_path)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published">Published</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogForm;