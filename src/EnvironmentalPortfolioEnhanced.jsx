import React, { useState } from 'react';
import { Mail, Linkedin, ChevronDown, Leaf, Globe, Droplets, Building2 } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import GlowingCard from './components/GlowingCard';
import FloatingParticles from './components/FloatingParticles';
import GlassNavigation from './components/GlassNavigation';
import MagneticButton from './components/MagneticButton';
import ScrollIndicator from './components/ScrollIndicator';
import FloatingChatButton from './components/FloatingChatButton';
import ProjectModal from './components/ProjectModal';
import ExperienceModal from './components/ExperienceModal';

/**
 * Enhanced Environmental Portfolio with 2025 Modern Design
 *
 * New Features:
 * - Animated gradient mesh background
 * - Glowing cards with mouse-following effects
 * - Floating particle system
 * - Glassmorphism navigation
 * - Magnetic interactive buttons
 * - Smooth micro-interactions
 * - Modern hover effects
 */
export default function EnvironmentalPortfolioEnhanced() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollSections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const experiences = [
    {
      id: 1,
      company: "City of Kitchener, Sanitary and Stormwater Utilities",
      role: "Environmental Compliance & Stormwater Co-op",
      period: "Jan 2024 - Apr 2024, Sept 2024 - Dec 2024",
      location: "Kitchener, ON",
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      logoText: "COK",
      brief: "Analysed development submissions, field inspections, and sub-watershed studies ensuring adherence to Ontario's CLIECA requirements",
      detailed: "Analysed and evaluated development submissions, field inspections, and sub-watershed studies, preparing technical comments that ensured adherence to Ontario's CLIECA requirements for municipal stormwater and sanitary systems. Delivered a comparative analysis of wastewater and drinking water quality standards across multiple municipalities to support the City's first water standards update in 25 years, producing a summary report of findings for senior staff. Designed a checklist and standardised form for Part 5 construction sign-off of sanitary and stormwater sewer infrastructure, streamlining the approval process and improving documentation time by 30 minutes per application. Conducted Phase I & II Environmental Site Assessments, including site history reviews, field inspections, and sampling evaluations, to identify potential contamination and support informed remediation and redevelopment decisions.",
      tags: ["Environmental Compliance", "CLIECA", "Stormwater Management", "ESA", "Infrastructure Planning", "Water Quality Standards"],
      glowColor: "blue"
    },
    {
      id: 2,
      company: "City of Toronto, Transportation Services",
      role: "Groundwater Monitoring & GIS Co-op",
      period: "Jan 2023 – Aug 2023",
      location: "Toronto, ON",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      logoText: "COT",
      brief: "Developed relational database of 22 groundwater wells and pioneered geospatial framework for Toronto's groundwater data",
      detailed: "Developed and maintained a relational database of 22 groundwater wells, integrating soil and water quality parameters to streamline analysis and enable faster identification of exceedances against environmental standards. Reviewed and summarised over 50 groundwater monitoring and soil sampling reports, evaluating compliance with City and provincial standards and identifying deficiencies that reduced data inconsistencies by 15%. Pioneered a geospatial framework for Toronto's groundwater data, linking well records to GIS layers to support data-driven environmental decisions and inform long-term planning for over 150 monitoring sites citywide.",
      tags: ["GIS", "Groundwater Monitoring", "Database Management", "Environmental Compliance", "Data Analysis"],
      glowColor: "green"
    },
    {
      id: 3,
      company: "Rossari Biotech",
      role: "Environment Social Governance Intern",
      period: "Jun 2022 - Sept 2022",
      location: "Mumbai, MH, India",
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      logoText: "RB",
      brief: "Conducted ESG policy benchmarking and designed stakeholder surveys as part of Materiality Index with 250+ participants",
      detailed: "Conducted ESG policy benchmarking and analysis, researching industry best practices and competitor sustainability strategies to identify areas for improvement. Designed and implemented stakeholder surveys as part of a Materiality Index, demonstrating team collaboration skills by collecting and analysing responses from 250+ participants to help define the company's future ESG priorities. Compiled and assessed environmental and sustainability data, contributing to the development of Rossari's annual Sustainability Report and ensuring alignment with recognised reporting frameworks (e.g., GRI, SASB).",
      tags: ["ESG Policy", "Sustainability Reporting", "Materiality Index", "GRI", "SASB", "Stakeholder Engagement"],
      glowColor: "green"
    },
    {
      id: 4,
      company: "Vijay Punjabi Consultants Pvt. Ltd",
      role: "Summer Intern",
      period: "Mar 2018 - May 2018",
      location: "Mumbai, India",
      icon: <Building2 className="w-8 h-8 text-gray-600" />,
      logoText: "VPC",
      brief: "Architecture and construction planning internship with senior project architects",
      detailed: "Shadowed Senior Project Architects on site and assisted with their day-to-day responsibilities on various issues related to labour, government regulations, and raw materials. Learned how architects build models, prepare construction drawings on CAD, give client presentations, and about building code specifications for new Residential and Commercial Towers. Gained hands-on exposure to the complete architectural project lifecycle from design to construction implementation.",
      tags: ["Architecture", "AutoCAD", "Construction Planning", "Building Codes", "Project Management"],
      glowColor: "cyan"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Skarn Formation Field Study - Grenville Province",
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      brief: "Field mapping and mineralogical analysis of skarn deposits in the Grenville Province",
      detailed: `Led comprehensive field study examining skarn formation processes in the Grenville Province (44°54'57.4"N 78°04'38.4"W). Conducted detailed geological mapping identifying granite intrusions and marble units with diverse mineral compositions including tremolite, wollastonite, and phlogopite. Analyzed contact metamorphism and metasomatism processes where plutonic intrusions transformed limestone-rich environments into marble with distinct skarn minerals. Reconstructed geological history spanning the Paleoproterozoic to Mesoproterozoic eras, identifying formation during the Late Elsonian to Elzevirian periods (1290-1180 Ma) with subsequent metasomatism during the Grenvillian Orogenesis (1080-985 Ma). Used mineral identification techniques including hardness testing, cleavage analysis, and acid testing to map rock units and create detailed outcrop maps.`,
      tags: ["Field Mapping", "Mineralogy", "Petrology", "Structural Geology", "Grenville Province"],
      glowColor: "orange",
      images: [
        { caption: "Geological map showing outcrop location in Grenville Province", type: "map" },
        { caption: "Geological outcrop map with identified rock units", type: "outcrop" },
        { caption: "Granite with K-feldspar, quartz, and pyroxene", type: "sample" },
        { caption: "Calcitic marble showing reaction with HCl", type: "sample" },
        { caption: "Tremolite with fibrous lustre", type: "sample" },
        { caption: "Wollastonite grains and phlogopite crystals", type: "sample" },
        { caption: "Contact between granite intrusion and marble", type: "contact" }
      ]
    },
    {
      id: 2,
      title: "Water Quality Assessment - University of Waterloo",
      icon: <Droplets className="w-8 h-8 text-cyan-600" />,
      brief: "Water quality assessment of local sources around University of Waterloo campus",
      detailed: "Developed a comprehensive assessment of water quality from local sources around the University of Waterloo. Drafted a detailed report comparing analytical results to Canadian drinking water standards. Proposed alternate local sources as potential sources of drinking water based on quality assessment findings. Applied water chemistry principles and analytical techniques to evaluate water safety and suitability.",
      tags: ["Water Quality", "Environmental Assessment", "Canadian Standards", "Field Analysis"],
      glowColor: "cyan"
    },
    {
      id: 3,
      title: "Geomorphology Laboratory Studies",
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      brief: "GIS-based geological mapping using satellite imagery and aerial photography",
      detailed: "Utilized satellite images, air photos, and ArcGIS to create detailed geologic maps. Completed a comprehensive assessment report for a mineral exploration company using GIS analysis and spatial data interpretation. Applied geomorphological principles and remote sensing techniques to analyze landscape features and geological formations. Integrated multiple data sources to produce professional-grade geological mapping products.",
      tags: ["ArcGIS", "Remote Sensing", "Geological Mapping", "Mineral Exploration"],
      glowColor: "green"
    },
    {
      id: 4,
      title: "Ontario 3D Bedrock Geology Study",
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      brief: "3D geological modeling and interpretation of Ontario's bedrock using LeapFrog software",
      detailed: "Thoroughly studied the bedrock geology of Ontario through 3D geology software (LeapFrog), creating detailed three-dimensional geological models. Made interpretations and correlations to bedrock formation processes across the province. Utilized advanced geological modeling techniques to visualize subsurface geology and understand regional geological structures and their formation history.",
      tags: ["3D Modeling", "LeapFrog", "Bedrock Geology", "Geological Interpretation"],
      glowColor: "purple"
    },
    {
      id: 5,
      title: "Environmental and Sustainability Assessment Framework",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      brief: "Development of sustainability assessment framework for Canadian environmental processes",
      detailed: "Created a comprehensive assessment focusing on the purposes and design of environmental assessment processes, with specific reference to Canadian federal and Ontario provincial legal mandates. Developed a framework that evolved into a sustainability assessment tool, incorporating environmental, social, and economic considerations. Analyzed regulatory requirements and best practices to create a robust assessment methodology applicable to various project types.",
      tags: ["Environmental Assessment", "Sustainability", "Policy Analysis", "Canadian Regulations"],
      glowColor: "green"
    },
    {
      id: 6,
      title: "Quaternary Geology & Geochemical Analysis - Abitau Lake, NWT",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      brief: "Geological assessment analysing Quaternary deposits, glacial landforms, and geochemical mapping using ICP-MS data",
      detailed: "Conducted a geological assessment of the Abitau Lake area, analysing Quaternary deposits, glacial landforms, and surficial geology using GIS and remote sensing to reconstruct past glacial movements. Performed geochemical analysis using ICP-MS data from lake sediment samples, mapping elemental distributions to interpret glacial transport pathways, sediment provenance, and regional geochemical trends.",
      tags: ["GIS", "Remote Sensing", "Quaternary Geology", "ICP-MS", "Geochemistry", "Glacial Geology"],
      glowColor: "blue"
    },
    {
      id: 7,
      title: "Mineral Deposits Laboratory and Exploration Project",
      icon: <Leaf className="w-8 h-8 text-purple-600" />,
      brief: "Petrographic and geochemical analysis of polymetallic ore samples (Au, Ni-Cu-PGE) and NI 43-101 technical report",
      detailed: "Performed petrographic and geochemical analysis of polymetallic ore samples (Au, Ni-Cu-PGE) using techniques such as RL microscopy, fire assay, and QA/QC to evaluate mineralogy, economic potential, and environmental considerations. Co-authored an NI 43-101 style technical exploration report for a greenstone-hosted gold deposit, including geological interpretation, basic resource estimation, and an economic feasibility assessment of the prospect.",
      tags: ["Ore Mineralogy", "RL Microscopy", "Fire Assay", "QA/QC", "NI 43-101", "Resource Estimation", "Economic Feasibility", "Au", "Ni-Cu-PGE"],
      glowColor: "purple"
    },
    {
      id: 8,
      title: "Groundwater Trends Thesis Proposal",
      icon: <Droplets className="w-8 h-8 text-indigo-600" />,
      brief: "Python-based time series analysis to assess groundwater trends and drought vulnerability using Pastas and SGI",
      detailed: "Developed a thesis proposal to assess long-term groundwater level trends and drought vulnerability using Python-based time series analysis (Pastas) and hydrogeological indicators like the Standardised Groundwater Index (SGI) and groundwater signatures across a regional aquifer system.",
      tags: ["Python", "Pastas", "Time Series Analysis", "Hydrology", "SGI", "Drought Assessment"],
      glowColor: "blue"
    },
    {
      id: 9,
      title: "Applied Environmental Remediation & Geochemistry Projects",
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      brief: "Microbially mediated geochemical processes including bioremediation of Acid Mine Drainage and hydrocarbon degradation",
      detailed: "Investigated microbially mediated geochemical processes through four laboratory projects, including bioremediation of Acid Mine Drainage using sulfate-reducing bacteria, bioleaching of mine tailings, and hydrocarbon degradation in contaminated soils. Simulated early Earth and industrial contamination environments to analyse microbial mineral precipitation (BIF formation) and pollutant attenuation mechanisms, applying ICP-OES data, pH monitoring, and microscopy to evaluate environmental and geochemical impacts.",
      tags: ["Bioremediation", "Acid Mine Drainage", "Geomicrobiology", "ICP-OES", "Hydrocarbon Degradation", "Environmental Geochemistry"],
      glowColor: "green"
    }
    ,
    {
      id: 10,
      title: "Quaternary Glacial Geology Field Guide – Waterloo & Cambridge Region",
      icon: <Globe className="w-8 h-8 text-sky-600" />,
      brief: "Field guide and analysis of Catfish Creek Till, Waterloo Moraine, Conestogo Lake, and Paris–Galt Moraine with mapped stops and stratigraphy",
      detailed: "Compiled a multi-part field trip guidebook investigating Quaternary glacial and post-glacial environments across the Waterloo and Cambridge region. Documented key stops including Grand River erosional banks (Catfish Creek Till), Conestogo Lake sections (Mornington/Tavistock tills with glaciolacustrine rhythmites), Waterloo Moraine kame deposits (Baden Hill), and the Paris–Galt Moraine (Wentworth Till). Described sedimentology (diamicton fabrics, faceted/striated clasts, carbonate-rich matrices), stratigraphic relationships, and ice-flow indicators (bedrock abrasion/striations; NW azimuth ~321°). Synthesised regional deglaciation context of the Laurentide Ice Sheet lobes, linking landforms to process history and human implications for aquifer resources.",
      tags: [
        "Quaternary Geology",
        "Glacial Geology",
        "Catfish Creek Till",
        "Waterloo Moraine",
        "Conestogo Lake",
        "Paris–Galt Moraine",
        "Stratigraphy",
        "Sedimentology",
        "Field Mapping"
      ],
      glowColor: "sky"
    }
  ];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gradient-to-b from-green-50 to-blue-50 relative">
      {/* Animated Background */}
      <AnimatedBackground variant="hero" />

      {/* Glass Navigation */}
      <GlassNavigation logo="Arman Kanorwalla" links={navLinks} />

      {/* Scroll Indicator */}
      <ScrollIndicator sections={scrollSections} />

      {/* Hero Section */}
      <section id="home" className="h-screen snap-start snap-always flex items-center justify-center px-4 relative overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles particleCount={40} interactive={true} theme="environmental" />

        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Greeting Badge */}
          <div className="mb-8 fade-in">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/60 backdrop-blur-sm">
              <span className="text-2xl">👋</span>
              <span className="text-base font-medium text-green-800">Welcome to my portfolio</span>
            </span>
          </div>

          {/* Main Name */}
          <div className="relative inline-block mb-8 fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary tracking-wide leading-none" style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}>
              Arman Kanorwalla
            </h1>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>
          </div>

          {/* Role Tags - More Visual */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in">
            <span className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Environmental Scientist
            </span>
            <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Geoscience Specialist
            </span>
          </div>

          {/* Tagline - Larger and more prominent */}
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto mb-12 fade-in font-medium leading-relaxed">
            Bridging <span className="text-green-600 font-bold">environmental compliance</span>,
            <span className="text-blue-600 font-bold"> geospatial analysis</span>, and
            <span className="text-emerald-600 font-bold"> sustainable solutions</span> to protect our planet's resources
          </p>

          {/* Stats Bar - Visual Interest */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 fade-in">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">2+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="w-px h-16 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">8+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Projects Completed</div>
            </div>
            <div className="w-px h-16 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-1">100%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Committed</div>
            </div>
          </div>

          <MagneticButton href="#about" variant="primary" size="lg" Icon={ChevronDown}>
            View My Work
          </MagneticButton>

          {/* Scroll Hint - aligned below button */}
          <div className="flex flex-col items-center gap-1 animate-bounce mt-12">
            <span className="text-sm text-gray-500 font-medium tracking-wide">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen snap-start snap-always flex items-center justify-center px-4 py-20 bg-white/40 backdrop-blur-sm relative overflow-hidden">
        <FloatingParticles particleCount={40} interactive={true} theme="environmental" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-gradient-primary mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <GlowingCard glowColor="green" className="h-full">
              <div className="w-full h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Your Photo Here</span>
              </div>
            </GlowingCard>
            <div className="space-y-4">
              <p className="text-gray-700">
                I'm graduating in August 2025 from the University of Waterloo with a Bachelor of Science, Honours Environmental Science, Specialising in Geoscience. My academic journey has equipped me with expertise in hydrology, geochemistry, geomorphology, geology, geomicrobiology, Quaternary geology, and ecohydrology.
              </p>
              <p className="text-gray-700">
                Through my professional experiences at the City of Kitchener and City of Toronto, I've developed strong technical skills in environmental compliance, geospatial analysis, and groundwater monitoring. I'm passionate about leveraging technology and data-driven approaches to address environmental challenges and inform sustainable decision-making.
              </p>
              <p className="text-gray-700">
                My technical toolkit includes ArcGIS Pro, QGIS, Python (Pandas, Pastas), R Studio, MODFLOW, ICP-MS, and AutoCAD, which I use to analyze environmental data, create spatial models, and develop innovative solutions for water resource management. I hold WHIMS 2015 certification and an unrestricted driver's license.
              </p>
              <p className="text-gray-700">
                I'm currently seeking opportunities where I can apply my environmental science expertise and geospatial analysis skills to make a meaningful impact. Beyond work, I'm actively involved in animal welfare volunteering (World for All) and served as Secretary of the Earth & Environmental Science Club at the University of Waterloo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen snap-start snap-always flex items-center justify-center px-4 py-20 overflow-y-auto relative">
        <FloatingParticles particleCount={40} interactive={true} theme="environmental" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-gradient-primary mb-12 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <GlowingCard key={project.id} glowColor={project.glowColor} className="flex flex-col">
                <div className="p-6 flex flex-col min-h-[280px]">
                  <div className="flex items-start gap-3 mb-4 min-h-[3.5rem]">
                    <div className="flex-shrink-0 mt-1">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 min-h-[4.5rem]">{project.brief}</p>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-auto text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 transition-smooth hover:gap-2"
                  >
                    Read More
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </button>
                </div>
              </GlowingCard>
            ))}
          </div>

          {/* Project Modal */}
          <ProjectModal
            project={selectedProject}
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
          />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen snap-start snap-always flex items-center justify-center px-4 py-20 bg-white/40 backdrop-blur-sm overflow-y-auto relative overflow-hidden">
        <FloatingParticles particleCount={40} interactive={true} theme="environmental" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-gradient-primary mb-12 text-center">Work Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <GlowingCard key={exp.id} glowColor={exp.glowColor}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {exp.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-gray-200">
                          <span className="text-xs font-bold text-gray-600">{exp.logoText}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                              <p className="text-lg text-green-700 font-semibold">{exp.company}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{exp.period}</p>
                              <p className="text-sm text-gray-500">{exp.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-3">{exp.brief}</p>

                      <button
                        onClick={() => setSelectedExperience(exp)}
                        className="mt-auto text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 transition-smooth hover:gap-2"
                      >
                        Read More
                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                      </button>
                    </div>
                  </div>
                </div>
              </GlowingCard>
            ))}
          </div>

          {/* Experience Modal */}
          <ExperienceModal
            experience={selectedExperience}
            isOpen={selectedExperience !== null}
            onClose={() => setSelectedExperience(null)}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen snap-start snap-always flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-5xl font-bold text-gradient-primary mb-16 text-center">Let's Connect</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Main Contact Card */}
            <div className="md:col-span-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left: Message */}
                  <div className="text-left">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Collaborate?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      I'm always interested in discussing environmental science projects, research opportunities, and sustainable solutions. Let's work together to make a positive impact!
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">Open to Opportunities</span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Available for Consulting</span>
                    </div>
                  </div>

                  {/* Right: Contact Options */}
                  <div className="space-y-4">
                    <a
                      href="https://www.linkedin.com/in/armankanorwalla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-blue-600 hover:text-blue-700 transition-all duration-300 group py-4 px-6 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <Linkedin className="w-8 h-8 group-hover:scale-110 transition-smooth flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-bold text-lg">LinkedIn</div>
                        <div className="text-sm opacity-75">Let's connect professionally</div>
                      </div>
                    </a>

                    <a
                      href="mailto:azkanorw@uwaterloo.ca"
                      className="flex items-center gap-4 text-green-700 hover:text-green-800 transition-all duration-300 group py-4 px-6 bg-gradient-to-r from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <Mail className="w-8 h-8 group-hover:scale-110 transition-smooth flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-bold text-lg">Email</div>
                        <div className="text-sm opacity-75">azkanorw@uwaterloo.ca</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Summary Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  Core Expertise
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-700">GIS & Remote Sensing</div>
                      <div className="text-sm text-gray-600">ArcGIS Pro, QGIS, Spatial Analysis, Geospatial Database Design</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-700">Hydrogeology & Modeling</div>
                      <div className="text-sm text-gray-600">MODFLOW, Groundwater Modeling, Python (Pastas), AutoCAD, R-studio, SQL</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-700">Labs & Projects</div>
                      <div className="text-sm text-gray-600">ICP-MS, ICP-OES, RL Microscopy, Economic Feasibility Assessment, Statistical Analysis, QA/QC</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-700">Environmental Assessment</div>
                      <div className="text-sm text-gray-600">Phase I/II ESA, Water Quality, Environmental Compliance, EIA, Field Sampling</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Availability Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  Availability
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>
                    <div className="font-semibold text-gray-700 text-lg">Waterloo, Ontario</div>
                    <div className="text-sm text-gray-600 mt-1">Willing to relocate</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Graduation</div>
                    <div className="font-semibold text-gray-700 text-lg">August 2025</div>
                  </div>
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Actively Seeking Opportunities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-1">5+</div>
              <div className="text-sm text-gray-600">Co-op Terms</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">9+</div>
              <div className="text-sm text-gray-600">Projects</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-1">10+</div>
              <div className="text-sm text-gray-600">Technical Skills</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Dedicated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p>&copy; 2025 Arman Kanorwalla. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
}
