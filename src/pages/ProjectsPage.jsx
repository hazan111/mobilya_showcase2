import React from 'react';
import { ArrowRight, ChevronRight, Building2, Users, Briefcase } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function ProjectsPage() {
  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'Teknoloji Şirketi Genel Merkez',
      location: 'İstanbul',
      type: 'Kurumsal Ofis',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      description: '5000 m² açık ofis alanı, toplantı odaları ve yönetici katları',
      products: ['Ergonomic Çalışma Masası', 'Yönetici Koltuk Seti', 'Toplantı Masası Seti'],
      category: '/category/1',
    },
    {
      id: 2,
      title: 'Finans Kurumu Şube Ağı',
      location: 'Ankara, İzmir, Bursa',
      type: 'Toplu Alım',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200',
      description: '3 şehir, 12 şube komple mobilya çözümü',
      products: ['Standart Ofis Koltuk', 'Ofis Dolap Seti', 'Toplantı Odası Koltuk Seti'],
      category: '/category/2',
    },
    {
      id: 3,
      title: 'Hukuk Bürosu',
      location: 'İstanbul',
      type: 'Yönetici Mobilyaları',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200',
      description: 'Premium yönetici odası ve toplantı alanları',
      products: ['Yönetici Çalışma Masası', 'Yönetici Koltuk Seti', 'Yönetici Kitaplık Seti'],
      category: '/category/2',
    },
    {
      id: 4,
      title: 'Eğitim Kurumu',
      location: 'İzmir',
      type: 'Toplantı & Ortak Alan',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200',
      description: 'Konferans salonu ve ortak çalışma alanları',
      products: ['Toplantı Masası Seti', 'Oval Toplantı Masası', 'Bekleme Alanı Koltuk Seti'],
      category: '/category/3',
    },
    {
      id: 5,
      title: 'Sağlık Kuruluşu',
      location: 'Ankara',
      type: 'Depolama Sistemleri',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200',
      description: 'Arşiv ve dosya depolama sistemleri',
      products: ['Arşiv Dolabı', 'Dosya Dolabı Seti', 'Kilitli Depolama Dolabı'],
      category: '/category/4',
    },
    {
      id: 6,
      title: 'Özel Proje: L Şeklinde Ofis',
      location: 'Bursa',
      type: 'Özel Üretim',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1200',
      description: 'Özel ölçüde L şeklinde çalışma masası ve depolama çözümleri',
      products: ['L Şeklinde Köşe Masa', 'Özel Ölçü Masa Üretimi'],
      category: '/category/5',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Projelerimiz</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
                Projelerimiz
              </h1>
              <p className="text-stone-600 text-base max-w-2xl">
                Tamamlanan kurumsal projelerimiz. Gerçek kullanım senaryoları ve ürün çözümleri.
              </p>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const projectRef = useIntersectionObserver();
            
            return (
              <div
                key={project.id}
                ref={projectRef}
                className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col reveal-up"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-stone-900">
                      {project.type}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-red-600 transition-colors flex-1">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <Building2 className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-sm text-stone-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Products Used */}
                  <div className="mb-4 pb-4 border-b border-stone-100">
                    <div className="text-xs font-semibold text-stone-700 mb-2">Kullanılan Ürünler:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.products.slice(0, 2).map((product, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-stone-50 text-stone-600 px-2 py-0.5 rounded border border-stone-200"
                        >
                          {product}
                        </span>
                      ))}
                      {project.products.length > 2 && (
                        <span className="text-xs text-stone-500">+{project.products.length - 2}</span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={project.category}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors mt-auto"
                  >
                    İlgili Ürünleri Gör
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-stone-50 rounded-xl p-8 border border-stone-200 text-center">
          <h2 className="text-xl md:text-2xl font-serif text-stone-900 mb-3">
            Projeniz İçin Teklif Alın
          </h2>
          <p className="text-stone-600 mb-5 text-sm max-w-lg mx-auto">
            Kurumsal projeleriniz için özel çözümler. İç mimari danışmanlık ve proje yönetimi hizmeti.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Proje Teklifi İste
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  );
}

export default ProjectsPage;
