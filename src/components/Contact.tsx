import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "chethanraj@example.com",
      href: "mailto:chethanraj@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/chethanraj",
      username: "@chethanraj"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/chethanraj",
      username: "/in/chethanraj"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/chethanraj",
      username: "@chethanraj"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-gradient p-8 shadow-card">
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input 
                    placeholder="John" 
                    className="bg-background/50 border-border focus:border-primary transition-smooth"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    className="bg-background/50 border-border focus:border-primary transition-smooth"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  className="bg-background/50 border-border focus:border-primary transition-smooth"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  placeholder="Project Collaboration" 
                  className="bg-background/50 border-border focus:border-primary transition-smooth"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..." 
                  rows={6}
                  className="bg-background/50 border-border focus:border-primary transition-smooth resize-none"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Contact Information</h3>
              {contactInfo.map((info) => (
                <Card 
                  key={info.label} 
                  className="card-gradient p-6 hover:shadow-card transition-smooth hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.label}</h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Follow Me</h3>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <Card 
                    key={social.label} 
                    className="card-gradient p-4 hover:shadow-card transition-smooth hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-lg">
                          <social.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{social.label}</h4>
                          <p className="text-sm text-muted-foreground">{social.username}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Follow
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Availability */}
            <Card className="card-gradient p-6 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h4 className="font-semibold">Available for Work</h4>
              </div>
              <p className="text-muted-foreground">
                I'm currently open to new opportunities and interesting projects. 
                Let's discuss how we can work together!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;