import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ChevronDown, Mail, Linkedin, Send, MapPin, Calendar, CheckCircle } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import GlowingCard from '../components/GlowingCard';

export default function HomePage() {
  const { setActiveSection: onSectionChange } = useOutletContext() || {};
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'contact', ref: contactRef },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop;
          if (scrollPosition >= offsetTop) {
            if (activeSection !== section.id) {
              setActiveSection(section.id);
              onSectionChange?.(section.id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, onSectionChange]);

  const scrollToSection = (sectionId) => {
    const refs = { home: homeRef, about: aboutRef, contact: contactRef };
    refs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Single particle layer for the entire page */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <FloatingParticles particleCount={40} interactive={true} theme="environmental" />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section
        ref={homeRef}
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-20 relative"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Main Name */}
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight leading-none">
              Arman Kanorwalla
            </h1>
            {/* Centered fading line */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </div>

          {/* Professional subtitle - no bubbles */}
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-body">
            Environmental Scientist & Geoscience Specialist
          </p>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 font-body leading-relaxed">
            Bridging <span className="text-green-600 font-semibold">environmental compliance</span>,
            <span className="text-blue-600 font-semibold"> geospatial analysis</span>, and
            <span className="text-emerald-600 font-semibold"> sustainable solutions</span> to protect our planet's resources
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-10 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">2+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-body">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">10+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-body">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-1">100%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-body">Committed</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/projects"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                View Projects
              </Link>
              <Link
                to="/experience"
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                View Experience
              </Link>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-bold border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Get in Touch
            </button>
          </div>

          {/* Scroll Hint */}
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
          >
            <span className="text-sm font-body">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section
        ref={aboutRef}
        id="about"
        className="min-h-screen flex items-center justify-center px-4 py-24 relative"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Photo */}
            <GlowingCard glowColor="green" className="h-full">
              <div className="w-full aspect-square bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 font-body">Your Photo Here</span>
              </div>
            </GlowingCard>

            {/* Bio */}
            <div className="space-y-5 font-body">
              <p className="text-gray-700 leading-relaxed">
                I'm graduating in August 2025 from the University of Waterloo with a Bachelor of Science, Honours Environmental Science, Specialising in Geoscience.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through my professional experiences at the City of Kitchener and City of Toronto, I've developed strong technical skills in environmental compliance, geospatial analysis, and groundwater monitoring.
              </p>
              <p className="text-gray-700 leading-relaxed">
                My technical toolkit includes ArcGIS Pro, QGIS, Python (Pandas, Pastas), R Studio, MODFLOW, ICP-MS, and AutoCAD. I hold WHIMS 2015 certification and an unrestricted driver's license.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Beyond work, I'm actively involved in animal welfare volunteering (World for All) and served as Secretary of the Earth & Environmental Science Club.
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                category: 'GIS & Mapping',
                skills: [
                  { name: 'ArcGIS Pro', desc: 'Spatial Analysis' },
                  { name: 'QGIS', desc: 'Open Source GIS' },
                  { name: 'Remote Sensing', desc: 'Satellite Imagery' }
                ],
                color: 'green',
                bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
                dotColor: 'bg-green-500',
                textColor: 'text-green-700'
              },
              {
                category: 'Programming',
                skills: [
                  { name: 'Python', desc: 'Pandas, Pastas' },
                  { name: 'R Studio', desc: 'Statistical Analysis' },
                  { name: 'SQL', desc: 'Database Queries' }
                ],
                color: 'blue',
                bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
                dotColor: 'bg-blue-500',
                textColor: 'text-blue-700'
              },
              {
                category: 'Modeling',
                skills: [
                  { name: 'MODFLOW', desc: 'Groundwater Flow' },
                  { name: 'LeapFrog', desc: '3D Geological' },
                  { name: 'AutoCAD', desc: 'Technical Drawing' }
                ],
                color: 'purple',
                bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
                dotColor: 'bg-purple-500',
                textColor: 'text-purple-700'
              },
              {
                category: 'Lab & Field',
                skills: [
                  { name: 'ICP-MS', desc: 'Trace Elements' },
                  { name: 'ICP-OES', desc: 'Elemental Analysis' },
                  { name: 'ESA', desc: 'Field Assessment' }
                ],
                color: 'cyan',
                bgColor: 'bg-gradient-to-br from-cyan-50 to-teal-100',
                dotColor: 'bg-cyan-500',
                textColor: 'text-cyan-700'
              },
            ].map((group, idx) => (
              <GlowingCard key={idx} glowColor={group.color}>
                <div className={`p-5 rounded-lg ${group.bgColor} h-full`}>
                  <h3 className={`font-bold text-center mb-4 text-sm uppercase tracking-wide ${group.textColor}`}>
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${group.dotColor} rounded-full mt-1.5 flex-shrink-0`}></span>
                        <div>
                          <div className="text-gray-800 text-sm font-semibold font-body">{skill.name}</div>
                          <div className="text-gray-500 text-xs font-body">{skill.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section
        ref={contactRef}
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 py-24 relative"
      >
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Let's Connect
          </h2>
          <p className="text-gray-600 text-center mb-12 font-body max-w-xl mx-auto">
            I'm always interested in discussing environmental science projects, research opportunities, and sustainable solutions.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <GlowingCard glowColor="green">
              <div className="p-8">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-body"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-body"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none font-body"
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
                )}
              </div>
            </GlowingCard>

            {/* Contact Info */}
            <div className="space-y-6">
              <GlowingCard glowColor="blue">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Direct Contact</h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:azkanorw@uwaterloo.ca"
                      className="flex items-center gap-3 text-gray-700 hover:text-green-700 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <Mail className="w-5 h-5 text-green-600" />
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
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Linkedin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="font-body">
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-gray-500">Connect with me</div>
                      </div>
                    </a>
                  </div>
                </div>
              </GlowingCard>

              <GlowingCard glowColor="cyan">
                <div className="p-6">
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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Actively Seeking Opportunities
                    </div>
                  </div>
                </div>
              </GlowingCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
