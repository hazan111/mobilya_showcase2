import React, { useState, useEffect } from 'react';
import { ChevronRight, ShoppingCart, Trash2, Plus, Minus, MessageCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { showToast } = useToast();
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
  });

  // Debug: Log cart when it changes
  useEffect(() => {
    console.log('CartPage - Cart state:', cart);
    console.log('CartPage - Cart length:', cart.length);
  }, [cart]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatPrice = (price) => {
    const num = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const sendToWhatsApp = () => {
    if (!formData.name || !formData.surname || !formData.phone) {
      showToast('Lütfen tüm alanları doldurun.', 'error');
      return;
    }

    // WhatsApp numarası (90 ile başlayan format, + işareti olmadan)
    const phoneNumber = '905377979125'; // 537 797 91 25
    const total = getCartTotal();

    // Sepet içeriğini formatla
    const cartItems = cart
      .map((item) => {
        const itemTotal = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        return `• ${item.name} - ${item.quantity} adet - ${formatPrice(item.price)} (Toplam: ${formatPrice((itemTotal * item.quantity).toString())})`;
      })
      .join('\n');

    const message = `Merhaba,

Sipariş vermek istiyorum.

*İletişim Bilgileri:*
Ad: ${formData.name}
Soyad: ${formData.surname}
Telefon: ${formData.phone}

*Sepet İçeriği:*
${cartItems}

*Toplam Tutar:* ${formatPrice(total.toString())}

Lütfen benimle iletişime geçin.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-stone-900 font-medium">Sepet</span>
          </nav>

          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-stone-900 mb-2">Sepetiniz Boş</h2>
            <p className="text-stone-600 mb-6">Sepetinize henüz ürün eklemediniz.</p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Ürünleri İncele
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="text-stone-900 font-medium">Sepet</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900">Sepetim</h1>
          <button
            onClick={clearCart}
            className="text-sm text-stone-500 hover:text-red-600 transition-colors"
          >
            Sepeti Temizle
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cart.map((item) => {
            const itemPrice = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
            const itemTotal = itemPrice * item.quantity;

            return (
              <div
                key={item.id}
                className="bg-white border border-stone-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <a href={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  </a>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <a href={`/product/${item.id}`}>
                          <h3 className="font-serif text-lg font-semibold text-stone-900 hover:text-red-600 transition-colors">
                            {item.name}
                          </h3>
                        </a>
                        <p className="text-sm text-stone-500 mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">{formatPrice(itemTotal.toString())}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total and Checkout */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-stone-900">Toplam</span>
            <span className="text-2xl font-bold text-red-600">{formatPrice(getCartTotal().toString())}</span>
          </div>

          <button
            onClick={() => setShowWhatsAppForm(true)}
            className="w-full bg-red-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp ile Sipariş Ver
          </button>
        </div>

        {/* WhatsApp Form Modal */}
        {showWhatsAppForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 md:p-8 relative">
              <button
                onClick={() => setShowWhatsAppForm(false)}
                className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-stone-600" />
              </button>

              <h2 className="text-2xl font-serif text-stone-900 mb-6">İletişim Bilgileri</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Ad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                    placeholder="Adınız"
                  />
                </div>

                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-stone-700 mb-2">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                    placeholder="Soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
              </div>

              <button
                onClick={sendToWhatsApp}
                className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp'a Gönder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
