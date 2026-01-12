import React from 'react';
import { Building2, Globe, Settings, Users, CheckCircle2 } from 'lucide-react';
import { COMPANY_STATS } from '../utils/constants';

function AboutPage() {
  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-stone-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Kurumsal Profil
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            1998 yılından bu yana ofis ve ticari alanlar için profesyonel mobilya çözümleri sunuyoruz.
            Tasarım, üretim ve proje yönetimi süreçlerini bütünleşik bir yapıda yöneterek,
            iş dünyasının ihtiyaçlarına yönelik fonksiyonel ve estetik çalışma alanları oluşturuyoruz.
          </p>
        </div>

        {/* Operational Scale */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
            <h2 className="flex items-center gap-2 text-xl font-serif font-semibold text-stone-900 mb-4">
              <Building2 className="w-5 h-5 text-red-600" />
              Operasyonel Ölçek
            </h2>
            <ul className="space-y-3 text-stone-600">
              <li className="flex justify-between border-b border-stone-200 pb-2 last:border-0">
                <span>Sektör Tecrübesi</span>
                <span className="font-semibold text-stone-900">{COMPANY_STATS.years} Yıl</span>
              </li>
              <li className="flex justify-between border-b border-stone-200 pb-2 last:border-0">
                <span>Şube Sayısı</span>
                <span className="font-semibold text-stone-900">{COMPANY_STATS.branches} Lokasyon</span>
              </li>
              <li className="flex justify-between border-b border-stone-200 pb-2 last:border-0">
                <span>Hizmet Ağı</span>
                <span className="font-semibold text-stone-900">{COMPANY_STATS.cities} Şehir</span>
              </li>
              <li className="flex justify-between border-b border-stone-200 pb-2 last:border-0">
                <span>Tamamlanan Proje</span>
                <span className="font-semibold text-stone-900">{COMPANY_STATS.projects}+</span>
              </li>
            </ul>
          </div>

          <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
            <h2 className="flex items-center gap-2 text-xl font-serif font-semibold text-stone-900 mb-4">
              <Settings className="w-5 h-5 text-red-600" />
              Üretim ve Kalite
            </h2>
            <p className="text-stone-600 mb-4 leading-relaxed">
              Üretim süreçlerimiz ISO 9001:2015 Kalite Yönetim Sistemi standartlarına uygun olarak yürütülmektedir.
              E1 standartlarında çevreye duyarlı hammadde kullanımı ve modern üretim teknolojileri ile
              uzun ömürlü ve dayanıklı ürünler sunmayı taahhüt ediyoruz.
            </p>
            <div className="flex gap-4 text-sm font-medium text-stone-800">
              <span className="bg-white px-3 py-1 rounded border border-stone-200">ISO 9001</span>
              <span className="bg-white px-3 py-1 rounded border border-stone-200">E1 Standart</span>
              <span className="bg-white px-3 py-1 rounded border border-stone-200">TSE Belgeli</span>
            </div>
          </div>
        </div>

        {/* Philosophy & Approach */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
            Hizmet Yaklaşımımız
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-stone-200 rounded-xl hover:border-red-200 transition-colors">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Bütünleşik Çözümler</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Keşif, projelendirme, üretim, lojistik ve montaj süreçlerinin tek merkezden yönetimi.
              </p>
            </div>
            <div className="p-6 border border-stone-200 rounded-xl hover:border-red-200 transition-colors">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Profesyonel Kadro</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Alanında uzman iç mimar, proje yöneticisi ve teknik montaj ekipleriyle hizmet.
              </p>
            </div>
            <div className="p-6 border border-stone-200 rounded-xl hover:border-red-200 transition-colors">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Satış Sonrası Destek</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                2 yıl garantili ürünler, yedek parça temini ve periyodik bakım hizmetleri.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;
