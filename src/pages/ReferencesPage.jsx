import React from 'react';
import { ChevronRight, Building2, Quote } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function ReferencesPage() {
  // Reference clients
  const references = [
    {
      id: 1,
      name: 'Teknoloji Holding A.Ş.',
      sector: 'Teknoloji',
      logo: null, // Placeholder for logo
    },
    {
      id: 2,
      name: 'Finans Bankası',
      sector: 'Finans',
      logo: null,
    },
    {
      id: 3,
      name: 'Büyük Hukuk Bürosu',
      sector: 'Hukuk',
      logo: null,
    },
    {
      id: 4,
      name: 'Eğitim Vakfı',
      sector: 'Eğitim',
      logo: null,
    },
    {
      id: 5,
      name: 'Sağlık Grubu',
      sector: 'Sağlık',
      logo: null,
    },
    {
      id: 6,
      name: 'İnşaat Firması',
      sector: 'İnşaat',
      logo: null,
    },
    {
      id: 7,
      name: 'Danışmanlık Şirketi',
      sector: 'Danışmanlık',
      logo: null,
    },
    {
      id: 8,
      name: 'Perakende Zinciri',
      sector: 'Perakende',
      logo: null,
    },
    {
      id: 9,
      name: 'Üretim Şirketi',
      sector: 'Üretim',
      logo: null,
    },
    {
      id: 10,
      name: 'Medya Grubu',
      sector: 'Medya',
      logo: null,
    },
    {
      id: 11,
      name: 'Enerji Şirketi',
      sector: 'Enerji',
      logo: null,
    },
    {
      id: 12,
      name: 'Lojistik Firması',
      sector: 'Lojistik',
      logo: null,
    },
  ];

  // Optional testimonials
  const testimonials = [
    {
      id: 1,
      company: 'Teknoloji Holding A.Ş.',
      person: 'Genel Müdür',
      text: '5000 m² ofis alanımız için profesyonel çözümler sundular. Tasarımdan kuruluma kadar tüm süreç sorunsuz ilerledi.',
    },
    {
      id: 2,
      company: 'Finans Bankası',
      person: 'Proje Yöneticisi',
      text: '12 şubemiz için toplu alım yaptık. Zamanında teslimat ve kaliteli ürünler. Memnuniyetle çalışıyoruz.',
    },
    {
      id: 3,
      company: 'Büyük Hukuk Bürosu',
      person: 'Ortak',
      text: 'Yönetici odalarımız için premium mobilyalar. Tasarım ve kalite beklentilerimizi karşıladı.',
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
            <span className="text-stone-900 font-medium">Referanslar</span>
          </nav>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
              Referanslar
            </h1>
            <p className="text-stone-600 text-base max-w-2xl">
              Kurumsal müşterilerimiz ve tamamladığımız projeler. Sektörlerinde öncü kurumlarla çalışma fırsatı bulduk.
            </p>
          </div>
        </div>

        {/* Reference Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
            Müşterilerimiz
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {references.map((reference, index) => {
              const refRef = useIntersectionObserver();
              
              return (
                <div
                  key={reference.id}
                  ref={refRef}
                  className="bg-stone-50 rounded-lg border border-stone-200 p-6 hover:border-stone-300 hover:bg-white transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[120px] reveal-up"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {reference.logo ? (
                    <img
                      src={reference.logo}
                      alt={reference.name}
                      className="max-w-full max-h-16 object-contain mb-2"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center mb-3">
                      <Building2 className="w-6 h-6 text-stone-400" />
                    </div>
                  )}
                  <div className="font-semibold text-sm text-stone-900 mb-1">
                    {reference.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {reference.sector}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supporting Text */}
        <div className="mb-12 bg-stone-50 rounded-lg p-6 md:p-8 border border-stone-200">
          <p className="text-stone-600 text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto">
            25+ yıllık sektör tecrübesi ile farklı sektörlerden kurumsal müşterilerimize hizmet veriyoruz. 
            Teknoloji, finans, hukuk, eğitim, sağlık ve daha birçok sektörde başarılı projeler gerçekleştirdik.
          </p>
        </div>

        {/* Optional Testimonials */}
        {testimonials.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
              Müşteri Görüşleri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => {
                const testimonialRef = useIntersectionObserver();
                
                return (
                  <div
                    key={testimonial.id}
                    ref={testimonialRef}
                    className="bg-white rounded-lg border border-stone-200 p-6 reveal-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Quote className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-stone-900 mb-1">
                          {testimonial.company}
                        </div>
                        <div className="text-xs text-stone-500">
                          {testimonial.person}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ReferencesPage;
