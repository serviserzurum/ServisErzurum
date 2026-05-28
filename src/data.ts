/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, ReviewItem, FAQItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'periyodik-bakim',
    title: 'Periyodik Bakım',
    description: 'Aracınızın ömrünü uzatan motor yağı, filtre değişimleri ve multi-nokta güvenlik kontrolü.',
    iconName: 'Wrench',
    averageTime: '45 - 90 Dakika',
    estimatedPriceRange: '₺1.800 - ₺4.500',
    features: [
      'Motor Yağı Değişimi (PSA Onaylı Total/Mobil)',
      'Yağ, Hava, Polen Filtre Değişimleri',
      'Antifriz ve Fren Sıvısı Ölçüm/Seviye Tamamlama',
      'Fren Balata Kontrolleri ve Alt Takım Muayenesi',
      'Servis Sayacı ve Arıza Hafızası Sıfırlama'
    ]
  },
  {
    id: 'ariza-tespit',
    title: 'Bilgisayarlı Arıza Tespit',
    description: 'Peugeot ve Citroën orijinal arıza tespit cihazları (Lexia/Diagbox) ile milimetrik hata teşhisi.',
    iconName: 'Cpu',
    averageTime: '20 - 45 Dakika',
    estimatedPriceRange: '₺500 - ₺1.200',
    features: [
      'Motor ve Şanzıman Beyni Arıza Okuma',
      'ABS, ESP, Airbag Sistem Hataları Tespiti',
      'Canlı Sensör Verileri Analizi',
      'Yol Testi ve Anlık Parametre Takibi',
      'Parça Adaptasyonu ve Kalibrasyon İşlemleri'
    ]
  },
  {
    id: 'fren-balata',
    title: 'Fren Sistemi Onarımı',
    description: 'Sürüş güvenliğiniz için aşınmış balata, disk değişimi ve hidrolik sistem kontrolleri.',
    iconName: 'ShieldAlert',
    averageTime: '30 - 60 Dakika',
    estimatedPriceRange: '₺1.200 - ₺3.500',
    features: [
      'Ön-Arka Fren Balata Değişimi',
      'Fren Disk Değişimi ve Tornalama Hizmeti',
      'Fren Kaliper Bakımları ve Yağlaması',
      'Elektronik El Freni Kalibrasyonu (EPB)',
      'Hidrolik Sızıntı Testi ve Fren Yağı Yenileme'
    ]
  },
  {
    id: 'motor-sanziman',
    title: 'Motor & Şanzıman Revizyonu',
    description: 'Triger seti değişimi, silindir kapak contası yenileme ve şanzıman arıza onarımları.',
    iconName: 'Settings',
    averageTime: '1 - 3 İş Günü',
    estimatedPriceRange: 'Detaylı İnceleme Sonrası',
    features: [
      'Orijinal Triger Seti (Devirdaimli) Değişimi',
      'Silindir Kapak Contası ve Supap Ayarları',
      'Manuel ve Otomatik Şanzıman Bakımları',
      'Debriyaj Seti (Baskı Balata) Yenileme',
      'Motor Yağ ve Su Sızıntısı Giderme İşlemleri'
    ]
  },
  {
    id: 'on-takim',
    title: 'Süspansiyon & Alt Takım',
    description: 'Erzurum yol şartlarında yıpranan amortisör, rot başı ve salıncak elemanlarının değişimi.',
    iconName: 'Workflow',
    averageTime: '1 - 3 Saat',
    estimatedPriceRange: '₺1.000 - ₺4.000',
    features: [
      'Amortisör ve Amortisör Takozlarının Değişimi',
      'Rot Başı, Rotil ve Askı Rotu Yenileme',
      'Salıncak (Tabla) Burç Değişimleri',
      'Aks Kafaları ve Aks Körüklerinin Kontrol/Değişimi',
      'Direksiyon Kutusu Revizyonu ve Boşluk Giderme'
    ]
  },
  {
    id: 'yedek-parca',
    title: 'Yedek Parça Tedariği',
    description: 'Peugeot ve Citroën için orijinal (OEM) ve garantili muadil yedek parça seçenekleri.',
    iconName: 'Package',
    averageTime: 'Anında Stoktan',
    estimatedPriceRange: 'Parçaya Göre Değişir',
    features: [
      'PSA Grup Orijinal Logolu Yedek Parçalar',
      'Yüksek Kaliteli OEM Muadil Markalar (Eurorepar, Valeo, Sachs)',
      'Filtre Grupları ve Mekanik Parçalar',
      'Elektrik, Aydınlatma ve Sensör Grupları',
      'Tüm Yedek Parçalarda Garanti ve Güvence'
    ]
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Yusuf Kenan Yıldız',
    rating: 5,
    text: 'Peugeot 3008 aracımda bir türlü bulunamayan AdBlue arızasını Mahmut Usta sayesinde çok hızlı ve masrafsız şekilde çözdük. İşinin ehli, dürüst bir esnaf. Erzurum\'da PSA grubu aracı olan herkese tavsiye ederim.',
    date: '12 Mayıs 2026',
    vehicle: 'Peugeot 3008 (1.6 BlueHDi)'
  },
  {
    id: 'rev-2',
    author: 'Sinan Çelik',
    rating: 5,
    text: 'Citroën C4 Picasso aracımın periyodik bakımı ve şanzıman kalibrasyonu için gittim. Mahmut Usta her aşamayı göstererek, anlatarak yaptı. Çayımızı içtik, dürüst ve şeffaf esnaflık budur. Emeğine sağlık usta.',
    date: '28 Nisan 2026',
    vehicle: 'Citroën C4 Picasso (1.6 e-HDi)'
  },
  {
    id: 'rev-3',
    author: 'Murat Demir',
    rating: 5,
    text: 'Erzurum Yeni Sanayi Sitesi\'nde Peugeot 208 aracımın ön takım tıkırtısı için gitmiştim. Sorunu hemen bulup sadece değişmesi gereken parçayı değiştirdi. Gereksiz masraf çıkarmayan, helal para kazanan dürüst bir usta.',
    date: '15 Mart 2026',
    vehicle: 'Peugeot 208 (1.2 PureTech)'
  },
  {
    id: 'rev-4',
    author: 'Zeynep Kaya',
    rating: 5,
    text: 'Aracımın bakım zamanı gelmişti, internetten yorumlara bakıp geldim. Çok ilgili karşıladılar. Fiyatlar gayet makul ve kullanılan parçaların orijinal olduğunu kutularından gösterdiler. Teşekkürler.',
    date: '02 Şubat 2026',
    vehicle: 'Citroën C3 (1.2 PureTech)'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Peugeot ve Citroen dışında araçlara da bakıyor musunuz?',
    answer: 'Ana uzmanlık alanımız Peugeot ve Citroën (PSA Grubu) araçlar olmakla birlikte, Opel ve DS gibi diğer PSA grubu araçların mekanik ve elektronik onarımlarını da garantili olarak yapmaktayız. Diğer marka araçlar için de bakım randevusu alabilirsiniz.'
  },
  {
    question: 'Yapılan işlemler ve takılan parçalar garantili mi?',
    answer: 'Evet. Mahmut Usta özel servisimizde yapılan tüm işçilik süreçleri ile servisimizden tedarik edilen ve montajı yapılan orijinal veya OEM yedek parçalar 1 yıl süreyle garantimiz altındadır.'
  },
  {
    question: 'Erzorom iklim durumuna göre antifriz değişimi yapıyor musunuz?',
    answer: 'Erzurum\'un sert kış şartlarında motor bloğunu korumak hayati önem taşır. Servisimizde her bakımda antifriz derecenizi ölçüyoruz. Erzurum şartları için dereceyi -40°C altına kadar dayanıklı olacak şekilde özel Peugeot/Citroën onaylı antifrizlerle yeniliyoruz.'
  },
  {
    question: 'Randevusuz gelirsem hemen hizmet alabilir miyim?',
    answer: 'Acil durumlar haricinde, siz değerli müşterilerimizin vakit kaybetmemesi adına sitemiz üzerinden veya 0532 166 82 79 numaralı telefondan randevu almanızı tavsiye ederiz. Randevulu araçlara öncelik verilmektedir.'
  },
  {
    question: 'Arıza tespiti için ücret alıyor musunuz?',
    answer: 'Aracınızın tamirini servisimizde yaptırdığınız durumlarda bilgisayarlı arıza tespit ve diyagnostik tarama testi için ekstra bir ücret talep etmiyoruz.'
  }
];
