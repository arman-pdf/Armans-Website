import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="experience" element={<ExperiencePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
