/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesPanel from './components/ServicesPanel';
import CampaignsPanel from './components/CampaignsPanel';
import BookingSystem from './components/BookingSystem';
import MasterSection from './components/MasterSection';
import ContactAndInfo from './components/ContactAndInfo';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    // Smooth scroll to appointment section
    const bookingSection = document.getElementById('randevu');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCampaign = (title: string, notes: string) => {
    // Map campaign to service category or set its title directly
    setSelectedService(title);
    
    // Smooth scroll to booking system section
    const bookingSection = document.getElementById('randevu');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-red selection:text-white">
      {/* 1. Header Navigation */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 2. Main Hero Banner */}
      <Hero />

      {/* 3. Catalog of Detailed Services */}
      <ServicesPanel onSelectService={handleSelectService} />

      {/* 4. Active Offers and Campaigns */}
      <CampaignsPanel onSelectCampaign={handleSelectCampaign} />

      {/* 5. Interactive Booking & Estimator (WhatsApp direct messaging backend) */}
      <BookingSystem selectedServiceFromProps={selectedService} />

      {/* 6. Traditional Local Hospitality Profile - Mahmut Usta */}
      <MasterSection />

      {/* 7. Location Maps, Reviews & FAQs Accordion Section */}
      <ContactAndInfo />

      {/* 8. Footer Bar & Disclaimer */}
      <Footer />

      {/* 9. Secured Administration Console overlay */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
