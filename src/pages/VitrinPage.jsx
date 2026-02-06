import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ShoppingCart, Folder, Filter, ChevronDown, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductImageUrl, getCategoryImageUrl } from '../utils/imageHelpers';
import { formatPrice } from '../utils/priceHelpers';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Önerilen' },
  { value: 'newest', label: 'En Yeni' },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
];

function VitrinPage() {
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sortDropdownRef = useRef(null);
  const categoriesScrollRef = useRef(null);

  const updateCategoriesScrollState = () => {
    const el = categoriesScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  const scrollCategories = (direction) => {
    const el = categoriesScrollRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    if (!first) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 8;
    const cardStep = first.offsetWidth + gap;
    const visibleCount = Math.max(1, Math.floor(el.clientWidth / cardStep));
    const step = cardStep * visibleCount;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { getAllProducts, getProductsByCategoryId, getRootCategories, loading } = useCatalog();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
        setSortDropdownOpen(false);
      }
    };
    if (sortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [sortDropdownOpen]);

  const allProducts = getAllProducts();
  const rootCategories = getRootCategories() || [];

  useEffect(() => {
    updateCategoriesScrollState();
    const el = categoriesScrollRef.current;
    if (!el) return;
    const onScroll = () => updateCategoriesScrollState();
    el.addEventListener('scroll', onScroll);
    const ro = new ResizeObserver(updateCategoriesScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [rootCategories.length]);

  const getSortPrice = (p) => {
    if (p.kampanyaDaMi && p.kampanyaliFiyat != null) return typeof p.kampanyaliFiyat === 'number' ? p.kampanyaliFiyat : parseFloat(p.kampanyaliFiyat) || 0;
    const pr = typeof p.price === 'number' ? p.price : parseFloat(p.price);
    return pr != null && !Number.isNaN(pr) ? pr : 0;
  };
  const filteredProducts = useMemo(() => {
    const sorted = [...allProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return getSortPrice(a) - getSortPrice(b);
      if (sortBy === 'price-desc') return getSortPrice(b) - getSortPrice(a);
      return 0;
    });
    return sorted;
  }, [sortBy, allProducts]);

  if (loading) {
    return (
      <div className="pt-24 pb-12 px-4 min-h-screen flex items-center justify-center bg-surface">
        <p className="text-stone-500 text-sm font-medium">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 md:px-8 bg-surface min-h-screen">
      {/* lg: Grid - üst satır kategoriler, alt satır filtre | ürünler (filtre ile ürünler üst hizalı) */}
      <section className="mb-8 w-full flex flex-col lg:grid gap-8 lg:grid-cols-[18rem_1fr] lg:grid-rows-[auto_auto] lg:items-start">
        {/* 1. Kategoriler - lg'de üst satır sağ sütun */}
        <div className="order-1 min-w-0 lg:col-start-2 lg:row-start-1 lg:max-w-6xl">
          <section className="mb-14">
            <h2 className="text-[10px] font-semibold text-stone-500 uppercase tracking-overline mb-3">
              Kategoriler
            </h2>
            {rootCategories.length > 0 && (
              <div className="flex items-center gap-1 min-w-0">
                {rootCategories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => scrollCategories('left')}
                    disabled={!canScrollLeft}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:border-stone-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    aria-label="Önceki kategoriler"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div
                    ref={categoriesScrollRef}
                    className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {rootCategories.map((cat) => {
                      const imageUrl = getCategoryImageUrl(cat, 'thumbnail');
                      const productCount = getProductsByCategoryId(cat._id).length;
                      return (
                        <a
                          key={cat._id}
                          href={`/category/${cat._id}`}
                          className="group flex flex-col rounded-lg bg-white border border-stone-100 shadow-soft hover:shadow-card hover:border-stone-200 transition-all duration-200 overflow-hidden w-[120px] min-w-[120px] sm:w-[130px] sm:min-w-[130px] flex-shrink-0"
                        >
                          <div className="aspect-[4/3] bg-stone-50 overflow-hidden">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Folder className="w-6 h-6 text-stone-300" />
                              </div>
                            )}
                          </div>
                          <div className="p-2 flex-1 flex flex-col min-w-0">
                            <span className="font-medium text-stone-900 text-xs group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                              {cat.name}
                            </span>
                            {productCount > 0 && (
                              <span className="text-[10px] text-stone-500 mt-0.5">
                                {productCount} ürün
                              </span>
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
                {rootCategories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => scrollCategories('right')}
                    disabled={!canScrollRight}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:border-stone-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    aria-label="Sonraki kategoriler"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </section>
        </div>

        {/* 2. Filtre & Sırala - lg'de alt satır sol sütun (ürünlerle üst hizalı) */}
        <aside className={`order-2 w-full max-w-full lg:col-start-1 lg:row-start-2 lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="lg:sticky lg:top-24">
            <div className="bg-surface-elevated rounded-card border border-primary-200 shadow-soft p-4 sm:p-5 space-y-5">
              <div className="flex items-center justify-between lg:hidden pb-4 border-b border-primary-100">
                <h3 className="font-semibold text-stone-900">Filtre & Sırala</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-primary-600 font-medium hover:text-primary-800 transition-colors">Kapat</button>
              </div>

              {/* Fiyat Aralığı */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-overline mb-2.5">Fiyat Aralığı</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full bg-surface border border-primary-200 rounded-button px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 outline-none transition-all"
                  />
                  <span className="text-stone-400 text-sm font-medium">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full bg-surface border border-primary-200 rounded-button px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Sırala - Custom dropdown */}
              <div ref={sortDropdownRef} className="relative">
                <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-overline mb-2.5">Sırala</label>
                <button
                  type="button"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="w-full flex items-center justify-between gap-2 bg-surface border border-primary-200 rounded-button px-3 py-2.5 text-sm font-medium text-stone-900 hover:border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 outline-none transition-all text-left"
                >
                  <span>{SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Önerilen'}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 flex-shrink-0 transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 z-20 bg-surface-elevated rounded-card border border-primary-200 shadow-card py-1 min-w-[100%] overflow-hidden sort-dropdown-panel">
                    <div className="max-h-[240px] overflow-y-auto overscroll-contain">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.value);
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left transition-colors ${
                            sortBy === opt.value
                              ? 'bg-primary-100 text-primary-800 font-medium'
                              : 'text-stone-700 hover:bg-primary-50'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.value && <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* 3. Ürünler - lg'de alt satır sağ sütun (filtre ile üst hizalı) */}
        <div className="order-3 min-w-0 lg:col-start-2 lg:row-start-2 lg:max-w-6xl">
          {!showFilters && (
            <div className="flex justify-end mb-6 lg:hidden">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 text-sm font-medium text-stone-700 border border-primary-200 bg-surface-elevated rounded-button px-4 py-2.5 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <Filter className="w-4 h-4" /> Filtre & Sırala
              </button>
            </div>
          )}

          <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-overline mb-5">
            Ürünler
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <VitrinProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-stone-500 text-sm">
              Bu kriterlere uygun ürün bulunamadı.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Kategori sayfasındaki CategoryProductCard ile birebir aynı (boyut ve yapı)
function VitrinProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const getProductImage = () => {
    const url = getProductImageUrl(product, 'medium');
    if (url) return url;
    if (product.images && product.images.length > 0) {
      const primaryImage = product.images.find(img => img.isPrimary === true);
      if (primaryImage) {
        if (primaryImage.mediumUrl) return primaryImage.mediumUrl;
        if (primaryImage.thumbnailUrl) return primaryImage.thumbnailUrl;
        if (primaryImage.originalUrl) return primaryImage.originalUrl;
      }
      const firstImage = product.images[0];
      if (firstImage?.mediumUrl) return firstImage.mediumUrl;
      if (firstImage?.thumbnailUrl) return firstImage.thumbnailUrl;
      if (firstImage?.originalUrl) return firstImage.originalUrl;
    }
    if (product.coverImage?.mediumUrl) return product.coverImage.mediumUrl;
    if (product.coverImage?.thumbnailUrl) return product.coverImage.thumbnailUrl;
    if (product.coverImage?.originalUrl) return product.coverImage.originalUrl;
    return 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800';
  };

  const getFirstFeature = () => {
    if (product.features && product.features.length > 0) {
      return product.features[0].name || product.features[0].value;
    }
    return product.description || 'Yüksek kalite';
  };

  const displayPrice = product.kampanyaDaMi && product.kampanyaliFiyat != null ? product.kampanyaliFiyat : product.price;
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product._id,
      _id: product._id,
      name: product.name,
      price: formatPrice(displayPrice, product.currency),
      image: getProductImage(),
    });
    showToast(`${product.name} sepete eklendi`, 'success');
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 flex flex-col">
      <a href={`/product/${product._id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100 block">
        <img
          src={getProductImage()}
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
        <p className="text-xs text-stone-500 mb-3 line-clamp-1">{getFirstFeature()}</p>
        {product.kampanyaDaMi && product.kampanyaOrani != null && (
          <span className="inline-block text-[10px] font-semibold text-white bg-primary-600 px-2 py-0.5 rounded mb-2 w-fit">
            %{product.kampanyaOrani} indirim
          </span>
        )}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            {product.kampanyaDaMi && product.kampanyaliFiyat != null ? (
              <>
                <div className="text-xs text-stone-400 line-through">{formatPrice(product.price, product.currency)}</div>
                <div className="font-bold text-primary-600">{formatPrice(product.kampanyaliFiyat, product.currency)}</div>
              </>
            ) : (
              <div className="font-bold text-primary-600">{formatPrice(product.price, product.currency)}</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
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
}

export default VitrinPage;
