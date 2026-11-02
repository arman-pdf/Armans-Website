import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Loader from './Loader';
import DepthGauge from './DepthGauge';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Loader />
      <Nav />
      <main key={pathname} className="page-enter flex-1">
        <Outlet />
      </main>
      <Footer />
      <DepthGauge />
    </div>
  );
}
