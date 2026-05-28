/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from 'react';

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  brand: 'Peugeot' | 'Citroën' | 'Diğer';
  model: string;
  year: string;
  serviceCategory: string;
  preferredDate: string;
  notes: string;
  status: 'Yeni' | 'Arandı' | 'Tamamlandı' | 'İptal';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'Yeni' | 'Okundu' | 'Silindi';
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  badge: string;
  description: string;
  expiryDate: string;
  icon: string;
  isActive: boolean;
}

export interface SiteSettings {
  logoName: string;
  footerSlogan: string;
  whatsappNumber: string;
  displayPhone: string;
  addressText: string;
  workingHoursWeekday: string;
  workingHoursSunday: string;
  mahmutUstaSlogan: string;
  mahmutUstaQuote: string;
  aboutText1: string;
  aboutText2: string;
  threeDViewUrl: string;
}

// Default Base Constants
const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    customerName: 'Hakan Şener',
    customerPhone: '0533 111 22 33',
    brand: 'Peugeot',
    model: '508',
    year: '2021',
    serviceCategory: 'Periyodik Bakım',
    preferredDate: '2026-06-01',
    notes: 'Fren balataları da kontrol edilsin lütfen. Usta ses geliyor hafiften.',
    status: 'Yeni',
    createdAt: '2026-05-28T14:30:00Z'
  },
  {
    id: 'b-2',
    customerName: 'Süleyman Aksoy',
    customerPhone: '0542 987 65 43',
    brand: 'Citroën',
    model: 'C-Elysée',
    year: '2018',
    serviceCategory: 'Süspansiyon & Alt Takım',
    preferredDate: '2026-06-02',
    notes: 'Sağ ön taraftan çukurda ses geliyor, amortisör kontrol.',
    status: 'Yeni',
    createdAt: '2026-05-28T16:15:00Z'
  }
];

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'm-1',
    name: 'Ömer Faruk Öztürk',
    email: 'omer@ozturk.com',
    phone: '0530 555 66 77',
    message: 'Selamünaleyküm Mahmut usta, 2016 model Peugeot 308 için triger seti değişimi işçilik fiyatı ne kadar olur acaba? Parçaları kendim getirebilirim veya sizden de temin edebiliriz.',
    status: 'Yeni',
    createdAt: '2026-05-28T10:00:00Z'
  },
  {
    id: 'm-2',
    name: 'Bülent Karaca',
    email: 'bulent.karaca@yahoo.com',
    phone: '0555 444 33 22',
    message: 'İyi çalışmalar ustam. Citroën C5 AirCross aracım için AdBlue deposu uyarısı çıkıyor. Kronik arıza mıdır? Komple depo değişimi yapmadan sensör veya parça değişimiyle kurtarabilir miyiz acaba? Telefonunuzu kaydettim.',
    status: 'Yeni',
    createdAt: '2026-05-28T11:45:00Z'
  }
];

