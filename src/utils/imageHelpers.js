/**
 * Görsel yardımcı fonksiyonları
 * API'den gelen product verilerinden görsel URL'lerini çıkarır
 */

// Backend API base URL - production'da gerekli
const getBackendBaseUrl = () => {
  // Development'ta Vite proxy kullanıyoruz, bu yüzden relative path yeterli
  // Production'da environment variable'dan alınmalı
  if (import.meta.env.DEV) {
    return ''; // Vite proxy kullanılacak
  }
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
};

/**
 * URL'yi normalize eder - relative path'leri backend base URL ile birleştirir
 * @param {string} url - Görsel URL'i
 * @returns {string} Tam URL
 */
function normalizeImageUrl(url) {
  if (!url) return null;
  
  // Eğer URL zaten tam URL ise (http/https ile başlıyorsa), olduğu gibi döndür
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Relative path ise backend base URL ekle
  const baseUrl = getBackendBaseUrl();
  // Leading slash kontrolü
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return baseUrl ? `${baseUrl}${cleanUrl}` : cleanUrl;
}

/**
 * Ürün için en uygun görsel URL'ini döndürür
 * Öncelik sırası:
 * 1. isPrimary olan görsel
 * 2. coverImage
 * 3. images array'indeki ilk görsel
 * 4. Fallback görsel
 * 
 * @param {Object} product - Ürün objesi
 * @param {string} preferredSize - 'original', 'medium', 'thumbnail' (default: 'medium')
 * @returns {string} Görsel URL'i
 */
export function getProductImageUrl(product, preferredSize = 'medium') {
  if (!product) {
    return getFallbackImage();
  }

  // 1. Önce isPrimary olan görseli bul
  if (product.images && product.images.length > 0) {
    const primaryImage = product.images.find(img => img.isPrimary === true);
    if (primaryImage) {
      const url = getImageUrlBySize(primaryImage, preferredSize);
      if (url) return url;
    }
    
    // 2. İlk görseli kullan (order'a göre sıralanmış olmalı)
    const firstImage = product.images[0];
    const url = getImageUrlBySize(firstImage, preferredSize);
    if (url) return url;
  }
  
  // 3. Cover image kullan
  if (product.coverImage) {
    const url = getImageUrlBySize(product.coverImage, preferredSize);
    if (url) return url;
  }
  
  // 4. Fallback
  return getFallbackImage();
}

/**
 * Görsel objesinden belirtilen boyuttaki URL'i döndürür
 * @param {Object} imageObj - Görsel objesi (coverImage veya images array elemanı)
 * @param {string} size - 'original', 'medium', 'thumbnail'
 * @returns {string|null} URL veya null
 */
function getImageUrlBySize(imageObj, size) {
  if (!imageObj) return null;
  
  // Boş string kontrolü ve URL normalizasyonu
  const getUrl = (url) => {
    if (!url || url.trim() === '') return null;
    return normalizeImageUrl(url);
  };
  
  switch (size) {
    case 'original':
      return getUrl(imageObj.originalUrl) || getUrl(imageObj.mediumUrl) || getUrl(imageObj.thumbnailUrl);
    case 'thumbnail':
      return getUrl(imageObj.thumbnailUrl) || getUrl(imageObj.mediumUrl) || getUrl(imageObj.originalUrl);
    case 'medium':
    default:
      return getUrl(imageObj.mediumUrl) || getUrl(imageObj.originalUrl) || getUrl(imageObj.thumbnailUrl);
  }
}

/**
 * Fallback görsel URL'i
 * Görsel atanmamış ürün/kategoriler için null döndürür (boş gözükmesi için)
 * @returns {string|null}
 */
export function getFallbackImage() {
  // Görsel atanmamış ürün/kategoriler için boş gözükmesini istiyoruz
  // Fallback görsel göstermek isterseniz Unsplash URL'ini döndürebilirsiniz:
  // return 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800';
  return null;
}

/**
 * Kategori görseli için URL döndürür
 * Kategori görselleri backend'de embedded object olarak gelir
 * 
 * @param {Object} category - Kategori objesi
 * @param {string} preferredSize - 'original', 'medium', 'thumbnail' (default: 'medium')
 * @returns {string} Görsel URL'i
 */
export function getCategoryImageUrl(category, preferredSize = 'medium') {
  if (!category) {
    return null; // Kategori yoksa null döndür
  }

  // category.image bir obje olabilir (backend'den geliyorsa)
  if (category.image && typeof category.image === 'object') {
    const imageObj = category.image;
    const getUrl = (url) => {
      if (!url || url.trim() === '') return null;
      return normalizeImageUrl(url);
    };
    
    switch (preferredSize) {
      case 'original':
        return getUrl(imageObj.originalUrl) || getUrl(imageObj.mediumUrl) || getUrl(imageObj.thumbnailUrl) || null;
      case 'thumbnail':
        return getUrl(imageObj.thumbnailUrl) || getUrl(imageObj.mediumUrl) || getUrl(imageObj.originalUrl) || null;
      case 'medium':
      default:
        return getUrl(imageObj.mediumUrl) || getUrl(imageObj.originalUrl) || getUrl(imageObj.thumbnailUrl) || null;
    }
  }
  
  // Eğer category.image string ise (eski format)
  if (category.image && typeof category.image === 'string') {
    const normalized = normalizeImageUrl(category.image);
    return normalized || null;
  }
  
  // Görsel yoksa null döndür (farklı kart tasarımı gösterilecek)
  return null;
}

/**
 * Ürün için tüm görselleri döndürür (detay sayfası için)
 * @param {Object} product - Ürün objesi
 * @returns {Array<string>} Görsel URL'leri array'i
 */
export function getProductAllImages(product) {
  if (!product) return [getFallbackImage()];
  
  const images = [];
  
  // Cover image ekle
  if (product.coverImage) {
    const coverUrl = product.coverImage.originalUrl || product.coverImage.mediumUrl;
    if (coverUrl && coverUrl.trim() !== '') {
      const normalizedUrl = normalizeImageUrl(coverUrl);
      if (normalizedUrl) {
        images.push(normalizedUrl);
      }
    }
  }
  
  // Images array'ini ekle (isPrimary öncelikli, sonra order'a göre)
  if (product.images && product.images.length > 0) {
    // Önce isPrimary olanları, sonra diğerlerini ekle
    const sortedImages = [...product.images].sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      return (a.order || 0) - (b.order || 0);
    });
    
    sortedImages.forEach(img => {
      const url = img.originalUrl || img.mediumUrl;
      if (url && url.trim() !== '') {
        const normalizedUrl = normalizeImageUrl(url);
        if (normalizedUrl && !images.includes(normalizedUrl)) {
          images.push(normalizedUrl);
        }
      }
    });
  }
  
  return images.length > 0 ? images : [getFallbackImage()];
}
