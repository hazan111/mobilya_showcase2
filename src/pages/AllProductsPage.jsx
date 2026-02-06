import React, { useState, useMemo } from 'react';
import { ArrowRight, ShoppingCart, Truck, Shield, Wrench } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function AllProductsPage() {
  const [sortBy, setSortBy] = useState('recommended');
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getAllProducts, loading } = useCatalog();

  const allProducts = getAllProducts();

  const filteredProducts = useMemo(() => {
    const sorted = [...allProducts].sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = typeof a.price === 'number' ? a.price : (parseFloat(a.price) || 0);
        const priceB = typeof b.price === 'number' ? b.price : (parseFloat(b.price) || 0);
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = typeof a.price === 'number' ? a.price : (parseFloat(a.price) || 0);
        const priceB = typeof b.price === 'number' ? b.price : (parseFloat(b.price) || 0);
        return priceB - priceA;
      }
      return 0;
    });
    return sorted;
  }, [sortBy, allProducts]);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Page Header */}
        <div className="mb-6 border-b border-stone-100 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <h1 className="text-3xl font-serif text-stone-900 mb-1">
                Ürünler
              </h1>
              <p className="text-stone-600 text-sm max-w-2xl">
                Ofisiniz için en uygun mobilya çözümlerini keşfedin. Geniş ürün yelpazesi, hızlı teslimat.
              </p>
            </div>
            <div className="text-stone-500 text-xs font-medium">
              {filteredProducts.length} Ürün Listeleniyor
            </div>
          </div>
        </div>

        {/* Sıralama */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-500">Sırala:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-medium text-stone-900 bg-white border border-stone-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
              >
                <option value="recommended">Önerilen</option>
                <option value="newest">En Yeni</option>
                <option value="price-asc">Fiyat: Artan</option>
                <option value="price-desc">Fiyat: Azalan</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-stone-500">
            {filteredProducts.length} ürün listeleniyor
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-stone-600">Ürünler yükleniyor...</div>
        ) : (
        /* 3. Product Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => {
            const getProductImage = () => {
              // Önce isPrimary olan görseli bul
              if (product.images && product.images.length > 0) {
                const primaryImage = product.images.find(img => img.isPrimary === true);
                if (primaryImage) {
                  if (primaryImage.mediumUrl) return primaryImage.mediumUrl;
                  if (primaryImage.thumbnailUrl) return primaryImage.thumbnailUrl;
                  if (primaryImage.originalUrl) return primaryImage.originalUrl;
                }
                // İlk görseli kullan
                const firstImage = product.images[0];
                if (firstImage.mediumUrl) return firstImage.mediumUrl;
                if (firstImage.thumbnailUrl) return firstImage.thumbnailUrl;
                if (firstImage.originalUrl) return firstImage.originalUrl;
              }
              
              // Cover image kullan
              if (product.coverImage?.mediumUrl) return product.coverImage.mediumUrl;
              if (product.coverImage?.thumbnailUrl) return product.coverImage.thumbnailUrl;
              if (product.coverImage?.originalUrl) return product.coverImage.originalUrl;
              
              return 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800';
            };

            const formatPrice = (price, currency = 'TRY') => {
              if (!price && price !== 0) return 'Teklif Al';
              const numPrice = typeof price === 'number' ? price : parseFloat(price);
              return new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(numPrice);
            };

            return (
            <div key={product._id} className="group bg-white rounded-xl border border-stone-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 flex flex-col">
              {/* Image Area - Clickable */}
              <a href={`/product/${product._id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 rounded-t-xl border-b border-stone-100 block">
                <img
                  src={getProductImage()}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              {/* Content Area */}
              <div className="p-4 flex flex-col flex-1">
                <a href={`/product/${product._id}`} className="mb-3 block">
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-1">
                    {product.description || 'Kurumsal ihtiyaçlarınıza özel çözümler'}
                  </p>
                </a>

                {/* Trust Icons */}
                <div className="flex gap-3 mb-4 pt-3 border-t border-stone-50">
                   <div className="flex items-center gap-1 text-[10px] text-stone-500" title="Hızlı Teslimat">
                    <Truck className="w-3 h-3 text-stone-400" />
                    <span>3-5 Gün</span>
                   </div>
                   <div className="flex items-center gap-1 text-[10px] text-stone-500" title="Ücretsiz Kurulum">
                    <Wrench className="w-3 h-3 text-stone-400" />
                    <span>Kurulum</span>
                   </div>
                   <div className="flex items-center gap-1 text-[10px] text-stone-500" title="Garanti">
                    <Shield className="w-3 h-3 text-stone-400" />
                    <span>2 Yıl</span>
                   </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-primary-600">{formatPrice(product.price, product.currency)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const cartProduct = {
                          id: product._id,
                          _id: product._id,
                          name: product.name,
                          price: formatPrice(product.price, product.currency),
                          image: getProductImage(),
                        };
                        addToCart(cartProduct);
                        showToast(`${product.name} sepete eklendi!`, 'success');
                      }}
                      className="flex-1 bg-primary-700 text-white text-xs font-bold py-2.5 px-3 rounded-button hover:bg-primary-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Sepete Ekle
                    </button>
                    <a 
                      href={`/product/${product._id}`} 
                      className="text-stone-500 hover:text-primary-600 transition-colors p-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        )}

        {/* 5. Bottom CTA Section */}
        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 text-center md:text-left md:flex items-center justify-between gap-8">
          <div>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-2">
              Toplu Alımlar ve Proje Desteği
            </h2>
            <p className="text-sm text-stone-600 max-w-xl">
              Kurumsal projeleriniz için özel fiyatlandırma ve ücretsiz iç mimari danışmanlık hizmetimizden yararlanın.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
            <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
              Proje Teklifi İste
            </button>
            <button className="bg-white border border-stone-300 text-stone-700 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-50 transition-colors">
              Şubelerimizi Ziyaret Et
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AllProductsPage;
