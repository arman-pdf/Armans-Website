import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { FORMSPREE_ID, CONTACT_EMAIL } from '../config';

export default function ContactForm({ compact = false }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
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
    );
  }

  const inputPadding = compact ? 'px-4 py-2' : 'px-4 py-3';
  const inputClass = `w-full ${inputPadding} rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-body`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {hasError && (
        <p className="text-red-600 text-sm font-body">
          Something went wrong - please email me directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-medium">
            {CONTACT_EMAIL}
          </a>
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          className={`${inputClass} resize-none`}
          placeholder="Tell me about your project..."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
      </button>
    </form>
  );
}
