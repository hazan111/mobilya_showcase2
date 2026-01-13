import React from 'react';
import { ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function ProductsSection() {
  const revealRef = useIntersectionObserver();

  return (
    <section id="products" className="py-12 md:py-16 bg-stone-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div ref={revealRef} className="text-center max-w-2xl mx-auto mb-10 reveal-up">
          <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Öne Çıkan Ürünler
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mb-2 text-stone-900">
            Çok Satan Ürünlerimiz
          </h2>
          <p className="text-stone-600">
            Kurumsal müşterilerimizin en çok tercih ettiği ürünler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const revealRef = useIntersectionObserver();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  return (
    <div
      ref={revealRef}
      className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 reveal-up"
      style={{ transitionDelay: product.delay }}
    >
      <a href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-stone-100 block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Stock Badge - Subtle */}
        {product.inStock && (
          <div className="absolute top-3 left-3">
            <div className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {product.badges[0]}
            </div>
          </div>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end">
          <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Sepete Ekle
            </button>
          </div>
        </div>
      </a>

      <div className="p-5">
        <a href={`/product/${product.id}`}>
          <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </a>
        
        <div className="space-y-2 mb-4">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-stone-600">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <div className="text-lg font-bold text-red-600">
              {product.price}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-stone-400 line-through">
                {product.originalPrice}
              </div>
            )}
          </div>
          <a
            href={`/product/${product.id}`}
            className="inline-flex items-center gap-1.5 text-red-600 font-semibold text-sm hover:gap-2 transition-all"
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
