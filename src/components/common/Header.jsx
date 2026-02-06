import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Home, Search, Heart, ShoppingCart } from 'lucide-react';
import { NAV_LINKS, ROUTES } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useScroll } from '../../hooks/useScroll';

function Header() {
  const { scrollY } = useScroll();
  const { getCartCount } = useCart();
  const headerRef = React.useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  React.useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (scrollY > 50) {
      header.classList.add('shadow-header');
      header.style.background = 'rgba(235, 234, 232, 0.96)';
    } else {
      header.classList.remove('shadow-header');
      header.style.background = 'rgba(235, 234, 232, 0.92)';
    }
  }, [scrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[data-mobile-menu-button]')
      ) {
        closeMobileMenu();
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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 w-full z-50 glass-panel transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2 relative">
            {/* Mobile Menu Button - 44px touch target */}
            <button
              data-mobile-menu-button
              onClick={toggleMobileMenu}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 hover:bg-stone-100 active:bg-stone-200 rounded-button transition-colors duration-smooth relative z-[60] text-stone-700"
              aria-label="Menüyü Aç"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logo */}
            <a 
              href={ROUTES.HOME} 
              className="flex items-center gap-2.5 group flex-1 justify-center lg:flex-none lg:justify-start"
              onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
            >
              <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-ink rounded-card text-white shadow-soft group-hover:bg-ink-light transition-all duration-smooth">
                <Home className="w-5 h-5 md:w-5 md:h-5" />
              </div>
              <span className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-stone-900">
                Sofa Design
              </span>
            </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-600">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 rounded-button transition-all duration-smooth hover:text-primary-600 hover:bg-primary-50 ${window.location.pathname === link.href ? 'text-primary-600 bg-primary-50' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions - 44px touch targets on mobile */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button className="min-h-[44px] min-w-[44px] sm:min-w-0 p-2.5 hover:bg-stone-100 active:bg-stone-200 rounded-button transition-colors duration-smooth text-stone-600 hover:text-primary-600 hidden md:flex items-center justify-center" aria-label="Ara">
              <Search className="w-5 h-5" />
            </button>
            <button className="min-h-[44px] min-w-[44px] sm:min-w-0 p-2.5 hover:bg-stone-100 active:bg-stone-200 rounded-button transition-colors duration-smooth text-stone-600 hover:text-primary-600 relative flex items-center justify-center" aria-label="Favoriler">
              <Heart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            </button>
            <a 
              href={ROUTES.CART}
              className="min-h-[44px] min-w-[44px] sm:min-w-0 p-2.5 hover:bg-stone-100 active:bg-stone-200 rounded-button transition-colors duration-smooth text-stone-600 hover:text-primary-600 relative flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-primary-600 text-[10px] flex items-center justify-center rounded-full text-white font-semibold shadow-soft">
                  {getCartCount()}
                </span>
              )}
            </a>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMobileMenu}
        />

        {/* Sidebar Menu */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-0 left-0 h-full w-[min(320px,90vw)] max-w-[90vw] bg-surface-elevated z-[60] shadow-card-hover lg:hidden transform transition-transform duration-300 ease-out overflow-y-auto border-r border-primary-200 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-primary-100 flex-shrink-0 safe-area-pt">
              <h2 className="font-serif text-xl font-semibold text-stone-900 tracking-tight">
                Menü
              </h2>
              <button
                onClick={closeMobileMenu}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 hover:bg-stone-100 active:bg-stone-200 rounded-button transition-colors text-stone-600"
                aria-label="Menüyü Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 safe-area-pb">
              <div className="space-y-0.5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex items-center min-h-[48px] px-4 py-3 font-medium text-stone-700 hover:bg-primary-50 active:bg-primary-100 hover:text-primary-600 rounded-button transition-colors duration-smooth"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="border-t border-stone-100 p-4 sm:p-6 space-y-3 flex-shrink-0 safe-area-pb">
              <button className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 bg-stone-100 text-stone-700 rounded-button hover:bg-stone-200 active:bg-stone-300 transition-colors duration-smooth text-sm font-medium">
                <Search className="w-4 h-4" />
                Ara
              </button>
              <div className="flex gap-3">
                <button className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 text-stone-600 rounded-button hover:bg-stone-50 active:bg-stone-100 hover:border-stone-300 transition-all duration-smooth text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Favoriler
                </button>
                <a
                  href={ROUTES.CART}
                  onClick={closeMobileMenu}
                  className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 text-stone-600 rounded-button hover:bg-stone-50 active:bg-stone-100 hover:border-stone-300 transition-all duration-smooth relative text-sm font-medium"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Sepet
                  {getCartCount() > 0 && (
                    <span className="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 bg-primary-600 text-[10px] flex items-center justify-center rounded-full text-white font-semibold">
                      {getCartCount()}
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Header;
