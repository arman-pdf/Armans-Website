import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Portfolio from './pages/Portfolio';

// Old /projects and /experience URLs land on the matching section.
function SectionRedirect({ id }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [id, navigate]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Portfolio />} />
          <Route path="projects" element={<SectionRedirect id="projects" />} />
          <Route path="experience" element={<SectionRedirect id="experience" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
