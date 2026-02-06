import React, { useState, useEffect } from 'react';
import {
  Building2, Settings, Users, CheckCircle2, ChevronRight,
} from 'lucide-react';
import { COMPANY_STATS, ROUTES, LABELS } from '../utils/constants';
import { catalogService } from '../services/catalogService';
import { DEFAULT_COMPANY_ID } from '../utils/apiConfig';

function AboutPage() {
  const [contactData, setContactData] = useState(null);
  const [contactLoading, setContactLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    catalogService.getCompanyContactInfo(DEFAULT_COMPANY_ID)
      .then((data) => { if (!cancelled) setContactData(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setContactLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 md:px-8 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Başlık & breadcrumb */}
        <div className="mb-8 sm:mb-12 border-b border-stone-100 pb-6 sm:pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href={ROUTES.HOME} className="hover:text-stone-900 transition-colors">{LABELS.HOME}</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">{LABELS.ABOUT}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Hakkımızda
          </h1>
          <p className="text-stone-600 max-w-3xl text-base sm:text-lg leading-relaxed">
            Sofa Design olarak kurumsal mobilya sektöründeki tecrübemizi bu sayfada bulabilirsiniz.
          </p>
        </div>

        {/* HAKKIMIZDA BÖLÜMÜ */}
        <section className="mb-14 sm:mb-20" id="hakkimizda">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary-600" />
            Hakkımızda
          </h2>
          <p className="text-stone-600 text-base leading-relaxed max-w-3xl mb-8">
            1998 yılından bu yana kurumsal mobilya sektöründe faaliyet gösteriyoruz. Ofis ve ticari alanlar için
            mobilya çözümleri üretiyor, tasarım ve proje yönetimi hizmetleri sunuyoruz.
          </p>

          {/* Operasyonel ölçek - şube sayısı API'den (contactData.branches) */}
          <div className="mb-10">
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">Operasyonel Ölçek</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-surface-elevated p-4 sm:p-6 rounded-card border border-primary-200 text-center shadow-soft">
                <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">{COMPANY_STATS.years}</div>
                <div className="text-xs text-stone-600">Yıl Tecrübe</div>
              </div>
              <div className="bg-surface-elevated p-4 sm:p-6 rounded-card border border-primary-200 text-center shadow-soft">
                <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">
                  {!contactLoading && contactData?.branches != null ? contactData.branches.length : COMPANY_STATS.branches}
                </div>
                <div className="text-xs text-stone-600">Şube</div>
              </div>
              <div className="bg-surface-elevated p-4 sm:p-6 rounded-card border border-primary-200 text-center shadow-soft">
                <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">{COMPANY_STATS.projects}</div>
                <div className="text-xs text-stone-600">Tamamlanan Proje</div>
              </div>
            </div>
          </div>

          {/* Hizmet yaklaşımı */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">Hizmet Yaklaşımı</h3>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
              <div className="p-4 sm:p-5 border border-primary-200 rounded-card bg-surface-elevated shadow-soft">
                <div className="w-10 h-10 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-2 text-sm">Bütünleşik Hizmet</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Tasarım, üretim, lojistik ve montaj süreçlerinin tek merkezden yönetimi.
                </p>
              </div>
              <div className="p-4 sm:p-5 border border-primary-200 rounded-card bg-surface-elevated shadow-soft">
                <div className="w-10 h-10 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 mb-3">
                  <Settings className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-2 text-sm">Kalite Standartları</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  ISO 9001:2015 kalite yönetim sistemi. E1 standartlarında hammadde kullanımı.
                </p>
              </div>
              <div className="p-4 sm:p-5 border border-primary-200 rounded-card bg-surface-elevated shadow-soft">
                <div className="w-10 h-10 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-2 text-sm">Satış Sonrası Destek</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  2-3 yıl garanti, yedek parça temini ve bakım hizmetleri.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
