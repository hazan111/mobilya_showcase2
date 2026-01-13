import React from 'react';
import { ArrowRight, ShoppingCart, ChevronRight, Table, Users, Package, Square } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../utils/constants';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function OfficeCategoryPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  // Get office furniture category
  const officeCategory = CATEGORIES.find(c => c.title === 'Ofis Mobilyaları') || CATEGORIES[0];
  
  // Filter office products
  const officeProducts = PRODUCTS.filter(p => p.category === 'Ofis Mobilyaları');
  
  // Featured products (first 6)
  const featuredProducts = officeProducts.slice(0, 6);

  // Sub-categories
  const subCategories = [
    {
      id: 'desks',
      title: 'Çalışma Masaları',
      description: 'Ergonomik ve modern çalışma masaları',
      icon: Table,
      count: officeProducts.filter(p => p.name.toLowerCase().includes('masa')).length,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600',
    },
    {
      id: 'chairs',
      title: 'Ofis Koltukları',
      description: 'Konforlu ve ergonomik ofis koltukları',
      icon: Users,
      count: officeProducts.filter(p => p.name.toLowerCase().includes('koltuk')).length,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=600',
    },
    {
      id: 'storage',
      title: 'Depolama',
      description: 'Dolap ve depolama çözümleri',
      icon: Package,
      count: officeProducts.filter(p => p.name.toLowerCase().includes('dolap') || p.name.toLowerCase().includes('depolama')).length,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600',
    },
    {
      id: 'accessories',
      title: 'Aksesuarlar',
      description: 'Sehpa ve ofis aksesuarları',
      icon: Square,
      count: officeProducts.filter(p => p.name.toLowerCase().includes('sehpa') || p.name.toLowerCase().includes('aksesuar')).length,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600',
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
            <span className="text-stone-900 font-medium">{officeCategory.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-3">
                {officeCategory.title}
              </h1>
              <p className="text-stone-600 max-w-2xl text-base md:text-lg">
                {officeCategory.subtitle}. Geniş ürün yelpazesi, stoktan hızlı teslimat ve profesyonel kurulum hizmeti.
              </p>
            </div>
            <div className="text-stone-500 text-sm font-medium">
              {officeProducts.length} Ürün Mevcut
            </div>
          </div>
        </div>

        {/* 2. Sub-category Blocks */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Alt Kategoriler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subCategories.map((subCat) => {
              const SubIcon = subCat.icon;
              const subCatRef = useIntersectionObserver();
              
              return (
                <a
                  key={subCat.id}
                  href={`/category/1?sub=${subCat.id}`}
                  ref={subCatRef}
                  className="group bg-white rounded-xl border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 overflow-hidden reveal-up"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={subCat.image}
                      alt={subCat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 group-hover:bg-red-600 transition-colors">
                        <SubIcon className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1 group-hover:text-red-600 transition-colors">
                      {subCat.title}
                    </h3>
                    <p className="text-xs text-stone-500 mb-3 line-clamp-1">
                      {subCat.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-600">
                        {subCat.count} Ürün
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 3. Featured Office Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-stone-900">Öne Çıkan Ürünler</h2>
            <a
              href="/category/1"
              className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
            >
              Tümünü Gör
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => {
              const productRef = useIntersectionObserver();
              
              return (
                <div
                  key={product.id}
                  ref={productRef}
                  className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <a href={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.inStock && (
                      <div className="absolute top-3 left-3">
                        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          STOKTA
                        </div>
                      </div>
                    )}
                  </a>
                  <div className="p-4 flex flex-col flex-1">
                    <a href={`/product/${product.id}`}>
                      <h3 className="font-serif text-lg font-medium text-stone-900 mb-1 group-hover:text-red-600 transition-colors truncate">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-xs text-stone-500 mb-3 line-clamp-1">
                      {product.features && product.features[0]}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-red-600">{product.price}</div>
                        {product.originalPrice && (
                          <div className="text-xs text-stone-400 line-through">{product.originalPrice}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                            showToast(`${product.name} sepete eklendi!`, 'success');
                          }}
                          className="text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                        </button>
                        <a 
                          href={`/product/${product.id}`}
                          className="text-xs font-semibold text-red-600 border border-red-100 px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                        >
                          Detay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. CTA to View All Office Products */}
        <div className="bg-stone-50 rounded-2xl p-8 md:p-12 border border-stone-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-4">
              Tüm Ofis Mobilyalarını İnceleyin
            </h2>
            <p className="text-stone-600 mb-6 max-w-xl mx-auto">
              {officeProducts.length}+ ürün arasından seçim yapın. Filtreleme, sıralama ve detaylı ürün bilgileri ile ihtiyacınıza en uygun mobilyayı bulun.
            </p>
            <a
              href="/category/1"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
            >
              Tüm Ürünleri Görüntüle
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OfficeCategoryPage;
