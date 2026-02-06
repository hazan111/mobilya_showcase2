/**
 * SEO Metadata Configuration
 * SEO ajansı bu dosyayı düzenleyerek başlık, meta açıklama ve diğer meta verileri güncelleyebilir.
 * Geliştirici müdahalesi gerektirmez.
 *
 * SITE_URL: Canlı site adresi (sitemap ve canonical için)
 */

export const SITE_URL = typeof window !== 'undefined'
  ? window.location.origin
  : 'https://sofadesign.com';

/** Ana sayfa varsayılan değerleri (index.html fallback ile uyumlu) */
export const DEFAULT_SEO = {
  siteName: 'Sofa Design',
  title: 'Sofa Design | Kurumsal Ofis Mobilyaları',
  description: 'Ofis ve ticari alanlar için profesyonel mobilya çözümleri. 25+ yıl tecrübe, 8 şube. Ofis mobilyaları, yönetici mobilyaları, toplantı masaları ve depolama sistemleri.',
};

/** Sayfa bazlı SEO meta verileri - path pattern veya exact path ile eşleşir */
export const PAGE_SEO = {
  '/': {
    title: 'Sofa Design | Kurumsal Ofis Mobilyaları',
    description: 'Ofis ve ticari alanlar için profesyonel mobilya çözümleri. 25+ yıl tecrübe, 8 şube. Ofis mobilyaları, yönetici mobilyaları, toplantı masaları ve depolama sistemleri.',
    canonicalPath: '/',
  },
  '/products': {
    title: 'Tüm Ürünler | Sofa Design',
    description: 'Sofa Design kurumsal mobilya kataloğu. Ofis mobilyaları, yönetici mobilyaları, toplantı masaları, depolama sistemleri ve özel proje çözümleri.',
    canonicalPath: '/products',
  },
  '/about': {
    title: 'Hakkımızda | Sofa Design',
    description: 'Sofa Design hakkında. 1998\'den beri kurumsal mobilya sektöründe. ISO 9001 kalite standartları, 25+ yıl tecrübe.',
    canonicalPath: '/about',
  },
  '/bize-ulasin': {
    title: 'Bize Ulaşın | Sofa Design',
    description: 'Sofa Design iletişim bilgileri. Şubelerimiz, telefon ve e-posta. Kurumsal mobilya talepleriniz için bize ulaşın.',
    canonicalPath: '/bize-ulasin',
  },
  '/contact': {
    title: 'İletişim | Sofa Design',
    description: 'Sofa Design iletişim bilgileri. Kurumsal mobilya talepleriniz için bize ulaşın.',
    canonicalPath: '/bize-ulasin',
  },
  '/stores': {
    title: 'Şubelerimiz | Sofa Design',
    description: 'Sofa Design şube adresleri ve iletişim bilgileri. Türkiye genelinde 8 şube ile hizmetinizdeyiz.',
    canonicalPath: '/stores',
  },
  '/projects': {
    title: 'Projelerimiz | Sofa Design',
    description: 'Sofa Design tamamlanan kurumsal mobilya projeleri. Ofis tasarımı ve mobilya projeleri referansları.',
    canonicalPath: '/projects',
  },
  '/references': {
    title: 'Referanslar | Sofa Design',
    description: 'Sofa Design referans müşterileri. Kurumsal mobilya projelerinde güvenilir iş ortaklarımız.',
    canonicalPath: '/references',
  },
  '/career': {
    title: 'Kariyer | Sofa Design',
    description: 'Sofa Design kariyer fırsatları. Kurumsal mobilya sektöründe bizimle çalışın.',
    canonicalPath: '/career',
  },
  '/support': {
    title: 'Satış Sonrası Destek | Sofa Design',
    description: 'Sofa Design satış sonrası destek hizmetleri. Garanti, bakım ve yedek parça bilgileri.',
    canonicalPath: '/support',
  },
  '/warranty': {
    title: 'Garanti & Bakım | Sofa Design',
    description: 'Sofa Design garanti ve bakım politikası. 2-3 yıl kurumsal garanti, yedek parça temini.',
    canonicalPath: '/warranty',
  },
  '/delivery': {
    title: 'Teslimat Bilgileri | Sofa Design',
    description: 'Sofa Design teslimat koşulları. İstanbul içi ve Türkiye geneli teslimat süreleri.',
    canonicalPath: '/delivery',
  },
  '/track-order': {
    title: 'Sipariş Takibi | Sofa Design',
    description: 'Sofa Design sipariş takip sistemi. Siparişinizin durumunu online takip edin.',
    canonicalPath: '/track-order',
  },
  '/order-tracking': {
    title: 'Sipariş Takibi | Sofa Design',
    description: 'Sofa Design sipariş takip sistemi. Siparişinizin durumunu online takip edin.',
    canonicalPath: '/track-order',
  },
  '/privacy': {
    title: 'Gizlilik Politikası | Sofa Design',
    description: 'Sofa Design gizlilik politikası. Kişisel verilerinizin korunması ve işlenmesi hakkında bilgiler.',
    canonicalPath: '/privacy',
  },
  '/privacy-policy': { canonicalPath: '/privacy' },
  '/gizlilik-politikasi': { canonicalPath: '/privacy' },
  '/terms': {
    title: 'Kullanım Şartları | Sofa Design',
    description: 'Sofa Design kullanım şartları. Web sitemizi kullanırken uymanız gereken kurallar.',
    canonicalPath: '/terms',
  },
  '/terms-of-use': { canonicalPath: '/terms' },
  '/kullanim-sartlari': { canonicalPath: '/terms' },
  '/cart': {
    title: 'Sepetim | Sofa Design',
    description: 'Sofa Design sepetiniz. Seçtiğiniz ürünleri görüntüleyin ve siparişinizi tamamlayın.',
    canonicalPath: '/cart',
  },
  // Kategori sayfaları - slug veya id ile
  '/category/office': {
    title: 'Ofis Mobilyaları | Sofa Design',
    description: 'Ofis mobilyaları kataloğu. Çalışma masaları, ofis koltukları, dosya dolapları ve ofis çözümleri.',
    canonicalPath: '/category/office',
  },
  '/category/1': { canonicalPath: '/category/office' },
  '/category/executive': {
    title: 'Yönetici Mobilyaları | Sofa Design',
    description: 'Yönetici odası mobilyaları. Yönetici masa ve koltuk setleri, konferans masaları.',
    canonicalPath: '/category/executive',
  },
  '/category/2': { canonicalPath: '/category/executive' },
  '/category/meeting': {
    title: 'Toplantı & Ortak Alan Mobilyaları | Sofa Design',
    description: 'Toplantı odası mobilyaları. Toplantı masaları, koltuk setleri, bekleme alanı mobilyaları.',
    canonicalPath: '/category/meeting',
  },
  '/category/3': { canonicalPath: '/category/meeting' },
  '/category/storage': {
    title: 'Depolama Sistemleri | Sofa Design',
    description: 'Ofis depolama sistemleri. Arşiv dolapları, dosya dolapları, raf sistemleri.',
    canonicalPath: '/category/storage',
  },
  '/category/4': { canonicalPath: '/category/storage' },
  '/category/project': {
    title: 'Proje & Özel Üretim | Sofa Design',
    description: 'Kurumsal projeler için özel mobilya üretimi. İç mimari danışmanlık, toplu alım çözümleri.',
    canonicalPath: '/category/project',
  },
  '/category/5': { canonicalPath: '/category/project' },
  '/category/custom': { canonicalPath: '/category/project' },
  '/guarantee': { canonicalPath: '/warranty' },
};

