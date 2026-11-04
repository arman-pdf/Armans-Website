import React from 'react';
import ContourTile from './ContourTile';

export default function ProjectImage({ project, size = 'thumb', className = '', priority = false }) {
  const img = project.image;
  if (!img) return <ContourTile slug={project.slug} className={`block h-full w-full ${className}`} />;
  const file = size === 'hero' ? 'hero.jpg' : 'thumb.jpg';
  return (
    <img
      src={`/projects/${project.slug}/${file}`}
      alt={`${project.title}: figure from the project`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`block h-full w-full ${img.fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
    />
  );
}
