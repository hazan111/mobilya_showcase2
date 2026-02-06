import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { COMPANY_STATS } from '../../utils/constants';

function CtaSection() {
  const revealRef = useIntersectionObserver();

  return (
    <section className="py-12 sm:py-14 md:py-20 bg-surface border-t border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div 
          ref={revealRef}
          className="bg-ink rounded-card-lg p-6 sm:p-8 md:p-12 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 reveal-up shadow-card border border-ink-border"
        >
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-serif font-semibold tracking-tight mb-4">
              Kurumsal Mobilya İhtiyaçlarınız İçin
            </h2>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed">
              {COMPANY_STATS.years} yıllık tecrübe, {COMPANY_STATS.branches} şube ile {COMPANY_STATS.cities} şehirde hizmetinizdeyiz. Profesyonel çözümler için yanınızdayız.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 bg-white text-ink px-6 py-3.5 min-h-[48px] rounded-button font-medium hover:bg-primary-100 transition-all shadow-soft touch-manipulation"
            >
              <ShoppingBag className="w-4 h-4" />
              Ürünleri İncele
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-white px-6 py-3.5 min-h-[48px] rounded-button font-medium hover:bg-white/10 transition-colors border border-primary-400 touch-manipulation"
            >
              Şubelerimizi Ziyaret Et
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
