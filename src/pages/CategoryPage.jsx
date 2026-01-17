import React, { useState, useEffect } from 'react';
import { Filter, ChevronRight, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function CategoryPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [stockFilter, setStockFilter] = useState('all');
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getCategoryById, getProductsByCategoryId, loading } = useCatalog();

  // Get category ID from URL
  const categoryId = window.location.pathname.split('/category/')[1];
  const category = getCategoryById(categoryId);
  
  // Filter products by category (including subcategories)
  const getCategoryProducts = () => {
    if (!category) return [];
    
    let products = getProductsByCategoryId(categoryId);
    
    // Subcategories varsa onların ürünlerini de ekle
    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach(subcat => {
        products = products.concat(getProductsByCategoryId(subcat._id));
      });
    }
    
    return products;
  };
  
  const categoryProducts = getCategoryProducts();
  
  // Apply stock filter
  const filteredProducts = stockFilter === 'inStock' 
    ? categoryProducts.filter(p => p.stock && p.stock > 0)
    : categoryProducts;

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  if (loading) {
    return (
      <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto text-center text-stone-600">
          Kategori verileri yükleniyor...
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto text-center text-stone-600">
          <h1 className="text-2xl mb-4">Kategori bulunamadı</h1>
          <a href="/products" className="text-red-600 hover:text-red-700">Ürünlere dön →</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Header */}
        <div className="mb-8 border-b border-stone-100 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav className="flex items-center text-sm text-stone-500 mb-4 overflow-x-auto whitespace-nowrap">
                <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
                <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
                <a href="/products" className="hover:text-stone-900 transition-colors">Kategoriler</a>
                <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
                <span className="text-stone-900 font-medium">{category.name}</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
                {category.name}
              </h1>
              <p className="text-stone-600 max-w-2xl text-sm md:text-base">
                {category.description || 'Kurumsal ihtiyaçlarınıza özel çözümler'}
              </p>
            </div>
            <div className="text-stone-500 text-sm font-medium">
              {sortedProducts.length} Ürün Listeleniyor
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Sidebar (Desktop) / Dropdown (Mobile) */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-semibold text-lg">Filtreler</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-red-600 font-medium">Kapat</button>
              </div>

              {/* Filter Group: Category */}
              <div className="border-b border-stone-100 pb-4">
                <h4 className="font-semibold text-stone-900 mb-3 text-sm uppercase tracking-wide">Alt Kategoriler</h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li><label className="flex items-center gap-2 cursor-pointer hover:text-red-600"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/> Çalışma Masaları</label></li>
                  <li><label className="flex items-center gap-2 cursor-pointer hover:text-red-600"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/> Ofis Koltukları</label></li>
                  <li><label className="flex items-center gap-2 cursor-pointer hover:text-red-600"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/> Toplantı Masaları</label></li>
                  <li><label className="flex items-center gap-2 cursor-pointer hover:text-red-600"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/> Depolama</label></li>
                </ul>
              </div>

              {/* Filter Group: Price */}
              <div className="border-b border-stone-100 pb-4">
                <h4 className="font-semibold text-stone-900 mb-3 text-sm uppercase tracking-wide">Fiyat Aralığı</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full border border-stone-200 rounded px-2 py-1 text-sm focus:border-red-500 focus:outline-none"/>
                  <span className="text-stone-400">-</span>
                  <input type="number" placeholder="Max" className="w-full border border-stone-200 rounded px-2 py-1 text-sm focus:border-red-500 focus:outline-none"/>
                </div>
              </div>

              {/* Filter Group: Material */}
              <div className="border-b border-stone-100 pb-4">
                <h4 className="font-semibold text-stone-900 mb-3 text-sm uppercase tracking-wide">Malzeme</h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li><label className="flex items-center gap-2 cursor-pointer hover:text-red-600"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/> Ahşap</label></li>
                  <li><label className="flex items-center gap-2 cursor-pointer hover:text-red-600"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/> Metal</label></li>
                  <li><label className="flex items-center gap-2 cursor-pointer hover:text-red-600"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/> Cam</label></li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100 lg:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-stone-700 border border-stone-200 px-4 py-2 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
              >
                <Filter className="w-4 h-4" /> Filtrele
              </button>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-red-600 focus:ring-red-500 border-stone-300"
                    checked={stockFilter === 'inStock'}
                    onChange={(e) => setStockFilter(e.target.checked ? 'inStock' : 'all')}
                  />
                  <span className="text-stone-700">Stokta</span>
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-stone-500">Sırala:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-medium text-stone-900 bg-transparent border-none focus:ring-0 cursor-pointer"
                  >
                    <option value="recommended">Önerilen</option>
                    <option value="newest">En Yeni</option>
                    <option value="price-asc">Fiyat ↑</option>
                    <option value="price-desc">Fiyat ↓</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
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
                <span className="text-sm text-stone-500">Sırala:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium text-stone-900 border-stone-200 rounded-lg focus:border-red-500 focus:ring-0 cursor-pointer"
                >
                  <option value="recommended">Önerilen</option>
                  <option value="newest">En Yeni</option>
                  <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                  <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <CategoryProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-stone-500 text-lg mb-4">Bu kategoride ürün bulunmamaktadır.</p>
                <a href="/products" className="text-red-600 font-semibold hover:text-red-700">
                  Tüm Ürünleri Gör →
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified Card for Category Page
function CategoryProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

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

  const getFirstFeature = () => {
    if (product.features && product.features.length > 0) {
      return product.features[0].name || product.features[0].value;
    }
    return product.description || 'Yüksek kalite';
  };

  const isInStock = product.stock && product.stock > 0;

  const handleAddToCart = (e) => {
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
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col">
      <a href={`/product/${product._id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
        <img
          src={getProductImage()}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isInStock && (
          <div className="absolute top-3 left-3">
            <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              STOKTA
            </div>
          </div>
        )}
      </a>
      <div className="p-4 flex flex-col flex-1">
        <a href={`/product/${product._id}`}>
          <h3 className="font-serif text-lg font-medium text-stone-900 mb-1 group-hover:text-red-600 transition-colors truncate">
            {product.name}
          </h3>
        </a>
        <p className="text-xs text-stone-500 mb-3 line-clamp-1">{getFirstFeature()}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-red-600">{formatPrice(product.price, product.currency)}</div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAddToCart}
              className="text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
            >
              <ShoppingCart className="w-3 h-3" />
            </button>
            <a 
              href={`/product/${product._id}`}
              className="text-xs font-semibold text-red-600 border border-red-100 px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
            >
              Detay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
