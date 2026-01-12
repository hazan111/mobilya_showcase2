import React from 'react';
import { Truck, Wrench, Shield, HeadphonesIcon, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function SupportSection() {
  const revealRef = useIntersectionObserver();

  const services = [
    {
      icon: Truck,
      title: 'Hızlı Teslimat',
      description: 'Stokta olan ürünlerde hızlı teslimat. Proje ürünleri için özel planlama.',
      cta: 'Teslimat Bilgileri',
    },
    {
      icon: Wrench,
      title: 'Kurulum Desteği',
      description: 'Tüm ürünler için profesyonel kurulum hizmeti. Ekiplerimiz tarafından eksiksiz gerçekleştirilir.',
      cta: 'Kurulum Hizmeti',
    },
    {
      icon: Shield,
      title: 'Garanti & Bakım',
      description: '2 yıl garanti kapsamı. Düzenli bakım hizmetleri ve yedek parça desteği.',
      cta: 'Garanti Bilgileri',
    },
    {
      icon: HeadphonesIcon,
      title: 'Satış Sonrası Destek',
      description: '7/24 teknik destek. Sorunlarınız için anında çözüm sunuyoruz.',
      cta: 'Destek Al',
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-stone-50 border-t border-stone-200">
      <div className="max-w-6xl mx-auto">
        <div ref={revealRef} className="text-center mb-10 reveal-up">
          <h2 className="text-3xl md:text-4xl font-serif mb-2 text-stone-900">
            Teslimat & Destek
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base">
            Ürünlerinizden sonra da yanınızdayız. Hızlı teslimat, kurulum, garanti ve satış sonrası destek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 reveal-up"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-3">
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-semibold mb-2 text-stone-900">
                {service.title}
              </h3>
              <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                {service.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-red-600 font-semibold text-sm hover:gap-2 transition-all"
              >
                {service.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportSection;
