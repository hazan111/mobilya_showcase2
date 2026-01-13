import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Home, Search, Heart, ShoppingCart, ChevronDown, ArrowRight, Package, Star } from 'lucide-react';
import { NAV_LINKS, CATEGORIES } from '../../utils/constants';
import { useScroll } from '../../hooks/useScroll';

function Header() {
  const { scrollY } = useScroll();
  const headerRef = React.useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesDropdownRef = useRef(null);
  const categoriesTriggerRef = useRef(null);

  React.useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (scrollY > 50) {
      header.classList.add('shadow-md');
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.classList.remove('shadow-md');
      header.style.background = 'rgba(255, 255, 255, 0.8)';
    }
  }, [scrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(event.target) &&
        categoriesTriggerRef.current &&
        !categoriesTriggerRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    if (isCategoriesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isCategoriesOpen]);

  const handleCategoriesMouseEnter = () => {
    setIsCategoriesOpen(true);
  };

  const handleCategoriesMouseLeave = () => {
    setTimeout(() => {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.matches(':hover')) {
        setIsCategoriesOpen(false);
      }
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    setIsCategoriesOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsCategoriesOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 glass-panel transition-all duration-300 ${isMobileMenuOpen ? 'lg:relative' : ''}`}
      >
        <div className="max-w-[95%] mx-auto px-4 py-4 md:py-5">
          <div className="flex justify-between items-center relative">
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-red-50 rounded-full transition-colors z-[60] relative"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-stone-800" />
              ) : (
                <Menu className="w-6 h-6 text-stone-800" />
              )}
            </button>

            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center gap-2 group flex-1 justify-center lg:flex-none lg:justify-start"
              onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-600 rounded text-white shadow-lg shadow-red-200 group-hover:bg-red-700 transition-colors duration-300">
                <Home className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
                WMB<span className="text-red-600">.</span>
              </span>
            </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-600">
            {NAV_LINKS.map((link) => {
              if (link.href === '/products' && link.label === 'Kategoriler') {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={handleCategoriesMouseEnter}
                    onMouseLeave={handleCategoriesMouseLeave}
                  >
                    <a
                      ref={categoriesTriggerRef}
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-2 hover:text-red-600 transition-colors relative z-10"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                    </a>

                    {/* Mega Menu Dropdown */}
                    {isCategoriesOpen && (
                      <div
                        ref={categoriesDropdownRef}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden dropdown-fade-up z-50"
                      >
                        {/* Connecting Bridge (Invisible) to prevent closing when moving mouse */}
                        <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>

                        <div className="grid grid-cols-12 min-h-[400px]">
                          {/* Left Column: Categories List */}
                          <div className="col-span-8 p-6 border-r border-stone-100 bg-white">
                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 px-2">
                              Tüm Kategoriler
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                              {CATEGORIES.map((category) => (
                                <a
                                  key={category.id}
                                  href={`/category/${category.id}`}
                                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-all duration-200"
                                  onClick={() => setIsCategoriesOpen(false)}
                                >
                                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-100 group-hover:border-red-100">
                                    <img
                                      src={category.image}
                                      alt={category.title}
                                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                      <h4 className="font-serif font-semibold text-stone-900 group-hover:text-red-600 transition-colors">
                                        {category.title}
                                      </h4>
                                      <ArrowRight className="w-4 h-4 text-stone-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                                    </div>
                                    <p className="text-xs text-stone-500 line-clamp-1 group-hover:text-stone-600">
                                      {category.subtitle}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                            <div className="mt-4 px-2">
                              <a
                                href="/products"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:gap-3 transition-all"
                              >
                                Tüm Ürünleri İncele
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                          </div>

                          {/* Right Column: Highlights / Promo */}
                          <div className="col-span-4 bg-stone-50 p-6 flex flex-col">
                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">
                              Öne Çıkanlar
                            </h3>
                            
                            <div className="flex-1 flex flex-col gap-4">
                              {/* Promo Card 1 */}
                              <a href="#" className="group relative rounded-xl overflow-hidden aspect-[4/3] flex-shrink-0">
                                <img 
                                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" 
                                  alt="Yeni Sezon" 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                  <span className="text-white text-xs font-medium mb-1 bg-red-600 inline-block px-2 py-0.5 rounded w-fit">Yeni</span>
                                  <h4 className="text-white font-serif font-semibold text-lg leading-tight">2024 Ofis Koleksiyonu</h4>
                                </div>
                              </a>

                              {/* Quick Links */}
                              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex-1">
                                <h4 className="font-semibold text-stone-900 mb-3 flex items-center gap-2 text-sm">
                                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                  Popüler Seçimler
                                </h4>
                                <ul className="space-y-2.5">
                                  <li><a href="#" className="text-xs text-stone-600 hover:text-red-600 transition-colors block">• Ergonomik Koltuklar</a></li>
                                  <li><a href="#" className="text-xs text-stone-600 hover:text-red-600 transition-colors block">• Yönetici Masaları</a></li>
                                  <li><a href="#" className="text-xs text-stone-600 hover:text-red-600 transition-colors block">• Akustik Paneller</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={link.href} className="magnetic-wrap">
                  <a
                    href={link.href}
                    className="block px-4 py-2 hover:text-red-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-red-50 rounded-full transition-colors hover:text-red-600 hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-red-50 rounded-full transition-colors hover:text-red-600 relative">
              <Heart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            </button>
            <button className="p-2 hover:bg-red-50 rounded-full transition-colors hover:text-red-600 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-[10px] flex items-center justify-center rounded-full text-white font-bold shadow-sm">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-[55] lg:hidden"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Mobile Menu Content */}
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[60] shadow-2xl overflow-y-auto lg:hidden mobile-menu-container transform transition-transform duration-300 ease-in-out">
            <div className="p-6 h-full flex flex-col">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200 flex-shrink-0">
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Menü
                </h2>
                <button 
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5 text-stone-800" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 flex-1 overflow-y-auto">
                {NAV_LINKS.map((link) => {
                  if (link.href === '/products' && link.label === 'Kategoriler') {
                    return (
                      <div key={link.href}>
                        <button
                          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isCategoriesOpen && (
                          <div className="pl-4 mt-2 space-y-1 border-l-2 border-stone-100">
                            {CATEGORIES.map((category) => (
                              <a
                                key={category.id}
                                href={`/category/${category.id}`}
                                onClick={closeMobileMenu}
                                className="block px-4 py-2 text-sm text-stone-600 hover:text-red-600 hover:bg-stone-50 rounded-lg transition-colors"
                              >
                                {category.title}
                              </a>
                            ))}
                            <a
                              href="/products"
                              onClick={closeMobileMenu}
                              className="block px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Tüm Ürünler →
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 font-semibold text-stone-900 hover:bg-stone-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-auto pt-6 border-t border-stone-200 space-y-3 flex-shrink-0">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors">
                  <Search className="w-5 h-5" />
                  Ara
                </button>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
                    <Heart className="w-5 h-5" />
                    Favoriler
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors relative">
                    <ShoppingCart className="w-5 h-5" />
                    Sepet
                    <span className="absolute top-2 right-2 w-4 h-4 bg-red-600 text-[10px] flex items-center justify-center rounded-full text-white font-bold">
                      2
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
    </>
  );
}

export default Header;
