/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAdminStore, Booking, ContactMessage, Campaign, SiteSettings } from '../utils/adminStore';
import { 
  Lock, Settings, LogOut, Calendar, Mail, Tag, Plus, Trash2, Check, X, 
  Clock, User, Phone, ShieldCheck, Activity, Edit2, FileText, CheckCircle, 
  Eye, RefreshCw, Save, CheckCircle2, AlertTriangle, ChevronRight, Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { 
    bookings, messages, campaigns, settings,
    updateBookingStatus, deleteBooking,
    updateMessageStatus, deleteMessage,
    saveCampaignsList, saveSettings
  } = useAdminStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active view tab inside dashboard
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages' | 'campaigns' | 'settings'>('bookings');

  // Campaign Form State
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campTitle, setCampTitle] = useState('');
  const [campBadge, setCampBadge] = useState('');
  const [campDesc, setCampDesc] = useState('');
  const [campExpiry, setCampExpiry] = useState('');
  const [campIsActive, setCampIsActive] = useState(true);

  // Settings Edit Form State
  const [editedSettings, setEditedSettings] = useState<SiteSettings>({ ...settings });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Synchronize site settings edit form whenever settings store updates
  React.useEffect(() => {
    setEditedSettings({ ...settings });
  }, [settings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === '123') {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı! (İpucu: admin / 123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Add or Edit Campaign
  const openCampaignAdd = () => {
    setEditingCampaignId(null);
    setCampTitle('');
    setCampBadge('SINIRLI SÜRE');
    setCampDesc('');
    setCampExpiry('2026-06-30');
    setCampIsActive(true);
    setShowCampaignForm(true);
  };

  const openCampaignEdit = (camp: Campaign) => {
    setEditingCampaignId(camp.id);
    setCampTitle(camp.title);
    setCampBadge(camp.badge);
    setCampDesc(camp.description);
    setCampExpiry(camp.expiryDate);
    setCampIsActive(camp.isActive);
    setShowCampaignForm(true);
  };

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campTitle.trim() || !campDesc.trim()) return;

    if (editingCampaignId) {
      // Edit mode
      const updated = campaigns.map(c => c.id === editingCampaignId ? {
        ...c,
        title: campTitle,
        badge: campBadge,
        description: campDesc,
        expiryDate: campExpiry,
        isActive: campIsActive
      } : c);
      saveCampaignsList(updated);
    } else {
      // Add mode
      const fresh: Campaign = {
        id: 'c-' + Date.now(),
        title: campTitle,
        badge: campBadge,
        description: campDesc,
        expiryDate: campExpiry,
        isActive: campIsActive,
        icon: 'Tag'
      };
      saveCampaignsList([...campaigns, fresh]);
    }
    setShowCampaignForm(false);
  };

  const handleCampaignDelete = (id: string) => {
    if (window.confirm('Bu kampanyayı silmek istediğinizden emin misiniz?')) {
      saveCampaignsList(campaigns.filter(c => c.id !== id));
    }
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(editedSettings);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 4000);
  };

  const activeBookingsCount = bookings.filter(b => b.status === 'Yeni').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'Yeni').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden">
      
      {/* Dark Blur Backdrop overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#000000]/95 backdrop-blur-md"
      />

      <div className="relative w-full h-full md:max-w-7xl md:h-[90vh] bg-[#111113] border border-[#2D2D30] text-zinc-100 flex flex-col z-10 shadow-3xl overflow-hidden">
        
        {/* TOP SYSTEM NAV BAR */}
        <div className="p-4 bg-[#0A0A0B] border-b border-[#2D2D30] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-red animate-spin-slow" />
            <h2 className="text-sm font-mono font-bold tracking-widest text-white uppercase">
              {settings.logoName} • ADMIN PANELİ
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-3 bg-[#111113] hover:bg-brand-red hover:text-white border border-[#2D2D30] text-zinc-400 font-mono text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer"
          >
            Siteden Çık
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            
            /* LOGIN DIALOG CARD */
            <motion.div 
              key="login-dialog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col items-center justify-center p-6 bg-[#111113] relative"
            >
              {/* Login box */}
              <div className="w-full max-w-sm bg-[#0A0A0B] border border-[#2D2D30] p-6 sm:p-8 space-y-6 text-left relative">
                
                {/* Visual badge */}
                <div className="absolute top-1 right-2 px-2 py-0.5 border border-[#2D2D30] text-[8px] font-mono text-brand-red uppercase font-bold">
                  Giriş Kapısı
                </div>

                <div className="space-y-2 text-center">
                  <div className="w-12 h-12 bg-zinc-900 border border-[#2D2D30] text-brand-red flex items-center justify-center rounded-none mx-auto mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-md sm:text-lg font-display font-black tracking-tight text-white uppercase">Mahmut Usta Girişi</h3>
                  <p className="text-xs text-zinc-500 font-serif italic max-w-xs mx-auto">
                    Randevuları görmek, kampanyaları ve site ayarlarını düzenlemek için giriş şifrenizi kodlayın.
                  </p>
                </div>

                {/* Secure instructions display */}
                <div className="p-3 bg-brand-red/5 border border-brand-red/15 rounded-none space-y-1 font-mono text-[10px] text-zinc-400">
                  <div className="text-brand-red font-bold uppercase tracking-wider">🔐 PANEL GİRİŞ BİLGİLERİ:</div>
                  <div>• Kullanıcı Adı: <strong className="text-white">admin</strong></div>
                  <div>• Giriş Şifresi: <strong className="text-white">123</strong></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Yönetici Adı</label>
                    <input 
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full px-3 py-2.5 bg-[#111113] border border-[#2D2D30] rounded-none focus:outline-none focus:border-brand-red text-zinc-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Yönetici Şifresi</label>
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••"
                      className="w-full px-3 py-2.5 bg-[#111113] border border-[#2D2D30] rounded-none focus:outline-none focus:border-brand-red text-zinc-200 text-sm tracking-widest"
                    />
                  </div>

                  {loginError && (
                    <div className="p-2 bg-brand-red/10 border border-brand-red/25 text-[10px] text-brand-red font-bold">
                      ⚠️ {loginError}
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-none text-xs font-bold uppercase tracking-widest cursor-pointer transition-all active:scale-98"
                  >
                    Panele Bağlan
                  </button>
                </form>

              </div>
            </motion.div>
          ) : (
            
            /* SECURED DASHBOARD INNER LAYOUT */
            <motion.div 
              key="dashboard-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0 bg-[#0C0C0E]"
            >
              
              {/* BENTO STATS COUNTERS PANEL */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 sm:p-6 pb-2 border-b border-[#2D2D30] bg-[#111113]">
                
                {/* Stat 1 */}
                <div className="p-4 bg-[#0A0A0B] border border-[#2D2D30] text-left flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider text-zinc-500 font-bold uppercase block">RANDEVULAR</span>
                    <h4 className="text-2xl font-black text-white font-mono">{bookings.length}</h4>
                  </div>
                  <div className="p-2 bg-[#111113] text-brand-red border border-[#2D2D30] font-mono text-[10px] font-bold">
                    {activeBookingsCount} YENİ
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-4 bg-[#0A0A0B] border border-[#2D2D30] text-left flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider text-zinc-500 font-bold uppercase block">GELEN MESAJLAR</span>
                    <h4 className="text-2xl font-black text-white font-mono">{messages.length}</h4>
                  </div>
                  <div className="p-2 bg-[#111113] text-emerald-500 border border-[#2D2D30] font-mono text-[10px] font-bold">
                    {unreadMessagesCount} OKUNMAMIŞ
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-4 bg-[#0A0A0B] border border-[#2D2D30] text-left flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider text-zinc-500 font-bold uppercase block">AKTİF KAMPANYALAR</span>
                    <h4 className="text-2xl font-black text-white font-mono">
                      {campaigns.filter(c => c.isActive).length}
                    </h4>
                  </div>
                  <div className="p-2 bg-[#111113] text-indigo-400 border border-[#2D2D30] font-mono text-[10px]">
                    {campaigns.length} TOPLAM
                  </div>
                </div>

                {/* Stat 4 - Logout trigger */}
                <div className="p-3 bg-brand-red/5 border border-brand-red/20 text-left flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-brand-red font-bold uppercase tracking-widest">AKTİF OTURUM</span>
                    <span className="text-[8px] px-1 bg-emerald-700 text-white font-mono font-bold">GÜVENLİ</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full mt-2 py-1.5 bg-[#0A0A0B] border border-[#2D2D30] hover:border-brand-red hover:text-white transition-all text-[9px] font-mono uppercase font-bold tracking-widest flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3 text-brand-red" />
                    Oturumu Kapat
                  </button>
                </div>

              </div>

              {/* SIDEBAR TABS & INTERNAL VIEWPORT */}
              <div className="flex-1 flex flex-col md:flex-row min-h-0">
                
                {/* Navigation Sidebar Drawer */}
                <div className="w-full md:w-56 bg-[#111113] border-r border-[#2D2D30] py-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
                  
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-5 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-widest border-b md:border-b-0 md:border-l-2 flex items-center gap-2 transition-all shrink-0 cursor-pointer ${activeTab === 'bookings' ? 'bg-[#0C0C0E] border-brand-red text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'}`}
                  >
                    <Calendar className="w-4 h-4 shrink-0 text-brand-red" />
                    Randevular ({bookings.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-5 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-widest border-b md:border-b-0 md:border-l-2 flex items-center gap-2 transition-all shrink-0 cursor-pointer ${activeTab === 'messages' ? 'bg-[#0C0C0E] border-brand-red text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'}`}
                  >
                    <Mail className="w-4 h-4 shrink-0 text-brand-red" />
                    Mesajlar ({messages.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className={`px-5 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-widest border-b md:border-b-0 md:border-l-2 flex items-center gap-2 transition-all shrink-0 cursor-pointer ${activeTab === 'campaigns' ? 'bg-[#0C0C0E] border-brand-red text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'}`}
                  >
                    <Tag className="w-4 h-4 shrink-0 text-brand-red" />
                    Kampanya Yönetimi
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-5 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-widest border-b md:border-b-0 md:border-l-2 flex items-center gap-2 transition-all shrink-0 cursor-pointer ${activeTab === 'settings' ? 'bg-[#0C0C0E] border-brand-red text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'}`}
                  >
                    <Settings className="w-4 h-4 shrink-0 text-brand-red" />
                    Site Ayarları
                  </button>

                </div>

                {/* CONTENT AREA PORTAL */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    
                    {/* T1: BOOKINGS MANAGEMENT */}
                    {activeTab === 'bookings' && (
                      <motion.div 
                        key="tab-bookings"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center border-b border-[#2D2D30] pb-3 mb-2">
                          <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white">GELEN RANDEVU TALEPLERİ</h3>
                          <span className="text-[10px] font-mono text-zinc-500 italic">Sistem üzerinde güncel randevular listelenir</span>
                        </div>

                        {bookings.length === 0 ? (
                          <div className="py-20 text-center text-zinc-500 font-mono text-xs border border-dashed border-[#2D2D30] uppercase">
                            Kayıtlı randevu talebi bulunmuyor.
                          </div>
                        ) : (
                          <div className="space-y-3.5">
                            {bookings.map((booking) => {
                              const revDate = booking.preferredDate.split('-').reverse().join('.');
                              const timestamp = new Date(booking.createdAt).toLocaleDateString('tr-TR', {
                                hour: '2-digit', minute: '2-digit'
                              });

                              return (
                                <div 
                                  key={booking.id}
                                  className="bg-[#111113] border border-[#2D2D30] p-4 font-mono text-xs text-left relative"
                                >
                                  {/* Top Row */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2D2D30]/75 pb-2 mb-2.5 gap-2">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <strong className="text-white uppercase text-sm font-sans font-bold">{booking.customerName}</strong>
                                        <span className="text-[8px] bg-zinc-900 border border-[#2D2D30] text-zinc-400 px-1 py-0.5">{booking.id}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-405">
                                        <Phone className="w-3 h-3 text-emerald-500" />
                                        <a href={`tel:${booking.customerPhone}`} className="hover:underline">{booking.customerPhone}</a>
                                        <span className="text-zinc-650">•</span>
                                        <span>Kayıt: {timestamp}</span>
                                      </div>
                                    </div>

                                    {/* Action Status Badges selector */}
                                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                                      {([ 'Yeni', 'Arandı', 'Tamamlandı', 'İptal' ] as const).map((st) => (
                                        <button
                                          key={st}
                                          onClick={() => updateBookingStatus(booking.id, st)}
                                          className={`px-2 py-1 rounded-none border leading-none transition-colors cursor-pointer ${booking.status === st ? 'bg-brand-red text-white border-brand-red' : 'bg-[#0A0A0B] border-[#2D2D30] text-zinc-500 hover:text-zinc-300'}`}
                                        >
                                          {st}
                                        </button>
                                      ))}

                                      <button 
                                        onClick={() => deleteBooking(booking.id)}
                                        className="p-1 px-2 border border-brand-red/35 hover:bg-brand-red text-brand-red hover:text-white transition-colors cursor-pointer"
                                        title="Randevuyu sil"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Mechanical Details */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#0A0A0B] p-3 border border-[#2D2D30]/65 text-[11px] leading-relaxed mb-2.5">
                                    <div>
                                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider font-bold">ARAÇ & MODEL</span>
                                      <strong className="text-zinc-200 uppercase">{booking.brand} {booking.model} • {booking.year} model</strong>
                                    </div>
                                    <div>
                                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider font-bold">HİZMET KATEGORİSİ</span>
                                      <strong className="text-zinc-200">{booking.serviceCategory}</strong>
                                    </div>
                                    <div>
                                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider font-bold">TALEP EDİLEN TARİH</span>
                                      <strong className="text-brand-red font-sans text-xs">{revDate}</strong>
                                    </div>
                                  </div>

                                  {/* Notes block */}
                                  {booking.notes && (
                                    <div className="p-2.5 bg-[#111113] border-l-2 border-brand-red text-[11px] text-zinc-400 font-serif italic whitespace-pre-wrap leading-relaxed">
                                      "{booking.notes}"
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* T2: MESSAGES READER */}
                    {activeTab === 'messages' && (
                      <motion.div 
                        key="tab-messages"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center border-b border-[#2D2D30] pb-3 mb-2">
                          <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white">İLETİŞİM FORMU MESAJLARI</h3>
                          <span className="text-[10px] font-mono text-zinc-500 italic">Sitedeki "Bize Ulaşın" formundan yazan müşteriler</span>
                        </div>

                        {messages.length === 0 ? (
                          <div className="py-20 text-center text-zinc-500 font-mono text-xs border border-dashed border-[#2D2D30] uppercase">
                            Gelen mesaj bulunmuyor.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {messages.map((msg) => {
                              const isNewMessage = msg.status === 'Yeni';
                              const timestamp = new Date(msg.createdAt).toLocaleDateString('tr-TR', {
                                hour: '2-digit', minute: '2-digit'
                              });

                              return (
                                <div 
                                  key={msg.id}
                                  className={`p-4 border text-xs font-mono text-left relative transition-all ${isNewMessage ? 'bg-brand-red/5 border-brand-red' : 'bg-[#111113] border-[#2D2D30]'}`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2D2D30]/65 pb-2 mb-2 gap-2">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <strong className="text-zinc-100 uppercase text-sm font-serif italic">{msg.name}</strong>
                                        {isNewMessage && (
                                          <span className="text-[8px] bg-brand-red text-white py-0.5 px-1 font-bold">YENİ</span>
                                        )}
                                      </div>
                                      <div className="text-[10px] text-zinc-500 flex flex-wrap items-center gap-1.5 font-sans">
                                        <span>Telefon: <strong className="text-zinc-305 font-mono">{msg.phone}</strong></span>
                                        <span>•</span>
                                        {msg.email && <span>E-posta: <strong className="text-zinc-305 font-mono">{msg.email}</strong></span>}
                                        {msg.email && <span>•</span>}
                                        <span>Kayıt: {timestamp}</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-[10px]">
                                      {isNewMessage ? (
                                        <button 
                                          onClick={() => updateMessageStatus(msg.id, 'Okundu')}
                                          className="py-1 px-2.5 bg-[#0A0A0B] border border-[#2D2D30] text-[9px] hover:border-zinc-500 text-zinc-300 transition-colors uppercase font-mono tracking-widest cursor-pointer"
                                        >
                                          Okundu Olarak İşaretle
                                        </button>
                                      ) : (
                                        <span className="text-zinc-500 uppercase tracking-widest font-bold">OKUNDU</span>
                                      )}

                                      <button 
                                        onClick={() => deleteMessage(msg.id)}
                                        className="p-1 px-2 border border-brand-red/35 hover:bg-brand-red text-brand-red hover:text-white transition-colors cursor-pointer"
                                        title="Mesajı sil"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Message Text Block */}
                                  <div className="p-3 bg-[#0A0A0B] border border-[#2D2D30] font-sans text-xs italic text-zinc-200 whitespace-pre-wrap leading-relaxed">
                                    "{msg.message}"
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* T3: CAMPAIGNS CREATOR MANAGER */}
                    {activeTab === 'campaigns' && (
                      <motion.div 
                        key="tab-campaigns"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 text-left"
                      >
                        <div className="flex justify-between items-center border-b border-[#2D2D30] pb-3 mb-2">
                          <div>
                            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white">KAMPANYA YÖNETİM MERKEZİ</h3>
                            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Sitedeki kampanyaları ekleyin, düzenleyin veya kaldırın</p>
                          </div>
                          
                          <button 
                            onClick={openCampaignAdd}
                            className="bg-[#0A0A0B] border border-brand-red hover:bg-brand-red text-brand-red hover:text-white py-2 px-4 text-[10px] font-mono uppercase font-bold tracking-widest transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            Yeni Kampanya Ekle
                          </button>
                        </div>

                        {/* Campaign Form Dialog */}
                        {showCampaignForm && (
                          <form 
                            onSubmit={handleCampaignSubmit} 
                            className="bg-[#0D0D0F] border-2 border-brand-red/45 p-5 font-mono text-xs space-y-4 relative mb-6"
                          >
                            <div className="absolute top-1 right-2 uppercase font-bold text-brand-red text-[8px]">
                              {editingCampaignId ? 'Kampanya Düzenle' : 'Yeni Kampanya Kartı'}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-zinc-400">Kampanya Başlığı *</label>
                                <input 
                                  type="text"
                                  required
                                  value={campTitle}
                                  onChange={(e) => setCampTitle(e.target.value)}
                                  placeholder="Örn: Yağ Filtresi Değişim Hediye"
                                  className="w-full p-2 bg-[#111113] border border-[#2D2D30] text-zinc-100 rounded-none focus:outline-none focus:border-brand-red font-sans text-sm"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-zinc-400">Rozet / Etiket</label>
                                <input 
                                  type="text"
                                  value={campBadge}
                                  onChange={(e) => setCampBadge(e.target.value)}
                                  placeholder="Örn: SINIRLI SÜRE, %20 İNDİRİM"
                                  className="w-full p-2 bg-[#111113] border border-[#2D2D30] text-zinc-100 rounded-none focus:outline-none focus:border-brand-red font-sans text-sm"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Kampanya Açıklaması *</label>
                              <textarea 
                                required
                                rows={3}
                                value={campDesc}
                                onChange={(e) => setCampDesc(e.target.value)}
                                placeholder="Kampanya detaylarını, Erzurum soğuğuna karşı motor korunmasını, fiyat limitlerini ve usta garantisini buraya yazın."
                                className="w-full p-2.5 bg-[#111113] border border-[#2D2D30] text-zinc-100 rounded-none focus:outline-none focus:border-brand-red font-sans text-xs italic resize-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-zinc-400">Son Geçerlilik Tarihi *</label>
                                <input 
                                  type="date"
                                  required
                                  value={campExpiry}
                                  onChange={(e) => setCampExpiry(e.target.value)}
                                  className="w-full p-2 bg-[#111113] border border-[#2D2D30] text-zinc-100 rounded-none focus:outline-none focus:border-brand-red font-mono"
                                />
                              </div>

                              <div className="flex items-center gap-3 pt-6 pl-2">
                                <input 
                                  type="checkbox"
                                  id="campIsActive"
                                  checked={campIsActive}
                                  onChange={(e) => setCampIsActive(e.target.checked)}
                                  className="w-4 h-4 text-brand-red focus:ring-0 bg-[#111113]"
                                />
                                <label htmlFor="campIsActive" className="text-xs uppercase font-mono font-bold text-zinc-350 cursor-pointer">KAMPANYA AKTİF OLSUN (SİTEDE GÖRÜNSÜN)</label>
                              </div>
                            </div>

                            <div className="flex gap-2.5 pt-2">
                              <button 
                                type="submit"
                                className="py-2.5 px-6 bg-brand-red hover:bg-[#9F1239] text-white font-bold uppercase tracking-widest cursor-pointer transition-all"
                              >
                                {editingCampaignId ? 'Değişiklikleri Kaydet' : 'Kampanyayı Yayınla'}
                              </button>
                              <button 
                                type="button"
                                onClick={() => setShowCampaignForm(false)}
                                className="py-2.5 px-6 bg-[#0A0A0B] border border-[#2D2D30] hover:text-white transition-all cursor-pointer"
                              >
                                İptal Et
                              </button>
                            </div>
                          </form>
                        )}

                        {/* List of active/inactive campaigns */}
                        <div className="space-y-3">
                          {campaigns.map((camp) => (
                            <div 
                              key={camp.id}
                              className="bg-[#111113] border border-[#2D2D30] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left"
                            >
                              <div className="space-y-2 flex-grow">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-sm font-black text-white uppercase">{camp.title}</h4>
                                  <span className="text-[8px] bg-brand-red/15 text-brand-red py-0.5 px-2 tracking-wide font-bold">{camp.badge}</span>
                                  {!camp.isActive && (
                                    <span className="text-[8px] bg-zinc-800 text-zinc-500 py-0.5 px-2 font-bold uppercase">PASİF</span>
                                  )}
                                </div>
                                <p className="text-[11px] leading-relaxed text-zinc-400 font-sans italic max-w-2xl">
                                  {camp.description}
                                </p>
                                <span className="text-[9px] text-zinc-550 block font-mono">
                                  Geçerlilik Tarihi: <strong className="text-zinc-400">{camp.expiryDate.split('-').reverse().join('.')}</strong>
                                </span>
                              </div>

                              <div className="flex gap-2 shrink-0 text-[10px] font-bold uppercase">
                                <button 
                                  onClick={() => openCampaignEdit(camp)}
                                  className="py-1.5 px-3 bg-[#0A0A0B] border border-[#2D2D30] hover:border-zinc-500 text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit2 className="w-3 h-3 text-brand-red" />
                                  Düzenle
                                </button>
                                <button 
                                  onClick={() => handleCampaignDelete(camp.id)}
                                  className="py-1.5 px-3 bg-[#0A0A0B] border border-brand-red/30 hover:bg-brand-red hover:text-white text-zinc-400 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3 text-brand-red" />
                                  Sil
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* T4: SITE VARIABLES SETTINGS */}
                    {activeTab === 'settings' && (
                      <motion.div 
                        key="tab-settings"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 text-left font-mono"
                      >
                        <div className="border-b border-[#2D2D30] pb-3 mb-2 flex justify-between items-center bg-[#0C0C0E]/50">
                          <div>
                            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white">SİTEDEKİ DEĞİŞİKLİKLER (EDİTÖR)</h3>
                            <p className="text-[10px] text-zinc-500 mt-0.5">Sitedeki tüm yazıları, telefonları ve ustadan mesaj kısımlarını canlı düzenleyin</p>
                          </div>
                        </div>

                        <form onSubmit={handleSettingsSubmit} className="space-y-6 text-xs whitespace-normal">
                          
                          {/* S1: Contact parameters */}
                          <div className="bg-[#111113] p-4 border border-[#2D2D30] space-y-4">
                            <h4 className="border-b border-[#2D2D30]/75 pb-2 text-[10px] font-bold text-brand-red uppercase tracking-widest flex items-center gap-1.5 mb-1">
                              <Phone className="w-3.5 h-3.5" />
                              1. İLETİŞİM, TELEFON VE SAAT AYARLARI
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-zinc-400">Görünen Telefon Numarası *</label>
                                <input 
                                  type="text"
                                  required
                                  value={editedSettings.displayPhone}
                                  onChange={(e) => setEditedSettings({...editedSettings, displayPhone: e.target.value})}
                                  className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono"
                                />
                                <span className="text-[9px] text-zinc-500">Sitedeki tüm telefon butonlarında listelenir</span>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-zinc-400">WhatsApp Gönderim Numarası *</label>
                                <input 
                                  type="text"
                                  required
                                  value={editedSettings.whatsappNumber}
                                  onChange={(e) => setEditedSettings({...editedSettings, whatsappNumber: e.target.value})}
                                  className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono"
                                />
                                <span className="text-[9px] text-zinc-500">Uluslararası ülke kodu ile yazın (örn: 905321668279)</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-zinc-400">Çalışma Saatleri (Hafta İçi & Cumartesi) *</label>
                                <input 
                                  type="text"
                                  required
                                  value={editedSettings.workingHoursWeekday}
                                  onChange={(e) => setEditedSettings({...editedSettings, workingHoursWeekday: e.target.value})}
                                  className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-zinc-400">Pazar Günü Durumu *</label>
                                <input 
                                  type="text"
                                  required
                                  value={editedSettings.workingHoursSunday}
                                  onChange={(e) => setEditedSettings({...editedSettings, workingHoursSunday: e.target.value})}
                                  className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5 pt-2">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Servis Adresi Metni *</label>
                              <input 
                                type="text"
                                required
                                value={editedSettings.addressText}
                                onChange={(e) => setEditedSettings({...editedSettings, addressText: e.target.value})}
                                className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono text-xs"
                              />
                            </div>
                          </div>

                          {/* S2: Slogans & Quotes */}
                          <div className="bg-[#111113] p-4 border border-[#2D2D30] space-y-4">
                            <h4 className="border-b border-[#2D2D30]/75 pb-2 text-[10px] font-bold text-brand-red uppercase tracking-widest flex items-center gap-1.5 mb-1">
                              <User className="w-3.5 h-3.5" />
                              2. SLOGANLAR & MAHMUT USTA BÖLÜMÜ AYARLARI
                            </h4>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Logo İsmi *</label>
                              <input 
                                type="text"
                                required
                                value={editedSettings.logoName}
                                onChange={(e) => setEditedSettings({...editedSettings, logoName: e.target.value})}
                                className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono uppercase"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Mahmut Usta Profil Sloganı *</label>
                              <input 
                                type="text"
                                required
                                value={editedSettings.mahmutUstaSlogan}
                                onChange={(e) => setEditedSettings({...editedSettings, mahmutUstaSlogan: e.target.value})}
                                className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono uppercase"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Ustadan Mesaj (Bireysel Sözü) *</label>
                              <textarea 
                                required
                                rows={2}
                                value={editedSettings.mahmutUstaQuote}
                                onChange={(e) => setEditedSettings({...editedSettings, mahmutUstaQuote: e.target.value})}
                                className="w-full p-2.5 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-sans text-xs italic resize-none"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Mahmut Usta Hakkında Metni 1 *</label>
                              <textarea 
                                required
                                rows={2.5}
                                value={editedSettings.aboutText1}
                                onChange={(e) => setEditedSettings({...editedSettings, aboutText1: e.target.value})}
                                className="w-full p-2.5 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-sans text-xs italic resize-none"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Mahmut Usta Hakkında Metni 2 *</label>
                              <textarea 
                                required
                                rows={2.5}
                                value={editedSettings.aboutText2}
                                onChange={(e) => setEditedSettings({...editedSettings, aboutText2: e.target.value})}
                                className="w-full p-2.5 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-sans text-xs italic resize-none"
                              />
                            </div>
                          </div>

                          {/* S3: Map and 3D configs */}
                          <div className="bg-[#111113] p-4 border border-[#2D2D30] space-y-4">
                            <h4 className="border-b border-[#2D2D30]/75 pb-2 text-[10px] font-bold text-brand-red uppercase tracking-widest flex items-center gap-1.5 mb-1">
                              <Eye className="w-3.5 h-3.5" />
                              3. HARİTA & 3D SOKAK GÖRÜNÜMÜ SEÇENEKLERİ
                            </h4>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase text-zinc-400">Google Maps 3D Street View Linki *</label>
                              <input 
                                type="text"
                                required
                                value={editedSettings.threeDViewUrl}
                                onChange={(e) => setEditedSettings({...editedSettings, threeDViewUrl: e.target.value})}
                                className="w-full p-2 bg-[#0A0A0B] border border-[#2D2D30] text-zinc-100 rounded-none font-mono text-xs"
                              />
                              <span className="text-[9px] text-zinc-550 block">Dükkanınızın Google Street View üzerindeki tam 3D sokak panoramasını içeren linktir</span>
                            </div>
                          </div>

                          {/* Action Alert for successful saving */}
                          {settingsSuccess && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-3 bg-emerald-500/10 border border-emerald-500/35 text-emerald-500 text-[10px] font-bold text-left uppercase flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Site değişiklikleri başarıyla kaydedildi! Sitedeki tüm yazılar anında güncellendi.
                            </motion.div>
                          )}

                          {/* Submit controls */}
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="py-3 px-8 bg-brand-red hover:bg-[#BE123C] text-white flex items-center gap-1.5 uppercase font-bold tracking-widest cursor-pointer transition-all active:scale-98"
                            >
                              <Save className="w-4 h-4" />
                              Ayarları Canlı Kaydet
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditedSettings({ ...settings })}
                              className="py-3 px-6 bg-[#0B0B0D] border border-[#2D2D30] text-zinc-405 hover:text-white uppercase tracking-widest cursor-pointer hover:border-zinc-500 transition-colors"
                            >
                              Kaydetmeden Sıfırla
                            </button>
                          </div>

                        </form>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
