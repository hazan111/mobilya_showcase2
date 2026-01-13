import React from 'react';
import { ChevronRight, Truck, Wrench, MapPin, Clock, Package, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function DeliveryPage() {
  // Delivery timelines
  const deliveryTimelines = [
    {
      type: 'Stoklu Ürünler',
      timeline: '3-5 İş Günü',
      description: 'Stokta bulunan ürünler için hızlı teslimat',
      location: 'İstanbul içi',
    },
    {
      type: 'Stoklu Ürünler',
      timeline: '5-7 İş Günü',
      description: 'Stokta bulunan ürünler için teslimat',
      location: 'Şehir dışı',
    },
    {
      type: 'Özel Üretim',
      timeline: '15-20 İş Günü',
      description: 'Özel ölçü ve renk seçenekleri için üretim süresi',
      location: 'Tüm Türkiye',
    },
    {
      type: 'Toplu Sipariş',
      timeline: 'Projeye Özel',
      description: 'Büyük projeler için özel planlama ve teslimat',
      location: 'Tüm Türkiye',
    },
  ];

  // Installation options
  const installationOptions = [
    {
      title: 'Ücretsiz Kurulum',
      description: 'Tüm ofis mobilyalarında profesyonel kurulum hizmeti dahildir',
      included: [
        'Uzman montaj ekibi',
        'Teslimat ile aynı gün kurulum',
        'Ambalaj atıklarının toplanması',
        'Kurulum sonrası kontrol',
      ],
    },
    {
      title: 'Kendi Kurulumunuz',
      description: 'Kendi ekibinizle kurulum yapmak isterseniz montaj kılavuzu sağlanır',
      included: [
        'Detaylı montaj kılavuzu',
        'Teknik destek hattı',
        'Video anlatımlar',
        'Eksik parça desteği',
      ],
    },
  ];

  // Regional delivery notes
  const regionalNotes = [
    {
      region: 'İstanbul',
      note: 'Merkez ilçeler için aynı gün teslimat seçeneği mevcuttur',
      deliveryTime: '3-5 iş günü',
    },
    {
      region: 'Ankara, İzmir, Bursa',
      note: 'Şehir merkezi için hızlı teslimat',
      deliveryTime: '5-7 iş günü',
    },
    {
      region: 'Diğer Şehirler',
      note: 'Kargo ile teslimat. Kurulum için yerel ekip koordinasyonu',
      deliveryTime: '7-10 iş günü',
    },
    {
      region: 'Adalar ve Uzak Bölgeler',
      note: 'Özel teslimat planlaması gereklidir',
      deliveryTime: 'Talep üzerine',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Teslimat Bilgileri</span>
          </nav>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
              Teslimat Bilgileri
            </h1>
            <p className="text-stone-600 text-base max-w-2xl">
              Teslimat süreleri, kurulum seçenekleri ve bölgesel teslimat bilgileri.
            </p>
          </div>
        </div>

        {/* 1. Delivery Timelines */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-600" />
            Teslimat Süreleri
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {deliveryTimelines.map((item, index) => {
              const itemRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={itemRef}
                  className="bg-white border border-stone-200 rounded-lg p-5 reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-stone-900 text-sm mb-1">
                        {item.type}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold">
                      {item.timeline}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Installation Options */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-red-600" />
            Kurulum Seçenekleri
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {installationOptions.map((option, index) => {
              const optionRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={optionRef}
                  className="bg-stone-50 border border-stone-200 rounded-lg p-6 reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <h3 className="font-semibold text-stone-900 mb-2 text-sm">
                    {option.title}
                  </h3>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <ul className="space-y-2">
                    {option.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Regional Delivery Notes */}
        <div className="mb-8">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            Bölgesel Teslimat Notları
          </h2>
          <div className="space-y-3">
            {regionalNotes.map((region, index) => {
              const regionRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={regionRef}
                  className="bg-white border border-stone-200 rounded-lg p-4 reveal-up"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-stone-900 text-sm">
                          {region.region}
                        </h3>
                        <span className="text-xs text-stone-500 bg-stone-50 px-2 py-0.5 rounded">
                          {region.deliveryTime}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">
                        {region.note}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-stone-50 rounded-lg border border-stone-200 p-6">
          <h3 className="font-semibold text-stone-900 mb-4 text-sm flex items-center gap-2">
            <Package className="w-4 h-4 text-red-600" />
            Ek Bilgiler
          </h3>
          <ul className="space-y-2 text-xs text-stone-600">
            <li className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
              <span>Teslimat öncesi telefon ile randevu alınır</span>
            </li>
            <li className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
              <span>Kurulum için uygun alan hazırlığı müşteri sorumluluğundadır</span>
            </li>
            <li className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
              <span>Asansör veya merdiven erişimi gerektiren durumlarda önceden bilgilendirme yapılır</span>
            </li>
            <li className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
              <span>Teslimat ve kurulum hizmetleri hafta içi 09:00 - 18:00 saatleri arasındadır</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default DeliveryPage;
