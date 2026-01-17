import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Truck, Wrench, Shield, ArrowRight, 
  ChevronRight, Star, ShoppingCart, MessageSquare, Package
} from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductAllImages } from '../utils/imageHelpers';

function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getProductById, getCategoryById, getAllProducts, loading } = useCatalog();
  
  // Get product ID from URL
  const productId = window.location.pathname.split('/product/')[1];
  const product = getProductById(productId);
  const category = product ? getCategoryById(product.category) : null;

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(0);
  }, [productId]);

  // Helper functions
  const getProductImages = () => {
    // imageHelpers'daki getProductAllImages fonksiyonunu kullan
    // Bu fonksiyon URL normalizasyonu yapıyor (backend base URL ekleme)
    return getProductAllImages(product);
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

  // Özellikler - Features array'inden özellikleri al
  const getProductFeatures = () => {
    if (!product || !product.features || product.features.length === 0) {
      return [];
    }
    
    // name veya value'su olan özellikleri göster
    return product.features
      .filter(f => f.name || f.value) // name veya value'su olanları filtrele
      .map(f => f.name || f.value)
      .filter((v, i, self) => self.indexOf(v) === i) // Duplicate'leri kaldır
      .slice(0, 5); // Maksimum 5 özellik göster
  };

  // Özellikleri kategorilere göre grupla - Her kategori için ayrı bölüm oluştur
  const getProductSpecsByCategory = () => {
    if (!product || !product.features || product.features.length === 0) {
      return [];
    }
    
    // Features'ları kategorilere göre grupla
    const specsByCategory = {};
    
    product.features.forEach(feature => {
      if (!feature.name || feature.value === undefined || feature.value === null) {
        return; // name veya value olmayanları atla
      }
      
      const categoryName = feature.featureCategory?.name || 'Genel';
      const categoryId = feature.featureCategory?._id || 'general';
      
      if (!specsByCategory[categoryId]) {
        specsByCategory[categoryId] = {
          categoryName: categoryName,
          categoryId: categoryId,
          specs: [],
        };
      }
      
      // Value'yu string'e dönüştür
      let displayValue = '';
      if (typeof feature.value === 'object') {
        // Obje ise önce dimensions formatını kontrol et
        if (feature.value.unit && (feature.value.length || feature.value.width || feature.value.height)) {
          const dims = feature.value;
          const unit = dims.unit || 'cm';
          if (dims.length && dims.width && dims.height) {
            displayValue = `${dims.length} x ${dims.width} x ${dims.height} ${unit}`;
          } else if (dims.length && dims.width) {
            displayValue = `${dims.length} x ${dims.width} ${unit}`;
          } else if (dims.length) {
            displayValue = `${dims.length} ${unit}`;
          } else {
            displayValue = feature.value.name || feature.value.value || JSON.stringify(feature.value);
          }
        } else {
          displayValue = feature.value.name || feature.value.value || JSON.stringify(feature.value);
        }
      } else {
        displayValue = String(feature.value);
      }
      
      specsByCategory[categoryId].specs.push({
        label: feature.name,
        value: displayValue,
        order: feature.order || 0,
      });
    });
    
    // Her kategorideki özellikleri order'a göre sırala
    const categories = Object.values(specsByCategory).map(category => ({
      ...category,
      specs: category.specs.sort((a, b) => a.order - b.order),
    }));
    
    // Kategorileri alfabetik olarak sırala (veya order'a göre)
    categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    
    return categories;
  };

  const handleAddToCart = () => {
    if (!product) return;
    const cartProduct = {
      id: product._id,
      _id: product._id,
      name: product.name,
      price: formatPrice(product.price, product.currency),
      image: getProductImages()[0],
    };
    addToCart(cartProduct);
    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  if (loading) {
    return (
      <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto text-center text-stone-600">
          Ürün detayları yükleniyor...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto text-center text-stone-600">
          <h1 className="text-2xl mb-4">Ürün bulunamadı</h1>
          <a href="/products" className="text-red-600 hover:text-red-700">Ürünlere dön →</a>
        </div>
      </div>
    );
  }

  const productImages = getProductImages();
  const isInStock = product.stock && product.stock > 0;

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <a href="/products" className="hover:text-stone-900 transition-colors">{category?.name || 'Ürünler'}</a>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="text-stone-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left: Product Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-100">
              {productImages && productImages.length > 0 && productImages[activeImage] ? (
                <img 
                  src={productImages[activeImage] || productImages[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-200">
                  <Package className="w-16 h-16 text-stone-400" />
                </div>
              )}
              {isInStock && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  STOKTA
                </div>
              )}
            </div>
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, idx) => (
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
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(product.price, product.currency)}
                  </span>
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
                {getProductFeatures().map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-stone-600">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Özellik Kategorileri - Her kategori için ayrı bölüm */}
        {getProductSpecsByCategory().length > 0 && (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 border-t border-stone-100 pt-12">
            <div className="lg:col-span-8 space-y-8">
              {getProductSpecsByCategory().map((category) => (
                <div key={category.categoryId}>
                  <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
                    {category.categoryName}
                  </h2>
                  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {category.specs.map((spec, idx) => (
                          <tr key={`${category.categoryId}-${spec.label}-${idx}`} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                            <th className="py-4 px-6 font-medium text-stone-900 w-1/3 bg-stone-50/50">{spec.label}</th>
                            <td className="py-4 px-6 text-stone-600">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              
              {/* Kurumsal Güvence - Tüm kategorilerden sonra */}
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
        )}

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-semibold text-stone-900">Benzer Ürünler</h2>
            {category && (
              <a href={`/category/${category._id}`} className="text-red-600 font-medium text-sm hover:text-red-700 flex items-center gap-1">
                Tümünü Gör <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getAllProducts()
              .filter(p => p._id !== product._id && (!category || p.category === category._id))
              .slice(0, 4)
              .map((p) => {
                const relatedImage = p.coverImage?.mediumUrl || p.coverImage?.thumbnailUrl || 
                  (p.images && p.images[0]?.mediumUrl) || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800';
                return (
                  <a 
                    key={p._id}
                    href={`/product/${p._id}`}
                    className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 block"
                  >
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <img src={relatedImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-medium text-stone-900 mb-1 truncate">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-bold text-sm">{formatPrice(p.price, p.currency)}</span>
                        <span className="text-xs text-stone-500 group-hover:text-red-600">İncele →</span>
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailPage;
