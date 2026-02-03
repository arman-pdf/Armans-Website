import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * ProjectModal Component
 *
 * Purpose: Clean popup modal to display full project details
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Smooth scale-in animations
 * - Scrollable content for long descriptions
 * - Close on backdrop click or X button
 * - Escape key support
 */
const ProjectModal = ({ project, isOpen, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  // Get color classes based on glow color
  const getColorClasses = (glowColor) => {
    const colors = {
      green: {
        border: 'border-green-500',
        bg: 'from-green-500/20 to-emerald-500/20',
        tag: 'bg-green-100 text-green-700',
        icon: 'text-green-600'
      },
      blue: {
        border: 'border-blue-500',
        bg: 'from-blue-500/20 to-cyan-500/20',
        tag: 'bg-blue-100 text-blue-700',
        icon: 'text-blue-600'
      },
      cyan: {
        border: 'border-cyan-500',
        bg: 'from-cyan-500/20 to-teal-500/20',
        tag: 'bg-cyan-100 text-cyan-700',
        icon: 'text-cyan-600'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'from-purple-500/20 to-indigo-500/20',
        tag: 'bg-purple-100 text-purple-700',
        icon: 'text-purple-600'
      },
      orange: {
        border: 'border-orange-500',
        bg: 'from-orange-500/20 to-amber-500/20',
        tag: 'bg-orange-100 text-orange-700',
        icon: 'text-orange-600'
      }
    };
    return colors[glowColor] || colors.green;
  };

  const colorClasses = getColorClasses(project.glowColor);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${colorClasses.bg} border-b ${colorClasses.border} border-opacity-20 p-6 relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex items-start gap-4 pr-12">
              <div className={`flex-shrink-0 ${colorClasses.icon}`}>
                {project.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h2>
                <p className="text-gray-600 text-sm">{project.brief}</p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)] custom-scrollbar">
            {/* Detailed Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Details</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{project.detailed}</p>
            </div>

            {/* Project Images */}
            {project.images && project.images.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image, idx) => (
                    <div key={idx} className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                      <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center mb-2">
                        <span className="text-gray-500 text-sm text-center px-4">Image {idx + 1}: {image.caption}</span>
                      </div>
                      <p className="text-sm text-gray-600 italic text-center">{image.caption}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3 italic">Note: Image placeholders - actual field photos to be added</p>
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
};

export default ProjectModal;
