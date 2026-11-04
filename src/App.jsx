import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { contact } from './content';
import Home from './pages/Home';
import Work from './pages/Work';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <ErrorBoundary
      fallback={
        <div style={{ padding: '4rem 1.5rem', maxWidth: 560, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Arman Kanorwalla</h1>
          <p>Something went wrong loading this page. Please reload, or email <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
        </div>
      }
    >
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="experience" element={<Navigate to="/work" replace />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
