import React from 'react';
import { ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function ProductsSection() {
  const revealRef = useIntersectionObserver();
  const { getAllProducts, loading } = useCatalog();
  const products = getAllProducts().slice(0, 6);

  if (loading) {
    return (
      <section id="products" className="py-12 md:py-16 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center text-stone-600">Ürünler yükleniyor...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 sm:py-14 md:py-20 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div ref={revealRef} className="text-center max-w-2xl mx-auto mb-12 reveal-up">
          <span className="inline-block bg-primary-50 text-primary-700 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-overline mb-3">
            Öne Çıkan Ürünler
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold tracking-tight mb-2 text-stone-900">
            Çok Satan Ürünlerimiz
          </h2>
          <p className="text-stone-500 text-base">
            Kurumsal müşterilerimizin en çok tercih ettiği ürünler.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard 
                key={product._id || index} 
                product={product}
                delay={`${(index + 1) * 100}ms`}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-stone-600 py-8">
              Ürün bulunamadı.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, delay = '100ms' }) {
  const revealRef = useIntersectionObserver();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // API'den gelen product formatını UI formatına dönüştür
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

  const getProductFeatures = () => {
    if (product.features && product.features.length > 0) {
      return product.features.slice(0, 2).map(f => f.name || f.value);
    }
    return ['Yüksek kalite', 'Hızlı teslimat'];
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // API product formatını cart formatına dönüştür
    const cartProduct = {
      id: product._id,
      _id: product._id,
      name: product.name,
      price: formatPrice(product.price, product.currency),
      image: getProductImage(),
    };
    addToCart(cartProduct);
    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  return (
    <div
      ref={revealRef}
      className="group bg-surface-elevated rounded-card overflow-hidden border border-primary-200 shadow-soft hover:border-primary-300 hover:shadow-card transition-all duration-200 reveal-up"
      style={{ transitionDelay: delay }}
    >
      <a href={`/product/${product._id}`} className="relative aspect-[3/4] overflow-hidden bg-stone-100 block">
        {getProductImage() ? (
          <img
            src={getProductImage()}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200">
            <Package className="w-12 h-12 text-stone-400" />
          </div>
        )}
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end">
          <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-primary-600 text-white font-medium py-2.5 px-4 rounded-button hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-soft"
            >
              <ShoppingCart className="w-4 h-4" />
              Sepete Ekle
            </button>
          </div>
        </div>
      </a>

      <div className="p-5">
        <a href={`/product/${product._id}`}>
          <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </a>
        
        <div className="space-y-2 mb-4">
          {getProductFeatures().map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-stone-600">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <div className="text-lg font-semibold text-primary-600">
              {formatPrice(product.price, product.currency)}
            </div>
          </div>
          <a
            href={`/product/${product._id}`}
            className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:gap-2 transition-all"
          >
            Detay
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductsSection;
