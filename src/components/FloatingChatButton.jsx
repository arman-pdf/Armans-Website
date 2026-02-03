import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

/**
 * FloatingChatButton Component
 *
 * Purpose: Fixed floating chat button with popup message form
 * Placement: Bottom right corner of the page, always visible
 *
 * Features:
 * - Floating action button with chat icon
 * - Animated popup form on click
 * - Glassmorphism design
 * - Form with name, email, and message fields
 * - Smooth open/close animations
 */
const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace YOUR_FORM_ID with your Formspree form ID (get it from formspree.io)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'rotate-90' : ''
        }`}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
        )}

        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      </button>

      {/* Popup Message Form */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-scale-in">
          {/* Glass card container */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
              <h3 className="text-lg font-semibold">Send a Message</h3>
              <p className="text-sm text-white/90 mt-1">I'll get back to you soon!</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="chat-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="chat-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="chat-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="chat-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="chat-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="chat-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Backdrop overlay when popup is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingChatButton;
