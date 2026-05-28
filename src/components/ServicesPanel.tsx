/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { Wrench, Cpu, ShieldAlert, Settings, Workflow, Package, Check, Clock3, Tag, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Wrench': return <Wrench className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Settings': return <Settings className={className} />;
    case 'Workflow': return <Workflow className={className} />;
    case 'Package': return <Package className={className} />;
    default: return <Wrench className={className} />;
  }
};

interface ServicesPanelProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesPanel({ onSelectService }: ServicesPanelProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'wizard'>('catalog');
  const [expandedId, setExpandedId] = useState<string | null>('periyodik-bakim');

  // Estimator States
  const [carType, setCarType] = useState<'binek' | 'ticari'>('binek');
  const [oilGrade, setOilGrade] = useState<'standard' | 'original' | 'premium'>('original');
  const [includeOilFilter, setIncludeOilFilter] = useState(true);
  const [includeAirFilter, setIncludeAirFilter] = useState(true);
  const [includePollenFilter, setIncludePollenFilter] = useState(true);
  const [includeFuelFilter, setIncludeFuelFilter] = useState(false);
  const [includeSparkPlugs, setIncludeSparkPlugs] = useState(false);
  const [includeDiagnostics, setIncludeDiagnostics] = useState(true);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleBookService = (serviceTitle: string) => {
    onSelectService(serviceTitle);
    const bookingSection = document.getElementById('randevu');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cost calculation engine
  const calcCosts = () => {
    // base labor
    const labor = carType === 'binek' ? 900 : 1200;
    
    // oil cost
    let oilCost = 1400; // standard
    if (oilGrade === 'original') oilCost = 1950; // Total PSA Ineo
    if (oilGrade === 'premium') oilCost = 2400;  // Motul Specific PSA

    // filter costs
    const oilFilterCost = includeOilFilter ? 350 : 0;
    const airFilterCost = includeAirFilter ? 480 : 0;
    const pollenFilterCost = includePollenFilter ? 420 : 0;
    const fuelFilterCost = includeFuelFilter ? 850 : 0;
    const sparkPlugCost = includeSparkPlugs ? 900 : 0;
    const diagnosticsCost = 0; // default free with maintenance

    const partsTotal = oilCost + oilFilterCost + airFilterCost + pollenFilterCost + fuelFilterCost + sparkPlugCost;
    const subTotal = labor + partsTotal;
    
    // apply promo 10%
    const discountedTotal = Math.round(subTotal * 0.9);
    const savings = subTotal - discountedTotal;

    return {
      labor,
      oilCost,
      partsTotal,
      subTotal,
      discountedTotal,
      savings
    };
  };

  const costs = calcCosts();

  const handleBookCustomKit = () => {
    // Format custom kit summary message
    const oilLabel = oilGrade === 'original' ? 'PSA Orijinal Total 5W30/0W30' : oilGrade === 'premium' ? 'Motul PSA Specific 0W30' : 'Standart PSA 5W30';
    const partsArray = [
      includeOilFilter && 'Yağ Filtresi',
      includeAirFilter && 'Hava Filtresi',
      includePollenFilter && 'Polen Filtresi',
      includeFuelFilter && 'Mazot/Benzin Filtresi',
      includeSparkPlugs && 'Buji Seti',
    ].filter(Boolean);

    const customNotes = `Hesaplayıcı Özel Paket: [Araç: ${carType.toUpperCase()}], [Yağ: ${oilLabel}], [Parçalar: ${partsArray.join(', ')}], [Tahmini Net Tutar: ${costs.discountedTotal} TL]`;
    
    // Set selected service to the custom package name
    onSelectService(`Özel Paket (${costs.discountedTotal} TL)`);
    
    // Auto populate custom notes or focus appointment
    const bookingNotesField = document.getElementsByName('notes')[0] as HTMLTextAreaElement;
    if (bookingNotesField) {
      bookingNotesField.value = `${customNotes}. İnternete özel indirimli fiyat ile randevu oluşturmak istiyorum.`;
    }

    const bookingSection = document.getElementById('randevu');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hizmetler" className="w-full py-20 bg-[#0C0C0E] border-b border-[#2D2D30] relative">
      <div className="absolute top-1/2 left-10 w-[200px] h-[200px] bg-brand-red/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-brand-red text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1">
            NELER YAPIYORUZ?
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter text-white uppercase">
            UZMAN HİZMETLERİMİZ
          </h2>
          <p className="text-zinc-400 font-serif italic text-sm sm:text-base leading-relaxed">
            Aracınızın motor sağlığından elektrik tesisatına kadar tüm bakım ve onarım işlemlerini Peugeot ve Citroën orijinal standartlarına uygun uyguluyoruz.
          </p>
        </div>

        {/* Tab System Toggles */}
        <div className="flex items-center justify-center gap-3 max-w-lg mx-auto mb-12 border-b border-[#2D2D30] pb-6 font-mono text-[10.5px]">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-3 px-6 transition-all flex items-center gap-2 border cursor-pointer font-bold uppercase tracking-wider ${activeTab === 'catalog' ? 'bg-brand-red text-white border-brand-red' : 'bg-[#111113] border-[#2D2D30] text-zinc-400 hover:text-white'}`}
          >
            <Settings className="w-4 h-4 text-brand-red" />
            HİZMET KATALOĞU
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`py-3 px-6 transition-all flex items-center gap-2 border cursor-pointer font-bold uppercase tracking-wider relative ${activeTab === 'wizard' ? 'bg-brand-red text-white border-brand-red' : 'bg-[#111113] border-[#2D2D30] text-zinc-400 hover:text-white'}`}
          >
            <Cpu className="w-4 h-4 text-brand-red" />
            BAKIM HESAPLAMA SİHİRBAZI
            {/* Pulsing Active indicator */}
            <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-[8px] text-zinc-950 font-black px-1.5 py-0.5 rounded-sm animate-bounce">
              YENİ
            </span>
          </button>
        </div>

        {/* Tab views with animations */}
        <AnimatePresence mode="wait">
          {activeTab === 'catalog' ? (
            <motion.div
              key="catalog-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SERVICES.map((service, index) => {
                const isExpanded = expandedId === service.id;
                return (
                  <motion.div
                    key={service.id}
                    layout="position"
                    className={`flex flex-col bg-[#111113] border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-brand-red ring-1 ring-brand-red/20 shadow-xl' : 'border-[#2D2D30] hover:border-zinc-700'}`}
                  >
                    {/* Header click-expand triggers */}
                    <div 
                      onClick={() => toggleExpand(service.id)}
                      className="p-6 flex flex-col justify-between cursor-pointer select-none group min-h-[140px]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="p-3 bg-[#0A0A0B] border border-[#2D2D30] group-hover:bg-brand-red/5 group-hover:border-brand-red/30 transition-all text-brand-red">
                          <IconComponent name={service.iconName} className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>
                        <span className="p-1 px-2.5 rounded-sm bg-[#0A0A0B] border border-[#2D2D30] group-hover:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h3 className="text-lg font-bold font-display tracking-tight text-white group-hover:text-brand-red transition-colors uppercase">
                          {service.title}
                        </h3>
                        <p className="text-zinc-400 font-serif text-[12px] italic mt-1.5 leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Info Badges Strip */}
                    <div className="px-6 py-3 bg-[#0A0A0B] border-y border-[#2D2D30] flex items-center justify-between text-[10px] font-mono font-bold text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Clock3 className="w-3.5 h-3.5 text-brand-red/80" />
                        <span>Süre: <strong className="text-zinc-200 font-sans">{service.averageTime}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-zinc-350">Ort: <strong className="text-emerald-400">{service.estimatedPriceRange}</strong></span>
                      </div>
                    </div>

                    {/* Expanded Details Panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden bg-[#0C0C0E]/50 border-t border-[#2D2D30]"
                        >
                          <div className="p-6 space-y-4">
                            <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
                              NELERİ KAPSIYOR / DETAYLAR
                            </div>
                            <ul className="grid grid-cols-1 gap-2.5">
                              {service.features.map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                                  <span className="p-0.5 bg-brand-red/10 border border-brand-red/25 text-brand-red mt-0.5 shrink-0">
                                    <Check className="w-3 h-3" />
                                  </span>
                                  <span className="font-serif italic text-zinc-300">{feature}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="pt-3 border-t border-[#2D2D30]">
                              <button
                                onClick={() => handleBookService(service.title)}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs uppercase tracking-widest font-mono font-bold transition-all active:scale-98 cursor-pointer"
                              >
                                <Calendar className="w-3.5 h-3.5" />
                                İşlem Randevusu Al
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="wizard-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#111113] border border-[#2D2D30] p-6 sm:p-8"
            >
              {/* Controls Panel (Col 7) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display tracking-tight text-white uppercase flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-brand-red" />
                    KENDİ BAKIM SEPETİNİ OLUŞTUR
                  </h3>
                  <p className="text-zinc-400 font-serif italic text-xs sm:text-sm mt-1">
                    Aracınızın motor tipine ve parça ihtiyaçlarına uygun olarak gerçek zamanlı özel fiyat paketi çıkartın.
                  </p>
                </div>

                {/* 1. Vehicle Platform Selection */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Sıra 1: Araç Sınıfı ve İşçilik Çeşidi
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCarType('binek')}
                      className={`py-3 px-4 border text-left font-mono transition-all cursor-pointer ${carType === 'binek' ? 'bg-brand-red/10 border-brand-red text-white' : 'bg-[#0A0A0B] border-[#2D2D30] text-zinc-400 hover:border-zinc-700'}`}
                    >
                      <strong className="block text-xs uppercase font-sans">Binek Araç</strong>
                      <span className="text-[9px] text-zinc-500">208, 301, 308, C3, C-Elysée ($900 TL İşçilik)</span>
                    </button>
                    <button
                      onClick={() => setCarType('ticari')}
                      className={`py-3 px-4 border text-left font-mono transition-all cursor-pointer ${carType === 'ticari' ? 'bg-brand-red/10 border-brand-red text-white' : 'bg-[#0A0A0B] border-[#2D2D30] text-zinc-400 hover:border-zinc-700'}`}
                    >
                      <strong className="block text-xs uppercase font-sans">SUV & Hafif Ticari</strong>
                      <span className="text-[9px] text-zinc-500">3008, 5008, Partner, Berlingo ($1200 TL İşçilik)</span>
                    </button>
                  </div>
                </div>

                {/* 2. Engine Oil Selection */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Sıra 2: Premium Motor Yağı Vizkozitesi (4 Litre)
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <button
                      onClick={() => setOilGrade('standard')}
                      className={`p-3 border transition-all cursor-pointer flex flex-col justify-between h-24 ${oilGrade === 'standard' ? 'bg-brand-red/15 border-brand-red text-white' : 'bg-[#0A0A0B] border-[#2D2D30] text-zinc-400 hover:border-zinc-700'}`}
                    >
                      <span className="font-bold">PSA Standart Yağ</span>
                      <span className="text-zinc-300 font-sans my-1 font-bold">1.400 TL</span>
                      <span className="text-[8px] text-zinc-505">Viskozite 5W-30</span>
                    </button>
                    <button
                      onClick={() => setOilGrade('original')}
                      className={`p-3 border transition-all cursor-pointer flex flex-col justify-between h-24 ${oilGrade === 'original' ? 'bg-brand-red/15 border-brand-red text-white' : 'bg-[#0A0A0B] border-[#2D2D30] text-zinc-400 hover:border-zinc-700'}`}
                    >
                      <span className="font-bold text-brand-red">TOTAL QUARTZ</span>
                      <span className="text-zinc-300 font-sans my-1 font-bold">1.950 TL</span>
                      <span className="text-[8px] text-zinc-505">PSA Fabrika Çıkış</span>
                    </button>
                    <button
                      onClick={() => setOilGrade('premium')}
                      className={`p-3 border transition-all cursor-pointer flex flex-col justify-between h-24 ${oilGrade === 'premium' ? 'bg-brand-red/15 border-brand-red text-white' : 'bg-[#0A0A0B] border-[#2D2D30] text-zinc-400 hover:border-zinc-700'}`}
                    >
                      <span className="font-bold">MOTUL SPECIFIC</span>
                      <span className="text-zinc-300 font-sans my-1 font-bold">2.400 TL</span>
                      <span className="text-[8px] text-zinc-505">0W-30 Euro 6 Sınıfı</span>
                    </button>
                  </div>
                </div>

                {/* 3. Filter Options Selection */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Sıra 3: Parçalar (İstediğinizi Çıkarıp Ekleyin)
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    
                    {/* Yağ Filtresi */}
                    <div 
                      onClick={() => setIncludeOilFilter(!includeOilFilter)}
                      className={`p-3 border flex items-center justify-between cursor-pointer select-none transition-all ${includeOilFilter ? 'bg-[#0A0A0B] border-brand-red text-white' : 'bg-[#0A0A0B]/30 border-[#2D2D30] text-zinc-500'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-sm border flex items-center justify-center text-[10px] ${includeOilFilter ? 'border-brand-red bg-brand-red text-white' : 'border-[#2D2D30]'}`}>✓</span>
                        <span>Yağ Filtresi</span>
                      </div>
                      <span className="font-sans font-bold text-zinc-300">+350 TL</span>
                    </div>

                    {/* Hava Filtresi */}
                    <div 
                      onClick={() => setIncludeAirFilter(!includeAirFilter)}
                      className={`p-3 border flex items-center justify-between cursor-pointer select-none transition-all ${includeAirFilter ? 'bg-[#0A0A0B] border-brand-red text-white' : 'bg-[#0A0A0B]/30 border-[#2D2D30] text-zinc-500'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-sm border flex items-center justify-center text-[10px] ${includeAirFilter ? 'border-brand-red bg-brand-red text-white' : 'border-[#2D2D30]'}`}>✓</span>
                        <span>Motor Hava Filtresi</span>
                      </div>
                      <span className="font-sans font-bold text-zinc-300">+480 TL</span>
                    </div>

                    {/* Polen Filtresi */}
                    <div 
                      onClick={() => setIncludePollenFilter(!includePollenFilter)}
                      className={`p-3 border flex items-center justify-between cursor-pointer select-none transition-all ${includePollenFilter ? 'bg-[#0A0A0B] border-brand-red text-white' : 'bg-[#0A0A0B]/30 border-[#2D2D30] text-zinc-500'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-sm border flex items-center justify-center text-[10px] ${includePollenFilter ? 'border-brand-red bg-brand-red text-white' : 'border-[#2D2D30]'}`}>✓</span>
                        <span>Kabin Polen Filtresi</span>
                      </div>
                      <span className="font-sans font-bold text-zinc-300">+420 TL</span>
                    </div>

                    {/* Mazot Filtresi */}
                    <div 
                      onClick={() => setIncludeFuelFilter(!includeFuelFilter)}
                      className={`p-3 border flex items-center justify-between cursor-pointer select-none transition-all ${includeFuelFilter ? 'bg-[#0A0A0B] border-brand-red text-white' : 'bg-[#0A0A0B]/30 border-[#2D2D30] text-zinc-500'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-sm border flex items-center justify-center text-[10px] ${includeFuelFilter ? 'border-brand-red bg-brand-red text-white' : 'border-[#2D2D30]'}`}>✓</span>
                        <span>Yakıt (Mazot) Filtresi</span>
                      </div>
                      <span className="font-sans font-bold text-zinc-300">+850 TL</span>
                    </div>

                    {/* Buji Seti */}
                    <div 
                      onClick={() => setIncludeSparkPlugs(!includeSparkPlugs)}
                      className={`p-3 border flex items-center justify-between cursor-pointer select-none transition-all ${includeSparkPlugs ? 'bg-[#0A0A0B] border-brand-red text-white' : 'bg-[#0A0A0B]/30 border-[#2D2D30] text-zinc-500'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-sm border flex items-center justify-center text-[10px] ${includeSparkPlugs ? 'border-brand-red bg-brand-red text-white' : 'border-[#2D2D30]'}`}>✓</span>
                        <span>Buji Seti (Ateşleme)</span>
                      </div>
                      <span className="font-sans font-bold text-zinc-300">+900 TL</span>
                    </div>

                    {/* Bilgisayarlı Diagnostik Kontrol */}
                    <div 
                      onClick={() => setIncludeDiagnostics(!includeDiagnostics)}
                      className={`p-3 border flex items-center justify-between cursor-pointer select-none transition-all ${includeDiagnostics ? 'bg-[#0A0A0B] border-brand-red text-white' : 'bg-[#0A0A0B]/30 border-[#2D2D30] text-zinc-505'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-sm border flex items-center justify-center text-[10px] ${includeDiagnostics ? 'border-brand-red bg-brand-red text-white' : 'border-[#2D2D30]'}`}>✓</span>
                        <span>Diagbox OBD Tarama</span>
                      </div>
                      <span className="font-sans font-bold text-emerald-400 uppercase text-[9px]">ÜCRETSİZ</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Price Receipt Box (Col 5) */}
              <div className="lg:col-span-5 border border-[#2D2D30] bg-[#0A0A0B] p-6 relative">
                {/* Vintage mechanical pricing receipt aesthetic */}
                <span className="absolute top-3 right-3 text-[8px] font-mono text-zinc-600 font-bold uppercase tracking-widest bg-[#111113] border border-[#2D2D30] px-1.5 py-0.5">ESTIMATOR SLIP</span>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-wider block">BAKIM FİŞİ DETAYI</span>
                    <h4 className="text-xl font-display font-black tracking-tight text-white uppercase mt-1">
                      ÖZEL PSA REÇETESİ
                    </h4>
                  </div>

                  <div className="space-y-2.5 font-mono text-[11px] text-zinc-400 border-t border-b border-[#2D2D30]/80 py-4">
                    <div className="flex justify-between">
                      <span>Periyodik Bakım İşçiliği:</span>
                      <span className="text-white font-sans">{costs.labor} TL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seçilen Madeni Motor Yağı:</span>
                      <span className="text-white font-sans">{costs.oilCost} TL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filtre ve Sarf Parçalar:</span>
                      <span className="text-white font-sans">{costs.partsTotal - costs.oilCost} TL</span>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="flex justify-between text-zinc-500 border-t border-[#2D2D30]/60 pt-2 text-[10px]">
                      <span>KDV DAHİL ÖN TOPLAM:</span>
                      <span className="font-sans">{costs.subTotal} TL</span>
                    </div>
                    
                    {/* Internet Campaign offer */}
                    <div className="flex justify-between text-emerald-400 text-[10px]">
                      <span>İNTERNETE ÖZEL İNDİRİM (%10):</span>
                      <span className="font-sans">-{costs.savings} TL</span>
                    </div>
                  </div>

                  {/* Ultimate Price layout with glowing circles */}
                  <div className="text-center bg-[#111113] border border-[#2D2D30] py-4 relative overflow-hidden group/price">
                    <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover/price:opacity-100 transition-opacity duration-300" />
                    <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider block uppercase">ÖDENECEK TAHMİNİ NET TUTAR</span>
                    <span className="text-3xl sm:text-4xl font-black font-sans text-white tracking-tighter block my-1">
                      {costs.discountedTotal} <span className="text-xs text-brand-red font-mono font-bold">TL</span>
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 font-semibold tracking-wide">
                      Mahmut Usta Net Sanayi Fiyatı!
                    </span>
                  </div>

                  <button
                    onClick={handleBookCustomKit}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-brand-red hover:bg-brand-red-dark text-white text-xs uppercase tracking-widest font-mono font-bold transition-all active:scale-95 cursor-pointer shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    BU SEPETLE RANDEVU AL
                  </button>

                  <p className="text-[9.5px] font-serif italic text-zinc-500 text-center leading-normal">
                    *Fiyatlar Erzurum Yeni Sanayi Sitesi döviz ve yedek parça piyasa koşullarına göre değişkenlik gösterebilir. Mahmut Usta orijinal PSA ve muadil yedek parça seçeneklerini sunar.
                  </p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
