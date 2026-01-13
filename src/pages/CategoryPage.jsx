import React, { useState } from 'react';
import { Filter, ChevronRight, ArrowRight, ShoppingCart } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../utils/constants';

function CategoryPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [stockFilter, setStockFilter] = useState('all');

  // Get category ID from URL
  const categoryId = parseInt(window.location.pathname.split('/category/')[1] || '1');
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  
  // Filter products by category
  const categoryProducts = PRODUCTS.filter(p => p.category === category.title);
  
  // Apply stock filter
  const filteredProducts = stockFilter === 'inStock' 
    ? categoryProducts.filter(p => p.inStock)
    : categoryProducts;

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      const priceA = parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      const priceB = parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-desc') {
      const priceA = parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      const priceB = parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      return priceB - priceA;
    }
    return 0;
  });

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
                <span className="text-stone-900 font-medium">{category.title}</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
                {category.title}
              </h1>
              <p className="text-stone-600 max-w-2xl text-sm md:text-base">
                {category.subtitle}
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
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col">
      <a href={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.inStock && (
          <div className="absolute top-3 left-3">
            <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              STOKTA
            </div>
          </div>
        )}
      </a>
      <div className="p-4 flex flex-col flex-1">
        <a href={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-medium text-stone-900 mb-1 group-hover:text-red-600 transition-colors truncate">
            {product.name}
          </h3>
        </a>
        <p className="text-xs text-stone-500 mb-3 line-clamp-1">{product.features && product.features[0]}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-red-600">{product.price}</div>
            {product.originalPrice && (
              <div className="text-xs text-stone-400 line-through">{product.originalPrice}</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Sepete ekle işlevi
              }}
              className="text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
            >
              <ShoppingCart className="w-3 h-3" />
            </button>
            <a 
              href={`/product/${product.id}`}
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
