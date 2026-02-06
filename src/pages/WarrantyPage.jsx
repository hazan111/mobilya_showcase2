import React from 'react';
import { ChevronRight, Shield, Wrench, Clock, CheckCircle2, XCircle, Phone, Mail, AlertCircle } from 'lucide-react';
import { CONTACT_INFO, ROUTES, LABELS } from '../utils/constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function WarrantyPage() {
  // Warranty coverage details
  const warrantyCoverage = [
    {
      title: 'Garanti Süresi',
      details: [
        'Standart ürünler: 2 yıl',
        'Premium ürünler: 3 yıl',
        'Garanti süresi fatura tarihinden itibaren başlar',
      ],
    },
    {
      title: 'Garanti Kapsamı',
      details: [
        'Üretim hataları',
        'İşçilik hataları',
        'Malzeme kusurları',
        'Ücretsiz onarım veya değişim',
      ],
    },
    {
      title: 'Garanti Dışı',
      details: [
        'Normal aşınma ve yıpranma',
        'Yanlış kullanım',
        'Yetkisiz müdahale',
        'Doğal afetler',
      ],
    },
  ];

  // Maintenance services
  const maintenanceServices = [
    {
      title: 'Periyodik Bakım',
      description: 'Yıllık periyodik bakım hizmeti. Ürünlerinizin ömrünü uzatır.',
      frequency: 'Yıllık',
      cost: 'Ücretli',
    },
    {
      title: 'Acil Onarım',
      description: 'Acil durumlarda hızlı müdahale. 24 saat içinde değerlendirme.',
      frequency: 'Talep Üzerine',
      cost: 'Garanti kapsamında ücretsiz',
    },
    {
      title: 'Yedek Parça Değişimi',
      description: 'Aşınan veya hasar gören parçaların değişimi.',
      frequency: 'Talep Üzerine',
      cost: 'Garanti sonrası ücretli',
    },
    {
      title: 'Teknik Kontrol',
      description: 'Ürünlerinizin teknik durumunun kontrolü ve raporlama.',
      frequency: 'Talep Üzerine',
      cost: 'Ücretli',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href={ROUTES.HOME} className="hover:text-stone-900 transition-colors">{LABELS.HOME}</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Garanti & Bakım</span>
          </nav>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
              Garanti & Bakım
            </h1>
            <p className="text-stone-600 text-base max-w-2xl">
              Garanti kapsamı ve bakım hizmetleri hakkında detaylı bilgiler.
            </p>
          </div>
        </div>

        {/* 1. Warranty Coverage */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-600" />
            Garanti Kapsamı
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {warrantyCoverage.map((item, index) => {
              const itemRef = useIntersectionObserver();
              const isExcluded = item.title === 'Garanti Dışı';
              
              return (
                <div
                  key={index}
                  ref={itemRef}
                  className={`rounded-lg border p-5 reveal-up ${
                    isExcluded 
                      ? 'bg-stone-50 border-stone-200' 
                      : 'bg-primary-50 border-primary-200'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <h3 className={`font-semibold mb-4 text-sm ${
                    isExcluded ? 'text-stone-900' : 'text-primary-900'
                  }`}>
                    {item.title}
                  </h3>
                  <ul className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        {isExcluded ? (
                          <XCircle className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={isExcluded ? 'text-stone-600' : 'text-stone-700'}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Maintenance Services */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary-600" />
            Bakım Hizmetleri
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {maintenanceServices.map((service, index) => {
              const serviceRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={serviceRef}
                  className="bg-white border border-stone-200 rounded-lg p-5 reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-stone-900 text-sm">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <Clock className="w-3 h-3" />
                      <span>{service.frequency}</span>
                    </div>
                    <div className={`font-medium ${
                      service.cost.includes('ücretsiz') || service.cost.includes('Ücretsiz')
                        ? 'text-green-600'
                        : 'text-stone-700'
                    }`}>
                      {service.cost}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Support Contact Info */}
        <div className="bg-stone-50 rounded-lg border border-stone-200 p-6 md:p-8">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
            Destek İletişim
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Telefon</div>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-lg font-semibold text-stone-900 hover:text-primary-600 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600 ml-13">
                <Clock className="w-3 h-3" />
                <span>{CONTACT_INFO.workingHours}</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">E-posta</div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-semibold text-stone-900 hover:text-primary-600 transition-colors break-all">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
              <div className="text-xs text-stone-600 ml-13">
                24 saat içinde dönüş yapılır
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-stone-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-stone-900 mb-1 text-sm">Önemli Not</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Garanti kapsamından yararlanmak için fatura veya garanti belgesini saklayın. 
                  Garanti işlemleri için ürün seri numarası ve fatura bilgisi gereklidir.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WarrantyPage;
