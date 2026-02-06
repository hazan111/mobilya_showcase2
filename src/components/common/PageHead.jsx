import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO, getSeoForPath, SITE_URL } from '../../utils/seoConfig';

/**
 * Sayfa bazlı SEO meta verilerini ayarlar.
 * path ve product (opsiyonel) ile ilgili meta tag'leri head'e ekler.
 */
function PageHead({ path, product }) {
  const seo = getSeoForPath(path || '/', product);
  const title = seo?.title || DEFAULT_SEO.title;
  const description = seo?.description || DEFAULT_SEO.description;
  const canonicalPath = seo?.canonicalPath || path || '/';
  const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`;
  const ogImage = seo?.ogImage || `${SITE_URL}/og-image.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
    </Helmet>
  );
}

export default PageHead;
