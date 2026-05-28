/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BookingState } from '../types';
import { SERVICES } from '../data';
import { CalendarRange, Send, Smartphone, User, Car, Wrench, MessageSquare, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdminStore } from '../utils/adminStore';

interface BookingSystemProps {
  selectedServiceFromProps: string;
}

export default function BookingSystem({ selectedServiceFromProps }: BookingSystemProps) {
  const { addBooking, settings } = useAdminStore();

  const [formData, setFormData] = useState<BookingState>({
    brand: 'Peugeot',
    model: '',
    year: '2018',
    serviceCategory: 'Periyodik Bakım',
    customerName: '',
    customerPhone: '',
    preferredDate: '',
    notes: ''
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync selected service when user clicks "Randevu Al" from service cards
  useEffect(() => {
    if (selectedServiceFromProps) {
      setFormData(prev => ({
        ...prev,
        serviceCategory: selectedServiceFromProps
      }));
    }
  }, [selectedServiceFromProps]);

  // Generate date bounds for appointment (from today up to 30 days layer)
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getMaxDateString = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError(null);
  };

  const handleBrandChange = (brand: 'Peugeot' | 'Citroën' | 'Diğer') => {
    setFormData(prev => ({
      ...prev,
      brand
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Validation
    if (!formData.customerName.trim()) {
      setValidationError('Lütfen adınızı ve soyadınızı girin.');
      return;
    }
    if (!formData.customerPhone.trim() || formData.customerPhone.replace(/\D/g, '').length < 10) {
      setValidationError('Lütfen geçerli bir telefon numarası girin (örn: 0532 166 82 79).');
      return;
    }
    if (!formData.model.trim()) {
      setValidationError('Lütfen aracınızın modelini girin (örn: 3008, C4, Berlingo).');
      return;
    }
    if (!formData.preferredDate) {
      setValidationError('Lütfen randevu almak istediğiniz tarihi seçin.');
      return;
    }

    setValidationError(null);
    setShowConfirmModal(true);
  };

  const triggerWhatsAppSend = () => {
    // Save to local admin panel database
    addBooking({
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      serviceCategory: formData.serviceCategory,
      notes: formData.notes,
      preferredDate: formData.preferredDate
    });

    // Compile gorgeous message for Mahmut Usta
    const formattedDate = formData.preferredDate.split('-').reverse().join('.');
    const msg = `*SERVİS ERZURUM - RANDEVU TALEBİ* 🛠️\n\n` +
      `👤 *Müşteri:* ${formData.customerName}\n` +
      `📞 *Telefon:* ${formData.customerPhone}\n` +
      `🚗 *Araç:* ${formData.year} model ${formData.brand} ${formData.model}\n` +
      `⚙️ *İstenen Hizmet:* ${formData.serviceCategory}\n` +
      `📅 *İstediği Tarih:* ${formattedDate}\n` +
      `📝 *Açıklama/Not:* ${formData.notes ? formData.notes : 'Yok'}\n\n` +
      `_Servis Erzurum web uygulamasından gönderilmiştir._`;

    const cleanWhatsappNum = settings.whatsappNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanWhatsappNum}?text=${encodeURIComponent(msg)}`;
    
    // Open in separate window/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    setShowConfirmModal(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      brand: 'Peugeot',
      model: '',
      year: '2018',
      serviceCategory: 'Periyodik Bakım',
      customerName: '',
      customerPhone: '',
      preferredDate: '',
      notes: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="randevu" className="w-full py-20 bg-[#0A0A0B] border-b border-[#2D2D30] overflow-hidden relative">
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-brand-red text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1">
            HIZLI İŞ KARTINI OLUŞTUR
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter text-white uppercase">
            MAHMUT USTA'DAN RANDEVU AL
          </h2>
          <p className="text-zinc-400 font-serif italic text-sm sm:text-base leading-relaxed">
            Aracınızın markasını, modelini ve istediğiniz onarım kategorisini seçerek ön iş kartınızı oluşturun, doğrudan WhatsApp ile bize ulaştırın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Booking Form (Col 7) */}
          <div className="lg:col-span-7 bg-[#111113] border border-[#2D2D30] p-6 sm:p-8 rounded-none">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit} 
                  className="space-y-6"
                >
                  
                  {/* Step Title */}
                  <div className="flex items-center gap-2 border-b border-[#2D2D30] pb-4">
                    <CalendarRange className="w-5 h-5 text-brand-red" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Araç ve Müşteri Bilgileri</span>
                  </div>

                  {/* Brand Selector Buttons */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      Araç Markası *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Peugeot', 'Citroën', 'Diğer'] as const).map(brand => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => handleBrandChange(brand)}
                          className={`py-3 px-4 rounded-none text-xs tracking-wider font-mono font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${formData.brand === brand ? 'bg-brand-red/15 border-brand-red text-brand-red' : 'bg-[#0A0A0B] border-[#2D2D30] text-zinc-450 hover:border-zinc-750 hover:text-white'}`}
                        >
                          {brand === 'Peugeot' && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12C20 13.5 19.5 14.8 18.7 16L17.5 13.5C18.2 12 17.5 10 16 9.5C14.5 9 12.5 10 11.5 11.5L10 9L8 10.5L9.5 13.5C8 14 7 15.5 7.5 17.5L8.5 19.5C5.8 18 4 15.2 4 12A8 8 0 0 1 12 4Z" />
                            </svg>
                          )}
                          {brand === 'Citroën' && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12,2L5.5,8.5L7.5,10.5L12,6L16.5,10.5L18.5,8.5L12,2M12,10L5.5,16.5L7.5,18.5L12,14L16.5,18.5L18.5,16.5L12,10Z" />
                            </svg>
                          )}
                          {brand === 'Diğer' && <Car className="w-4 h-4" />}
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Model & Year Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                        Araç Modeli / Serisi *
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          placeholder="Örn: 3008, C4, Berlingo, Partner"
                          className="w-full pl-10 pr-4 py-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-brand-red transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                        Model Yılı *
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-sm text-zinc-200 focus:outline-none focus:border-brand-red transition-all cursor-pointer font-mono"
                      >
                        {Array.from({ length: 27 }, (_, i) => String(2026 - i)).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Service Category Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      İstenen Hizmet / Şikayet Kategorisi *
                    </label>
                    <div className="relative">
                      <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <select
                        name="serviceCategory"
                        value={formData.serviceCategory}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-sm text-zinc-200 focus:outline-none focus:border-brand-red transition-all cursor-pointer font-sans"
                      >
                        {SERVICES.map(service => (
                          <option key={service.id} value={service.title}>{service.title}</option>
                        ))}
                        <option value="Diğer / Genel Şikayet">Diğer / Genel Sürüş Şikayeti</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                        Adınız ve Soyadınız *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          placeholder="Örn: Ahmet Yılmaz"
                          className="w-full pl-10 pr-4 py-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-brand-red transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                        Cep Telefonu Numaranız *
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="tel"
                          name="customerPhone"
                          value={formData.customerPhone}
                          onChange={handleInputChange}
                          placeholder="Örn: 0532 166 82 79"
                          className="w-full pl-10 pr-4 py-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-brand-red transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Date Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      Randevu Almak İstediğiniz Tarih *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      min={getTodayString()}
                      max={getMaxDateString()}
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-sm text-zinc-100 focus:outline-none focus:border-brand-red transition-all cursor-pointer font-mono"
                    />
                  </div>

                  {/* Service Notes */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      Şikayetiniz veya Eklemek İstediğiniz Notlar
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Örn: Sol ön tekerlekten kasislere girince tıkırtı sesi geliyor, frene basınca titreme oluyor."
                        className="w-full pl-10 pr-4 py-3 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-brand-red transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Validation Errors Indicator */}
                  {validationError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-none text-xs text-brand-red font-semibold"
                    >
                      ⚠️ {validationError}
                    </motion.div>
                  )}

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-red hover:bg-brand-red-dark text-white rounded-none text-xs uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Bilgileri Onayla & Talep Gönder
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-full">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-white">Randevu Talebiniz Doğrulandı</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                      Randevu kartınız başarıyla oluşturuldu ve WhatsApp üzerinden yönlendirme yapıldı. Mahmut Usta en kısa sürede geri dönüş yapacaktır.
                    </p>
                  </div>
                  <div className="bg-[#0A0A0B] border border-[#2D2D30] p-4 rounded-none text-left font-mono max-w-sm mx-auto text-xs space-y-2 text-zinc-300">
                    <div className="flex justify-between border-b border-[#2D2D30] pb-1.5 text-zinc-400">
                      <span>Müşteri:</span>
                      <strong className="text-white">{formData.customerName}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#2D2D30] pb-1.5 text-zinc-400">
                      <span>Araç:</span>
                      <strong className="text-white">{formData.brand} {formData.model}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#2D2D30] pb-1.5 text-zinc-400">
                      <span>Hizmet:</span>
                      <strong className="text-white">{formData.serviceCategory}</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Tarih:</span>
                      <strong className="text-white">{formData.preferredDate.split('-').reverse().join('.')}</strong>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-sm mx-auto">
                    <button
                      type="button"
                      onClick={triggerWhatsAppSend}
                      className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-none text-[10px] uppercase font-mono tracking-widest transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                    >
                      WhatsApp'tan Yeniden Gönder
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="py-3.5 px-6 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-300 hover:text-white rounded-none text-[10px] uppercase font-mono tracking-widest transition-colors cursor-pointer"
                    >
                      Yeni Talep Oluştur
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Dynamic Quotation Simulator Overview Drawer (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111113] border border-[#2D2D30] p-6 rounded-none relative">
              <div className="absolute top-1 right-2 p-1 px-2.5 bg-[#111113] border border-[#2D2D30] text-[9px] font-mono text-brand-red uppercase font-bold">
                Ön İş Kartı
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase">
                  SİMÜLASYON ÖN İNCELEME
                </span>
                
                {/* Active Vehicle Icon Display */}
                <div className="flex items-center gap-4 bg-[#0A0A0B] p-4 border border-[#2D2D30] rounded-none">
                  <div className="p-3 bg-[#111113] border border-[#2D2D30] text-brand-red flex items-center justify-center">
                    <Car className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono tracking-widest text-zinc-400 font-bold">SEÇİLEN ARAÇ VE KART:</div>
                    <h4 className="text-base font-bold text-white truncate font-display uppercase tracking-tight">
                      {formData.brand} {formData.model ? formData.model : '(Belirtilmedi)'}
                    </h4>
                    <span className="text-[9px] font-mono font-bold text-zinc-550">{formData.year} Model • PSA Mimari Altyapısı</span>
                  </div>
                </div>

                {/* Service Estimation description and steps checklist */}
                <div className="space-y-3.5 pt-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 font-mono flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-brand-red" />
                    Yapılacak İşlem Onay Listesi:
                  </h4>
                  
                  {/* Dynamic checklist derived from matches in SERVICES data */}
                  <div className="bg-[#0A0A0B] p-4 border border-[#2D2D30] rounded-none space-y-3 font-serif text-[12px] italic text-zinc-300">
                    {(() => {
                      const matchedService = SERVICES.find(s => s.title === formData.serviceCategory);
                      if (matchedService) {
                        return (
                          <>
                            <div className="text-zinc-500 font-bold border-b border-[#2D2D30] pb-1.5 text-[9px] tracking-widest uppercase font-mono not-italic">
                              {matchedService.title} KONTROL KALEMLERİ:
                            </div>
                            {matchedService.features.map((feat, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <span className="text-emerald-400 font-sans font-black not-italic">✓</span>
                                <span className="leading-tight">{feat}</span>
                              </div>
                            ))}
                            <div className="pt-2 border-t border-[#2D2D30] flex justify-between text-xs font-semibold font-mono not-italic uppercase tracking-widest text-zinc-400">
                              <span>Ortalama Süre:</span>
                              <span className="text-white font-sans">{matchedService.averageTime}</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold font-mono not-italic uppercase tracking-widest text-zinc-400">
                              <span>Tahmini Aralık:</span>
                              <span className="text-emerald-400 font-sans">{matchedService.estimatedPriceRange}</span>
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <div className="text-center py-4 text-zinc-500 font-mono text-[10px] tracking-wider uppercase leading-relaxed not-italic">
                            Genel mekanik teşhis onarımları. Mahmut Usta bilgisayarlı analiz gerçekleştirerek parça / işçilik teklifi sunacaktır.
                          </div>
                        );
                      }
                    })()}
                  </div>

                </div>

                {/* Guaranteed trust labels */}
                <div className="flex items-start gap-3 p-3.5 bg-brand-red/5 border border-brand-red/10 rounded-none text-xs text-zinc-400 leading-normal">
                  <ShieldCheck className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                  <span className="font-serif italic text-zinc-400">Tüm randevu sahiplerine, servisimizde orijinal PSA arıza tespit cihazı yardımıyla bilgisayarlı genel arıza kontrolü ücretsiz sunulur.</span>
                </div>

              </div>
            </div>

            {/* Helpline quick dial link */}
            <div className="bg-[#111113] border border-[#2D2D30] p-6 rounded-none flex flex-col justify-between h-32">
              <div className="text-[9px] font-mono tracking-widest text-[#555] font-bold uppercase">ACİL ACİL DESTEK / YOL YARDIM:</div>
              <h3 className="text-md uppercase font-bold text-white font-mono tracking-wider">Yolda mı Kaldınız?</h3>
              <a 
                href={`tel:${settings.displayPhone.replace(/\s/g, '')}`} 
                className="w-full text-center py-2.5 bg-[#0A0A0B] border border-[#2D2D30] hover:border-brand-red/40 transition-all font-mono text-xs font-bold text-brand-red uppercase tracking-widest rounded-none"
              >
                {settings.displayPhone} (Hemen Arayın)
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Confirmation WhatsApp Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#111113] border border-[#2D2D30] p-6 rounded-none shadow-2xl space-y-5 text-left"
            >
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold font-display text-white uppercase tracking-tight">Randevu İletim Tercihi</h3>
                <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                  Ön iş kartınız hazırlandı. Bilgilerin hızlıca ulaşıp işleme alınabilmesi için Mahmut Usta'nın doğrudan iş hattına WhatsApp üzerinden randevu mesajı iletilecektir.
                </p>
              </div>

              {/* Message preview details card */}
              <div className="p-4 bg-[#0A0A0B] rounded-none border border-[#2D2D30] font-mono text-[11px] leading-relaxed text-zinc-300 space-y-1 select-none">
                <div className="text-brand-red font-semibold text-[9px] uppercase tracking-widest border-b border-[#2D2D30] pb-2 mb-2.5 flex items-center gap-1.5">
                  <span>ℹ️</span> İletilecek Randevu Özeti:
                </div>
                <div>👤 *Müşteri:* {formData.customerName}</div>
                <div>📞 *Telefon:* {formData.customerPhone}</div>
                <div>🚗 *Araç:* {formData.year} model {formData.brand} {formData.model}</div>
                <div>⚙️ *Hizmet:* {formData.serviceCategory}</div>
                <div>📅 *Tarih:* {formData.preferredDate.split('-').reverse().join('.')}</div>
                {formData.notes && <div className="truncate">📝 *Not:* {formData.notes}</div>}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3.5 bg-[#0A0A0B] border border-[#2D2D30] hover:bg-zinc-850 text-zinc-300 rounded-none text-[10px] uppercase font-mono tracking-widest cursor-pointer"
                >
                  İptal Et
                </button>
                <button
                  type="button"
                  onClick={triggerWhatsAppSend}
                  className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-none text-[10px] uppercase font-mono tracking-widest flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Smartphone className="w-4 h-4" />
                  Gönder (WhatsApp)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
