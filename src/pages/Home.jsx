import { useEffect } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedIn from "../components/FeaturedIn"; // <-- 1. Import it here
import AboutSection from "../components/AboutSection";
import StatsSection from '../components/StatsSection';
import ServicesSection from "../components/ServicesSection";
import CoursesSection from "../components/CoursesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Nail the Sale with Ankit | Sales Coach & Trainer";
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main>
        <HeroSection />
        
        {/* 2. Place it right below the Hero! */}
        <FeaturedIn /> 
        
        <AboutSection />
        
        <StatsSection />
        
        <ServicesSection />
        
        <CoursesSection />
        
        <TestimonialsSection />
        
        <FAQSection />
        
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}