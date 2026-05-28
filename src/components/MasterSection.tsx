/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Shield, Award, Users, Coffee, Wrench, Sparkles, Smile, MessageSquare, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useAdminStore } from '../utils/adminStore';

export default function MasterSection() {
  const { settings } = useAdminStore();

  return (
    <section id="mahmut-usta" className="w-full py-20 bg-[#0C0C0E] border-b border-[#2D2D30] relative">
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Representative Card of Mahmut Usta (Col 5) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-none border border-[#2D2D30] bg-[#111113] p-6 shadow-xl overflow-hidden"
            >
              {/* Volcanic ambient red spotlight overlay inside card */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
 
              <div className="space-y-6">
                
                {/* Visual Header featuring custom smiling Turkish Mechanic Master Illustration */}
                <div className="flex items-center gap-4">
                  
                  {/* Stylized master mechanic face vector illustration */}
                  <div className="w-18 h-18 bg-[#0A0A0B] border border-brand-red rounded-none flex items-center justify-center text-brand-red shrink-0 relative overflow-hidden group">
                    <svg className="w-14 h-14 text-zinc-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Face Skin background */}
                      <path d="M32 44C39.732 44 46 37.732 46 30C46 22.268 39.732 16 32 16C24.268 16 18 22.268 18 30C18 37.732 24.268 44 32 44Z" fill="#2D2D2E" stroke="#E11D48" strokeWidth="2"/>
                      {/* Cap / Hat of Mechanic */}
                      <path d="M16 20C18 10 26 8 32 8C38 8 46 10 48 20L52 23L12 23L16 20Z" fill="#E11D48" />
                      {/* Cap Visor */}
                      <path d="M12 23C12 23 20 25 32 25C44 25 52 23 52 23L50 20H14L12 23Z" fill="#881337" />
                      {/* Eyes */}
                      <circle cx="27" cy="29" r="2.5" fill="#FFFFFF"/>
                      <circle cx="27" cy="29" r="1" fill="#000000"/>
                      <circle cx="37" cy="29" r="2.5" fill="#FFFFFF"/>
                      <circle cx="37" cy="29" r="1" fill="#000000"/>
                      {/* Friendly Turkish Master Mustache (Pala bıyık) */}
                      <path d="M21 34C24 33 27 34 32 36C37 34 40 33 43 34C46 35 45 39 41 38C37 37 34 38 32 42C30 38 27 37 23 38C19 39 18 35 21 34Z" fill="#0C0C0E" stroke="#71717A" strokeWidth="1"/>
                      {/* Cheerful smiling mouth line underneath mustache */}
                      <path d="M29 39C29 40.5 30.5 41 32 41C33.5 41 35 40.5 35 39" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Ears */}
                      <path d="M18 28C16.5 28 16 29 16 30C16 31 16.5 32 18 32" stroke="#E11D48" strokeWidth="2" strokeLinecap="round"/>
                      {/* Right Ear */}
                      <path d="M46 28C47.5 28 48 29 48 30C48 31 47.5 32 46 32" stroke="#E11D48" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {/* Tiny wrench badge overlay */}
                    <div className="absolute bottom-0 right-0 bg-brand-red p-0.5 text-white">
                      <Wrench className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-display tracking-tight text-white uppercase flex items-center gap-1.5">
                      Mahmut EMEÇ
                    </h3>
                    <p className="text-[10px] font-mono font-bold uppercase text-brand-red flex items-center gap-1">
                      <span>Mahmut Usta • Servis Sahibi</span>
                    </p>
                  </div>
                </div>
 
                {/* Mechanic Slogan Quote (Muted & editable) */}
                <div className="relative pl-4 border-l-2 border-brand-red py-2.5 bg-[#0A0A0B] p-4 rounded-none border border-[#2D2D30] border-l-brand-red">
                  {/* Quote decoration */}
                  <Quote className="absolute top-2 right-2 w-7 h-7 text-[#261014] select-none pointer-events-none" />
                  
                  <div className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-brand-red" />
                    <span>Ustadan Doğrudan Mesaj:</span>
                  </div>
                  <p className="text-xs italic font-serif text-zinc-300 leading-relaxed relative z-10">
                    {settings.mahmutUstaQuote}
                  </p>
                </div>
 
                {/* Local Authentic Sanayi Touchpoints Panel */}
                <div className="grid grid-cols-2 gap-3.5 text-xs font-mono">
                  
                  <div className="p-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none space-y-1">
                    <div className="flex items-center gap-1.5 text-brand-red font-bold text-[10px] uppercase">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>Sıcak Çay</span>
                    </div>
                    <p className="text-[11px] text-zinc-450 leading-normal font-sans">
                      Randevunuz esnasında ofisimizde taze çayınız her an hazır.
                    </p>
                  </div>
 
                  <div className="p-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none space-y-1">
                    <div className="flex items-center gap-1.5 text-brand-red font-bold text-[10px] uppercase">
                      <Smile className="w-3.5 h-3.5" />
                      <span>Dürüst Esnaf</span>
                    </div>
                    <p className="text-[11px] text-zinc-455 leading-normal font-sans">
                      Sadece gerekli tamiratları yapar, bütçenizi koruruz.
                    </p>
                  </div>
 
                </div>
 
                {/* PSA Group specialized certifications badge strip */}
                <div className="pt-2.5 border-t border-[#2D2D30] flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500">
                  <span>UZMANLIK ALANI:</span>
                  <span className="text-zinc-200 font-bold bg-[#0A0A0B] border border-[#2D2D30] px-2.5 py-1 rounded-none">PEUGEOT & CITROËN</span>
                </div>
 
              </div>
            </motion.div>
          </div>
 
          {/* Slogan and Text (Col 7) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
            <div className="text-brand-red text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              {settings.mahmutUstaSlogan}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter text-white uppercase leading-tight">
              MAHMUT USTA KİMDİR?
            </h2>
 
            <div className="space-y-4 text-zinc-400 font-serif italic text-sm sm:text-base leading-relaxed">
              <p>
                {settings.aboutText1}
              </p>
              <p>
                {settings.aboutText2}
              </p>
            </div>
 
            {/* Core Values Bullet points with dynamic micro cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-brand-red shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-zinc-100 uppercase tracking-widest">Şeffaf Hesap Sunumu</h4>
                  <p className="text-[11px] font-serif text-zinc-450 leading-normal mt-0.5">Sürpriz ek maliyetler çıkarılmadan, sökülen eski parçaları size göstererek teslim ederiz.</p>
                </div>
              </div>
 
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-brand-red shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-zinc-100 uppercase tracking-widest">Gelişmiş Teknolojik Altyapı</h4>
                  <p className="text-[11px] font-serif text-zinc-450 leading-normal mt-0.5">Orijinal Diagbox test cihazları ile Peugeot ve Citroën araçlarınız için fabrikasyon hassasiyetinde hata okuma yapıyoruz.</p>
                </div>
              </div>
            </div>
 
          </div>
 
        </div>
      </div>
    </section>
  );
}