const DEFAULT_CAMPAIGNS: Campaign[] = [
  {
    id: 'c-1',
    title: 'Kışlık Bakım & Antifriz İndirimi',
    badge: 'ÖZEL KAMPANYA',
    description: "Erzurum'un dondurucu ve sert soğuklarına karşı motor bloğunuzu ve radyatörünüzü koruyun! PSA onaylı -45° Antifriz değişimi, akü şarj gücü ölçümü ve kışlık tüm sıvıların kontrolü Mahmut Usta güvencesiyle sadece ₺1.200!",
    expiryDate: '2026-11-30',
    icon: 'Wrench',
    isActive: true
  },
  {
    id: 'c-2',
    title: 'Total Engine Oil İle Filtre Hediye',
    badge: '%15 AVANTAJ',
    description: 'Peugeot ve Citroën fabrika onaylı Total Quartz motor yağı değişimlerinde, filtre grubu yenilendiğinde yağ filtresi Mahmut Usta\'dan hediye! Periyodik bakım masrafınızı hafifletin, motor ömrünü koruyun.',
    expiryDate: '2026-07-15',
    icon: 'Coffee',
    isActive: true
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  logoName: 'SERVİS ERZURUM',
  footerSlogan: 'PEUGEOT & CITROËN ÖZEL SERVİS • MAHMUT USTA',
  whatsappNumber: '905321668279',
  displayPhone: '0532 166 82 79',
  addressText: '24. Demirciler Sk., Yeni Sanayi Sitesi, 25100 Yakutiye/Erzurum',
  workingHoursWeekday: 'Pazartesi - Cumartesi: 08:30 - 18:30',
  workingHoursSunday: 'Pazar: KAPALI',
  mahmutUstaSlogan: 'YENİ SANAYİDE GÜVENİN ADRESİ',
  mahmutUstaQuote: '"Sanayide dürüstlük, her şeyden önce gelir. Müşterimize değiştirilmesi gereken parçayı gösterir, onay alırız. Bizde çay her zaman sıcak, usta işçiliğimiz her zaman bakidir."',
  aboutText1: "Erzurum Yeni Sanayi'nin en köklü ustalarından olan Mahmut Usta, Peugeot ve Citroën grubu binek ve ticari araçların mekanik, hidrolik ve karmaşık beyin donanımları konusunda 15 yılı aşkın bir saha tecrübesine sahiptir.",
  aboutText2: "Geleneksel sanayi dürüstlüğünü modern bilgisayarlı diyagnostik teknolojileri ile harmanlayan servisimizde, kronikleşmiş motor arızaları, tıkırtı yapan ön takım sorunları ve otomatik şanzıman adaptasyon sorunları en kestirme yoldan çözülür.",
  threeDViewUrl: "https://www.google.com/maps/@39.9264531,41.2837825,3a,75y,241.03h,99.43t/data=!3m7!1e1!3m5!1sXbnYaX-yTtxK-yPnXk-qpQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DXbnYaX-yTtxK-yPnXk-qpQ%26cb_client%3Dmaps_sv.tactile.gps%26w%3D203%26h%3D100%26yaw%3D241.03%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192"
};

const STORE_EVENT = 'servis_erzurum_store_update';

// Pure Storage Helpers
export const getStoredBookings = (): Booking[] => {
  const data = localStorage.getItem('serviserzurum_bookings');
  if (!data) {
    localStorage.setItem('serviserzurum_bookings', JSON.stringify(DEFAULT_BOOKINGS));
    return DEFAULT_BOOKINGS;
  }
  try { return JSON.parse(data); } catch { return DEFAULT_BOOKINGS; }
};

export const saveStoredBookings = (items: Booking[]) => {
  localStorage.setItem('serviserzurum_bookings', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

export const getStoredMessages = (): ContactMessage[] => {
  const data = localStorage.getItem('serviserzurum_messages');
  if (!data) {
    localStorage.setItem('serviserzurum_messages', JSON.stringify(DEFAULT_MESSAGES));
    return DEFAULT_MESSAGES;
  }
  try { return JSON.parse(data); } catch { return DEFAULT_MESSAGES; }
};

export const saveStoredMessages = (items: ContactMessage[]) => {
  localStorage.setItem('serviserzurum_messages', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

export const getStoredCampaigns = (): Campaign[] => {
  const data = localStorage.getItem('serviserzurum_campaigns');
  if (!data) {
    localStorage.setItem('serviserzurum_campaigns', JSON.stringify(DEFAULT_CAMPAIGNS));
    return DEFAULT_CAMPAIGNS;
  }
  try { return JSON.parse(data); } catch { return DEFAULT_CAMPAIGNS; }
};

export const saveStoredCampaigns = (items: Campaign[]) => {
  localStorage.setItem('serviserzurum_campaigns', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

export const getStoredSettings = (): SiteSettings => {
  const data = localStorage.getItem('serviserzurum_settings');
  if (!data) {
    localStorage.setItem('serviserzurum_settings', JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  try { return JSON.parse(data); } catch { return DEFAULT_SETTINGS; }
};

export const saveStoredSettings = (items: SiteSettings) => {
  localStorage.setItem('serviserzurum_settings', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

// Custom React Hook to seamlessly read synced reactive values inside our views
export function useAdminStore() {
  const [bookings, setBookings] = useState<Booking[]>(() => getStoredBookings());
  const [messages, setMessages] = useState<ContactMessage[]>(() => getStoredMessages());
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => getStoredCampaigns());
  const [settings, setSettings] = useState<SiteSettings>(() => getStoredSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setBookings(getStoredBookings());
      setMessages(getStoredMessages());
      setCampaigns(getStoredCampaigns());
      setSettings(getStoredSettings());
    };

    window.addEventListener(STORE_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(STORE_EVENT, handleUpdate);
    };
  }, []);

  const addBooking = (item: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const fresh: Booking = {
      ...item,
      id: 'b-' + Date.now(),
      status: 'Yeni',
      createdAt: new Date().toISOString()
    };
    const current = getStoredBookings();
    const updated = [fresh, ...current];
    saveStoredBookings(updated);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const current = getStoredBookings();
    const updated = current.map(b => b.id === id ? { ...b, status } : b);
    saveStoredBookings(updated);
  };

  const deleteBooking = (id: string) => {
    const current = getStoredBookings();
    const updated = current.filter(b => b.id !== id);
    saveStoredBookings(updated);
  };

  const addMessage = (item: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const fresh: ContactMessage = {
      ...item,
      id: 'm-' + Date.now(),
      status: 'Yeni',
      createdAt: new Date().toISOString()
    };
    const current = getStoredMessages();
    const updated = [fresh, ...current];
    saveStoredMessages(updated);
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    const current = getStoredMessages();
    const updated = current.map(m => m.id === id ? { ...m, status } : m);
    saveStoredMessages(updated);
  };

  const deleteMessage = (id: string) => {
    const current = getStoredMessages();
    const updated = current.filter(m => m.id !== id);
    saveStoredMessages(updated);
  };

  const saveCampaignsList = (list: Campaign[]) => {
    saveStoredCampaigns(list);
  };

  const saveSettings = (config: SiteSettings) => {
    saveStoredSettings(config);
  };

  return {
    bookings,
    messages,
    campaigns,
    settings,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    addMessage,
    updateMessageStatus,
    deleteMessage,
    saveCampaignsList,
    saveSettings
  };
}
