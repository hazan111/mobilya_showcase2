import React, { useState } from 'react';
import { ChevronRight, Search, Package, CheckCircle2, Clock, Truck, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO, ROUTES, LABELS } from '../utils/constants';

function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  // Order status definitions
  const statusDefinitions = [
    {
      status: 'Sipariş Alındı',
      icon: Package,
      description: 'Siparişiniz alındı ve onaylandı',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      status: 'Hazırlanıyor',
      icon: Clock,
      description: 'Ürünleriniz hazırlanıyor veya üretim aşamasında',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      status: 'Kargoya Verildi',
      icon: Truck,
      description: 'Siparişiniz kargoya verildi',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      status: 'Teslim Edildi',
      icon: CheckCircle2,
      description: 'Siparişiniz teslim edildi',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      // Mock order status - in real app, this would fetch from API
      const mockStatuses = ['Sipariş Alındı', 'Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'];
      const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
      setOrderStatus(randomStatus);
    }
  };

  const currentStatusInfo = statusDefinitions.find(s => s.status === orderStatus);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-surface min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-100 pb-8">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href={ROUTES.HOME} className="hover:text-stone-900 transition-colors">{LABELS.HOME}</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Sipariş Takibi</span>
          </nav>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">
              Sipariş Takibi
            </h1>
            <p className="text-stone-600 text-base max-w-2xl">
              Sipariş numaranızı girerek sipariş durumunuzu öğrenebilirsiniz.
            </p>
          </div>
        </div>

        {/* 1. Order Number Input */}
        <div className="mb-10">
          <form onSubmit={handleSearch} className="bg-stone-50 rounded-lg border border-stone-200 p-6 md:p-8">
            <label htmlFor="orderNumber" className="block text-sm font-medium text-stone-700 mb-2">
              Sipariş Numarası
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Örn: SD-2024-001234"
                className="flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Sorgula
              </button>
            </div>
            <p className="text-xs text-stone-500 mt-2">
              Sipariş numaranızı fatura veya sipariş onay e-postanızdan bulabilirsiniz.
            </p>
          </form>
        </div>

        {/* Order Status Result */}
        {orderStatus && currentStatusInfo && (
          <div className="mb-10">
            <div className={`${currentStatusInfo.bgColor} border-2 border-stone-200 rounded-lg p-6`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${currentStatusInfo.bgColor} rounded-lg flex items-center justify-center border-2 border-stone-200`}>
                  {React.createElement(currentStatusInfo.icon, { 
                    className: `w-6 h-6 ${currentStatusInfo.color}` 
                  })}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-stone-500 mb-1">Sipariş Durumu</div>
                  <div className={`font-bold text-lg ${currentStatusInfo.color}`}>
                    {orderStatus}
                  </div>
                </div>
              </div>
              <p className="text-sm text-stone-700">
                {currentStatusInfo.description}
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200">
                <div className="text-xs text-stone-600">
                  <strong>Sipariş No:</strong> {orderNumber}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Status Explanation */}
        <div className="mb-10">
          <h2 className="text-lg font-serif font-semibold text-stone-900 mb-4">
            Sipariş Durumları
          </h2>
          <div className="space-y-3">
            {statusDefinitions.map((status, index) => {
              const StatusIcon = status.icon;
              
              return (
                <div
                  key={index}
                  className="bg-white border border-stone-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${status.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm mb-1 ${status.color}`}>
                        {status.status}
                      </h3>
                      <p className="text-xs text-stone-600">
                        {status.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Support Contact */}
        <div className="bg-stone-50 rounded-lg border border-stone-200 p-6">
          <h2 className="text-lg font-serif font-semibold text-stone-900 mb-4">
            Destek İletişim
          </h2>
          <p className="text-sm text-stone-600 mb-4">
            Siparişiniz hakkında sorularınız için bizimle iletişime geçin.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">Telefon</div>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm font-semibold text-stone-900 hover:text-primary-600 transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">E-posta</div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm font-semibold text-stone-900 hover:text-primary-600 transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OrderTrackingPage;
