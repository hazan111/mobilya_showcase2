import React from 'react';
import { ArrowRight, ShoppingCart, ChevronRight, Package, Shield, Box, Lock } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../utils/constants';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function StorageCategoryPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  // Get storage category
  const storageCategory = CATEGORIES.find(c => c.title === 'Depolama') || CATEGORIES[3];
  
  // Filter storage products
  const storageProducts = PRODUCTS.filter(p => p.category === 'Depolama');

  // Key benefits
  const keyBenefits = [
    {
      icon: Box,
      title: 'Geniş Kapasite',
      description: 'Yüksek depolama kapasitesi',
    },
    {
      icon: Shield,
      title: 'Dayanıklı Yapı',
      description: 'Uzun ömürlü malzemeler',
    },
    {
      icon: Lock,
      title: 'Güvenli Depolama',
      description: 'Kilitli bölmeler mevcut',
    },
    {
      icon: Package,
      title: 'Modüler Sistem',
      description: 'Genişletilebilir yapı',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Page Header */}
        <div className="mb-8 border-b border-stone-100 pb-6">
          <nav className="flex items-center text-sm text-stone-500 mb-4 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <a href="/products" className="hover:text-stone-900 transition-colors">Kategoriler</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Depolama Sistemleri</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
                Depolama Sistemleri
              </h1>
              <p className="text-stone-600 max-w-2xl text-sm md:text-base">
                {storageCategory.subtitle}. Arşiv, dosya ve evrak organizasyonu için depolama çözümleri.
              </p>
            </div>
            <div className="text-stone-500 text-sm font-medium">
              {storageProducts.length} Ürün
            </div>
          </div>
        </div>

        {/* 2. Key Benefits - Compact */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyBenefits.map((benefit, index) => {
            const BenefitIcon = benefit.icon;
            const benefitRef = useIntersectionObserver();
            
            return (
              <div
                key={index}
                ref={benefitRef}
                className="bg-stone-50 rounded-lg border border-stone-200 p-4 text-center reveal-up"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-red-50 rounded-lg mb-2">
                  <BenefitIcon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-sm text-stone-900 mb-1">{benefit.title}</h3>
                <p className="text-xs text-stone-500">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* 3. Product List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-serif text-stone-900">Ürünler</h2>
            <div className="text-sm text-stone-500">
              {storageProducts.length} Ürün
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {storageProducts.map((product, index) => {
              const productRef = useIntersectionObserver();
              
              return (
                <div
                  key={product.id}
                  ref={productRef}
                  className="group bg-white rounded-lg overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-md transition-all duration-300 flex flex-col reveal-up"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <a href={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.inStock && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          STOKTA
                        </div>
                      </div>
                    )}
                  </a>
                  <div className="p-4 flex flex-col flex-1">
                    <a href={`/product/${product.id}`}>
                      <h3 className="font-serif text-base font-medium text-stone-900 mb-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-xs text-stone-500 mb-3 line-clamp-2">
                      {product.features && product.features.join(' • ')}
                    </p>
                    
                    {/* Capacity & Durability Info */}
                    {product.specs && product.specs.length > 0 && (
                      <div className="mb-3 space-y-1">
                        {product.specs.slice(0, 1).map((spec, idx) => (
                          <div key={idx} className="text-xs text-stone-600">
                            <span className="font-medium">{spec.label}:</span> {spec.value}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-auto pt-3 border-t border-stone-100">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="font-bold text-red-600">{product.price}</div>
                          {product.originalPrice && (
                            <div className="text-xs text-stone-400 line-through">{product.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`/product/${product.id}`}
                          className="flex-1 text-center text-xs font-semibold text-white bg-red-600 px-3 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                          Detay
                        </a>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
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
        </div>

        {/* 4. CTA Section */}
        <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-serif text-stone-900 mb-3">
              Depolama İhtiyaçlarınız İçin Teklif Alın
            </h2>
            <p className="text-stone-600 mb-5 text-sm max-w-lg mx-auto">
              Özel ölçü ve kapasite gereksinimleriniz için detaylı ürün bilgileri ve fiyat teklifi alın.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Teklif Al
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/category/4"
                className="inline-flex items-center gap-2 bg-white text-stone-900 border border-stone-300 px-6 py-3 rounded-lg font-semibold hover:bg-stone-50 transition-colors"
              >
                Tüm Ürünleri İncele
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StorageCategoryPage;
