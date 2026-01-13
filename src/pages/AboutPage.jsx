import React from 'react';
import { Building2, Settings, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import { COMPANY_STATS } from '../utils/constants';

function AboutPage() {
  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* 1. Company Overview */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Hakkımızda</span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Hakkımızda
          </h1>
          <p className="text-stone-600 text-base leading-relaxed max-w-3xl">
            1998 yılından bu yana kurumsal mobilya sektöründe faaliyet gösteriyoruz. Ofis ve ticari alanlar için 
            mobilya çözümleri üretiyor, tasarım ve proje yönetimi hizmetleri sunuyoruz.
          </p>
        </div>

        {/* 2. Operational Scale */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-red-600" />
            Operasyonel Ölçek
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{COMPANY_STATS.years}</div>
              <div className="text-xs text-stone-600">Yıl Tecrübe</div>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{COMPANY_STATS.branches}</div>
              <div className="text-xs text-stone-600">Şube</div>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{COMPANY_STATS.cities}</div>
              <div className="text-xs text-stone-600">Şehir</div>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{COMPANY_STATS.projects}</div>
              <div className="text-xs text-stone-600">Tamamlanan Proje</div>
            </div>
          </div>
        </div>

        {/* 3. Service Approach */}
        <div className="mb-8">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-600" />
            Hizmet Yaklaşımı
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 border border-stone-200 rounded-lg bg-white">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 text-sm">Bütünleşik Hizmet</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tasarım, üretim, lojistik ve montaj süreçlerinin tek merkezden yönetimi.
              </p>
            </div>
            <div className="p-5 border border-stone-200 rounded-lg bg-white">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-3">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 text-sm">Kalite Standartları</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                ISO 9001:2015 kalite yönetim sistemi. E1 standartlarında hammadde kullanımı.
              </p>
            </div>
            <div className="p-5 border border-stone-200 rounded-lg bg-white">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 text-sm">Satış Sonrası Destek</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                2-3 yıl garanti, yedek parça temini ve bakım hizmetleri.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;
