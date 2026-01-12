import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CustomCursor from '../common/CustomCursor';
import ScrollProgress from '../common/ScrollProgress';

function Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
