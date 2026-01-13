import React from 'react';
import { Home, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Clock } from 'lucide-react';
import { FOOTER_LINKS, CONTACT_INFO, COMPANY_STATS } from '../../utils/constants';

function Footer() {
  return (
    <footer id="contact" className="bg-stone-900 text-white pt-12 pb-6 px-4 md:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded text-white">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold">WMB.</span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed">
              Kurumsal mobilya çözümlerinde güvenilir ortağınız.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-white uppercase tracking-wider">
              Kategoriler
            </h4>
            <ul className="space-y-2.5 text-stone-400 text-sm">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-red-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-white uppercase tracking-wider">
              Kurumsal
            </h4>
            <ul className="space-y-2.5 text-stone-400 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-red-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-white uppercase tracking-wider">
              Destek
            </h4>
            <ul className="space-y-2.5 text-stone-400 text-sm">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-red-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
          <p>© 2024 WMB Mobilya. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
