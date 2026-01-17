import React from 'react';
import { ArrowRight, ShoppingCart, ChevronRight, Users, Coffee, Building2, Briefcase } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductImageUrl } from '../utils/imageHelpers';
import { formatPrice } from '../utils/priceHelpers';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function MeetingCategoryPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getAllCategories, getProductsByCategoryId, loading } = useCatalog();
  
  // Toplantı kategorisini bul
  const allCategories = getAllCategories();
  const meetingCategory = allCategories.find(c => 
    c.name?.toLowerCase().includes('toplantı') || 
    c.name?.toLowerCase().includes('meeting') ||
    c.name?.toLowerCase().includes('ortak')
  );
  
  // Kategori ID'si varsa ürünleri getir
  const meetingProducts = meetingCategory 
    ? getProductsByCategoryId(meetingCategory._id)
    : [];

  // Usage scenarios
  const usageScenarios = [
    {
      icon: Users,
      title: 'Toplantı Odaları',
      description: 'Kurumsal toplantılar için masa ve koltuk çözümleri',
      products: meetingProducts.filter(p => p.name.toLowerCase().includes('toplantı') || p.name.toLowerCase().includes('konferans')).length,
    },
    {
      icon: Coffee,
      title: 'Bekleme Alanları',
      description: 'Resepsiyon ve bekleme alanları için oturma grupları',
      products: meetingProducts.filter(p => p.name.toLowerCase().includes('bekleme') || p.name.toLowerCase().includes('ziyaretçi')).length,
    },
    {
      icon: Building2,
      title: 'Ortak Çalışma Alanları',
      description: 'Açık ofis ve ortak alan mobilyaları',
      products: meetingProducts.filter(p => p.name.toLowerCase().includes('ortak') || p.name.toLowerCase().includes('alan')).length,
    },
    {
      icon: Briefcase,
      title: 'Konferans Salonları',
      description: 'Büyük toplantılar için özel çözümler',
      products: meetingProducts.filter(p => p.name.toLowerCase().includes('konferans') || p.name.toLowerCase().includes('salon')).length,
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Functional Header */}
        <div className="mb-10 border-b border-stone-100 pb-6">
          <nav className="flex items-center text-sm text-stone-500 mb-4 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <a href="/products" className="hover:text-stone-900 transition-colors">Kategoriler</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">{meetingCategory?.name || 'Toplantı & Ortak Alan'}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
                {meetingCategory?.name || 'Toplantı & Ortak Alan'}
              </h1>
              <p className="text-stone-600 max-w-2xl text-sm md:text-base">
                {meetingCategory?.description || 'Toplantı odaları, bekleme alanları ve ortak çalışma mekanları için mobilya çözümleri.'}
              </p>
            </div>
            <div className="text-stone-500 text-sm font-medium">
              {meetingProducts.length} Ürün
            </div>
          </div>
        </div>

        {/* 2. Usage Scenarios - Compact */}
        <div className="mb-10">
          <h2 className="text-xl font-serif text-stone-900 mb-4">Kullanım Alanları</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {usageScenarios.map((scenario, index) => {
              const ScenarioIcon = scenario.icon;
              const scenarioRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={scenarioRef}
                  className="bg-stone-50 rounded-lg border border-stone-200 p-4 hover:border-red-300 hover:bg-white transition-all reveal-up"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <ScenarioIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-stone-900 mb-1">{scenario.title}</h3>
                      <p className="text-xs text-stone-500 mb-2 line-clamp-2">{scenario.description}</p>
                      <span className="text-xs font-medium text-red-600">{scenario.products} Ürün</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Product Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-stone-900">Ürünler</h2>
            <div className="text-sm text-stone-500">
              {meetingProducts.length} Ürün Listeleniyor
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-16 text-stone-600">Ürünler yükleniyor...</div>
          ) : meetingProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {meetingProducts.map((product, index) => {
              const productRef = useIntersectionObserver();
              
              return (
                <div
                  key={product._id}
                  ref={productRef}
                  className="group bg-white rounded-lg overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-md transition-all duration-300 flex flex-col reveal-up"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <a href={`/product/${product._id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
                    <img
                      src={getProductImageUrl(product, 'medium')}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.stock && product.stock > 0 && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          STOKTA
                        </div>
                      </div>
                    )}
                  </a>
                  <div className="p-4 flex flex-col flex-1">
                    <a href={`/product/${product._id}`}>
                      <h3 className="font-serif text-base font-medium text-stone-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-xs text-stone-500 mb-3 line-clamp-1">
                      {product.description || 'Kurumsal ihtiyaçlarınıza özel çözümler'}
                    </p>
                    
                    <div className="mt-auto pt-3 border-t border-stone-100">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="font-bold text-red-600">
                            {formatPrice(product.price, product.currency)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`/product/${product._id}`}
                          className="flex-1 text-center text-xs font-semibold text-white bg-red-600 px-3 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                          Detay
                        </a>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const cartProduct = {
                              id: product._id,
                              _id: product._id,
                              name: product.name,
                              price: formatPrice(product.price, product.currency),
                              image: getProductImageUrl(product, 'medium'),
                            };
                            addToCart(cartProduct);
                            showToast(`${product.name} sepete eklendi!`, 'success');
                          }}
                          className="p-2 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                          title="Sepete Ekle"
                        >
                          <ShoppingCart className="w-4 h-4 text-stone-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          ) : (
            <div className="text-center py-16 text-stone-600">
              <p className="mb-4">Bu kategoride ürün bulunamadı.</p>
              <a href="/products" className="text-red-600 hover:text-red-700">Tüm Ürünleri Gör →</a>
            </div>
          )}
        </div>

        {/* 4. CTA to Products */}
        <div className="bg-stone-50 rounded-xl p-6 md:p-8 border border-stone-200">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-serif text-stone-900 mb-3">
              Tüm Toplantı & Ortak Alan Ürünlerini İnceleyin
            </h2>
            <p className="text-stone-600 mb-5 text-sm md:text-base max-w-lg mx-auto">
              Filtreleme ve sıralama seçenekleri ile ihtiyacınıza uygun mobilyayı bulun. Detaylı ürün bilgileri ve teknik özellikler.
            </p>
            <a
              href="/category/3"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
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

export default MeetingCategoryPage;
