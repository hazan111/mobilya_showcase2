import React from 'react';
import { Award, Building2, MapPin, Briefcase } from 'lucide-react';
import { COMPANY_STATS } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function AboutSection() {
  const revealRef1 = useIntersectionObserver();
  const revealRef2 = useIntersectionObserver();
  const revealRef3 = useIntersectionObserver();
  const revealRef4 = useIntersectionObserver();
  const revealRef5 = useIntersectionObserver();

  const stats = [
    { icon: Award, value: COMPANY_STATS.years, label: 'Yıl Tecrübe' },
    { icon: Building2, value: COMPANY_STATS.branches, label: 'Şube' },
    { icon: MapPin, value: COMPANY_STATS.cities, label: 'Şehir' },
    { icon: Briefcase, value: COMPANY_STATS.projects + '+', label: 'Kurumsal Proje' },
  ];

  const refs = [revealRef2, revealRef3, revealRef4, revealRef5];

  return (
    <section className="py-12 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-surface border-t border-primary-200">
      <div className="max-w-6xl mx-auto">
        <div
          ref={revealRef1}
          className="text-center mb-8 sm:mb-12 reveal-up"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold tracking-tight mb-3 text-stone-900">
            Kurumsal Güven
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-base leading-relaxed">
            Sektördeki tecrübemiz ve operasyonel gücümüzle kurumsal mobilya çözümlerinde güvenilir ortağınızız.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                ref={refs[index]}
                className="text-center p-4 sm:p-6 bg-surface-elevated rounded-card border border-primary-200 shadow-soft hover:shadow-card hover:border-primary-300 transition-all duration-200 reveal-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-surface-elevated border border-primary-200 rounded-full flex items-center justify-center text-primary-700 mx-auto mb-3 shadow-soft">
                  <StatIcon className="w-6 h-6" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 mb-1 tracking-tight">{stat.value}</div>
                <p className="text-sm font-medium text-stone-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
