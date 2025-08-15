import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const [professionalSummary, setProfessionalSummary] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('published', true)
        .in('section_type', ['professional-summary', 'skills', 'what-i-do'])
        .order('order_index', { ascending: true });

      if (error) throw error;

      data?.forEach((section) => {
        if (section.section_type === 'professional-summary') {
          setProfessionalSummary(section);
        } else if (section.section_type === 'skills') {
          const sectionData = section.data as any;
          setSkills(sectionData?.skills || []);
        } else if (section.section_type === 'what-i-do') {
          const sectionData = section.data as any;
          setServices(sectionData?.services || []);
        }
      });
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Code;
  };

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate developer with 5+ years of experience creating digital solutions 
            that make a difference. I love turning complex problems into simple, beautiful designs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <div className="space-y-6">
            <div className="card-gradient rounded-2xl p-8 shadow-card">
              <h3 className="text-2xl font-semibold mb-4">
                {professionalSummary?.subtitle || "My Journey"}
              </h3>
              <div className="space-y-4 text-muted-foreground">
                {professionalSummary?.data?.experiences?.length > 0 ? 
                  professionalSummary.data.experiences.map((experience: any, index: number) => (
                    <div 
                      key={index}
                      className="group cursor-pointer" 
                      onClick={() => experience.blogSlug && window.open(`/blog/${experience.blogSlug}`, '_blank')}
                    >
                      <p className="hover:text-foreground transition-smooth">
                        {experience.text}
                        {experience.blogSlug && (
                          <span className="text-primary ml-2 opacity-0 group-hover:opacity-100 transition-smooth">→ Read more</span>
                        )}
                      </p>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No professional summary available yet.</p>
                      <p className="text-sm text-muted-foreground mt-2">Add professional summary through the admin panel.</p>
                    </div>
                  )
                }
              </div>
            </div>

            {/* Skills */}
            <div className="card-gradient rounded-2xl p-8 shadow-card">
              <h3 className="text-2xl font-semibold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-smooth cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">What I Do</h3>
            {services.length > 0 ? services.map((service, index) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <Card 
                  key={service.title} 
                  className="card-gradient p-6 hover:shadow-card transition-smooth hover:scale-[1.02] cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </Card>
              );
            }) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No services configured yet.</p>
                <p className="text-sm text-muted-foreground mt-2">Add services through the admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;