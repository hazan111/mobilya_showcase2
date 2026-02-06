import React from 'react';
import Layout from './components/layout/Layout';
import VitrinPage from './pages/VitrinPage';
import CategoryPage from './pages/CategoryPage';
import OfficeCategoryPage from './pages/OfficeCategoryPage';
import ExecutiveCategoryPage from './pages/ExecutiveCategoryPage';
import MeetingCategoryPage from './pages/MeetingCategoryPage';
import StorageCategoryPage from './pages/StorageCategoryPage';
import CustomProjectPage from './pages/CustomProjectPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StoresPage from './pages/StoresPage';
import AboutPage from './pages/AboutPage';
import BizeUlasinPage from './pages/BizeUlasinPage';
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
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  // Product detail page - dynamic route
  if (path.startsWith('/product/')) {
    return (
      <Layout path={path}>
        <ProductDetailPage />
      </Layout>
    );
  }

  // Office Category Landing Page - special route
  if (path === '/category/1' || path === '/category/office') {
    return (
      <Layout path={path}>
        <OfficeCategoryPage />
      </Layout>
    );
  }

  // Executive Category Landing Page - special route
  if (path === '/category/2' || path === '/category/executive') {
    return (
      <Layout path={path}>
        <ExecutiveCategoryPage />
      </Layout>
    );
  }

  // Meeting & Shared Space Category Landing Page - special route
  if (path === '/category/3' || path === '/category/meeting') {
    return (
      <Layout path={path}>
        <MeetingCategoryPage />
      </Layout>
    );
  }

  // Storage Category Landing Page - special route
  if (path === '/category/4' || path === '/category/storage') {
    return (
      <Layout path={path}>
        <StorageCategoryPage />
      </Layout>
    );
  }

  // Custom Project Page - special route
  if (path === '/category/5' || path === '/category/project' || path === '/category/custom') {
    return (
      <Layout path={path}>
        <CustomProjectPage />
      </Layout>
    );
  }

  // Category page - dynamic route
  if (path.startsWith('/category/')) {
    return (
      <Layout path={path}>
        <CategoryPage />
      </Layout>
    );
  }

  if (path === '/stores') {
    return (
      <Layout path={path}>
        <StoresPage />
      </Layout>
    );
  }

  if (path === '/about') {
    return (
      <Layout path={path}>
        <AboutPage />
      </Layout>
    );
  }

  if (path === '/bize-ulasin' || path === '/contact') {
    return (
      <Layout path={path}>
        <BizeUlasinPage />
      </Layout>
    );
  }

  if (path === '/projects') {
    return (
      <Layout path={path}>
        <ProjectsPage />
      </Layout>
    );
  }

  if (path === '/references') {
    return (
      <Layout path={path}>
        <ReferencesPage />
      </Layout>
    );
  }

  if (path === '/career') {
    return (
      <Layout path={path}>
        <CareerPage />
      </Layout>
    );
  }

  if (path === '/support') {
    return (
      <Layout path={path}>
        <SupportPage />
      </Layout>
    );
  }

  if (path === '/warranty' || path === '/guarantee') {
    return (
      <Layout path={path}>
        <WarrantyPage />
      </Layout>
    );
  }

  if (path === '/delivery') {
    return (
      <Layout path={path}>
        <DeliveryPage />
      </Layout>
    );
  }

  if (path === '/track-order' || path === '/order-tracking') {
    return (
      <Layout path={path}>
        <OrderTrackingPage />
      </Layout>
    );
  }

  if (path === '/privacy' || path === '/privacy-policy' || path === '/gizlilik-politikasi') {
    return (
      <Layout path={path}>
        <PrivacyPolicyPage />
      </Layout>
    );
  }

  if (path === '/terms' || path === '/terms-of-use' || path === '/kullanim-sartlari') {
    return (
      <Layout path={path}>
        <TermsOfUsePage />
      </Layout>
    );
  }

  if (path === '/cart') {
    return (
      <Layout path={path}>
        <CartPage />
      </Layout>
    );
  }

  if (path === '/products') {
    return (
      <Layout path={path}>
        <AllProductsPage />
      </Layout>
    );
  }

  // Varsayılan: Vitrin sayfası (ana sayfa)
  return (
    <Layout path={path}>
      <VitrinPage />
    </Layout>
  );
}

export default App;
