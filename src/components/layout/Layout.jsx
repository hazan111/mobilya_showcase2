import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ScrollProgress from '../common/ScrollProgress';

function Layout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
