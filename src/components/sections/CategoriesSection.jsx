import React from 'react';
import { ArrowRight, Package } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function CategoriesSection() {
  const revealRef = useIntersectionObserver();

  return (
    <section id="categories" className="py-12 md:py-16 max-w-7xl mx-auto px-4">
      <div
        ref={revealRef}
        className="mb-10 reveal-up"
      >
        <span className="text-red-600 font-bold tracking-wider text-xs uppercase flex items-center gap-2 mb-3">
          <span className="w-6 h-[2px] bg-red-600"></span>
          Ürün Kategorileri
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
          Ofis ve Ticari Alan Mobilyaları
        </h2>
        <p className="text-stone-600 max-w-2xl">
          Kurumsal ihtiyaçlarınıza uygun geniş ürün yelpazemizden ihtiyacınıza en uygun çözümü bulun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  const revealRef = useIntersectionObserver();

  return (
    <a
      href={`/category/${category.id}`}
      ref={revealRef}
      className="group relative block overflow-hidden rounded-xl bg-white border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 reveal-up"
      style={{ transitionDelay: category.delay }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={category.image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={category.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
        
        {/* Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full">
            {category.count}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-serif font-semibold text-stone-900 mb-1 group-hover:text-red-600 transition-colors">
          {category.title}
        </h3>
        <p className="text-sm text-stone-500 mb-3">
          {category.subtitle}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <Package className="w-3.5 h-3.5" />
            <span>{category.delivery}</span>
          </div>
          <div className="flex items-center gap-1 text-red-600 font-semibold text-sm group-hover:gap-2 transition-all">
            <span>İncele</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
}

export default CategoriesSection;
