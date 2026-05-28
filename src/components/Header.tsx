/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Clock, MapPin, Menu, X, Hammer, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdminStore } from '../utils/adminStore';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export default function Header({ onOpenAdmin }: HeaderProps) {
  const { settings } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);
  const [shopStatus, setShopStatus] = useState({ isOpen: true, message: 'Yükleniyor...' });

  useEffect(() => {
    const checkStatus = () => {
      // Get Turkey Time (UTC+3)
      const date = new Date();
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      const turkeyTime = new Date(utc + (3600000 * 3));
      
      const day = turkeyTime.getDay(); // 0: Sun, 1: Mon, ... 6: Sat
      const hour = turkeyTime.getHours();
      const minute = turkeyTime.getMinutes();
      const timeDecimal = hour + minute / 60;

      if (day === 0) {
        // Sunday
        setShopStatus({ isOpen: false, message: 'Kapalı • Yarın 08:30\'da Açılacak' });
      } else {
        // Monday-Saturday, 08:30 - 18:30
        if (timeDecimal >= 8.5 && timeDecimal < 18.5) {
          setShopStatus({ isOpen: true, message: 'Şu an Açık • Mahmut Usta Hizmetinizde' });
        } else {
          const nextOpen = day === 6 ? 'Pazartesi 08:30' : 'Yarın 08:30';
          setShopStatus({ isOpen: false, message: `Kapalı • Servisimiz ${nextOpen}'da Açılacak` });
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedLogo = () => {
    const logoText = settings.logoName || "SERVİS ERZURUM";
    const parts = logoText.split(' ');
    if (parts.length > 1) {
      return (
        <span className="font-display font-black tracking-tighter text-2xl leading-none uppercase text-white">
          {parts[0]} <span className="text-brand-red">{parts.slice(1).join(' ')}</span>
        </span>
      );
    }
    return (
      <span className="font-display font-black tracking-tighter text-2xl leading-none uppercase text-white">
        {logoText}
      </span>
    );
  };

  const cleanWhatsappNum = settings.whatsappNumber.replace(/\D/g, '');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[#2D2D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand/Logo Section */}
          <div className="flex items-center gap-3">
            {/* Custom Brand Logos (Vibrant inline Red/Silver SVGs) */}
            <div className="flex items-center gap-1.5 bg-[#111113] border border-[#2D2D30] p-2 rounded-lg">
              {/* Citroën logo vector */}
              <svg className="w-6 h-6 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2L5.5,8.5L7.5,10.5L12,6L16.5,10.5L18.5,8.5L12,2M12,10L5.5,16.5L7.5,18.5L12,14L16.5,18.5L18.5,16.5L12,10Z" />
              </svg>
              {/* Vertical divider */}
              <div className="h-5 w-[1px] bg-zinc-700" />
              {/* Peugeot logo emblem */}
              <svg className="w-6 h-6 text-brand-red" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12C20 13.5 19.5 14.8 18.7 16L17.5 13.5C18.2 12 17.5 10 16 9.5C14.5 9 12.5 10 11.5 11.5L10 9L8 10.5L9.5 13.5C8 14 7 15.5 7.5 17.5L8.5 19.5C5.8 18 4 15.2 4 12A8 8 0 0 1 12 4M12.5 6A1.5 1.5 0 0 0 11 7.5A1.5 1.5 0 0 0 12.5 9A1.5 1.5 0 0 0 14 7.5A1.5 1.5 0 0 0 12.5 6M12 12.5A1.5 1.5 0 0 0 10.5 14A1.5 1.5 0 0 0 12 15.5A1.5 1.5 0 0 0 13.5 14A1.5 1.5 0 0 0 12 12.5Z" />
              </svg>
            </div>
            
            <div className="flex flex-col text-left">
              {formattedLogo()}
              <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 font-bold uppercase mt-0.5">
                Peugeot & Citroën Özel Servis
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleScroll('anasayfa')}
              className="text-[11px] uppercase tracking-widest font-mono text-zinc-400 hover:text-white hover:border-b hover:border-brand-red pb-1 transition-all cursor-pointer"
            >
              Anasayfa
            </button>
            <button 
              onClick={() => handleScroll('hizmetler')}
              className="text-[11px] uppercase tracking-widest font-mono text-zinc-400 hover:text-white hover:border-b hover:border-brand-red pb-1 transition-all cursor-pointer"
            >
              Hizmetlerimiz
            </button>
            <button 
              onClick={() => handleScroll('kampanyalar')}
              className="text-[11px] uppercase tracking-widest font-mono text-zinc-405 hover:text-white hover:border-b hover:border-brand-red pb-1 transition-all cursor-pointer"
            >
              Kampanyalar
            </button>
            <button 
              onClick={() => handleScroll('mahmut-usta')}
              className="text-[11px] uppercase tracking-widest font-mono text-zinc-405 hover:text-white hover:border-b hover:border-brand-red pb-1 transition-all cursor-pointer"
            >
              Usta Hakkında
            </button>
            <button 
              onClick={() => handleScroll('iletisim')}
              className="text-[11px] uppercase tracking-widest font-mono text-zinc-405 hover:text-white hover:border-b hover:border-brand-red pb-1 transition-all cursor-pointer"
            >
              İletişim
            </button>
          </nav>

          {/* Live Shop Hours Status Indicator (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${shopStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${shopStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400">
              {shopStatus.message}
            </span>
          </div>

          {/* Desktop Call/WhatsApp Quick Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111113] hover:bg-brand-red/10 border border-[#2D2D30] hover:border-brand-red/45 rounded text-[11px] tracking-wider font-mono font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Yönetici Portalı Girişi"
            >
              <Lock className="w-3.5 h-3.5 text-brand-red" />
              Usta Girişi
            </button>

            <a 
              href={`tel:${settings.displayPhone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111113] border border-[#2D2D30] rounded text-[11px] tracking-wider font-mono font-semibold text-zinc-100 hover:bg-[#1A1A1C] transition-all"
            >
              <Phone className="w-3 h-3 text-brand-red" />
              {settings.displayPhone}
            </a>

            <a 
              href={`https://wa.me/${cleanWhatsappNum}?text=${encodeURIComponent("Merhaba Mahmut Usta, aracımın periyodik bakımı ve kontrolleri hakkında bilgi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-red hover:bg-brand-red-dark text-white rounded text-xs tracking-wider font-mono font-bold hover:shadow-lg hover:shadow-brand-red/10 active:scale-95 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center md:hidden gap-3">
            {/* Dynamic Status Light on Mobile header bar */}
            <div className={`p-1 bg-[#111113] border border-[#2D2D30] rounded-full flex items-center justify-center`}>
              <div className={`h-2.5 w-2.5 rounded-full ${shopStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-[#111113] rounded transition-colors cursor-pointer"
              aria-label="Menü"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#2D2D30] bg-[#0A0A0B] px-4 pt-2 pb-6 space-y-3"
          >
            {/* Live Message on Mobile Menu */}
            <div className="flex items-center gap-2 p-3 bg-[#111113] border border-[#2D2D30] rounded-lg">
              <Clock className={`w-4 h-4 ${shopStatus.isOpen ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="text-xs font-mono font-medium text-zinc-300">
                {shopStatus.message}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1 text-left">
              <button
                onClick={() => handleScroll('anasayfa')}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-widest font-mono font-bold rounded hover:bg-[#111113] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Anasayfa
              </button>
              <button
                onClick={() => handleScroll('hizmetler')}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-widest font-mono font-bold rounded hover:bg-[#111113] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Hizmetlerimiz
              </button>
              <button
                onClick={() => handleScroll('kampanyalar')}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-widest font-mono font-bold rounded hover:bg-[#111113] text-zinc-404 hover:text-white transition-colors cursor-pointer"
              >
                Aktif Kampanyalar
              </button>
              <button
                onClick={() => handleScroll('mahmut-usta')}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-widest font-mono font-bold rounded hover:bg-[#111113] text-zinc-404 hover:text-white transition-colors cursor-pointer"
              >
                Usta Hakkında
              </button>
              <button
                onClick={() => handleScroll('iletisim')}
                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-widest font-mono font-bold rounded hover:bg-[#111113] text-zinc-404 hover:text-white transition-colors cursor-pointer"
              >
                İletişim & Konum
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a 
                href={`tel:${settings.displayPhone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 bg-[#111113] border border-[#2D2D30] rounded text-xs font-bold text-zinc-100 hover:bg-zinc-805 transition-all font-mono"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                Ara: {settings.displayPhone}
              </a>
              <a 
                href={`https://wa.me/${cleanWhatsappNum}?text=${encodeURIComponent("Merhaba Mahmut Usta, aracımın periyodik bakımı ve kontrolleri hakkında bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {/* Mobile login panel trigger */}
            <div className="pt-2">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0A0A0B] border border-[#2D2D30] hover:border-brand-red rounded text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-brand-red" />
                MAHMUT USTA GİRİŞİ (YÖNETİM)
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-1.5 pt-3 text-[11px] text-zinc-500 font-medium font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              {settings.addressText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
