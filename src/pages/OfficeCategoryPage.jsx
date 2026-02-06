import React from 'react';
import { ArrowRight, ShoppingCart, ChevronRight } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductImageUrl } from '../utils/imageHelpers';
import { formatPrice } from '../utils/priceHelpers';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { ROUTES, LABELS } from '../utils/constants';

function OfficeCategoryPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getAllCategories, getProductsByCategoryId, loading } = useCatalog();
  
  // Ofis kategorisini bul
  const allCategories = getAllCategories();
  const officeCategory = allCategories.find(c => 
    c.name?.toLowerCase().includes('ofis') || 
    c.name?.toLowerCase().includes('office')
  );
  
  // Kategori ID'si varsa ürünleri getir
  const officeProducts = officeCategory 
    ? getProductsByCategoryId(officeCategory._id)
    : [];
  
  // Featured products (first 6)
  const featuredProducts = officeProducts.slice(0, 6);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Page Header */}
        <div className="mb-12 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href={ROUTES.HOME} className="hover:text-stone-900 transition-colors">{LABELS.HOME}</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">{officeCategory?.name || 'Ofis Mobilyaları'}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-3">
                {officeCategory?.name || 'Ofis Mobilyaları'}
              </h1>
              <p className="text-stone-600 max-w-2xl text-base md:text-lg">
                {officeCategory?.description || 'Geniş ürün yelpazesi, hızlı teslimat ve profesyonel kurulum hizmeti.'}
              </p>
            </div>
            <div className="text-stone-500 text-sm font-medium">
              {officeProducts.length} Ürün Mevcut
            </div>
          </div>
        </div>

        {/* Featured Office Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-stone-900">Öne Çıkan Ürünler</h2>
            <a
              href="/category/1"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
            >
              Tümünü Gör
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          {loading ? (
            <div className="text-center py-16 text-stone-600">Ürünler yükleniyor...</div>
          ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => {
              const productRef = useIntersectionObserver();
              
              return (
                <div
                  key={product._id}
                  ref={productRef}
                  className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 flex flex-col reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <a href={`/product/${product._id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
                    <img
                      src={getProductImageUrl(product, 'medium')}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                  <div className="p-4 flex flex-col flex-1">
                    <a href={`/product/${product._id}`}>
                      <h3 className="font-serif text-lg font-medium text-stone-900 mb-1 group-hover:text-primary-600 transition-colors truncate">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-xs text-stone-500 mb-3 line-clamp-1">
                      {product.description || 'Kurumsal ihtiyaçlarınıza özel çözümler'}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-primary-600">
                          {formatPrice(product.price, product.currency)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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
                          className="text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                        </button>
                        <a 
                          href={`/product/${product._id}`}
                          className="text-xs font-semibold text-primary-600 border border-primary-100 px-3 py-1.5 rounded hover:bg-primary-50 transition-colors"
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
          ) : (
            <div className="text-center py-16 text-stone-600">
              <p className="mb-4">Bu kategoride ürün bulunamadı.</p>
              <a href={ROUTES.PRODUCTS} className="text-primary-600 hover:text-primary-700">Tüm Ürünleri Gör →</a>
            </div>
          )}
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
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
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
