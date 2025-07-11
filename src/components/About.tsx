import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Smartphone, Globe } from "lucide-react";

const About = () => {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB", 
    "PostgreSQL", "AWS", "Docker", "Figma", "Tailwind CSS", "GraphQL"
  ];

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Building responsive and performant web applications using modern frameworks and technologies."
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Creating cross-platform mobile applications with React Native and native technologies."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user interfaces with focus on user experience."
    },
    {
      icon: Globe,
      title: "Full Stack Solutions",
      description: "End-to-end development from database design to deployment and maintenance."
    }
  ];

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
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="group cursor-pointer" onClick={() => window.open('/blog/web-development-experience', '_blank')}>
                  <p className="hover:text-foreground transition-smooth">
                    <span className="font-semibold text-primary">5+ years of experience</span> in web development, 
                    specializing in creating robust and scalable applications. My journey has been marked by 
                    continuous learning and innovation in the ever-evolving tech landscape.
                    <span className="text-primary ml-2 opacity-0 group-hover:opacity-100 transition-smooth">→ Read more</span>
                  </p>
                </div>
                
                <div className="group cursor-pointer" onClick={() => window.open('/blog/react-expertise', '_blank')}>
                  <p className="hover:text-foreground transition-smooth">
                    <span className="font-semibold text-primary">Expertise in React, Node.js, and modern JavaScript frameworks</span> 
                    enables me to build dynamic, responsive applications that users love. I stay current with the latest 
                    technologies and best practices.
                    <span className="text-primary ml-2 opacity-0 group-hover:opacity-100 transition-smooth">→ Read more</span>
                  </p>
                </div>
                
                <p>
                  <span className="font-semibold text-primary">Strong background in user experience design and interface development</span> 
                  helps me create intuitive and engaging digital experiences that bridge the gap between functionality and aesthetics.
                </p>
                
                <p>
                  <span className="font-semibold text-primary">Proven track record of delivering scalable web applications</span> 
                  that handle real-world challenges and scale with business growth. I focus on performance, security, and maintainability.
                </p>
                
                <p>
                  <span className="font-semibold text-primary">Passionate about creating efficient, user-centered digital solutions</span> 
                  that make a meaningful impact. I believe technology should serve people and solve real problems.
                </p>
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
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className="card-gradient p-6 hover:shadow-card transition-smooth hover:scale-[1.02] cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;