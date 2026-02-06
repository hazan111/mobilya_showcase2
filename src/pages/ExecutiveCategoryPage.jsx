import React from 'react';
import { ArrowRight, ShoppingCart, ChevronRight, Award, Package, Wrench, Shield, Sparkles } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductImageUrl } from '../utils/imageHelpers';
import { formatPrice } from '../utils/priceHelpers';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { ROUTES, LABELS } from '../utils/constants';

function ExecutiveCategoryPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getAllCategories, getProductsByCategoryId, loading } = useCatalog();
  
  // Yönetici kategorisini bul
  const allCategories = getAllCategories();
  const executiveCategory = allCategories.find(c => 
    c.name?.toLowerCase().includes('yönetici') || 
    c.name?.toLowerCase().includes('executive')
  );
  
  // Kategori ID'si varsa ürünleri getir
  const executiveProducts = executiveCategory 
    ? getProductsByCategoryId(executiveCategory._id)
    : [];

  // Premium features
  const premiumFeatures = [
    {
      icon: Award,
      title: 'Premium Kalite',
      description: 'Yüksek kaliteli malzemeler',
    },
    {
      icon: Package,
      title: 'Özel Üretim',
      description: 'İhtiyacınıza özel çözümler',
    },
    {
      icon: Wrench,
      title: 'Profesyonel Kurulum',
      description: 'Uzman ekip kurulumu',
    },
    {
      icon: Shield,
      title: 'Garanti',
      description: '2-3 yıl kurumsal garanti',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-gradient-to-b from-white to-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Premium Page Header */}
        <div className="mb-12 border-b border-stone-200 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href={ROUTES.HOME} className="hover:text-stone-900 transition-colors">{LABELS.HOME}</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">{executiveCategory?.name || 'Yönetici Mobilyaları'}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary-600" />
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">Premium Koleksiyon</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-3">
                {executiveCategory?.name || 'Yönetici Mobilyaları'}
              </h1>
              <p className="text-stone-600 max-w-2xl text-base md:text-lg">
                {executiveCategory?.description || 'Premium malzemeler, özel üretim seçenekleri ve profesyonel kurulum hizmeti.'}
              </p>
            </div>
            <div className="text-stone-500 text-sm font-medium">
              {executiveProducts.length} Premium Ürün
            </div>
          </div>
        </div>

        {/* 2. Premium Features - Compact */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {premiumFeatures.map((feature, index) => {
            const FeatureIcon = feature.icon;
            const featureRef = useIntersectionObserver();
            
            return (
              <div
                key={index}
                ref={featureRef}
                className="bg-white rounded-lg border border-stone-200 p-4 text-center reveal-up"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-lg mb-3">
                  <FeatureIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-sm text-stone-900 mb-1">{feature.title}</h3>
                <p className="text-xs text-stone-500">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* 3. Executive Products Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-stone-900">Yönetici Mobilyaları</h2>
            <div className="text-sm text-stone-500">
              {executiveProducts.length} Ürün
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-16 text-stone-600">Ürünler yükleniyor...</div>
          ) : executiveProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveProducts.map((product, index) => {
              const productRef = useIntersectionObserver();
              
              return (
                <div
                  key={product._id}
                  ref={productRef}
                  className="group bg-white rounded-xl overflow-hidden border-2 border-stone-200 hover:border-primary-200 hover:shadow-xl transition-all duration-300 flex flex-col reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <a href={`/product/${product._id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
                    <img
                      src={getProductImageUrl(product, 'medium')}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-primary-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        PREMIUM
                      </div>
                    </div>
                  </a>
                  <div className="p-5 flex flex-col flex-1">
                    <a href={`/product/${product._id}`}>
                      <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-xs text-stone-500 mb-3 line-clamp-2">
                      {product.description || 'Kurumsal ihtiyaçlarınıza özel çözümler'}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="font-bold text-lg text-primary-600">
                            {formatPrice(product.price, product.currency)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`/product/${product._id}`}
                          className="flex-1 text-center text-sm font-semibold text-white bg-primary-600 px-4 py-2.5 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Detayları Gör
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
                          className="p-2.5 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
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
              <a href={ROUTES.PRODUCTS} className="text-primary-600 hover:text-primary-700">Tüm Ürünleri Gör →</a>
            </div>
          )}
        </div>

        {/* 4. CTA Section - Get Quote or View Details */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 md:p-12 border border-stone-700 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              Premium Yönetici Mobilyaları İçin Teklif Alın
            </h2>
            <p className="text-stone-300 mb-6 max-w-xl mx-auto text-sm md:text-base">
              Özel ölçü, malzeme seçimi ve kurulum hizmeti dahil. Proje danışmanlığı için iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={ROUTES.CONTACT}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
              >
                Teklif Al
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/category/2"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
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

export default ExecutiveCategoryPage;
