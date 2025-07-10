import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary-glow/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-wide uppercase text-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Welcome to my portfolio
              </p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Hi, I'm{' '}
                <span className="text-gradient">
                  Chethan Raj
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground font-light animate-fade-in" style={{ animationDelay: '0.6s' }}>
                Full Stack Developer & UI/UX Designer
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
              I create exceptional digital experiences through innovative web applications, 
              mobile solutions, and user-centered design. Passionate about turning ideas into reality.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
              <Button 
                variant="hero" 
                size="lg" 
                className="px-8"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="glass" size="lg" className="px-6">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
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
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Chethan Raj - Full Stack Developer" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-elegant transition-smooth hover:shadow-glow"
              />
              <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 blur-2xl animate-glow" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;