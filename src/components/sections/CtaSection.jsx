import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { COMPANY_STATS } from '../../utils/constants';

function CtaSection() {
  const revealRef = useIntersectionObserver();

  return (
    <section className="py-12 md:py-16 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={revealRef}
          className="bg-stone-900 rounded-2xl p-8 md:p-12 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 reveal-up"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
              Kurumsal Mobilya İhtiyaçlarınız İçin
            </h2>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed">
              {COMPANY_STATS.years} yıllık tecrübe, {COMPANY_STATS.branches} şube ile {COMPANY_STATS.cities} şehirde hizmetinizdeyiz. Profesyonel çözümler için yanınızdayız.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-900/20"
            >
              <ShoppingBag className="w-4 h-4" />
              Ürünleri İncele
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-stone-700 transition-colors border border-stone-700"
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
