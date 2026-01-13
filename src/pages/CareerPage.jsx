import React, { useState } from 'react';
import { ChevronRight, Users, Briefcase, MapPin, Clock, Send, Building2, CheckCircle2 } from 'lucide-react';
import { COMPANY_STATS } from '../utils/constants';
import { useToast } from '../context/ToastContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function CareerPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Application submitted:', formData);
    showToast('Başvurunuz alındı! En kısa sürede size dönüş yapacağız.', 'success');
    setFormData({ name: '', email: '', phone: '', position: '', experience: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Work culture highlights
  const cultureHighlights = [
    {
      icon: Users,
      title: 'Profesyonel Ekip',
      description: 'Alanında uzman kadro ile çalışma fırsatı',
    },
    {
      icon: Building2,
      title: 'İstikrarlı Büyüme',
      description: `${COMPANY_STATS.years} yıllık sektör tecrübesi`,
    },
    {
      icon: CheckCircle2,
      title: 'Kariyer Gelişimi',
      description: 'Eğitim ve gelişim fırsatları',
    },
  ];

  // Open positions
  const openPositions = [
    {
      id: 1,
      title: 'Satış Temsilcisi',
      department: 'Satış',
      location: 'İstanbul',
      type: 'Tam Zamanlı',
    },
    {
      id: 2,
      title: 'İç Mimari Tasarımcı',
      department: 'Tasarım',
      location: 'Ankara',
      type: 'Tam Zamanlı',
    },
    {
      id: 3,
      title: 'Proje Yöneticisi',
      department: 'Proje Yönetimi',
      location: 'İzmir',
      type: 'Tam Zamanlı',
    },
    {
      id: 4,
      title: 'Montaj Teknisyeni',
      department: 'Teknik',
      location: 'Bursa',
      type: 'Tam Zamanlı',
    },
    {
      id: 5,
      title: 'Müşteri Hizmetleri Temsilcisi',
      department: 'Müşteri Hizmetleri',
      location: 'İstanbul',
      type: 'Tam Zamanlı',
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Kariyer</span>
          </nav>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
              Kariyer
            </h1>
            <p className="text-stone-600 text-base max-w-2xl">
              {COMPANY_STATS.years} yıllık sektör tecrübesi ile büyüyen ekibimize katılın. 
              Kurumsal mobilya sektöründe kariyer fırsatları.
            </p>
          </div>
        </div>

        {/* 1. Work Culture Summary */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
            Çalışma Kültürü
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cultureHighlights.map((highlight, index) => {
              const HighlightIcon = highlight.icon;
              const highlightRef = useIntersectionObserver();
              
              return (
                <div
                  key={index}
                  ref={highlightRef}
                  className="bg-stone-50 rounded-lg border border-stone-200 p-5 reveal-up"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-3">
                    <HighlightIcon className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2 text-sm">
                    {highlight.title}
                  </h3>
                  <p className="text-xs text-stone-600">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Open Positions List */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
            Açık Pozisyonlar
          </h2>
          <div className="space-y-3">
            {openPositions.map((position, index) => {
              const positionRef = useIntersectionObserver();
              
              return (
                <div
                  key={position.id}
                  ref={positionRef}
                  className="bg-white border border-stone-200 rounded-lg p-5 hover:border-red-300 hover:shadow-md transition-all reveal-up"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3" />
                          <span>{position.department}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{position.type}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, position: position.title });
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      Başvur
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Application CTA / Form */}
        <div id="application-form" className="bg-stone-50 rounded-xl p-6 md:p-8 border border-stone-200">
          <h2 className="text-xl md:text-2xl font-serif text-stone-900 mb-4">
            Başvuru Formu
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            Açık pozisyonlar için başvurunuzu gönderin. CV ve özgeçmiş bilgilerinizi ekleyebilirsiniz.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  E-posta *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-stone-700 mb-1">
                  Başvurulan Pozisyon *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  placeholder="Örn: Satış Temsilcisi"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-stone-700 mb-1">
                Deneyim (Yıl)
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                Özgeçmiş / Notlar
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                placeholder="Kısa özgeçmiş veya eklemek istediğiniz notlar..."
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              Başvuruyu Gönder
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default CareerPage;
