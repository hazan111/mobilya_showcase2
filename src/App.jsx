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
import OfficeCategoryPage from './pages/OfficeCategoryPage';
import ExecutiveCategoryPage from './pages/ExecutiveCategoryPage';
import MeetingCategoryPage from './pages/MeetingCategoryPage';
import StorageCategoryPage from './pages/StorageCategoryPage';
import CustomProjectPage from './pages/CustomProjectPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StoresPage from './pages/StoresPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ReferencesPage from './pages/ReferencesPage';
import CareerPage from './pages/CareerPage';
import SupportPage from './pages/SupportPage';
import WarrantyPage from './pages/WarrantyPage';
import DeliveryPage from './pages/DeliveryPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import CartPage from './pages/CartPage';
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

  // Office Category Landing Page - special route
  if (path === '/category/1' || path === '/category/office') {
    return (
      <Layout>
        <OfficeCategoryPage />
      </Layout>
    );
  }

  // Executive Category Landing Page - special route
  if (path === '/category/2' || path === '/category/executive') {
    return (
      <Layout>
        <ExecutiveCategoryPage />
      </Layout>
    );
  }

  // Meeting & Shared Space Category Landing Page - special route
  if (path === '/category/3' || path === '/category/meeting') {
    return (
      <Layout>
        <MeetingCategoryPage />
      </Layout>
    );
  }

  // Storage Category Landing Page - special route
  if (path === '/category/4' || path === '/category/storage') {
    return (
      <Layout>
        <StorageCategoryPage />
      </Layout>
    );
  }

  // Custom Project Page - special route
  if (path === '/category/5' || path === '/category/project' || path === '/category/custom') {
    return (
      <Layout>
        <CustomProjectPage />
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

  if (path === '/about') {
    return (
      <Layout>
        <AboutPage />
      </Layout>
    );
  }

  if (path === '/projects') {
    return (
      <Layout>
        <ProjectsPage />
      </Layout>
    );
  }

  if (path === '/references') {
    return (
      <Layout>
        <ReferencesPage />
      </Layout>
    );
  }

  if (path === '/career') {
    return (
      <Layout>
        <CareerPage />
      </Layout>
    );
  }

  if (path === '/support') {
    return (
      <Layout>
        <SupportPage />
      </Layout>
    );
  }

  if (path === '/warranty' || path === '/guarantee') {
    return (
      <Layout>
        <WarrantyPage />
      </Layout>
    );
  }

  if (path === '/delivery') {
    return (
      <Layout>
        <DeliveryPage />
      </Layout>
    );
  }

  if (path === '/track-order' || path === '/order-tracking') {
    return (
      <Layout>
        <OrderTrackingPage />
      </Layout>
    );
  }

  if (path === '/privacy' || path === '/privacy-policy' || path === '/gizlilik-politikasi') {
    return (
      <Layout>
        <PrivacyPolicyPage />
      </Layout>
    );
  }

  if (path === '/terms' || path === '/terms-of-use' || path === '/kullanim-sartlari') {
    return (
      <Layout>
        <TermsOfUsePage />
      </Layout>
    );
  }

  if (path === '/cart') {
    return (
      <Layout>
        <CartPage />
      </Layout>
    );
  }

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
