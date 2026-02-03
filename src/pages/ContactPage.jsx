import React, { useState } from 'react';
import { Mail, Linkedin, Send, MapPin, Calendar, CheckCircle } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace YOUR_FORM_ID with your Formspree form ID (get it from formspree.io)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
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
    <section className="min-h-screen px-4 py-24 relative overflow-hidden">
      <FloatingParticles particleCount={15} interactive={true} theme="environmental" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-center mb-12 font-body max-w-xl mx-auto">
          I'm always interested in discussing environmental science projects, research opportunities, and sustainable solutions.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 font-body">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-green-700 hover:text-green-800 font-medium font-body"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5 font-body">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-body"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 font-body">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-body"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5 font-body">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none font-body"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Direct contact */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <a
                  href="mailto:azkanorw@uwaterloo.ca"
                  className="flex items-center gap-3 text-gray-700 hover:text-green-700 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Mail className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="font-body">
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-500">azkanorw@uwaterloo.ca</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/armankanorwalla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-700 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="font-body">
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-gray-500">Connect with me</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Availability</h3>
              <div className="space-y-3 font-body">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-700">Waterloo, Ontario</div>
                    <div className="text-sm text-gray-500">Willing to relocate</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-700">Graduating August 2025</div>
                    <div className="text-sm text-gray-500">Open to opportunities</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Actively Seeking Opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
