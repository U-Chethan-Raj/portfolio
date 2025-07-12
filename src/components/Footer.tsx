import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = ({ onAdminClick }: { onAdminClick?: () => void }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-gradient">Chethan Raj</span>
            </h3>
            <p className="text-muted-foreground">
              Full Stack Developer crafting exceptional digital experiences
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-bounce">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-bounce">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-bounce">
              <Mail className="h-5 w-5" />
            </Button>
          </div>

          {/* Back to Top */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={scrollToTop}
              className="hover:shadow-card transition-smooth"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          {/* Blog Categories */}
          <div className="flex flex-wrap gap-6 text-sm mb-6 justify-center">
            <a href="/blog/category/experience" className="text-muted-foreground hover:text-primary transition-colors">
              Experience
            </a>
            <a href="/blog/category/projects" className="text-muted-foreground hover:text-primary transition-colors">
              Projects
            </a>
            <a href="/blog/category/certifications" className="text-muted-foreground hover:text-primary transition-colors">
              Certifications
            </a>
            <a href="/blog/category/participations" className="text-muted-foreground hover:text-primary transition-colors">
              Participations
            </a>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={onAdminClick}
              className="text-xs text-muted-foreground/30 hover:text-foreground transition-colors opacity-20 hover:opacity-100"
            >
              ©
            </button>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Chethan Raj. All rights reserved. Built with ❤️ and React
            </p>
            
            <div className="text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-smooth">Blog</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-primary transition-smooth">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;