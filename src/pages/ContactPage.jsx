import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Building2 } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-stone-100 pb-8">
          <div className="flex items-center gap-2 text-red-600 font-bold tracking-wider text-xs uppercase mb-3">
            <MessageSquare className="w-4 h-4" />
            İletişim
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
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
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-red-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 flex-shrink-0">
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
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-red-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">Telefon</h3>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-stone-600 hover:text-red-600 transition-colors block">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card 3 */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-red-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">E-posta</h3>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-stone-600 hover:text-red-600 transition-colors block">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card 4 */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 hover:border-red-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 flex-shrink-0">
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
            <div className="bg-red-50 rounded-xl border border-red-100 p-6">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1 text-sm">Kurumsal Destek</h4>
                  <p className="text-xs text-red-700 leading-relaxed">
                    Toplu alımlar ve kurumsal projeler için özel destek hattımızı kullanabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-8">
              <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
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
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white"
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
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white"
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
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white"
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
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white"
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
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-100"
                >
                  <Send className="w-5 h-5" />
                  Mesaj Gönder
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
