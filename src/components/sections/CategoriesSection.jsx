import React from 'react';
import { ArrowRight, Package, Folder } from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { getCategoryImageUrl } from '../../utils/imageHelpers';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function CategoriesSection() {
  const revealRef = useIntersectionObserver();
  const { getRootCategories, loading } = useCatalog();
  const categories = getRootCategories();

  if (loading) {
    return (
      <section id="categories" className="py-12 md:py-16 max-w-7xl mx-auto px-4">
        <div className="text-center text-stone-600">Kategoriler yükleniyor...</div>
      </section>
    );
  }

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
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <CategoryCard 
              key={category._id || index} 
              category={category}
              delay={`${(index + 1) * 100}ms`}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-stone-600 py-8">
            Kategori bulunamadı.
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryCard({ category, delay = '100ms' }) {
  const revealRef = useIntersectionObserver();
  const { getProductsByCategoryId } = useCatalog();
  
  // Kategori ürün sayısını hesapla (subcategories dahil)
  const getCategoryProductCount = (cat) => {
    let count = getProductsByCategoryId(cat._id).length;
    if (cat.subcategories && cat.subcategories.length > 0) {
      cat.subcategories.forEach(subcat => {
        count += getProductsByCategoryId(subcat._id).length;
      });
    }
    return count;
  };
  
  const productCount = getCategoryProductCount(category);
  const imageUrl = getCategoryImageUrl(category, 'medium');
  const categoryUrl = `/category/${category._id}`;
  const hasImage = imageUrl !== null;

  // Görsel olmayan kategoriler için farklı kart tasarımı
  if (!hasImage) {
    return (
      <a
        href={categoryUrl}
        ref={revealRef}
        className="group relative block rounded-xl bg-gradient-to-br from-stone-50 to-stone-100 border-2 border-dashed border-stone-300 hover:border-red-300 hover:shadow-md transition-all duration-300 reveal-up"
        style={{ transitionDelay: delay }}
      >
        <div className="p-6 md:p-8 flex flex-col items-center text-center min-h-[280px] justify-center">
          {/* Icon */}
          <div className="mb-4 w-16 h-16 rounded-full bg-stone-200 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-300">
            <Folder className="w-8 h-8 text-stone-500 group-hover:text-red-600 transition-colors" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2 group-hover:text-red-600 transition-colors">
            {category.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-stone-600 mb-4 max-w-xs">
            {category.description || 'Kurumsal ihtiyaçlarınıza özel çözümler'}
          </p>
          
          {/* Product Count */}
          {productCount > 0 && (
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-200">
                <Package className="w-3.5 h-3.5" />
                <span>{productCount} Ürün</span>
              </div>
            </div>
          )}
          
          {/* CTA */}
          <div className="flex items-center gap-1 text-red-600 font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
            <span>İncele</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    );
  }

  // Görsel olan kategoriler için mevcut tasarım
  return (
    <a
      href={categoryUrl}
      ref={revealRef}
      className="group relative block overflow-hidden rounded-xl bg-white border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 reveal-up"
      style={{ transitionDelay: delay }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={imageUrl}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={category.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
        
        {/* Badge */}
        {productCount > 0 && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full">
              {productCount}+ Ürün
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-serif font-semibold text-stone-900 mb-1 group-hover:text-red-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-stone-500 mb-3">
          {category.description || 'Kurumsal ihtiyaçlarınıza özel çözümler'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <Package className="w-3.5 h-3.5" />
            <span>Hızlı teslimat</span>
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
