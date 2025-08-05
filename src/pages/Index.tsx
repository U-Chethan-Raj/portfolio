
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import CV from "@/components/CV";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { AdminLogin } from "@/components/AdminLogin";

const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="home">
        <Hero />
        <About />
        <Projects />
        <CV />
        <Contact />
      </main>
      <Footer onAdminClick={() => setShowAdminLogin(true)} />
      
      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={() => setIsAdminLoggedIn(true)}
      />
    </div>
  );
};

export default Index;
