import React, { useEffect, useRef } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function HeroSection() {
  const { scrollY } = useScroll();
  const heroImgRef = useRef(null);
  const revealRef1 = useIntersectionObserver();
  const revealRef2 = useIntersectionObserver();
  const revealRef3 = useIntersectionObserver();
  const revealRef4 = useIntersectionObserver();

  useEffect(() => {
    const heroImg = heroImgRef.current;
    if (heroImg) {
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrollY * 0.4}px)`;
      } else {
        heroImg.style.transform = `translateY(${window.innerHeight * 0.4}px)`;
      }
    }
  }, [scrollY]);

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 pb-10 sm:pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 md:px-8 bg-surface overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] bg-primary-200 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none opacity-30" aria-hidden="true" />

      <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center max-w-7xl mx-auto relative z-10">
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div
            ref={revealRef1}
            className="reveal-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 border border-primary-200 text-primary-700"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-700" />
            </span>
            <span className="text-[11px] uppercase tracking-overline font-semibold text-primary-700">
              Kurumsal Mobilya Çözümleri
            </span>
          </div>

          <h1
            ref={revealRef2}
            className="reveal-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light leading-[1.1] sm:leading-[1.08] tracking-tight text-stone-900"
            style={{ transitionDelay: '100ms' }}
          >
            Ofis ve Ticari
            <br />
            <span className="font-semibold text-primary-800 tracking-tight">Alanlar İçin</span>
            <br />
            Profesyonel Mobilya
          </h1>

          <p
            ref={revealRef3}
            className="reveal-up text-base md:text-lg text-stone-500 font-light max-w-lg leading-relaxed"
            style={{ transitionDelay: '150ms' }}
          >
            25+ yıl tecrübe, 8 şube, 6 şehir. Kurumsal mobilya ihtiyaçlarınız için geniş ürün yelpazesi ve satış sonrası destek.
          </p>

          <div
            ref={revealRef4}
            className="reveal-up flex flex-col sm:flex-row flex-wrap gap-3 pt-2"
            style={{ transitionDelay: '200ms' }}
          >
            <a
              href="#categories"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 bg-primary-700 text-white rounded-button font-medium shadow-soft hover:bg-primary-800 active:bg-primary-900 transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Ürünleri İncele
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 bg-surface-elevated border border-primary-200 text-primary-800 rounded-button font-medium hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all duration-200"
            >
              Kategorilere Göz At
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 text-primary-600 rounded-button hover:text-primary-800 font-medium transition-colors duration-200"
            >
              Şubelerimizi Ziyaret Et
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 relative h-[32vh] min-h-[220px] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] w-full">
          <div className="absolute inset-0 rounded-card-lg overflow-hidden shadow-card bg-stone-100">
            <img
              ref={heroImgRef}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600"
              alt="Kurumsal Ofis Mobilyaları"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1600';
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
              }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
              }}
              style={{ opacity: 1, transform: 'translateY(0)' }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
