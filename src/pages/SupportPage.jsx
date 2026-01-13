import React from 'react';
import { ChevronRight, Shield, Wrench, Package, Headphones, CheckCircle2, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function SupportPage() {
  // Support scope
  const supportScope = [
    {
      icon: Shield,
      title: 'Garanti Hizmetleri',
      description: 'Üretim ve işçilik hatalarına karşı garanti kapsamı',
    },
    {
      icon: Wrench,
      title: 'Bakım ve Onarım',
      description: 'Periyodik bakım ve onarım hizmetleri',
    },
    {
      icon: Package,
      title: 'Yedek Parça',
      description: 'Yedek parça temini ve değişim hizmeti',
    },
    {
      icon: Headphones,
      title: 'Teknik Destek',
      description: 'Telefon ve e-posta ile teknik destek',
    },
  ];

  // Service process steps
  const serviceProcess = [
    {
      step: '1',
      title: 'Destek Talebi',
      description: 'Telefon, e-posta veya şubelerimizden destek talebi oluşturun',
    },
    {
      step: '2',
      title: 'Değerlendirme',
      description: 'Teknik ekibimiz talebinizi değerlendirir ve çözüm önerir',
    },
    {
      step: '3',
      title: 'Müdahale',
      description: 'Uzman ekip tarafından yerinde müdahale veya servis merkezi hizmeti',
    },
    {
      step: '4',
      title: 'Takip',
      description: 'Hizmet sonrası memnuniyet takibi ve destek',
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
            <span className="text-stone-900 font-medium">Satış Sonrası Destek</span>
          </nav>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
              Satış Sonrası Destek
            </h1>
            <p className="text-stone-600 text-base max-w-2xl">
              Ürünleriniz için kapsamlı destek hizmetleri. Garanti, bakım ve teknik destek ile yanınızdayız.
            </p>
          </div>
        </div>

        {/* 1. Support Scope */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
            Destek Kapsamı
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportScope.map((item, index) => {
              const ItemIcon = item.icon;
              const itemRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={itemRef}
                  className="bg-stone-50 rounded-lg border border-stone-200 p-5 text-center reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ItemIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Warranty Info */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
            Garanti Bilgileri
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-stone-50 rounded-lg border border-stone-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">2-3 Yıl Kurumsal Garanti</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Tüm ürünlerimiz üretim ve işçilik hatalarına karşı 2-3 yıl kurumsal garanti kapsamındadır. 
                    Garanti süresi içinde ücretsiz onarım ve değişim hizmeti sunulur.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-50 rounded-lg border border-stone-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">Yedek Parça Desteği</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Garanti süresi bitiminden sonra 5 yıl boyunca yedek parça temin garantisi. 
                    Tüm ürünlerimiz için yedek parça stoklarımız mevcuttur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Service Process */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
            Hizmet Süreci
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceProcess.map((process, index) => {
              const processRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={processRef}
                  className="bg-white rounded-lg border border-stone-200 p-5 reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold mb-3">
                    {process.step}
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2 text-sm">
                    {process.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Contact CTA */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-xl p-8 md:p-10 text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-center">
              Destek İçin İletişime Geçin
            </h2>
            <p className="text-stone-300 mb-8 text-center text-sm md:text-base">
              Garanti, bakım veya teknik destek ihtiyacınız için bizimle iletişime geçin. 
              Hızlı ve profesyonel çözüm sunuyoruz.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wide mb-1">Telefon</div>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-lg font-semibold hover:text-red-400 transition-colors">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <Clock className="w-3 h-3" />
                  <span>{CONTACT_INFO.workingHours}</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wide mb-1">E-posta</div>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-semibold hover:text-red-400 transition-colors break-all">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-stone-400">
                  24 saat içinde dönüş yapılır
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                İletişim Formu
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SupportPage;
