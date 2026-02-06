import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Building2 } from 'lucide-react';
import { CONTACT_INFO, WHATSAPP_PHONE } from '../utils/constants';
import { useToast } from '../context/ToastContext';

function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 md:px-8 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 border-b border-stone-100 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-primary-600 font-bold tracking-wider text-xs uppercase mb-3">
            <MessageSquare className="w-4 h-4" />
            İletişim
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Bize Ulaşın
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            Sorularınız, önerileriniz veya proje talepleriniz için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Card 1 */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-primary-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">Adres</h3>
                  <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card 2 */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-primary-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">Telefon</h3>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-stone-600 hover:text-primary-600 transition-colors block">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card 3 */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-primary-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">E-posta</h3>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-stone-600 hover:text-primary-600 transition-colors block">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card 4 */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-primary-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">Çalışma Saatleri</h3>
                  <p className="text-sm text-stone-600">
                    {CONTACT_INFO.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-primary-50 rounded-xl border border-primary-100 p-6">
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

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 mb-6">
                Mesaj Gönderin
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-stone-900 mb-2">
                      Ad Soyad *
                    </label>
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
                    <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-2">
                      Telefon *
                    </label>
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
                  <label htmlFor="email" className="block text-sm font-semibold text-stone-900 mb-2">
                    E-posta *
                  </label>
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
                  <label htmlFor="subject" className="block text-sm font-semibold text-stone-900 mb-2">
                    Konu *
                  </label>
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
                  <label htmlFor="message" className="block text-sm font-semibold text-stone-900 mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
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

      </div>
    </div>
  );
}

export default ContactPage;
