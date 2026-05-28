/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, CalendarRange, PhoneCall, Compass, ServerCrash, Wrench, Fuel, Cpu, Zap, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdminStore } from '../utils/adminStore';

/**
 * Interactive Real-Time Diagnostic Engine HUD Panel
 * Elevates the visual layout with high-fidelity, user-driven live interactions.
 */
function DiagnosticHUD() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [activeTab, setActiveTab] = useState<'status' | 'live' | 'logs'>('status');

  // Fluctuating Telemetry States
  const [engineTemp, setEngineTemp] = useState(90);
  const [oilPressure, setOilPressure] = useState(4.2);
  const [voltage, setVoltage] = useState(14.1);
  const [boostPressure, setBoostPressure] = useState(1.1);

  // Fluctuating values simulations
  useEffect(() => {
    const timer = setInterval(() => {
      setEngineTemp(prev => {
        const delta = (Math.random() - 0.5) * 1.5;
        const next = prev + delta;
        return next < 85 ? 85 : next > 95 ? 95 : parseFloat(next.toFixed(1));
      });
      setOilPressure(prev => {
        const delta = (Math.random() - 0.5) * 0.2;
        const next = prev + delta;
        return next < 3.8 ? 3.8 : next > 4.6 ? 4.6 : parseFloat(next.toFixed(2));
      });
      setVoltage(prev => {
        const delta = (Math.random() - 0.5) * 0.1;
        const next = prev + delta;
        return next < 13.6 ? 13.6 : next > 14.4 ? 14.4 : parseFloat(next.toFixed(2));
      });
      setBoostPressure(prev => {
        const delta = (Math.random() - 0.5) * 0.08;
        const next = prev + delta;
        return next < 0.9 ? 0.9 : next > 1.3 ? 1.3 : parseFloat(next.toFixed(2));
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const triggerDiagnosticScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 4;
      });
    }, 80);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full max-w-md mx-auto bg-zinc-950/90 border border-[#2D2D30] p-5 sm:p-6 shadow-[0_0_50px_rgba(225,29,72,0.15)] rounded-none flex flex-col justify-between overflow-hidden group"
    >
      {/* Decorative Red Laser light effects */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-80" />
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-red/15 transition-all duration-700" />
      
      {/* Subtle background tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2d30_1px,transparent_1px),linear-gradient(to_bottom,#2d2d30_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />

      {/* TOP HEADER STATUS */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#2D2D30]/80 pb-3">
        <div className="flex items-center gap-2 font-mono">
          <div className={`h-2 w-2 rounded-full ${isScanning ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          <span className="text-[10px] tracking-[0.15em] text-white uppercase font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-brand-red" />
            DIAGBOX v9.92 LIVE
          </span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 font-bold flex items-center gap-1.5 bg-[#111113] border border-[#2D2D30] px-2 py-0.5">
          {isScanning ? (
            <span className="text-brand-red uppercase tracking-wider animate-pulse font-mono">TARANIYOR %{scanProgress}</span>
          ) : (
            <span className="text-emerald-400 font-mono">DÜZELTİLDİ • SİSTEM OK</span>
          )}
        </div>
      </div>

      {/* COMPONENT TAB SELECTOR */}
      <div className="flex gap-1.5 border-b border-[#2D2D30]/60 py-2.5 z-10 font-mono text-[9px] font-black uppercase tracking-wider">
        <button 
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-1.5 px-2 text-center border transition-all cursor-pointer ${activeTab === 'status' ? 'bg-brand-red text-white border-brand-red' : 'bg-[#111113] border-[#2D2D30] text-zinc-400 hover:text-white'}`}
        >
          GENEL DURUM
        </button>
        <button 
          onClick={() => setActiveTab('live')}
          className={`flex-1 py-1.5 px-2 text-center border transition-all cursor-pointer ${activeTab === 'live' ? 'bg-brand-red text-white border-brand-red' : 'bg-[#111113] border-[#2D2D30] text-zinc-400 hover:text-white'}`}
        >
          CANLI SENSÖR
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          className={`flex-1 py-1.5 px-2 text-center border transition-all cursor-pointer ${activeTab === 'logs' ? 'bg-brand-red text-white border-brand-red' : 'bg-[#111113] border-[#2D2D30] text-zinc-400 hover:text-white'}`}
        >
          HATA LOGLARI
        </button>
      </div>

      {/* CENTRAL DIAGNOSTIC SCREEN CONTENT */}
      <div className="relative z-15 min-h-[170px] py-4 flex flex-col items-center justify-center select-none overflow-hidden">
        
        {/* Animated Scanning Laser Sweep Line Overlay */}
        {isScanning && (
          <motion.div 
            initial={{ y: -30 }}
            animate={{ y: 90 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[2px] bg-brand-red shadow-[0_0_12px_#E11D48] z-20 pointer-events-none"
          />
        )}

        {activeTab === 'status' && (
          <div className="w-full flex flex-col items-center">
            {/* SVG Car outline schema with localized engine nodes */}
            <div className="relative">
              <svg className={`w-52 h-24 transition-colors duration-500 ${isScanning ? 'text-brand-red animate-pulse' : 'text-zinc-650 hover:text-brand-red/35'}`} viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1">
                {/* Styled Peugeot/Citroën typical compact platform */}
                <path d="M8,33 L18,33 C18,33 21,29 25,29 C29,29 32,33 32,33 L68,33 C68,33 71,29 75,29 C79,29 82,33 82,33 L92,33 L90,26 L83,22 L72,20 L50,17 L28,21 L16,23 L10,26 Z" />
                {/* Wheels */}
                <circle cx="25" cy="33" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="75" cy="33" r="3.5" stroke="currentColor" strokeWidth="1.2" />

                {/* Simulated critical diagnostic point highlights */}
                <circle cx="21" cy="24" r="2.5" className={`${isScanning ? 'animate-ping text-brand-red' : 'text-emerald-500'}`} fill="currentColor" />
                <circle cx="50" cy="22" r="1.5" className={`${isScanning ? 'animate-ping text-indigo-400' : 'text-emerald-500'}`} fill="currentColor" />
              </svg>
              
              {/* Overlay glow */}
              <div className={`absolute top-1/2 left-8 -translate-y-1/2 w-8 h-8 rounded-full blur-md opacity-30 transition-colors ${isScanning ? 'bg-brand-red animate-pulse' : 'bg-emerald-500'}`} />
            </div>

            {/* Quick Stat Details grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-3 text-[10px] font-mono border-t border-[#2D2D30]/65 pt-3">
              <div className="flex items-center justify-between text-zinc-400">
                <span>PSA Motor Beyni EPC:</span>
                <span className={isScanning ? "text-amber-500" : "text-emerald-400 font-bold"}>
                  {isScanning ? "Taranıyor..." : "HATA YOK (OK)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>EAT8 Şanzıman Beyni:</span>
                <span className={isScanning ? "text-amber-500" : "text-emerald-400 font-bold"}>
                  {isScanning ? "Taranıyor..." : "STABİL"}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>AdBlue / Egzoz:</span>
                <span className="text-zinc-300">Emisyon Entegre</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Sistem Verimliliği:</span>
                <span className="text-emerald-400 font-bold">%100 AKTİF</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="w-full space-y-2.5 font-mono text-[10px]">
            {/* Live graphs */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Motor Sıcaklığı:</span>
                <strong className="text-brand-red font-bold font-mono">{engineTemp} °C</strong>
              </div>
              <div className="w-full bg-[#111113] h-2.5 border border-[#2D2D30] relative overflow-hidden">
                <div 
                  className="bg-brand-red h-full transition-all duration-300 shadow-[0_0_8px_#E11D48]"
                  style={{ width: `${(engineTemp / 110) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Yağ Basıncı (Canlı):</span>
                <strong className="text-orange-400 font-bold font-mono">{oilPressure} bar</strong>
              </div>
              <div className="w-full bg-[#111113] h-2.5 border border-[#2D2D30] relative overflow-hidden">
                <div 
                  className="bg-orange-400 h-full transition-all duration-350"
                  style={{ width: `${(oilPressure / 6) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Akü Voltajı (Alternatör):</span>
                <strong className="text-emerald-400 font-bold font-mono">{voltage} V</strong>
              </div>
              <div className="w-full bg-[#111113] h-2.5 border border-[#2D2D30] relative overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-400"
                  style={{ width: `${((voltage - 11) / 4) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Turbo Basıncı Boost:</span>
                <strong className="text-indigo-400 font-bold font-mono">{boostPressure} bar</strong>
              </div>
              <div className="w-full bg-[#111113] h-2.5 border border-[#2D2D30] relative overflow-hidden">
                <div 
                  className="bg-indigo-400 h-full transition-all duration-300"
                  style={{ width: `${(boostPressure / 2) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="w-full text-left font-mono text-[9px] text-zinc-400 space-y-1.5 bg-[#0A0A0B] p-3 border border-[#2D2D30]">
            {isScanning ? (
              <div className="space-y-1">
                <div className="text-amber-500 animate-pulse font-bold">&gt;&gt; PARAMETRELER GÜNCELLENİYOR ...</div>
                <div>&gt; Beyin protokolleri okunuyor...</div>
                <div>&gt; OBD2 hatası taranıyor: P0123, P1132, P0420</div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-emerald-400 font-bold">&gt;&gt; TARAMA BAŞARIYLA TAMAMLANDI</div>
                <div className="text-zinc-500">&gt; Kayıtlı eski DTC kodları temizlendi.</div>
                <div>&gt; Akış sensörü (MAF) kalibre edildi.</div>
                <div>&gt; FAP Rejenerasyonu Durumu: AKTİF (%0 Tıkanma)</div>
                <div className="text-zinc-500">&gt; Diagbox 28.05.2026 Otomatik Log Temizliği: OK</div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* FOOTER SERVICE SELECTION AND TRIGGER BUTTON */}
      <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-[#2D2D30] pt-3.5 mt-2">
        
        {/* Launch test button */}
        <button
          onClick={triggerDiagnosticScan}
          disabled={isScanning}
          className="py-2.5 bg-[#111113] border border-[#2D2D30] hover:border-brand-red hover:bg-brand-red/10 text-white font-mono font-bold uppercase text-[9px] tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 text-brand-red ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'TEST OLUYOR...' : 'SİSTEMİ TARA'}
        </button>

        {/* Action item info */}
        <div className="bg-[#0A0A0B] border border-[#2D2D30] p-1.5 px-3 flex flex-col justify-center text-left">
          <span className="block text-[8px] text-zinc-550 font-bold uppercase tracking-widest leading-none mb-1">USTA YORUMU</span>
          <span className="block text-[9px] text-zinc-300 font-serif italic max-w-full truncate leading-tight">
            {isScanning ? "Sensor verisi okunuyor..." : "Motor ve vites kusursuz"}
          </span>
        </div>

      </div>

    </motion.div>
  );
}

export default function Hero() {
  const { settings } = useAdminStore();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="anasayfa" className="relative w-full overflow-hidden bg-[#0A0A0B] py-16 md:py-24 border-b border-[#2D2D30]">
      
      {/* Absolute Subtle Editorial Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-red/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 left-12 w-[300px] h-[300px] bg-zinc-650/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogan & Conversion Panel (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111113] border border-[#2D2D30] text-brand-red font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              PEUGEOT & CITROËN UZMANI
            </motion.div>

            {/* Giant Bold H1 matching signboard typography styles */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter leading-[1.05] text-white"
            >
              SERVİS <span className="text-brand-red">ERZURUM</span>
              <span className="block text-2xl sm:text-3xl md:text-3.5xl mt-3 text-zinc-300 font-serif italic font-light tracking-tight leading-tight">
                Mükemmel onarım, orijinal standartlar &bull; Mahmut Usta
              </span>
            </motion.h1>

            {/* Sub-explanation */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base text-zinc-400 font-serif font-normal leading-relaxed max-w-xl italic"
            >
              Yeni Sanayi Sitesi'nde <strong className="text-zinc-100 font-medium font-sans not-italic">Mahmut Usta</strong> liderliğinde Peugeot ve Citroën araçlarınız için orijinal standartlarda özel teknik servis hizmeti. Teknolojik cihazlar ile nokta atışı bilgisayarlı arıza tespiti.
            </motion.p>

            {/* Quick Stat Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg pt-2 font-mono"
            >
              <div className="bg-[#111113] border border-[#2D2D30] p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-brand-red font-display leading-none">15+</div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-zinc-500 mt-1.5 font-bold">Yıllık Tecrübe</div>
              </div>
              <div className="bg-[#111113] border border-[#2D2D30] p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white font-display leading-none">100%</div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-zinc-500 mt-1.5 font-bold">Garantili Parça</div>
              </div>
              <div className="bg-[#111113] border border-[#2D2D30] p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white font-display leading-none">PSA</div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-zinc-500 mt-1.5 font-bold">Orijinal Cihaz</div>
              </div>
            </motion.div>

            {/* Direct Multi-CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4"
            >
              <button
                onClick={() => handleScroll('randevu')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-brand-red hover:bg-brand-red-dark text-white text-xs uppercase tracking-widest font-mono font-bold hover:shadow-lg hover:shadow-brand-red/10 active:scale-95 transition-all cursor-pointer"
              >
                <CalendarRange className="w-4 h-4" />
                Hızlı Randevu Al
              </button>
              
              <a 
                href={`tel:${settings.displayPhone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#111113] border border-[#2D2D30] hover:border-zinc-700 text-zinc-100 hover:bg-[#1A1A1C] text-xs uppercase tracking-widest font-mono font-bold active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-brand-red" />
                {settings.displayPhone}
              </a>

              <button
                onClick={() => handleScroll('iletisim')}
                className="flex items-center justify-center gap-1.5 px-4 py-4 text-zinc-400 hover:text-white text-xs font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-zinc-500" />
                Konum Al
              </button>
            </motion.div>

          </div>

          {/* Interactive Mechanical Diagnostic HUD (Col 5) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <DiagnosticHUD />
          </div>

        </div>
      </div>
    </section>
  );
}
