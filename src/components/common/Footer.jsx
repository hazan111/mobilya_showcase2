import React from 'react';
import { Home, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Clock } from 'lucide-react';
import { FOOTER_LINKS, CONTACT_INFO, COMPANY_STATS, ROUTES } from '../../utils/constants';

function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 md:px-8 border-t border-ink-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-16 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-1">
            <a href={ROUTES.HOME} className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-card border border-primary-500 text-primary-400 group-hover:border-primary-400 group-hover:text-primary-300 transition-all duration-200">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight">Sofa Design</span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Kurumsal mobilya çözümlerinde güvenilir ortağınız.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-primary-400 uppercase tracking-overline mb-5">
              Kategoriler
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-stone-400 text-sm">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-block py-1.5 hover:text-primary-300 transition-colors duration-200 min-h-[44px] flex items-center">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-primary-400 uppercase tracking-overline mb-4 sm:mb-5">
              Kurumsal
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-stone-400 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-block py-1.5 hover:text-primary-300 transition-colors duration-200 min-h-[44px] flex items-center">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-primary-400 uppercase tracking-overline mb-4 sm:mb-5">
              Destek
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-stone-400 text-sm">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-block py-1.5 hover:text-primary-300 transition-colors duration-200 min-h-[44px] flex items-center">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 text-center md:text-left">
          <p>© 2024 Sofa Design. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <a href={ROUTES.PRIVACY} className="py-2 hover:text-primary-400 transition-colors duration-200 min-h-[44px] flex items-center justify-center">Gizlilik Politikası</a>
            <a href={ROUTES.TERMS} className="py-2 hover:text-primary-400 transition-colors duration-200 min-h-[44px] flex items-center justify-center">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
