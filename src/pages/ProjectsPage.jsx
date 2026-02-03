import React, { useState } from 'react';
import { Globe, Droplets, Leaf } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import GlowingCard from '../components/GlowingCard';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Skarn Formation Field Study - Grenville Province",
      icon: <Globe className="w-6 h-6 text-orange-600" />,
      brief: "Field mapping and mineralogical analysis of skarn deposits in the Grenville Province",
      detailed: `Led comprehensive field study examining skarn formation processes in the Grenville Province (44°54'57.4"N 78°04'38.4"W). Conducted detailed geological mapping identifying granite intrusions and marble units with diverse mineral compositions including tremolite, wollastonite, and phlogopite. Analyzed contact metamorphism and metasomatism processes where plutonic intrusions transformed limestone-rich environments into marble with distinct skarn minerals.`,
      tags: ["Field Mapping", "Mineralogy", "Petrology", "Structural Geology"],
      glowColor: "orange"
    },
    {
      id: 2,
      title: "Water Quality Assessment - University of Waterloo",
      icon: <Droplets className="w-6 h-6 text-cyan-600" />,
      brief: "Water quality assessment of local sources around University of Waterloo campus",
      detailed: "Developed a comprehensive assessment of water quality from local sources around the University of Waterloo. Drafted a detailed report comparing analytical results to Canadian drinking water standards. Proposed alternate local sources as potential sources of drinking water based on quality assessment findings.",
      tags: ["Water Quality", "Environmental Assessment", "Canadian Standards"],
      glowColor: "cyan"
    },
    {
      id: 3,
      title: "Geomorphology Laboratory Studies",
      icon: <Globe className="w-6 h-6 text-teal-600" />,
      brief: "GIS-based geological mapping using satellite imagery and aerial photography",
      detailed: "Utilized satellite images, air photos, and ArcGIS to create detailed geologic maps. Completed a comprehensive assessment report for a mineral exploration company using GIS analysis and spatial data interpretation.",
      tags: ["ArcGIS", "Remote Sensing", "Geological Mapping"],
      glowColor: "green"
    },
    {
      id: 4,
      title: "Ontario 3D Bedrock Geology Study",
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      brief: "3D geological modeling and interpretation of Ontario's bedrock using LeapFrog software",
      detailed: "Thoroughly studied the bedrock geology of Ontario through 3D geology software (LeapFrog), creating detailed three-dimensional geological models. Made interpretations and correlations to bedrock formation processes across the province.",
      tags: ["3D Modeling", "LeapFrog", "Bedrock Geology"],
      glowColor: "purple"
    },
    {
      id: 5,
      title: "Environmental and Sustainability Assessment Framework",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      brief: "Development of sustainability assessment framework for Canadian environmental processes",
      detailed: "Created a comprehensive assessment focusing on the purposes and design of environmental assessment processes, with specific reference to Canadian federal and Ontario provincial legal mandates. Developed a framework that evolved into a sustainability assessment tool.",
      tags: ["Environmental Assessment", "Sustainability", "Policy Analysis"],
      glowColor: "green"
    },
    {
      id: 6,
      title: "Quaternary Geology & Geochemical Analysis - Abitau Lake, NWT",
      icon: <Globe className="w-6 h-6 text-green-600" />,
      brief: "Geological assessment analysing Quaternary deposits, glacial landforms, and geochemical mapping",
      detailed: "Conducted a geological assessment of the Abitau Lake area, analysing Quaternary deposits, glacial landforms, and surficial geology using GIS and remote sensing to reconstruct past glacial movements. Performed geochemical analysis using ICP-MS data from lake sediment samples.",
      tags: ["GIS", "Remote Sensing", "Quaternary Geology", "ICP-MS"],
      glowColor: "blue"
    },
    {
      id: 7,
      title: "Mineral Deposits Laboratory and Exploration Project",
      icon: <Leaf className="w-6 h-6 text-purple-600" />,
      brief: "Petrographic and geochemical analysis of polymetallic ore samples (Au, Ni-Cu-PGE)",
      detailed: "Performed petrographic and geochemical analysis of polymetallic ore samples using techniques such as RL microscopy, fire assay, and QA/QC to evaluate mineralogy and economic potential. Co-authored an NI 43-101 style technical exploration report for a greenstone-hosted gold deposit.",
      tags: ["Ore Mineralogy", "RL Microscopy", "NI 43-101"],
      glowColor: "purple"
    },
    {
      id: 8,
      title: "Groundwater Trends Thesis Proposal",
      icon: <Droplets className="w-6 h-6 text-indigo-600" />,
      brief: "Python-based time series analysis to assess groundwater trends and drought vulnerability",
      detailed: "Developed a thesis proposal to assess long-term groundwater level trends and drought vulnerability using Python-based time series analysis (Pastas) and hydrogeological indicators like the Standardised Groundwater Index (SGI).",
      tags: ["Python", "Pastas", "Time Series Analysis", "Hydrology"],
      glowColor: "blue"
    },
    {
      id: 9,
      title: "Applied Environmental Remediation & Geochemistry Projects",
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      brief: "Microbially mediated geochemical processes including bioremediation of Acid Mine Drainage",
      detailed: "Investigated microbially mediated geochemical processes through four laboratory projects, including bioremediation of Acid Mine Drainage using sulfate-reducing bacteria, bioleaching of mine tailings, and hydrocarbon degradation in contaminated soils.",
      tags: ["Bioremediation", "Acid Mine Drainage", "Geomicrobiology"],
      glowColor: "green"
    },
    {
      id: 10,
      title: "Quaternary Glacial Geology Field Guide",
      icon: <Globe className="w-6 h-6 text-sky-600" />,
      brief: "Field guide documenting Catfish Creek Till, Waterloo Moraine, and regional glacial features",
      detailed: "Compiled a multi-part field trip guidebook investigating Quaternary glacial and post-glacial environments across the Waterloo and Cambridge region. Documented key stops including Grand River erosional banks, Conestogo Lake sections, and the Paris–Galt Moraine.",
      tags: ["Quaternary Geology", "Glacial Geology", "Field Mapping"],
      glowColor: "cyan"
    }
  ];

  return (
    <section className="min-h-screen px-4 py-24 relative overflow-hidden">
      <FloatingParticles particleCount={20} interactive={true} theme="environmental" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Projects
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </div>
          <p className="text-gray-600 font-body max-w-2xl mx-auto">
            A selection of academic and professional projects spanning{' '}
            <span className="text-green-600 font-medium">environmental assessment</span>,{' '}
            <span className="text-orange-600 font-medium">geological mapping</span>, and{' '}
            <span className="text-blue-600 font-medium">data analysis</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer transform transition-transform duration-200 hover:scale-[1.02]"
            >
              <GlowingCard glowColor={project.glowColor} className="flex flex-col h-full">
                <div className="p-6 flex flex-col h-full min-h-[280px]">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {project.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 font-body leading-relaxed flex-grow line-clamp-3">{project.brief}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                    {project.tags.slice(0, 3).map((tag, idx) => {
                      const tagColors = {
                        green: 'bg-green-50 text-green-700',
                        blue: 'bg-blue-50 text-blue-700',
                        cyan: 'bg-cyan-50 text-cyan-700',
                        orange: 'bg-orange-50 text-orange-700',
                        purple: 'bg-purple-50 text-purple-700'
                      };
                      const colorClass = tagColors[project.glowColor] || 'bg-gray-100 text-gray-600';
                      return (
                        <span key={idx} className={`text-xs px-2 py-1 rounded font-body ${colorClass}`}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-green-700 font-medium text-sm flex items-center gap-1 font-body">
                    Read more →
                  </span>
                </div>
              </GlowingCard>
            </div>
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
