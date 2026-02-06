import React, { useState, useEffect } from 'react';
import { MapPin, Phone, ArrowRight, Navigation } from 'lucide-react';
import { catalogService } from '../services/catalogService';
import { DEFAULT_COMPANY_ID } from '../utils/apiConfig';

function StoresPage() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    catalogService.getCompanyContactInfo(DEFAULT_COMPANY_ID)
      .then((data) => { if (!cancelled) setContactData(data); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Şube bilgileri yüklenemedi.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const branches = contactData?.branches ?? [];

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-stone-100 pb-8">
          <div className="flex items-center gap-2 text-primary-600 font-bold tracking-wider text-xs uppercase mb-3">
            <MapPin className="w-4 h-4" />
            Lokasyonlarımız
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Size En Yakın Mağazamız
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            {contactData?.company?.name && `${contactData.company.name} `}
            şubelerimizde ürünlerimizi yakından inceleyebilir, proje danışmanlığı alabilirsiniz. Size en yakın mağazamızı aşağıdan bulabilirsiniz.
          </p>
        </div>

        <div>
          {/* Branch List */}
          <div className="space-y-8 max-w-3xl">
            {loading && <p className="text-stone-500 text-sm">Şube bilgileri yükleniyor...</p>}
            {error && <p className="text-amber-600 text-sm">Şube bilgileri yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>}
            {!loading && branches.length === 0 && !error && <p className="text-stone-500 text-sm">Henüz şube bilgisi bulunmuyor.</p>}
            <div className="space-y-4">
              {branches.map((branch) => (
                <div key={branch._id} className="group bg-white border border-stone-200 rounded-xl p-6 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-primary-600 transition-colors">
                      {branch.name ?? '—'}
                    </h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">AÇIK</span>
                  </div>
                  
                  <div className="space-y-3 text-sm text-stone-600 mb-6">
                    {branch.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 text-stone-400 flex-shrink-0" />
                        <span>{branch.address}</span>
                      </div>
                    )}
                    {branch.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        <a href={`tel:${branch.phone}`} className="hover:text-primary-600 transition-colors">{branch.phone}</a>
                      </div>
                    )}
                    {branch.email && (
                      <div className="flex items-center gap-3">
                        <span className="text-stone-400">E-posta:</span>
                        <a href={`mailto:${branch.email}`} className="hover:text-primary-600 transition-colors break-all">{branch.email}</a>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-stone-100">
                    {branch.locationlink ? (
                      <a
                        href={branch.locationlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary-700 text-white py-2.5 rounded-button text-sm font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Yol Tarifi
                      </a>
                    ) : (
                      <span className="flex-1 bg-stone-200 text-stone-500 py-2.5 rounded-button text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed">
                        <Navigation className="w-4 h-4" />
                        Yol Tarifi
                      </span>
                    )}
                    <a
                      href={branch.phone ? `tel:${branch.phone}` : contactData?.company?.phone ? `tel:${contactData.company.phone}` : '#'}
                      className="flex-1 border border-stone-200 text-stone-700 py-2.5 rounded-lg text-sm font-semibold hover:border-stone-300 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                    >
                      Randevu Al
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StoresPage;
