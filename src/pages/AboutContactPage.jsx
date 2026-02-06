import React, { useState, useEffect } from 'react';
import {
  Building2, Settings, Users, CheckCircle2, ChevronRight,
  MapPin, Phone, Mail, Clock, Send, MessageSquare,
} from 'lucide-react';
import { COMPANY_STATS, ROUTES, LABELS, WHATSAPP_PHONE } from '../utils/constants';
import { useToast } from '../context/ToastContext';
import { catalogService } from '../services/catalogService';
import { DEFAULT_COMPANY_ID } from '../utils/apiConfig';

function AboutContactPage() {
  const { showToast } = useToast();
  const [contactData, setContactData] = useState(null);
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    let cancelled = false;
    catalogService.getCompanyContactInfo(DEFAULT_COMPANY_ID)
      .then((data) => { if (!cancelled) setContactData(data); })
      .catch((err) => { if (!cancelled) setContactError(err.message || 'İletişim bilgileri yüklenemedi.'); })
      .finally(() => { if (!cancelled) setContactLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const subjectLabels = {
    'urun-bilgisi': 'Ürün Bilgisi',
    'fiyat-teklifi': 'Fiyat Teklifi',
    'proje-danismanligi': 'Proje Danışmanlığı',
    'teslimat': 'Teslimat Bilgisi',
    'garanti': 'Garanti & Bakım',
    'diger': 'Diğer',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectText = subjectLabels[formData.subject] || formData.subject;
    const message = `Merhaba,

İletişim formu üzerinden mesaj göndermek istiyorum.

*İletişim Bilgileri:*
Ad Soyad: ${formData.name}
E-posta: ${formData.email}
Telefon: ${formData.phone}
Konu: ${subjectText}

*Mesajım:*
${formData.message}

Lütfen benimle iletişime geçin.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    showToast('WhatsApp açılıyor. Mesajınızı göndererek iletişime geçebilirsiniz.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 md:px-8 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Ortak başlık & breadcrumb */}
        <div className="mb-8 sm:mb-12 border-b border-stone-100 pb-6 sm:pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href={ROUTES.HOME} className="hover:text-stone-900 transition-colors">{LABELS.HOME}</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Hakkımızda & İletişim</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Hakkımızda & İletişim
          </h1>
          <p className="text-stone-600 max-w-3xl text-base sm:text-lg leading-relaxed">
            Sofa Design olarak kurumsal mobilya sektöründeki tecrübemizi ve iletişim bilgilerimizi bu sayfada bulabilirsiniz. Sorularınız için bize ulaşın.
          </p>
        </div>

        {/* ---------- HAKKIMIZDA BÖLÜMÜ ---------- */}
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
                <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">{contactData?.branches?.length ?? COMPANY_STATS.branches}</div>
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

        {/* Ayırıcı */}
        <div className="border-t border-primary-200 my-12 sm:my-16" />

        {/* ---------- İLETİŞİM BÖLÜMÜ ---------- */}
        <section id="iletisim">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-600" />
            Bize Ulaşın
          </h2>
          <p className="text-stone-600 max-w-2xl mb-8">
            Sorularınız, önerileriniz veya proje talepleriniz için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
          </p>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* İletişim kartları - API'den company verisi */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {contactLoading && (
                <div className="text-sm text-stone-500">İletişim bilgileri yükleniyor...</div>
              )}
              {contactError && (
                <div className="text-sm text-amber-600">İletişim bilgileri yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>
              )}
              {!contactLoading && contactData?.company && (
                <>
                  <div className="bg-surface-elevated rounded-xl border border-primary-200 p-4 sm:p-6 hover:border-primary-300 hover:shadow-card transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 mb-2">Adres</h3>
                        <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{contactData.company.address ?? '—'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-elevated rounded-xl border border-primary-200 p-4 sm:p-6 hover:border-primary-300 hover:shadow-card transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 flex-shrink-0">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 mb-2">Telefon</h3>
                        {contactData.company.phone ? (
                          <a href={`tel:${contactData.company.phone}`} className="text-sm text-stone-600 hover:text-primary-600 transition-colors block">{contactData.company.phone}</a>
                        ) : (
                          <p className="text-sm text-stone-600">—</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-elevated rounded-xl border border-primary-200 p-4 sm:p-6 hover:border-primary-300 hover:shadow-card transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 flex-shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 mb-2">E-posta</h3>
                        {contactData.company.email ? (
                          <a href={`mailto:${contactData.company.email}`} className="text-sm text-stone-600 hover:text-primary-600 transition-colors block">{contactData.company.email}</a>
                        ) : (
                          <p className="text-sm text-stone-600">—</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-elevated rounded-xl border border-primary-200 p-4 sm:p-6 hover:border-primary-300 hover:shadow-card transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-50 rounded-button flex items-center justify-center text-primary-600 flex-shrink-0">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 mb-2">Çalışma Saatleri</h3>
                        <p className="text-sm text-stone-600">Pazartesi - Cumartesi: 09:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="bg-primary-50 rounded-xl border border-primary-100 p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1 text-sm">Kurumsal Destek</h4>
                    <p className="text-xs text-primary-700 leading-relaxed">
                      Toplu alımlar ve kurumsal projeler için özel destek hattımızı kullanabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* İletişim formu */}
            <div className="lg:col-span-7">
              <div className="bg-surface-elevated rounded-xl border border-primary-200 p-6 sm:p-8 shadow-soft">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 mb-6">Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-stone-900 mb-2">Ad Soyad *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-2">Telefon *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
                        placeholder="0 (5XX) XXX XX XX"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-900 mb-2">E-posta *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-stone-900 mb-2">Konu *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
                    >
                      <option value="">Konu seçiniz</option>
                      <option value="urun-bilgisi">Ürün Bilgisi</option>
                      <option value="fiyat-teklifi">Fiyat Teklifi</option>
                      <option value="proje-danismanligi">Proje Danışmanlığı</option>
                      <option value="teslimat">Teslimat Bilgisi</option>
                      <option value="garanti">Garanti & Bakım</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-stone-900 mb-2">Mesajınız *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-primary-600 text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-100 touch-manipulation"
                  >
                    <MessageSquare className="w-5 h-5" />
                    WhatsApp ile Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutContactPage;
