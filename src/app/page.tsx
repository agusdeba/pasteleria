'use client';

import ProductGallery from '@/components/ProductGallery';
import ContactSection from '@/components/ContactSection';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar onNavigate={scrollToSection} />
      <HeroSection onNavigate={scrollToSection} />
      <AboutSection />
      <ProductGallery />
      <ContactSection />
      <Footer />
    </main>
  );
}
