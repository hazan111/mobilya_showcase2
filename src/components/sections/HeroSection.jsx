import React, { useEffect, useRef } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function HeroSection() {
  const { scrollY } = useScroll();
  const heroImgRef = useRef(null);
  const revealRef1 = useIntersectionObserver();
  const revealRef2 = useIntersectionObserver();

  useEffect(() => {
    const heroImg = heroImgRef.current;
    if (heroImg && scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
  }, [scrollY]);

  return (
    <section
      id="home"
      className="relative pt-24 pb-8 md:pt-28 md:pb-12 px-4 md:px-8 bg-white overflow-hidden"
    >
      {/* Background Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto relative z-10">
        {/* Text Content */}
        <div className="lg:col-span-5 space-y-6">
          <div
            ref={revealRef1}
            className="reveal-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-red-700">
              Kurumsal Mobilya Çözümleri
            </span>
          </div>

          <h1
            ref={revealRef2}
            className="reveal-up text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight tracking-tight text-stone-900"
            style={{ transitionDelay: '100ms' }}
          >
            Ofis ve Ticari
            <br />
            <span className="font-normal italic text-red-600">Alanlar İçin</span>
            <br />
            Profesyonel Mobilya
          </h1>

          <p
            className="reveal-up text-base md:text-lg text-stone-600 font-light max-w-lg leading-relaxed"
            style={{ transitionDelay: '150ms' }}
          >
            25+ yıl tecrübe, 8 şube, 6 şehir. Kurumsal mobilya ihtiyaçlarınız için geniş ürün yelpazesi ve satış sonrası destek.
          </p>

          <div
            className="reveal-up flex flex-wrap gap-3 pt-2"
            style={{ transitionDelay: '200ms' }}
          >
            <a
              href="#categories"
              className="group relative inline-flex items-center justify-center px-6 py-3.5 bg-red-600 text-white rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-red-200 hover:bg-red-700 font-semibold"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Ürünleri İncele
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white border-2 border-stone-200 text-stone-900 rounded-lg hover:bg-stone-50 hover:border-red-200 transition-colors font-semibold"
            >
              Kategorilere Göz At
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 text-stone-700 rounded-lg hover:text-red-600 transition-colors font-semibold"
            >
              Şubelerimizi Ziyaret Et
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Product Image */}
        <div className="lg:col-span-7 relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full">
          <div className="absolute inset-0 rounded-2xl overflow-hidden reveal-scale shadow-xl bg-stone-100">
            <img
              ref={heroImgRef}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600"
              alt="Kurumsal Ofis Mobilyaları"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-100"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1600';
              }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
              style={{ opacity: 0 }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
