import React, { useState } from 'react';
import { MapPin, Phone, Clock, ArrowRight, Navigation } from 'lucide-react';

function StoresPage() {
  const [activeCity, setActiveCity] = useState('İstanbul');

  const branches = [
    {
      id: 1,
      city: 'İstanbul',
      name: 'Maslak Showroom',
      address: 'Büyükdere Cad. No: 142, Maslak, İstanbul',
      phone: '+90 (212) 555 10 01',
      hours: '09:00 - 19:00',
      mapLink: '#'
    },
    {
      id: 2,
      city: 'İstanbul',
      name: 'Modoko Mağaza',
      address: 'Modoko Mobilyacılar Sitesi, 4. Cadde No: 55, Ümraniye, İstanbul',
      phone: '+90 (216) 555 20 02',
      hours: '09:00 - 20:00',
      mapLink: '#'
    },
    {
      id: 3,
      city: 'Ankara',
      name: 'Siteler Mağaza',
      address: 'Karacakaya Cad. No: 88, Siteler, Ankara',
      phone: '+90 (312) 555 30 03',
      hours: '09:00 - 19:30',
      mapLink: '#'
    },
    {
      id: 4,
      city: 'İzmir',
      name: 'Çankaya Showroom',
      address: 'Atatürk Bulvarı No: 120, Çankaya, İzmir',
      phone: '+90 (232) 555 40 04',
      hours: '09:30 - 19:30',
      mapLink: '#'
    }
  ];

  const cities = [...new Set(branches.map(b => b.city))];
  const activeBranches = branches.filter(b => b.city === activeCity);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-stone-100 pb-8">
          <div className="flex items-center gap-2 text-red-600 font-bold tracking-wider text-xs uppercase mb-3">
            <MapPin className="w-4 h-4" />
            Lokasyonlarımız
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Size En Yakın Mağazamız
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            Türkiye genelindeki 8 şubemizde ürünlerimizi yakından inceleyebilir, iç mimarlarımızdan ücretsiz proje danışmanlığı alabilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Branch List */}
          <div className="lg:col-span-5 space-y-8">
            {/* City Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    activeCity === city
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {activeBranches.map(branch => (
                <div key={branch.id} className="group bg-white border border-stone-200 rounded-xl p-6 hover:border-red-200 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-red-600 transition-colors">
                      {branch.name}
                    </h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">AÇIK</span>
                  </div>
                  
                  <div className="space-y-3 text-sm text-stone-600 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-stone-400 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-stone-400 flex-shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-stone-100">
                    <button className="flex-1 bg-stone-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Yol Tarifi
                    </button>
                    <button className="flex-1 border border-stone-200 text-stone-700 py-2.5 rounded-lg text-sm font-semibold hover:border-stone-300 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                      Randevu Al
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-7">
            <div className="bg-stone-100 rounded-2xl overflow-hidden h-[450px] relative shadow-inner border border-stone-200">
              {/* Placeholder for Map Integration */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.3004302271!2d32.62267962484732!3d39.90352329866938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara!5e0!3m2!1str!2str!4v1705057056000!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 hover:opacity-100 transition-opacity duration-500"
              ></iframe>
              
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs border border-stone-100">
                <p className="text-sm font-bold text-stone-900 mb-1">Kurumsal Merkez</p>
                <p className="text-xs text-stone-500 leading-snug">Tüm Türkiye'ye sevkiyat ağımız ve yönetim merkezimiz.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StoresPage;
