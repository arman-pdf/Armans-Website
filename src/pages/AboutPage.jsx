import React from 'react';
import FloatingParticles from '../components/FloatingParticles';
import GlowingCard from '../components/GlowingCard';

export default function AboutPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <FloatingParticles particleCount={20} interactive={true} theme="environmental" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          About Me
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Photo placeholder */}
          <GlowingCard glowColor="green" className="h-full">
            <div className="w-full aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-body">Your Photo Here</span>
            </div>
          </GlowingCard>

          {/* Bio content */}
          <div className="space-y-5 font-body">
            <p className="text-gray-700 leading-relaxed">
              I'm graduating in August 2025 from the University of Waterloo with a Bachelor of Science, Honours Environmental Science, Specialising in Geoscience.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My academic journey has equipped me with expertise in hydrology, geochemistry, geomorphology, geology, geomicrobiology, Quaternary geology, and ecohydrology.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through my professional experiences at the City of Kitchener and City of Toronto, I've developed strong technical skills in environmental compliance, geospatial analysis, and groundwater monitoring.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My technical toolkit includes ArcGIS Pro, QGIS, Python (Pandas, Pastas), R Studio, MODFLOW, ICP-MS, and AutoCAD. I hold WHIMS 2015 certification and an unrestricted driver's license.
            </p>
          </div>
        </div>

        {/* Skills section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: 'GIS & Mapping', skills: ['ArcGIS Pro', 'QGIS', 'Remote Sensing'] },
              { category: 'Programming', skills: ['Python', 'R Studio', 'SQL'] },
              { category: 'Modeling', skills: ['MODFLOW', 'LeapFrog', 'AutoCAD'] },
              { category: 'Lab & Field', skills: ['ICP-MS', 'ICP-OES', 'ESA'] },
            ].map((group, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">{group.category}</h3>
                <ul className="space-y-1.5">
                  {group.skills.map((skill, i) => (
                    <li key={i} className="text-gray-600 text-sm font-body">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
