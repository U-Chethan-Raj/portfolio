import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, MapPin, Award, Briefcase } from "lucide-react";
import { useState } from "react";
import cvPreview from "@/assets/cv-preview.jpg";
import experience from "@/assets/experience.jpg";
import educationCv from "@/assets/education-cv.jpg";
import skillsCv from "@/assets/skills-cv.jpg";

const CV = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);

  const cvSections = [
    {
      id: 1,
      title: "Professional Summary",
      image: cvPreview,
      content: {
        heading: "Full Stack Developer & UI/UX Designer",
        details: [
          "5+ years of experience in web development",
          "Expertise in React, Node.js, and modern JavaScript frameworks", 
          "Strong background in user experience design and interface development",
          "Proven track record of delivering scalable web applications",
          "Passionate about creating efficient, user-centered digital solutions"
        ]
      }
    },
    {
      id: 2,
      title: "Work Experience",
      image: experience,
      content: {
        heading: "Professional Journey",
        details: [
          "Senior Developer at TechCorp (2022-Present) - Leading frontend development team",
          "Full Stack Developer at StartupXYZ (2020-2022) - Built and maintained web applications",
          "UI/UX Designer at DesignStudio (2019-2020) - Created user interfaces and experiences",
          "Junior Developer at CodeAgency (2018-2019) - Developed responsive websites",
          "Freelance Web Developer (2017-2018) - Worked with various clients on custom projects"
        ]
      }
    },
    {
      id: 3,
      title: "Education & Qualifications",
      image: educationCv,
      content: {
        heading: "Academic Excellence",
        details: [
          "Bachelor of Science in Computer Science - University of Technology (2021-2025)",
          "GPA: 3.8/4.0 - Dean's List Recognition",
          "Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems",
          "Capstone Project: E-commerce Platform with Real-time Analytics",
          "Active member of Computer Science Society and Programming Club"
        ]
      }
    },
    {
      id: 4,
      title: "Technical Skills",
      image: skillsCv,
      content: {
        heading: "Technical Expertise",
        details: [
          "Frontend: React, Vue.js, Angular, TypeScript, HTML5, CSS3, Tailwind CSS",
          "Backend: Node.js, Express, Python, Django, Java Spring Boot",
          "Databases: MongoDB, PostgreSQL, MySQL, Redis",
          "Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Git",
          "Design: Figma, Adobe Creative Suite, Sketch, Prototyping"
        ]
      }
    }
  ];

  const achievements = [
    { icon: Award, text: "Employee of the Month - TechCorp (2023)" },
    { icon: Briefcase, text: "Led 5 successful project deliveries" },
    { icon: Calendar, text: "3+ years remote work experience" },
    { icon: MapPin, text: "Available for relocation worldwide" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cvSections.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cvSections.length) % cvSections.length);
  };

  const openImageZoom = (image) => {
    setZoomedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImageZoom = () => {
    setZoomedImage(null);
    document.body.style.overflow = '';
  };

  // Close zoom on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomedImage) {
      closeImageZoom();
    }
  });

  return (
    <section id="cv" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">CV</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive overview of my professional journey, skills, and accomplishments 
            in software development and design.
          </p>
          <Button variant="hero" size="lg" className="px-8">
            <Download className="mr-2 h-5 w-5" />
            Download Full CV
          </Button>
        </div>

        {/* CV Slideshow Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Section with Slideshow */}
          <div className="relative">
            <Card className="card-gradient overflow-hidden shadow-card hover:shadow-glow transition-smooth">
              <div className="relative h-96 overflow-hidden group">
                <img 
                  src={cvSections[currentSlide].image} 
                  alt={cvSections[currentSlide].title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105 cursor-zoom-in"
                  onClick={() => openImageZoom(cvSections[currentSlide].image)}
                />
                {/* Blue overlay with opacity */}
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                {/* Shadow gradient from bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                
                {/* Navigation Arrows */}
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-smooth"
                  onClick={prevSlide}
                >
                  ←
                </Button>
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-smooth"
                  onClick={nextSlide}
                >
                  →
                </Button>
              </div>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {cvSections.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-smooth ${
                      index === currentSlide ? 'bg-primary' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {cvSections[currentSlide].title}
              </Badge>
              <h3 className="text-3xl font-bold">
                {cvSections[currentSlide].content.heading}
              </h3>
            </div>
            
            <div className="space-y-3">
              {cvSections[currentSlide].content.details.map((detail, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 hover:bg-card/50 transition-smooth"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Auto-play controls */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={prevSlide}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={nextSlide}>
                  Next
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentSlide + 1} of {cvSections.length}
              </span>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Key Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card 
                key={index}
                className="card-gradient p-6 text-center hover:shadow-card transition-smooth hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/20 p-3 rounded-full w-fit mx-auto mb-4">
                  <achievement.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{achievement.text}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="card-gradient p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to Work Together?</h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how my skills and experience can contribute to your next project. 
              I'm always open to new opportunities and exciting challenges.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Complete CV
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Image Zoom Overlay */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-background/20 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in"
          onClick={closeImageZoom}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <img 
              src={zoomedImage} 
              alt="Zoomed CV Section"
              className="w-full h-full object-contain rounded-lg shadow-glow"
              onClick={(e) => e.stopPropagation()}
            />
            <Button 
              variant="glass" 
              size="icon" 
              className="absolute top-2 right-2"
              onClick={closeImageZoom}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CV;