import React from 'react';
import { Truck, Wrench, Shield, Headphones, AlertCircle, Clock } from 'lucide-react';

function SupportPage() {
  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-10 border-b border-stone-100 pb-6">
          <h1 className="text-3xl font-serif text-stone-900 mb-2">
            Teslimat ve Destek
          </h1>
          <p className="text-stone-600">
            Siparişten teslimata ve satış sonrasına kadar tüm süreçlerimiz hakkında detaylı bilgiler.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Delivery Section */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-stone-900 mb-4">
              <Truck className="w-5 h-5 text-red-600" />
              Teslimat Süreçleri
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-stone-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-stone-900">Stoklu Ürünler</span>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Hızlı Teslimat</span>
                </div>
                <p className="text-sm text-stone-600">İstanbul içi 3-5 iş günü, şehir dışı 5-7 iş günü içerisinde teslim edilir.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-stone-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-stone-900">Özel Üretim</span>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">Sipariş Üzerine</span>
                </div>
                <p className="text-sm text-stone-600">Renk ve ölçü değişikliklerinde üretim süresi 15-20 iş günüdür.</p>
              </div>
            </div>
          </div>

          {/* Installation Section */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-stone-900 mb-4">
              <Wrench className="w-5 h-5 text-red-600" />
              Kurulum Hizmeti
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-stone-700">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <span>Tüm ofis mobilyalarında kurulum hizmetimiz <strong>ücretsizdir</strong>.</span>
              </li>
              <li className="flex gap-3 text-sm text-stone-700">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <span>Teslimat ile aynı anda uzman teknik ekibimiz tarafından montaj yapılır.</span>
              </li>
              <li className="flex gap-3 text-sm text-stone-700">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <span>Ambalaj atıkları ekibimiz tarafından toplanarak geri dönüşüme gönderilir.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Warranty Section */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-stone-900 mb-4">
              <Shield className="w-5 h-5 text-red-600" />
              Garanti Kapsamı
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-stone-400 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-stone-900 text-sm">2 Yıl Kurumsal Garanti</h3>
                  <p className="text-sm text-stone-600 mt-1">
                    Tüm ürünlerimiz üretim ve işçilik hatalarına karşı 2 yıl boyunca WMB Mobilya garantisi altındadır.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-stone-400 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-stone-900 text-sm">Yedek Parça Desteği</h3>
                  <p className="text-sm text-stone-600 mt-1">
                    Garanti süresi bitiminden sonra 5 yıl boyunca ücretli yedek parça temin garantisi sunulur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className="bg-stone-900 text-white rounded-xl p-6 shadow-lg">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold mb-6">
              <Headphones className="w-5 h-5 text-red-500" />
              Destek Kanalları
            </h2>
            <div className="space-y-6">
              <div>
                <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Müşteri Hizmetleri</span>
                <a href="tel:4440000" className="text-xl font-bold hover:text-red-400 transition-colors">444 00 00</a>
                <p className="text-xs text-stone-500 mt-1">Hafta içi 09:00 - 18:00</p>
              </div>
              <div>
                <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">E-Posta Destek</span>
                <a href="mailto:destek@wmb.com.tr" className="text-lg font-medium hover:text-red-400 transition-colors">destek@wmb.com.tr</a>
                <p className="text-xs text-stone-500 mt-1">24 saat içinde dönüş yapılır</p>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-sm font-semibold transition-colors mt-2">
                Servis Talebi Oluştur
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SupportPage;
