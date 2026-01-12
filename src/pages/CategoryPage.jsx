import React, { useState } from 'react';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/sections/ProductsSection'; // Reusing ProductCard logic but will adapt
import { PRODUCTS } from '../utils/constants';

function CategoryPage() {
  const [showFilters, setShowFilters] = useState(false);

  // Mock category data
  const category = {
    title: 'Ofis Mobilyaları',
    description: 'Ergonomik ve şık tasarımlarla ofisinizin verimliliğini artırın. Çalışma masaları, koltuklar ve depolama çözümleri.',
    count: 124
  };

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Header */}
        <div className="mb-8 border-b border-stone-100 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-sm text-stone-500 mb-2">Ana Sayfa / Kategoriler / Ofis Mobilyaları</div>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
                {category.title}
              </h1>
              <p className="text-stone-600 max-w-2xl text-sm md:text-base">
                {category.description}
              </p>
            </div>
            <div className="text-stone-500 text-sm font-medium">
              {category.count} Ürün Listeleniyor
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
                <span className="text-sm text-stone-500">Sırala:</span>
                <select className="text-sm font-medium text-stone-900 bg-transparent border-none focus:ring-0 cursor-pointer">
                  <option>Önerilen</option>
                  <option>En Yeni</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                </select>
              </div>
            </div>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-end mb-6">
               <div className="flex items-center gap-2">
                <span className="text-sm text-stone-500">Sırala:</span>
                <select className="text-sm font-medium text-stone-900 border-stone-200 rounded-lg focus:border-red-500 focus:ring-0 cursor-pointer">
                  <option>Önerilen</option>
                  <option>En Yeni</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Using existing products repeated for demo */}
              {[...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((product, index) => (
                <CategoryProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <button className="px-8 py-3 bg-stone-100 text-stone-900 font-medium rounded-lg hover:bg-stone-200 transition-colors">
                Daha Fazla Göster
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified Card for Category Page
function CategoryProductCard({ product }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
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
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-stone-900 mb-1 group-hover:text-red-600 transition-colors truncate">
          {product.name}
        </h3>
        <p className="text-xs text-stone-500 mb-3 line-clamp-1">{product.features[0]}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-stone-900">{product.price}</span>
          <button className="text-xs font-semibold text-red-600 border border-red-100 px-3 py-1.5 rounded hover:bg-red-50 transition-colors">
            İncele
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
