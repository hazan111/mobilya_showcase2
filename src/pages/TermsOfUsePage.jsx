import React from 'react';
import { ChevronRight, FileText, Scale } from 'lucide-react';
import { ROUTES, LABELS } from '../utils/constants';

function TermsOfUsePage() {
  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-surface min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href={ROUTES.HOME} className="hover:text-stone-900 transition-colors">{LABELS.HOME}</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Kullanım Şartları</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-primary-600" />
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900">
              Kullanım Şartları
            </h1>
          </div>
          <p className="text-stone-600 text-sm">
            Son Güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-stone max-w-none">
          
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              1. Genel Hükümler
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Bu Kullanım Şartları, Sofa Design ("Şirket", "biz", "bizim") web sitesinin kullanımına 
                ilişkin koşulları düzenler. Web sitemizi kullanarak bu şartları kabul etmiş sayılırsınız.
              </p>
              <p>
                Şirket, bu şartları önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                Değişiklikler web sitemizde yayınlandığı tarihte yürürlüğe girer.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              2. Hizmetlerin Kullanımı
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>Web sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Yasalara ve düzenlemelere uygun davranma</li>
                <li>Başkalarının haklarını ihlal etmeme</li>
                <li>Zararlı yazılım, virüs veya kötü amaçlı kod yükleme</li>
                <li>Site güvenliğini tehlikeye atacak faaliyetlerde bulunmama</li>
                <li>Telif hakları ve fikri mülkiyet haklarına saygı gösterme</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              3. Sipariş ve Ödeme
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Sipariş vermek için geçerli bir e-posta adresi, telefon numarası ve teslimat adresi 
                sağlamanız gerekmektedir. Sipariş onayı e-posta ile gönderilir.
              </p>
              <p>
                Fiyatlar ve ürün bilgileri önceden haber vermeksizin değiştirilebilir. 
                Sipariş onayından sonra fiyat değişiklikleri geçerli değildir.
              </p>
              <p>
                Ödeme yöntemleri ve koşulları sipariş sırasında belirtilir. Ödeme tamamlanmadan 
                sipariş işleme alınmaz.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              4. Teslimat ve İade
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Teslimat süreleri ve koşulları ürün ve bölgeye göre değişiklik gösterebilir. 
                Detaylı bilgi için Teslimat Bilgileri sayfasına bakınız.
              </p>
              <p>
                İade ve değişim koşulları, Tüketicinin Korunması Hakkında Kanun ve ilgili 
                mevzuat hükümlerine tabidir. İade talepleri, teslimat tarihinden itibaren 14 gün 
                içinde yapılmalıdır.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              5. Fikri Mülkiyet Hakları
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Web sitesindeki tüm içerik, tasarım, logo, marka ve yazılımlar Şirket'in fikri 
                mülkiyetidir ve telif hakları ile korunmaktadır.
              </p>
              <p>
                İçerikler, izin alınmadan kopyalanamaz, çoğaltılamaz, dağıtılamaz veya kullanılamaz.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              6. Sorumluluk Sınırlaması
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Şirket, web sitesinin kesintisiz, hatasız veya güvenli çalışmasını garanti etmez. 
                Teknik sorunlar, bakım çalışmaları veya zorunlu durumlar nedeniyle hizmetler 
                geçici olarak kesintiye uğrayabilir.
              </p>
              <p>
                Şirket, web sitesi üzerinden sağlanan bilgilerin doğruluğu, güncelliği veya 
                eksiksizliği konusunda sorumluluk kabul etmez.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              7. Bağlantılar ve Üçüncü Taraf Hizmetleri
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Web sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu bağlantılar 
                yalnızca bilgilendirme amaçlıdır ve Şirket bu sitelerin içeriğinden sorumlu değildir.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              8. Uygulanacak Hukuk ve Yetki
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Bu Kullanım Şartları, Türkiye Cumhuriyeti yasalarına tabidir. Bu şartlardan 
                kaynaklanan uyuşmazlıkların çözümünde İstanbul Mahkemeleri ve İcra Daireleri 
                yetkilidir.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              9. İletişim
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Bu Kullanım Şartları ile ilgili sorularınız için aşağıdaki iletişim kanallarını 
                kullanabilirsiniz:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>E-posta:</strong> hukuk@sofadesign.com</li>
                <li><strong>Adres:</strong> Mobilya Caddesi No:142, Tasarım Mahallesi, İstanbul</li>
              </ul>
            </div>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              10. Değişiklikler
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Şirket, bu Kullanım Şartlarını önceden haber vermeksizin değiştirme hakkını saklı 
                tutar. Güncel şartlar web sitemizde yayınlanır ve yayınlandığı tarihte yürürlüğe girer.
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

export default TermsOfUsePage;