/** Product sayfası için dinamik meta - getProductSeo(product) ile kullanılır */
export function getProductSeo(product) {
  if (!product) return null;
  const name = product.name || 'Ürün';
  const desc = product.description
    ? String(product.description).slice(0, 155) + (product.description.length > 155 ? '...' : '')
    : `${name} - Sofa Design kurumsal mobilya kataloğundan. Ofis ve ticari alan mobilyaları.`;
  return {
    title: `${name} | Sofa Design`,
    description: desc,
    canonicalPath: `/product/${product._id}`,
    ogImage: product.coverImage?.originalUrl || product.coverImage?.mediumUrl
      || (product.images?.[0]?.originalUrl) || (product.images?.[0]?.mediumUrl),
  };
}

/** Path'e göre SEO config bul (en spesifik eşleşme öncelikli) */
export function getSeoForPath(path, product = null) {
  if (path.startsWith('/product/') && product) {
    return getProductSeo(product);
  }
  const exact = PAGE_SEO[path];
  if (exact) {
    if (exact.canonicalPath && !exact.title && PAGE_SEO[exact.canonicalPath]) {
      return { ...PAGE_SEO[exact.canonicalPath], canonicalPath: exact.canonicalPath };
    }
    return exact;
  }
  if (path.startsWith('/category/')) {
    const catMap = {
      '1': PAGE_SEO['/category/office'],
      '2': PAGE_SEO['/category/executive'],
      '3': PAGE_SEO['/category/meeting'],
      '4': PAGE_SEO['/category/storage'],
      '5': PAGE_SEO['/category/project'],
    };
    const id = path.replace('/category/', '');
    const catSeo = catMap[id] || PAGE_SEO[`/category/${id}`];
    if (catSeo) return { ...catSeo, canonicalPath: catSeo.canonicalPath || path };
    return {
      title: 'Kategori | Sofa Design',
      description: 'Sofa Design mobilya kategorileri.',
      canonicalPath: path,
    };
  }
  if (path.startsWith('/product/')) {
    return {
      title: 'Ürün Detayı | Sofa Design',
      description: 'Sofa Design ürün detay sayfası.',
      canonicalPath: path,
    };
  }
  return null;
}
