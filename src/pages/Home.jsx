import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServiceCards from "../components/ServiceCards";
import DeliveryTracking from "../components/DeliveryTracking";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>
      

      {/* Services Section */}
      <div id="services">
        <ServiceCards />
      </div>

      {/* Delivery Tracking Section */}
      <DeliveryTracking />

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;