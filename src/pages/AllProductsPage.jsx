import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, ArrowRight, ShoppingCart, CheckCircle, Truck, Shield, Wrench, Package } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function AllProductsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState(null); // null = 'Tümü'
  const [stockFilter, setStockFilter] = useState('all'); // all, inStock
  const [sortBy, setSortBy] = useState('recommended');
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getAllProducts, getAllCategories, getProductsByCategoryId, loading } = useCatalog();

  const allProducts = getAllProducts();
  const categories = getAllCategories();

  // Filter products by category
  const filteredProducts = useMemo(() => {
    let products = activeCategoryId 
      ? getProductsByCategoryId(activeCategoryId)
      : allProducts;
    
    // Apply stock filter
    if (stockFilter === 'inStock') {
      products = products.filter(p => p.stock && p.stock > 0);
    }
    
    // Sort products
    const sorted = [...products].sort((a, b) => {
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
  }, [activeCategoryId, stockFilter, sortBy, allProducts, getProductsByCategoryId]);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Page Header */}
        <div className="mb-6 border-b border-stone-100 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <h1 className="text-3xl font-serif text-stone-900 mb-1">
                Ürünler
              </h1>
              <p className="text-stone-600 text-sm max-w-2xl">
                Ofisiniz için en uygun mobilya çözümlerini keşfedin. Geniş ürün yelpazesi, stoktan hızlı teslimat.
              </p>
            </div>
            <div className="text-stone-500 text-xs font-medium">
              {filteredProducts.length} Ürün Listeleniyor
            </div>
          </div>
        </div>

        {/* 2. Sticky Control Bar */}
        <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-y border-stone-200 py-3 mb-8 shadow-sm -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <div className="flex items-center gap-2 border-r border-stone-200 pr-4 mr-2 flex-shrink-0">
                <Filter className="w-4 h-4 text-stone-400" />
                <span className="text-sm font-semibold text-stone-900">Filtrele:</span>
              </div>
              
              {/* Category Pills */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCategoryId(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    activeCategoryId === null 
                      ? 'bg-stone-900 text-white' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Tümü
                </button>
                {categories.slice(0, 10).map(cat => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategoryId(cat._id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                      activeCategoryId === cat._id 
                        ? 'bg-stone-900 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Sort & Stock */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="rounded text-red-600 focus:ring-red-500 border-stone-300"
                  checked={stockFilter === 'inStock'}
                  onChange={(e) => setStockFilter(e.target.checked ? 'inStock' : 'all')}
                />
                <span className="text-stone-700">Sadece Stoktakiler</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-sm text-stone-500 hidden sm:inline">Sırala:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium text-stone-900 bg-transparent border-none focus:ring-0 cursor-pointer pr-8 pl-0 py-0"
                >
                  <option value="recommended">Önerilen</option>
                  <option value="newest">En Yeni</option>
                  <option value="price-asc">Fiyat: Artan</option>
                  <option value="price-desc">Fiyat: Azalan</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-stone-600">Ürünler yükleniyor...</div>
        ) : (
        /* 3. Product Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => {
            const getProductImage = () => {
              if (product.coverImage?.mediumUrl) return product.coverImage.mediumUrl;
              if (product.coverImage?.thumbnailUrl) return product.coverImage.thumbnailUrl;
              if (product.images && product.images.length > 0) {
                return product.images[0].mediumUrl || product.images[0].thumbnailUrl;
              }
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

            const isInStock = product.stock && product.stock > 0;

            return (
            <div key={product._id} className="group bg-white rounded-xl border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col">
              {/* Image Area - Clickable */}
              <a href={`/product/${product._id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 rounded-t-xl border-b border-stone-100 block">
                <img
                  src={getProductImage()}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {isInStock && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur text-green-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-green-100 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      STOKTA
                    </div>
                  </div>
                )}
              </a>

              {/* Content Area */}
              <div className="p-4 flex flex-col flex-1">
                <a href={`/product/${product._id}`} className="mb-3 block">
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1 leading-tight group-hover:text-red-600 transition-colors">
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
                      <div className="text-lg font-bold text-red-600">{formatPrice(product.price, product.currency)}</div>
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
                      className="flex-1 bg-stone-900 text-white text-xs font-bold py-2.5 px-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Sepete Ekle
                    </button>
                    <a 
                      href={`/product/${product._id}`} 
                      className="text-stone-500 hover:text-red-600 transition-colors p-2"
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
            <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm">
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
