import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

export default function Layout() {
  return (
    <div id="top" className="min-h-screen">
      <Nav />
      <main className="fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
