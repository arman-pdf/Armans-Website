import React, { useEffect } from 'react';
import { X, MapPin, Calendar } from 'lucide-react';

/**
 * ExperienceModal Component
 *
 * Purpose: Clean popup modal to display full work experience details
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Smooth scale-in animations
 * - Scrollable content for long descriptions
 * - Close on backdrop click or X button
 * - Escape key support
 */
const ExperienceModal = ({ experience, isOpen, onClose }) => {
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

  if (!isOpen || !experience) return null;

  // Get color classes based on glow color
  const getColorClasses = (glowColor) => {
    const colors = {
      green: {
        border: 'border-green-500',
        bg: 'from-green-500/20 to-emerald-500/20',
        tag: 'bg-green-100 text-green-700',
        icon: 'text-green-600',
        text: 'text-green-600'
      },
      blue: {
        border: 'border-blue-500',
        bg: 'from-blue-500/20 to-cyan-500/20',
        tag: 'bg-blue-100 text-blue-700',
        icon: 'text-blue-600',
        text: 'text-blue-600'
      },
      cyan: {
        border: 'border-cyan-500',
        bg: 'from-cyan-500/20 to-teal-500/20',
        tag: 'bg-cyan-100 text-cyan-700',
        icon: 'text-cyan-600',
        text: 'text-cyan-600'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'from-purple-500/20 to-indigo-500/20',
        tag: 'bg-purple-100 text-purple-700',
        icon: 'text-purple-600',
        text: 'text-purple-600'
      },
      orange: {
        border: 'border-orange-500',
        bg: 'from-orange-500/20 to-amber-500/20',
        tag: 'bg-orange-100 text-orange-700',
        icon: 'text-orange-600',
        text: 'text-orange-600'
      }
    };
    return colors[glowColor] || colors.green;
  };

  const colorClasses = getColorClasses(experience.glowColor);

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

            <div className="pr-12">
              {/* Company Logo/Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex-shrink-0 p-3 rounded-xl bg-white/80 ${colorClasses.icon}`}>
                  {experience.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{experience.logoText}</div>
                  <h2 className="text-2xl font-bold text-gray-800">{experience.company}</h2>
                </div>
              </div>

              {/* Role */}
              <h3 className={`text-xl font-semibold mb-3 ${colorClasses.text}`}>{experience.role}</h3>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-250px)] custom-scrollbar">
            {/* Brief Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: colorClasses.icon }}>
              <p className="text-gray-700 font-medium italic">{experience.brief}</p>
            </div>

            {/* Detailed Description */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Role & Responsibilities</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{experience.detailed}</p>
            </div>

            {/* Tags/Skills */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag, idx) => (
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

      <style jsx>{`
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

export default ExperienceModal;
