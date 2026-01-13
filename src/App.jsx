import React from 'react';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import CategoriesSection from './components/sections/CategoriesSection';
import ProductsSection from './components/sections/ProductsSection';
import AboutSection from './components/sections/AboutSection';
import SupportSection from './components/sections/NewsletterSection';
import StoresSection from './components/sections/StoresSection';
import CtaSection from './components/sections/CtaSection';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StoresPage from './pages/StoresPage';
import ContactPage from './pages/ContactPage';
// import AboutPage from './pages/AboutPage';
// import SupportPage from './pages/SupportPage';
import AllProductsPage from './pages/AllProductsPage';

function App() {
  // Simple routing for demo purposes
  const path = window.location.pathname;

  // Product detail page - dynamic route
  if (path.startsWith('/product/')) {
    return (
      <Layout>
        <ProductDetailPage />
      </Layout>
    );
  }

  // Category page - dynamic route
  if (path.startsWith('/category/')) {
    return (
      <Layout>
        <CategoryPage />
      </Layout>
    );
  }

  if (path === '/stores') {
    return (
      <Layout>
        <StoresPage />
      </Layout>
    );
  }

  if (path === '/contact') {
    return (
      <Layout>
        <ContactPage />
      </Layout>
    );
  }

  // if (path === '/about') {
  //   return (
  //     <Layout>
  //       <AboutPage />
  //     </Layout>
  //   );
  // }

  // if (path === '/support') {
  //   return (
  //     <Layout>
  //       <SupportPage />
  //     </Layout>
  //   );
  // }

  if (path === '/products') {
    return (
      <Layout>
        <AllProductsPage />
      </Layout>
    );
  }

  return (
    <Layout>
      <main>
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
        <AboutSection />
        <SupportSection />
        <StoresSection />
        <CtaSection />
      </main>
    </Layout>
  );
}

export default App;
