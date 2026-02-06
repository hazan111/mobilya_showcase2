import React from 'react';
import { Truck, Wrench, Shield, HeadphonesIcon, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function SupportSection() {
  const revealRef1 = useIntersectionObserver();
  const revealRef2 = useIntersectionObserver();
  const revealRef3 = useIntersectionObserver();
  const revealRef4 = useIntersectionObserver();
  const revealRef5 = useIntersectionObserver();

  const services = [
    {
      icon: Truck,
      title: 'Hızlı Teslimat',
      description: 'Hazır ürünlerde hızlı teslimat. Proje ürünleri için özel planlama.',
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

  const cardRefs = [revealRef2, revealRef3, revealRef4, revealRef5];

  return (
    <section className="py-12 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-surface border-t border-primary-200">
      <div className="max-w-6xl mx-auto">
        <div ref={revealRef1} className="text-center mb-8 sm:mb-12 reveal-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold tracking-tight mb-2 text-stone-900">
            Teslimat & Destek
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Ürünlerinizden sonra da yanınızdayız. Hızlı teslimat, kurulum, garanti ve satış sonrası destek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <div
                key={index}
                ref={cardRefs[index]}
                className="bg-surface-elevated p-5 rounded-card border border-primary-200 shadow-soft hover:border-primary-300 hover:shadow-card transition-all duration-200 reveal-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 mb-3">
                  <ServiceIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-semibold mb-2 text-stone-900">
                  {service.title}
                </h3>
                <p className="text-xs text-stone-500 mb-3 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:gap-2 transition-all"
                >
                  {service.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SupportSection;
