import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Upload, FileText, Download, Trash2, Eye, Plus, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SectionFormProps {
  section?: any;
  onSave: () => void;
  onClose: () => void;
}

const SectionForm = ({ section, onSave, onClose }: SectionFormProps) => {
  const [formData, setFormData] = useState({
    section_type: "",
    title: "",
    subtitle: "",
    content: "",
    image_url: "",
    cv_file_url: "",
    data: "{}",
    order_index: 0,
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const { toast } = useToast();

  const sectionTypes = [
    { value: "hero", label: "Hero Section" },
    { value: "about", label: "About Section" },
    { value: "services", label: "What I Do" },
    { value: "professional_summary", label: "Professional Summary" },
    { value: "key_achievements", label: "Key Achievements" },
    { value: "cv_download", label: "CV Download" },
    { value: "projects", label: "Projects Section" },
    { value: "cv", label: "CV Section" },
    { value: "contact", label: "Contact Section" },
    { value: "testimonials", label: "Testimonials" },
    { value: "custom", label: "Custom Section" },
  ];

  useEffect(() => {
    if (section) {
      setFormData({
        section_type: section.section_type || "",
        title: section.title || "",
        subtitle: section.subtitle || "",
        content: section.content || "",
        image_url: section.image_url || "",
        cv_file_url: section.cv_file_url || "",
        data: JSON.stringify(section.data || {}, null, 2),
        order_index: section.order_index || 0,
        published: section.published ?? true,
      });
      
      // Set attachments from section data if available
      if (section.data && section.data.attachments) {
        setAttachments(section.data.attachments);
      }
    }
  }, [section]);

  const handleCvUpload = async () => {
    if (!cvFile) return;

    setUploading(true);
    try {
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `cv-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cv-files')
        .upload(filePath, cvFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('cv-files')
        .getPublicUrl(filePath);

      setFormData({ ...formData, cv_file_url: publicUrl });
      setCvFile(null);

      toast({
        title: "Success",
        description: "CV file uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to upload CV: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `section-${Date.now()}.${fileExt}`;
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

      setAttachments(prev => [...prev, newAttachment]);

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to upload file: ${error.message}`,
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

      setAttachments(prev => prev.filter(att => att.id !== attachmentId));

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let parsedData = {};
      try {
        parsedData = JSON.parse(formData.data);
      } catch (error) {
        throw new Error("Invalid JSON in data field");
      }

      // Include attachments in the data field
      const sectionData = {
        ...formData,
        data: { ...parsedData, attachments },
        updated_at: new Date().toISOString(),
      };
      
      if (section) {
        // Update existing section
        const { error } = await supabase
          .from('sections')
          .update(sectionData)
          .eq('id', section.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Section updated successfully",
        });
      } else {
        // Create new section
        const { error } = await supabase
          .from('sections')
          .insert([sectionData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Section created successfully",
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{section ? "Edit Section" : "Create New Section"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="section_type">Section Type</Label>
              <Select
                value={formData.section_type}
                onValueChange={(value) => setFormData({ ...formData, section_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a section type" />
                </SelectTrigger>
                <SelectContent>
                  {sectionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
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

            {formData.section_type === 'cv_download' && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium">CV File Management</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="cv_file">Upload CV File</Label>
                  <Input
                    id="cv_file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>

                {formData.cv_file_url && (
                  <div className="flex items-center gap-2 p-2 bg-background rounded border">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm flex-1">Current CV file uploaded</span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(formData.cv_file_url, '_blank')}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          if (!formData.cv_file_url) return;
                          if (!confirm('Delete the current CV file?')) return;
                          try {
                            const parts = formData.cv_file_url.split('/cv-files/');
                            if (parts.length > 1) {
                              const path = parts[1];
                              await supabase.storage.from('cv-files').remove([path]);
                            }
                            setFormData({ ...formData, cv_file_url: '' });
                            toast({ title: 'Success', description: 'CV file deleted' });
                          } catch (err: any) {
                            toast({ title: 'Error', description: err.message, variant: 'destructive' });
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}

                {cvFile && (
                  <Button
                    type="button"
                    onClick={handleCvUpload}
                    disabled={uploading}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload CV File"}
                  </Button>
                )}
              </div>
            )}

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
                    id="section-file-upload"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <Label htmlFor="section-file-upload" className="cursor-pointer">
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
              
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Files:</p>
                  {attachments.map((attachment) => (
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

            <div className="space-y-2">
              <Label htmlFor="order_index">Order</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
              />
            </div>

            {/* Simplified editor for What I Do sections */}
            {formData.section_type === 'services' ? (
              <ServicesEditor 
                data={formData.data}
                onChange={(data) => setFormData({ ...formData, data })}
              />
            ) : formData.section_type === 'professional_summary' ? (
              <ProfessionalSummaryEditor 
                data={formData.data}
                onChange={(data) => setFormData({ ...formData, data })}
              />
            ) : (
              <div className="space-y-2">
                <Label htmlFor="data">Additional Data (JSON)</Label>
                <Textarea
                  id="data"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  rows={6}
                  placeholder='{"key": "value"}'
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Enter additional configuration data in JSON format
                </p>
              </div>
            )}

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
                {loading ? "Saving..." : section ? "Update Section" : "Create Section"}
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

// Simplified editor for Services (What I Do) section
const ServicesEditor = ({ data, onChange }: { data: string; onChange: (data: string) => void }) => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(data);
      setServices(parsed.services || []);
    } catch {
      setServices([]);
    }
  }, [data]);

  const updateData = (newServices: any[]) => {
    const updatedData = JSON.stringify({ services: newServices }, null, 2);
    onChange(updatedData);
  };

  const addService = () => {
    const newService = {
      title: "",
      description: "",
      icon: "Code"
    };
    const newServices = [...services, newService];
    setServices(newServices);
    updateData(newServices);
  };

  const removeService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
    updateData(newServices);
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
    updateData(newServices);
  };

  const iconOptions = ["Code", "Smartphone", "Palette", "Globe", "Settings", "Database", "Cloud", "Shield"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">What I Do Services</Label>
        <Button type="button" onClick={addService} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Service
        </Button>
      </div>
      
      {services.map((service, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Service {index + 1}</h4>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => removeService(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`service-title-${index}`}>Title</Label>
                <Input
                  id={`service-title-${index}`}
                  value={service.title}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  placeholder="e.g., Web Development"
                />
              </div>
              
              <div>
                <Label htmlFor={`service-icon-${index}`}>Icon</Label>
                <Select
                  value={service.icon}
                  onValueChange={(value) => updateService(index, 'icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor={`service-desc-${index}`}>Description</Label>
              <Textarea
                id={`service-desc-${index}`}
                value={service.description}
                onChange={(e) => updateService(index, 'description', e.target.value)}
                placeholder="Describe this service..."
                rows={3}
              />
            </div>
          </div>
        </Card>
      ))}
      
      {services.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No services configured yet.</p>
          <Button type="button" onClick={addService} variant="outline" className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Service
          </Button>
        </div>
      )}
    </div>
  );
};

// Simplified editor for Professional Summary section
const ProfessionalSummaryEditor = ({ data, onChange }: { data: string; onChange: (data: string) => void }) => {
  const [summary, setSummary] = useState<any[]>([]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(data);
      setSummary(parsed.summary || []);
    } catch {
      setSummary([]);
    }
  }, [data]);

  const updateData = (newSummary: any[]) => {
    const updatedData = JSON.stringify({ summary: newSummary }, null, 2);
    onChange(updatedData);
  };

  const addPoint = () => {
    const newPoint = {
      title: "",
      description: "",
      link: ""
    };
    const newSummary = [...summary, newPoint];
    setSummary(newSummary);
    updateData(newSummary);
  };

  const removePoint = (index: number) => {
    const newSummary = summary.filter((_, i) => i !== index);
    setSummary(newSummary);
    updateData(newSummary);
  };

  const updatePoint = (index: number, field: string, value: string) => {
    const newSummary = [...summary];
    newSummary[index] = { ...newSummary[index], [field]: value };
    setSummary(newSummary);
    updateData(newSummary);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Professional Summary Points</Label>
        <Button type="button" onClick={addPoint} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Point
        </Button>
      </div>
      
      {summary.map((point, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Point {index + 1}</h4>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => removePoint(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <Label htmlFor={`point-title-${index}`}>Title</Label>
              <Input
                id={`point-title-${index}`}
                value={point.title}
                onChange={(e) => updatePoint(index, 'title', e.target.value)}
                placeholder="e.g., 5+ years in web development"
              />
            </div>
            
            <div>
              <Label htmlFor={`point-desc-${index}`}>Description</Label>
              <Textarea
                id={`point-desc-${index}`}
                value={point.description}
                onChange={(e) => updatePoint(index, 'description', e.target.value)}
                placeholder="Detailed description..."
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor={`point-link-${index}`}>Link to Blog (optional)</Label>
              <Input
                id={`point-link-${index}`}
                value={point.link}
                onChange={(e) => updatePoint(index, 'link', e.target.value)}
                placeholder="/blog/web-development-experience"
              />
            </div>
          </div>
        </Card>
      ))}
      
      {summary.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No summary points configured yet.</p>
          <Button type="button" onClick={addPoint} variant="outline" className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Point
          </Button>
        </div>
      )}
    </div>
  );
};

export default SectionForm;