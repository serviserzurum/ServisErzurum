/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#0A0A0B] border-t border-[#2D2D30] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[#2D2D30]">
          
          {/* Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
            <span className="font-display font-black tracking-tighter text-lg uppercase text-white">
              SERVİS <span className="text-brand-red">ERZURUM</span>
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 font-bold uppercase">
              PEUGEOT & CITROËN ÖZEL SERVİS • MAHMUT USTA
            </span>
          </div>

          {/* Quick link anchors */}
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase font-mono tracking-widest font-bold text-zinc-400">
            <button 
              onClick={() => handleScroll('anasayfa')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Anasayfa
            </button>
            <button 
              onClick={() => handleScroll('hizmetler')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Hizmetler
            </button>
            <button 
              onClick={() => handleScroll('mahmut-usta')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mahmut Usta
            </button>
            <button 
              onClick={() => handleScroll('randevu')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Randevu Al
            </button>
            <button 
              onClick={() => handleScroll('iletisim')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Konum & İletişim
            </button>
          </div>

        </div>

        {/* Technical Disclaimers and Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
              © 2026 Servis Erzurum. Tüm hakları saklıdır.
            </p>
            <p className="text-[9px] text-zinc-650 leading-relaxed font-serif italic max-w-xl">
              * Peugeot ve Citroën logoları, Stellantis / PSA Group tescilli ticari markalarıdır. Servisimiz bağımsız bir özel teknik servistir.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] text-zinc-600 font-mono font-bold uppercase tracking-wider">
            <span>YAKUTİYE, ERZURUM</span>
            <Heart className="w-3 h-3 text-brand-red fill-brand-red/60" />
          </div>
        </div>

      </div>
    </footer>
  );
}
