/**
 * Fiyat formatlama yardımcı fonksiyonları
 */

/**
 * Fiyatı formatlar
 * @param {number|string} price - Fiyat
 * @param {string} currency - Para birimi (default: 'TRY')
 * @returns {string} Formatlanmış fiyat
 */
export function formatPrice(price, currency = 'TRY') {
  if (!price && price !== 0) return 'Teklif Al';
  const numPrice = typeof price === 'number' ? price : parseFloat(price);
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}
