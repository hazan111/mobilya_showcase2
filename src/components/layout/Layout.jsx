import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ScrollProgress from '../common/ScrollProgress';
import PageHead from '../common/PageHead';
import { useCatalog } from '../../context/CatalogContext';

function Layout({ children, path }) {
  const currentPath = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const { getProductById } = useCatalog();
  const productId = currentPath.startsWith('/product/') ? currentPath.split('/product/')[1] : null;
  const product = productId ? getProductById(productId) : null;

  return (
    <>
      <PageHead path={currentPath} product={product} />
      <ScrollProgress />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
