import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle, FileText, Users, Wrench, Package, Building2, Briefcase, Award, Phone } from 'lucide-react';
import { CATEGORIES, COMPANY_STATS } from '../utils/constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function CustomProjectPage() {
  // Get custom project category
  const projectCategory = CATEGORIES.find(c => c.title === 'Proje / Özel Üretim') || CATEGORIES[4];

  // Production process steps
  const processSteps = [
    {
      step: '01',
      title: 'İhtiyaç Analizi',
      description: 'Proje gereksinimlerinizi belirliyoruz. Ölçü, malzeme ve tasarım tercihlerinizi değerlendiriyoruz.',
      icon: FileText,
    },
    {
      step: '02',
      title: 'Tasarım & Teklif',
      description: '3D görselleştirme ve detaylı teknik çizimler hazırlıyoruz. Fiyat teklifi sunuyoruz.',
      icon: Users,
    },
    {
      step: '03',
      title: 'Onay & Üretim',
      description: 'Onay sonrası üretim sürecini başlatıyoruz. Kalite kontrolü ile ilerliyoruz.',
      icon: Wrench,
    },
    {
      step: '04',
      title: 'Teslimat & Kurulum',
      description: 'Profesyonel ekip ile teslimat ve kurulum gerçekleştiriyoruz. Son kontrol yapıyoruz.',
      icon: Package,
    },
  ];

  // Example project types
  const projectTypes = [
    {
      icon: Building2,
      title: 'Kurumsal Ofis Projeleri',
      description: 'Büyük ofis alanları için komple mobilya çözümleri',
      examples: ['Açık ofis alanları', 'Toplantı odaları', 'Yönetici katları'],
    },
    {
      icon: Briefcase,
      title: 'Özel Ölçü Üretim',
      description: 'Standart ölçülere uymayan alanlar için özel tasarım',
      examples: ['Köşe çözümleri', 'Özel yükseklik', 'Eğimli alanlar'],
    },
    {
      icon: Award,
      title: 'Toplu Alım Projeleri',
      description: 'Çoklu ürün siparişleri için özel fiyatlandırma',
      examples: ['Şube açılışları', 'Yenileme projeleri', 'Genişleme planları'],
    },
  ];

  // Trust indicators
  const trustIndicators = [
    {
      value: COMPANY_STATS.years,
      label: 'Yıl Tecrübe',
    },
    {
      value: COMPANY_STATS.projects,
      label: 'Tamamlanan Proje',
    },
    {
      value: COMPANY_STATS.branches,
      label: 'Şube',
    },
    {
      value: COMPANY_STATS.cities,
      label: 'Şehir',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Page Header */}
        <div className="mb-12 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <a href="/products" className="hover:text-stone-900 transition-colors">Kategoriler</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">{projectCategory.title}</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
              {projectCategory.title}
            </h1>
            <p className="text-stone-600 text-lg mb-6">
              {projectCategory.subtitle}. Kurumsal projeleriniz için özel tasarım, üretim ve kurulum hizmeti. İhtiyacınıza özel çözümler.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustIndicators.map((indicator, index) => {
                const indicatorRef = useIntersectionObserver();
                return (
                  <div
                    key={index}
                    ref={indicatorRef}
                    className="bg-stone-50 rounded-lg p-4 text-center border border-stone-200 reveal-up"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="text-2xl font-bold text-red-600 mb-1">{indicator.value}</div>
                    <div className="text-xs text-stone-600">{indicator.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Custom Production Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-8 text-center">
            Özel Üretim Süreci
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              const stepRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={stepRef}
                  className="relative bg-white rounded-xl border border-stone-200 p-6 hover:border-red-300 hover:shadow-lg transition-all reveal-up"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                        <StepIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="text-xs font-bold text-stone-400 mb-2">{step.step}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-stone-200 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-stone-400 absolute -right-1 -top-1.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Example Project Types */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-8 text-center">
            Proje Türleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectTypes.map((project, index) => {
              const ProjectIcon = project.icon;
              const projectRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={projectRef}
                  className="bg-white rounded-xl border border-stone-200 p-6 hover:border-red-300 hover:shadow-lg transition-all reveal-up"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                    <ProjectIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">
                    {project.description}
                  </p>
                  <ul className="space-y-2">
                    {project.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                        <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. CTA: Request Project Quote */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 md:p-12 border border-stone-700 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              Proje Teklifi Alın
            </h2>
            <p className="text-stone-300 mb-6 text-base md:text-lg max-w-2xl mx-auto">
              Özel üretim projeleriniz için detaylı teklif alın. İç mimari danışmanlık, 3D görselleştirme ve proje yönetimi hizmetlerimizden yararlanın.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg text-base"
              >
                <Phone className="w-5 h-5" />
                Proje Teklifi İste
              </a>
              <a
                href="/stores"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors text-base"
              >
                Şubelerimizi Ziyaret Et
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-stone-400">
                Proje danışmanlarımız size en uygun çözümü sunmak için hazır. Hızlı yanıt garantisi.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomProjectPage;
