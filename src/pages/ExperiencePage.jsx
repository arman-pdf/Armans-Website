import React, { useState } from 'react';
import { Droplets, Globe, Leaf, Building2, GraduationCap } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import GlowingCard from '../components/GlowingCard';
import ExperienceModal from '../components/ExperienceModal';

export default function ExperiencePage() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      id: 1,
      company: "City of Kitchener, Sanitary and Stormwater Utilities",
      role: "Environmental Compliance & Stormwater Co-op",
      period: "Jan 2024 - Apr 2024, Sept 2024 - Dec 2024",
      location: "Kitchener, ON",
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      logoText: "COK",
      brief: "Analysed development submissions, field inspections, and sub-watershed studies ensuring adherence to Ontario's CLIECA requirements",
      detailed: "Analysed and evaluated development submissions, field inspections, and sub-watershed studies, preparing technical comments that ensured adherence to Ontario's CLIECA requirements for municipal stormwater and sanitary systems. Delivered a comparative analysis of wastewater and drinking water quality standards across multiple municipalities to support the City's first water standards update in 25 years. Designed a checklist and standardised form for Part 5 construction sign-off, streamlining the approval process and improving documentation time by 30 minutes per application.",
      tags: ["Environmental Compliance", "CLIECA", "Stormwater Management", "ESA"],
      glowColor: "blue"
    },
    {
      id: 2,
      company: "City of Toronto, Transportation Services",
      role: "Groundwater Monitoring & GIS Co-op",
      period: "Jan 2023 – Aug 2023",
      location: "Toronto, ON",
      icon: <Globe className="w-6 h-6 text-green-600" />,
      logoText: "COT",
      brief: "Developed relational database of 22 groundwater wells and pioneered geospatial framework for Toronto's groundwater data",
      detailed: "Developed and maintained a relational database of 22 groundwater wells, integrating soil and water quality parameters to streamline analysis. Reviewed and summarised over 50 groundwater monitoring reports, reducing data inconsistencies by 15%. Pioneered a geospatial framework for Toronto's groundwater data, linking well records to GIS layers to support data-driven environmental decisions for over 150 monitoring sites citywide.",
      tags: ["GIS", "Groundwater Monitoring", "Database Management"],
      glowColor: "green"
    },
    {
      id: 3,
      company: "Rossari Biotech",
      role: "Environment Social Governance Intern",
      period: "Jun 2022 - Sept 2022",
      location: "Mumbai, India",
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      logoText: "RB",
      brief: "Conducted ESG policy benchmarking and designed stakeholder surveys as part of Materiality Index with 250+ participants",
      detailed: "Conducted ESG policy benchmarking and analysis, researching industry best practices and competitor sustainability strategies. Designed and implemented stakeholder surveys as part of a Materiality Index, collecting and analysing responses from 250+ participants to help define the company's ESG priorities. Contributed to Rossari's annual Sustainability Report aligned with GRI and SASB frameworks.",
      tags: ["ESG Policy", "Sustainability Reporting", "GRI", "SASB"],
      glowColor: "green"
    },
    {
      id: 4,
      company: "Vijay Punjabi Consultants Pvt. Ltd",
      role: "Summer Intern",
      period: "Mar 2018 - May 2018",
      location: "Mumbai, India",
      icon: <Building2 className="w-6 h-6 text-gray-600" />,
      logoText: "VPC",
      brief: "Architecture and construction planning internship with senior project architects",
      detailed: "Shadowed Senior Project Architects on site and assisted with day-to-day responsibilities on various issues related to labour, government regulations, and raw materials. Learned how architects build models, prepare construction drawings on CAD, and about building code specifications for residential and commercial towers.",
      tags: ["Architecture", "AutoCAD", "Construction Planning"],
      glowColor: "cyan"
    }
  ];

  const education = {
    id: 'edu',
    company: "University of Waterloo",
    role: "BSc Honours Environmental Science, Geoscience Specialisation",
    period: "2020 - August 2025",
    location: "Waterloo, ON",
    icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
    logoText: "UW",
    brief: "Honours Environmental Science with specialisation in Geoscience. Relevant coursework in hydrology, geochemistry, GIS, and environmental assessment.",
    detailed: "Relevant coursework: Hydrology, Geochemistry, Geomorphology, Quaternary Geology, Ecohydrology, Geomicrobiology, Environmental Assessment, GIS & Remote Sensing, Mineral Deposits. Secretary of Earth & Environmental Science Club. Active in animal welfare volunteering with World for All.",
    tags: ["Hydrology", "Geochemistry", "GIS", "Environmental Assessment"],
    glowColor: "purple"
  };

  return (
    <section className="min-h-screen px-4 py-24 relative overflow-hidden">
      <FloatingParticles particleCount={20} interactive={true} theme="environmental" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Experience
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          <p className="text-gray-600 font-body max-w-xl mx-auto">
            Professional experience in{' '}
            <span className="text-blue-600 font-medium">environmental compliance</span>,{' '}
            <span className="text-green-600 font-medium">GIS & groundwater monitoring</span>, and{' '}
            <span className="text-emerald-600 font-medium">sustainability</span>.
          </p>
        </div>

        {/* Work Experience */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 uppercase tracking-wide flex items-center gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => {
              const iconBgColors = {
                blue: 'bg-blue-50',
                green: 'bg-green-50',
                cyan: 'bg-cyan-50',
                purple: 'bg-purple-50'
              };
              const iconBg = iconBgColors[exp.glowColor] || 'bg-gray-100';
              return (
              <GlowingCard key={exp.id} glowColor={exp.glowColor}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
                      {exp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                          <p className="text-gray-600 font-body">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 font-body">
                          <p>{exp.period}</p>
                          <p>{exp.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm font-body mb-3">{exp.brief}</p>
                      <button
                        onClick={() => setSelectedExperience(exp)}
                        className="text-green-700 hover:text-green-800 font-medium text-sm transition-colors font-body"
                      >
                        Read more →
                      </button>
                    </div>
                  </div>
                </div>
              </GlowingCard>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 uppercase tracking-wide flex items-center gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Education
          </h2>
          <GlowingCard glowColor={education.glowColor}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  {education.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{education.role}</h3>
                      <p className="text-gray-600 font-body">{education.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500 font-body">
                      <p>{education.period}</p>
                      <p>{education.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-body">{education.brief}</p>
                </div>
              </div>
            </div>
          </GlowingCard>
        </div>

        <ExperienceModal
          experience={selectedExperience}
          isOpen={selectedExperience !== null}
          onClose={() => setSelectedExperience(null)}
        />
      </div>
    </section>
  );
}
