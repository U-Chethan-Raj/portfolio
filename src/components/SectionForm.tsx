import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Upload, FileText, Download } from "lucide-react";
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

      const sectionData = {
        ...formData,
        data: parsedData,
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
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(formData.cv_file_url, '_blank')}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      View
                    </Button>
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
              <Label htmlFor="order_index">Order</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
              />
            </div>

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

export default SectionForm;