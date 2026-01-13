import React from 'react';
import { MapPin, Phone, Clock, ArrowRight, Navigation } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function StoresSection() {
  const revealRef1 = useIntersectionObserver();
  const revealRef2 = useIntersectionObserver();
  const revealRef3 = useIntersectionObserver();
  const revealRef4 = useIntersectionObserver();
  const revealRef5 = useIntersectionObserver();

  const branches = [
    {
      id: 1,
      city: 'İstanbul',
      name: 'Maslak Showroom',
      address: 'Büyükdere Cad. No: 142, Maslak',
      phone: '+90 (212) 555 10 01',
      hours: '09:00 - 19:00',
    },
    {
      id: 2,
      city: 'Ankara',
      name: 'Siteler Mağaza',
      address: 'Karacakaya Cad. No: 88, Siteler',
      phone: '+90 (312) 555 30 03',
      hours: '09:00 - 19:30',
    },
    {
      id: 3,
      city: 'İzmir',
      name: 'Çankaya Showroom',
      address: 'Atatürk Bulvarı No: 120, Çankaya',
      phone: '+90 (232) 555 40 04',
      hours: '09:30 - 19:30',
    },
    {
      id: 4,
      city: 'Bursa',
      name: 'Nilüfer Mağaza',
      address: 'Fomara Cad. No: 45, Nilüfer',
      phone: '+90 (224) 555 50 05',
      hours: '09:00 - 19:00',
    },
  ];

  const cardRefs = [revealRef2, revealRef3, revealRef4, revealRef5];

  return (
    <section className="py-12 md:py-16 px-4 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto">
        <div ref={revealRef1} className="text-center mb-10 reveal-up">
          <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Lokasyonlarımız
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mb-3 text-stone-900">
            Şubelerimiz
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-base">
            Türkiye genelindeki 8 şubemizde ürünlerimizi yakından inceleyebilir, iç mimarlarımızdan ücretsiz proje danışmanlığı alabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              ref={cardRefs[index]}
              className="group bg-stone-50 rounded-xl border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 p-6 reveal-up"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-bold text-red-600 mb-1">{branch.city}</div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-red-600 transition-colors">
                    {branch.name}
                  </h3>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">AÇIK</span>
              </div>

              <div className="space-y-2.5 text-sm text-stone-600 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-stone-400 flex-shrink-0" />
                  <span className="text-xs leading-relaxed">{branch.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span className="text-xs">{branch.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span className="text-xs">{branch.hours}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-stone-200">
                <a
                  href="/stores"
                  className="flex-1 bg-stone-900 text-white py-2 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Detay
                </a>
                <a
                  href="/stores"
                  className="flex-1 border border-stone-200 text-stone-700 py-2 rounded-lg text-xs font-semibold hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  Randevu
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/stores"
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 hover:gap-3 transition-all"
          >
            Tüm Şubeleri Gör
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default StoresSection;
