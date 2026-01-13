import React from 'react';
import { ChevronRight, Shield, FileText } from 'lucide-react';

function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Gizlilik Politikası</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-red-600" />
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900">
              Gizlilik Politikası
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
              <FileText className="w-5 h-5 text-red-600" />
              1. Genel Bilgiler
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Bu Gizlilik Politikası, WMB Home ("Şirket", "biz", "bizim") olarak kişisel verilerinizin 
                toplanması, kullanılması ve korunması hakkında bilgi sağlar. 6698 sayılı Kişisel Verilerin 
                Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.
              </p>
              <p>
                Bu politika, web sitemizi ziyaret ettiğinizde, hizmetlerimizi kullandığınızda veya bizimle 
                iletişime geçtiğinizde toplanan kişisel verileriniz için geçerlidir.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              2. Toplanan Kişisel Veriler
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>Aşağıdaki kategorilerde kişisel veriler toplanmaktadır:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (gerekli durumlarda)</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres bilgileri</li>
                <li><strong>Müşteri İşlem Bilgileri:</strong> Sipariş geçmişi, fatura bilgileri, ödeme bilgileri</li>
                <li><strong>İnternet Sitesi Kullanım Bilgileri:</strong> IP adresi, çerez bilgileri, tarayıcı türü</li>
                <li><strong>Pazarlama ve İletişim Tercihleri:</strong> E-posta abonelik durumu, iletişim tercihleri</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              3. Kişisel Verilerin İşlenme Amaçları
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sipariş işlemlerinin gerçekleştirilmesi ve teslimat</li>
                <li>Müşteri hizmetleri ve destek hizmetlerinin sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Ürün ve hizmetlerimizin geliştirilmesi</li>
                <li>Pazarlama faaliyetleri (açık rıza ile)</li>
                <li>Güvenlik ve dolandırıcılık önleme</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              4. Kişisel Verilerin Paylaşılması
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Kişisel verileriniz, yukarıda belirtilen amaçlar doğrultusunda aşağıdaki taraflarla 
                paylaşılabilir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kargo ve lojistik hizmet sağlayıcıları</li>
                <li>Ödeme işlem hizmet sağlayıcıları</li>
                <li>Yasal yükümlülükler gereği kamu kurum ve kuruluşları</li>
                <li>Hukuki danışmanlık ve denetim hizmeti sağlayıcıları</li>
              </ul>
              <p>
                Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              5. Çerezler (Cookies)
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için 
                çerezler kullanmaktadır. Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              6. Veri Güvenliği
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Kişisel verilerinizin güvenliği için teknik ve idari önlemler alınmaktadır. Verileriniz, 
                yetkisiz erişim, değiştirme, ifşa veya imha edilmesine karşı korunmaktadır.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              7. Haklarınız
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
                <li>Kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize 
                bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde 
                zararın giderilmesini talep etme</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              8. İletişim
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Kişisel verilerinizle ilgili haklarınızı kullanmak veya sorularınız için aşağıdaki 
                iletişim kanallarını kullanabilirsiniz:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>E-posta:</strong> gizlilik@wmb.com</li>
                <li><strong>Adres:</strong> Mobilya Caddesi No:142, Tasarım Mahallesi, İstanbul</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              9. Değişiklikler
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3">
              <p>
                Bu Gizlilik Politikası, yasal değişiklikler veya iş süreçlerindeki güncellemeler nedeniyle 
                değiştirilebilir. Değişiklikler web sitemizde yayınlandığı tarihte yürürlüğe girer.
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
