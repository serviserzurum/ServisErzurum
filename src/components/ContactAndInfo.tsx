/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQS, REVIEWS } from '../data';
import { MapPin, Clock, Phone, MessageCircle, HelpCircle, ChevronDown, ChevronUp, Star, Navigation, Send, User, Mail, Smartphone, Eye, ExternalLink, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdminStore } from '../utils/adminStore';

export default function ContactAndInfo() {
  const { addMessage, settings } = useAdminStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      setFormError('Lütfen adınızı ve soyadınızı yazın.');
      return;
    }
    if (!formPhone.trim() || formPhone.replace(/\D/g, '').length < 10) {
      setFormError('Lütfen geçerli bir telefon numarası girin.');
      return;
    }
    if (!formMessage.trim()) {
      setFormError('Lütfen iletmek istediğiniz mesajı buraya yazın.');
      return;
    }

    setFormError(null);

    // Save message via Admin Store
    addMessage({
      name: formName,
      email: formEmail,
      phone: formPhone,
      message: formMessage
    });

    setFormSuccess(true);
    // Reset fields
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormMessage('');

    // Clear success banner after 5 seconds
    setTimeout(() => {
      setFormSuccess(false);
    }, 6000);
  };

  return (
    <section id="iletisim" className="w-full py-20 bg-[#0A0A0B] border-b border-[#2D2D30] overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">

        {/* 1. SECTION: REVIEWS / TESTIMONIALS */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-red text-[10px] font-mono font-bold tracking-[0.2em] uppercase block">
              MÜŞTERI YORUMLARI
            </span>
            <h2 className="text-3xl font-display font-black tracking-tighter text-white uppercase">
              ERZURUM HALKI NE DİYOR?
            </h2>
            <p className="text-zinc-400 font-serif italic text-sm leading-relaxed">
              Servisimizde ağırladığımız Peugeot ve Citroën araç sahiplerinin Mahmut Usta ve ekibi hakkındaki dürüst görüşleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((rev) => (
              <div 
                key={rev.id}
                className="bg-[#111113] border border-[#2D2D30] p-6 rounded-none flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {/* Review Text */}
                  <p className="text-zinc-300 font-serif italic text-xs sm:text-sm leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-[#2D2D30] text-[10px] font-mono font-bold tracking-wider">
                  <div>
                    <strong className="text-white block uppercase">{rev.author}</strong>
                    <span className="text-zinc-500 font-sans font-bold">{rev.vehicle}</span>
                  </div>
                  <span className="text-zinc-650 font-sans font-black">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. SECTION: CONTACT, DYNAMIC GOOGLE MAP & USER-FRIENDLY CONTACT FORM */}
        <div className="space-y-12 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-red text-[10px] font-mono font-bold tracking-[0.2em] uppercase block">
              NEREDEYİZ & İLETİŞİM
            </span>
            <h2 className="text-3xl font-display font-black tracking-tighter text-white uppercase">
              BİZE YAZIN & ADRESİMİZ
            </h2>
            <p className="text-zinc-400 font-serif italic text-sm leading-relaxed">
              İster haritadan yol tarifi alın, ister dükkanımızın tabelasına 3D olarak bakın, isterseniz aşağıdaki formu doldurarak ustamıza anında mesaj gönderin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            
            {/* Column 1: Physical Coordinates & Working Hours (Col 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">
                  1. İLETİŞİM KANALLARI
                </span>

                {/* Map Pin Adress Link */}
                <a 
                  href="https://www.google.com/maps/place/Devran+Metal/@39.9264531,41.2837825,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-4 bg-[#111113] border border-[#2D2D30] hover:border-zinc-700 rounded-none transition-all group block"
                >
                  <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block uppercase text-[10px] tracking-widest mb-1 font-bold">Servis Konumu</strong>
                    <span className="text-zinc-400 font-mono text-[11px] leading-normal group-hover:text-zinc-200 transition-colors block">
                      {settings.addressText}
                    </span>
                  </div>
                </a>

                {/* Working hours card */}
                <div className="flex items-start gap-3.5 p-4 bg-[#111113] border border-[#2D2D30] rounded-none">
                  <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block uppercase text-[10px] tracking-widest mb-1 font-bold">Çalışma Saatleri</strong>
                    <div className="text-zinc-400 space-y-1 text-[11px] font-mono">
                      <div className="flex justify-between w-48 font-bold text-zinc-450">
                        <span>Hafta İçi - Cmt:</span>
                        <strong className="text-white font-sans text-xs">{settings.workingHoursWeekday.replace(/Pazartesi\s-\sCumartesi:\s/g, "")}</strong>
                      </div>
                      <div className="flex justify-between w-48 font-bold text-brand-red">
                        <span>Pazar:</span>
                        <strong className="text-xs uppercase">{settings.workingHoursSunday.replace(/Pazar:\s/g, "")}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Link */}
                <a 
                  href={`tel:${settings.displayPhone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3.5 p-4 bg-[#111113] border border-[#2D2D30] hover:border-zinc-700 rounded-none transition-all group block"
                >
                  <Phone className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block uppercase text-[10px] tracking-widest mb-1 font-bold">Telefon & WhatsApp</strong>
                    <span className="text-zinc-200 font-bold block text-sm tracking-wider group-hover:text-brand-red transition-colors font-sans">
                      {settings.displayPhone}
                    </span>
                    <span className="block text-[10px] leading-relaxed text-zinc-500 mt-0.5 font-serif italic">Yol yardımı veya acil danışma hattı</span>
                  </div>
                </a>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <a 
                  href="https://www.google.com/maps/place/Devran+Metal/@39.9264531,41.2837825,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white text-[10px] uppercase tracking-widest font-mono font-bold rounded-none transition-all cursor-pointer shadow-lg"
                >
                  <Navigation className="w-4 h-4 animate-pulse" />
                  Yol Tarifi (Harita)
                </a>
                
                {settings.threeDViewUrl && (
                  <a 
                    href={settings.threeDViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A0A0B] border border-[#2D2D30] hover:border-zinc-700 text-zinc-300 rounded-none text-[10px] uppercase tracking-widest font-mono font-bold transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-brand-red" />
                    Tabelayı Gör (3D Sokak)
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Styled Ambient Google Map (Col 4) */}
            <div className="lg:col-span-4 min-h-[350px] rounded-none overflow-hidden border border-[#2D2D30] relative bg-[#111113] flex flex-col justify-between">
              <div className="p-3 bg-[#0A0A0B] border-b border-[#2D2D30] flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold uppercase">
                <span>HASSAS HARİTA KONUMU</span>
                <span className="text-brand-red font-black">YAKUTİYE / ERZURUM</span>
              </div>
              <div className="flex-1 w-full h-full relative">
                <iframe 
                  title="Servis Erzurum Orijinal Konum İframe"
                  src={`https://maps.google.com/maps?q=39.9264531,41.2837825&z=16&output=embed`} 
                  className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-80 contrast-120 brightness-90 hover:grayscale-0 hover:invert-0 hover:opacity-100 hover:contrast-100 transition-all duration-500" 
                  allowFullScreen={false} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Column 3: The brand new User-Friendly Custom Inquire Form (Col 4) */}
            <div className="lg:col-span-4 bg-[#111113] border border-[#2D2D30] p-6 rounded-none flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2D2D30] pb-3 mb-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-brand-red" />
                    3. BİZE MESAJ GÖNDERİN
                  </span>
                  <span className="text-[8px] font-mono text-brand-red font-bold uppercase tracking-wider bg-brand-red/15 px-1.5 py-0.5">USTAYA İLETİLİR</span>
                </div>

                <AnimatePresence mode="wait">
                  {formSuccess ? (
                    <motion.div 
                      key="success-prompt"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 text-center space-y-4 font-mono select-none flex flex-col items-center justify-center my-auto min-h-[250px]"
                    >
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-full">
                        <CheckCircle className="w-6 h-6 animate-bounce" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Mesajınız Alındı</h4>
                        <p className="text-[11px] text-zinc-400 leading-normal font-serif italic max-w-[240px] mx-auto">
                          Mesajınız Mahmut Usta'nın yönetim paneline iletildi. En kısa sürede sizinle irtibata geçilecektir.
                        </p>
                      </div>
                      <button 
                        onClick={() => setFormSuccess(false)}
                        className="py-1.5 px-4 bg-[#0A0A0B] border border-[#2D2D30] text-[9px] text-zinc-300 uppercase font-mono tracking-widest hover:border-zinc-500 transition-colors cursor-pointer"
                      >
                        Yeni Mesaj Yaz
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-input-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleMessageSubmit}
                      className="space-y-3.5 text-left"
                    >
                      {/* Name input */}
                      <div className="space-y-1 text-xs">
                        <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Adınız Soyadınız *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                          <input 
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Ahmet Yılmaz"
                            className="w-full pl-8.5 pr-3 py-2 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-xs text-zinc-200 focus:outline-none focus:border-brand-red placeholder-zinc-650 font-mono"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1 text-xs">
                        <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Cep Telefonunuz *</label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                          <input 
                            type="tel"
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            placeholder="0532 166 82 79"
                            className="w-full pl-8.5 pr-3 py-2 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-xs text-zinc-200 focus:outline-none focus:border-brand-red placeholder-zinc-650 font-mono"
                          />
                        </div>
                      </div>

                      {/* Email (Optional) */}
                      <div className="space-y-1 text-xs">
                        <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">E-Posta Adresiniz (Opsiyonel)</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                          <input 
                            type="email"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="ahmet@example.com"
                            className="w-full pl-8.5 pr-3 py-2 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-xs text-zinc-200 focus:outline-none focus:border-brand-red placeholder-zinc-650 font-mono"
                          />
                        </div>
                      </div>

                      {/* Message body */}
                      <div className="space-y-1 text-xs">
                        <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Sorunuz veya Mesajınız *</label>
                        <textarea 
                          rows={2.5}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Fren onarımı için yakalama süreniz nedir? Kampanya hakkında ek bilgi almak istiyorum."
                          className="w-full p-2.5 bg-[#0A0A0B] border border-[#2D2D30] rounded-none text-xs text-zinc-200 focus:outline-none focus:border-brand-red placeholder-zinc-650 font-serif italic resize-none"
                        />
                      </div>

                      {formError && (
                        <div className="p-2 bg-brand-red/10 border border-brand-red/35 text-[10px] text-brand-red font-bold font-mono">
                          ⚠️ {formError}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#0A0A0B] border border-[#2D2D30] hover:bg-brand-red hover:border-brand-red text-zinc-300 hover:text-white rounded-none text-[10px] uppercase font-mono tracking-widest font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Mesajı Gönder
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* 3. SECTION: FAQS Accordion */}
        <div className="space-y-12 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-red text-[10px] font-mono font-bold tracking-[0.2em] uppercase block">
              MERAK EDİLENLER
            </span>
            <h2 className="text-3xl font-display font-black tracking-tighter text-white uppercase">
              SIKÇA SORULAN SORULAR
            </h2>
            <p className="text-zinc-400 font-serif italic text-sm leading-relaxed">
              Servisimiz, bakım süreçleri ve bütçe planlamalarımız hakkında her zaman şeffaf olduk.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[#2D2D30] border-t border-b border-[#2D2D30]">
            {FAQS.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <div key={index} className="py-4 font-mono">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-2.5 flex items-center justify-between text-left text-white hover:text-brand-red transition-colors cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-200 group-hover:text-white">
                      <HelpCircle className="w-4 h-4 text-brand-red shrink-0" />
                      {faq.question}
                    </span>
                    <span className="p-1 px-2.5 rounded-none bg-[#111113] border border-[#2D2D30] text-zinc-400 group-hover:text-white transition-colors">
                      {isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-zinc-400 font-serif italic leading-relaxed py-3 pl-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
