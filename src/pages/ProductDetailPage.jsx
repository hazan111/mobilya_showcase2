import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Truck, Wrench, Shield, ArrowRight, 
  ChevronRight, Star, ShoppingCart, MessageSquare 
} from 'lucide-react';
import { PRODUCTS } from '../utils/constants';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  // Get product ID from URL
  const productId = parseInt(window.location.pathname.split('/product/')[1] || '1');
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(0);
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <a href="/products" className="hover:text-stone-900 transition-colors">{product.category || 'Ürünler'}</a>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="text-stone-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left: Product Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-100">
              <img 
                src={product.images && product.images.length > 0 ? product.images[activeImage] : product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.inStock && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  STOKTA
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-red-600 ring-2 ring-red-100' : 'border-transparent hover:border-stone-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Purchase Block */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-stone-500">(24 Değerlendirme)</span>
                </div>
                <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              {/* Price Block */}
              <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
                <div className="flex items-end gap-3 mb-6 flex-wrap">
                  <span className="text-3xl font-bold text-red-600">{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-stone-400 line-through mb-1">{product.originalPrice}</span>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold mb-1">
                        {(() => {
                          const priceNum = parseFloat(product.price.replace(/[^\d,]/g, '').replace(',', '.'));
                          const originalNum = parseFloat(product.originalPrice.replace(/[^\d,]/g, '').replace(',', '.'));
                          if (priceNum && originalNum && originalNum > priceNum) {
                            return Math.round((1 - priceNum / originalNum) * 100) + '% İndirim';
                          }
                          return '';
                        })()}
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-100"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Sepete Ekle
                  </button>
                  <button className="w-full bg-white text-stone-900 font-semibold py-3.5 px-6 rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Proje Danışmanı
                  </button>
                </div>

                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <div className="flex items-center gap-3 text-sm text-stone-700">
                    <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span><span className="font-semibold">Teslimat:</span> {product.deliveryTime || '3-5 İş Günü'} (İstanbul içi)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-700">
                    <Wrench className="w-4 h-4 text-stone-400 flex-shrink-0" />
                    <span><span className="font-semibold">Kurulum:</span> Ücretsiz Profesyonel Montaj</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-700">
                    <Shield className="w-4 h-4 text-stone-400 flex-shrink-0" />
                    <span><span className="font-semibold">Garanti:</span> 2 Yıl Kurumsal Garanti</span>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              <ul className="space-y-2">
                {(product.detailedFeatures || product.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-stone-600">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Specs & Details */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 border-t border-stone-100 pt-12">
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6">Teknik Özellikler</h2>
            {product.specs && product.specs.length > 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {product.specs.map((spec, idx) => (
                      <tr key={idx} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                        <th className="py-4 px-6 font-medium text-stone-900 w-1/3 bg-stone-50/50">{spec.label}</th>
                        <td className="py-4 px-6 text-stone-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 text-stone-600 text-sm">
                Teknik özellikler yakında eklenecektir.
              </div>
            )}
            
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Kurumsal Güvence
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Bu ürün WMB Mobilya kalite standartlarına uygun olarak üretilmiştir. ISO 9001 kalite yönetim sistemi belgeli tesislerimizde, çevreye duyarlı malzemeler kullanılarak imal edilmiştir.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">Kullanım Alanları</h2>
            <div className="space-y-4">
              <div className="group relative h-48 rounded-xl overflow-hidden cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800" 
                  alt="Ofis Kullanımı" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-medium text-sm">Yönetici Ofisleri</span>
                </div>
              </div>
              <div className="group relative h-48 rounded-xl overflow-hidden cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=800" 
                  alt="Toplantı Odası" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-medium text-sm">Toplantı Salonları</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-semibold text-stone-900">Benzer Ürünler</h2>
            <a href="#" className="text-red-600 font-medium text-sm hover:text-red-700 flex items-center gap-1">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <a 
                key={p.id}
                href={`/product/${p.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 block"
              >
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-medium text-stone-900 mb-1 truncate">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold text-sm">{p.price}</span>
                    <span className="text-xs text-stone-500 group-hover:text-red-600">İncele →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailPage;
