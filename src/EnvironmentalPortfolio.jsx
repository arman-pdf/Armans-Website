import React, { useState } from 'react';
import { Mail, Linkedin, ChevronDown, Leaf, Globe, Droplets, Building2 } from 'lucide-react';

export default function EnvironmentalPortfolio() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const experiences = [
    {
      id: 1,
      company: "City of Kitchener",
      role: "Technical Support Student - Sanitary and Stormwater",
      period: "Jan 2024 - Apr 2024, Sep 2024 - Dec 2024",
      location: "Kitchener, ON",
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      logoText: "COK",
      brief: "Environmental compliance and infrastructure planning for municipal sanitary and stormwater systems",
      detailed: "Assisted in the review, analysis, and preparation of technical comments on development applications, site inspections, monitoring reports, subwatershed studies, and capital projects, ensuring compliance with Consolidated Linear Infrastructure Environmental Approvals. Conducted a comparative analysis of wastewater and drinking water standards across multiple municipalities to support Kitchener's first water standards update in 25 years. Developed a standardized checklist and form for Part 5 construction sign-off of sanitary and stormwater sewer infrastructure, streamlining the approval process. Contributed to asset management by compiling monitoring data, infrastructure inspection results, and GIS-based asset inventories for the National Water and Wastewater Benchmarking Initiative.",
      tags: ["Environmental Compliance", "Infrastructure Planning", "GIS Integration", "Data Analysis", "Regulatory Policy"]
    },
    {
      id: 2,
      company: "City of Toronto",
      role: "Technical Trainee - GIS and Environmental Research Assistant",
      period: "Jan 2023 - Aug 2023",
      location: "Toronto, ON",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      logoText: "COT",
      brief: "GIS analysis and environmental compliance for transportation asset management",
      detailed: "Developed a comprehensive database consolidating soil and groundwater test results from 22 monitoring wells, integrating the data into ArcGIS to enhance spatial visualization for environmental planning. Assisted in right-of-way inspections, collecting and analyzing field data related to contaminated sites and municipal transportation infrastructure. Conducted detailed reviews of environmental reports and prepared annual summaries. Leveraged GIS tools and data analytics to enhance decision-making processes for infrastructure planning, environmental assessments, and regulatory compliance.",
      tags: ["ArcGIS", "Groundwater Analysis", "Environmental Research", "Asset Management", "Data Visualization"]
    },
    {
      id: 3,
      company: "Rossari Biotech Ltd",
      role: "ESG Intern",
      period: "Jun 2022 - Sep 2022",
      location: "Mumbai, India",
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      logoText: "RB",
      brief: "ESG policy analysis and sustainability reporting for specialty chemicals manufacturer",
      detailed: "Conducted comprehensive ESG policy analysis and benchmarking, identifying areas for improvement by researching competitor strategies and industry best practices. Designed and implemented stakeholder surveys for a Materiality Index, collecting and analyzing responses from 250+ individuals to define future ESG priorities. Compiled and assessed sustainability data, contributing to the completion of Rossari's Sustainability Report and aligning reporting with industry frameworks. Helped refine the company's ESG strategy and ensure compliance with evolving industry standards.",
      tags: ["ESG Analysis", "Sustainability Reporting", "Stakeholder Engagement", "Policy Benchmarking", "Data Analytics"]
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
      tags: ["Architecture", "AutoCAD", "Construction Planning", "Building Codes", "Project Management"]
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
      tags: ["Water Quality", "Environmental Assessment", "Canadian Standards", "Field Analysis"]
    },
    {
      id: 3,
      title: "Ontario 3D Bedrock Geology Study",
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      brief: "3D geological modeling and interpretation of Ontario's bedrock using LeapFrog software",
      detailed: "Thoroughly studied the bedrock geology of Ontario through 3D geology software (LeapFrog), creating detailed three-dimensional geological models. Made interpretations and correlations to bedrock formation processes across the province. Utilized advanced geological modeling techniques to visualize subsurface geology and understand regional geological structures and their formation history.",
      tags: ["3D Modeling", "LeapFrog", "Bedrock Geology", "Geological Interpretation"]
    },
    {
      id: 4,
      title: "Geomorphology Laboratory Studies",
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      brief: "GIS-based geological mapping using satellite imagery and aerial photography",
      detailed: "Utilized satellite images, air photos, and ArcGIS to create detailed geologic maps. Completed a comprehensive assessment report for a mineral exploration company using GIS analysis and spatial data interpretation. Applied geomorphological principles and remote sensing techniques to analyze landscape features and geological formations. Integrated multiple data sources to produce professional-grade geological mapping products.",
      tags: ["ArcGIS", "Remote Sensing", "Geological Mapping", "Mineral Exploration"]
    },
    {
      id: 5,
      title: "Environmental and Sustainability Assessment Framework",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      brief: "Development of sustainability assessment framework for Canadian environmental processes",
      detailed: "Created a comprehensive assessment focusing on the purposes and design of environmental assessment processes, with specific reference to Canadian federal and Ontario provincial legal mandates. Developed a framework that evolved into a sustainability assessment tool, incorporating environmental, social, and economic considerations. Analyzed regulatory requirements and best practices to create a robust assessment methodology applicable to various project types.",
      tags: ["Environmental Assessment", "Sustainability", "Policy Analysis", "Canadian Regulations"]
    },
    {
      id: 6,
      title: "Quaternary Geology & Geochemical Analysis - Abitau Lake",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      brief: "Geological assessment of Abitau Lake area in Northwest Territories",
      detailed: "Conducted a geological assessment of the Abitau Lake area, analyzing Quaternary deposits, glacial landforms, and surficial geology using GIS and map interpretation to reconstruct past glacial movements. Performed a geochemical study using ICP-MS data from lake sediments, mapping elemental distributions to interpret glacial transport patterns, sediment provenance, and regional geochemical trends.",
      tags: ["GIS", "Geochemistry", "Quaternary Geology", "ICP-MS Analysis"]
    },
    {
      id: 7,
      title: "Mineral Deposits Laboratory Studies",
      icon: <Leaf className="w-8 h-8 text-purple-600" />,
      brief: "Comprehensive ore mineralogy and microscopy across five laboratory exercises",
      detailed: `Completed intensive laboratory training in ore mineral identification and characterization techniques across multiple economically significant deposit types. This comprehensive five-lab coursework included:

Lab 1: Ore Mineral Identification

Developed foundational skills in macroscopic ore mineral identification by creating comprehensive property tables for 10 ore and associate minerals including chalcopyrite, pyrite, ilmenite, magnetite, sphalerite, hematite, galena, and pyrrhotite. Analyzed diagnostic properties (color, streak, habit, relative density, magnetism) to systematically differentiate between Fe-bearing sulphides and Fe-bearing oxides. Examined two hand samples with massive textures containing disseminated sulphide minerals in magnetite-ilmenite host matrices. Created diagnostic flowcharts for systematic mineral identification, distinguishing between magnetic/non-magnetic minerals, cubic habits, hardness values, and other key properties. Learned to recognize ore mineral associations indicative of hydrothermal or magmatic sulphide origins.

Lab 2: Reflected Light Microscopy

Advanced to microscopic ore characterization using reflected light microscopy techniques. Analyzed two samples (PA and PB) identifying mineral assemblages including pyrite, chalcopyrite, pyrrhotite, and sphalerite within gangue matrices. Documented ore textures (massive, disseminated, interstitial), grain sizes (0.01-4 mm), and mineral relationships to construct paragenetic sequences. Identified temporal relationships showing pyrite forming first as euhedral-subhedral grains, followed by pyrrhotite intergrown with chalcopyrite, with sphalerite and gangue minerals forming in later stages. Evaluated samples for potential VMS or magmatic sulphide deposit types based on mineral associations, textures, and sulfide-rich compositions. Provided mining recommendations for a zinc exploration company based on sphalerite content, pyrrhotite concentrations, environmental risks (acid mine drainage), and metallurgical processing efficiency.

Lab 3: Cu-Ni Deposits (Sudbury Mining Camp)

Analyzed massive sulfide horizons from the Sudbury district, comparing chalcopyrite-pentlandite rich mineralization versus pyrrhotite-dominated assemblages. Conducted detailed ore microscopy identifying mineral textures (massive, disseminated, interstitial), paragenetic sequences, and metallurgical implications. Sample SA showed higher chalcopyrite (8-15%) and pentlandite (15%) content with moderate pyrrhotite (40%), while Sample SB exhibited dominant pyrrhotite (50%) with lower chalcopyrite (4%) and pentlandite (5%). Evaluated samples for Cu/Ni ratios, flotation efficiency, and environmental considerations including acid mine drainage potential. Recommended Sample SA for extraction due to higher Cu-PGE content, superior metal recovery rates, better fractionated sulfide system enhancing flotation efficiency, and reduced sulfur emission concerns compared to pyrrhotite-rich Sample SB.

Lab 4: VMS and MVT Deposits (Zinc Mineralization)

Examined contrasting zinc deposit types including volcanogenic massive sulfide (VMS) and Mississippi Valley-Type (MVT) mineralization. Analyzed sphalerite-dominant samples with varying zinc content (50.7-65.4% Zn) and iron concentrations (1.4-13.8% Fe). Sample ZA showed MVT characteristics with 40% sphalerite, 20% galena, 40% gangue (calcite/dolomite), and skarn-like alteration features. Sample ZB exhibited VMS characteristics with 80% pyrite, 15% sphalerite, minor chalcopyrite, and massive sulfide texture with stockwork veining. Used EPMA data to calculate recoverable zinc per unit volume, determining ZA provides over three times more recoverable zinc (1.05 g Zn) than ZB (0.30 g Zn) per cubic centimeter. Evaluated gangue mineralogy showing ZA's carbonate gangue provides natural acid buffering capacity against AMD, while ZB's high pyrite content and Fe-rich sphalerite significantly increases processing costs and environmental mitigation requirements. Recommended Sample ZA for resource estimation based on higher zinc grade, lower iron impurities, better gangue mineral buffering capacity, polymetallic potential (galena for lead recovery), and superior economic feasibility.

Lab 5: Gold Deposits (Orogenic Gold Systems)

Investigated orogenic gold mineralization through reflected light microscopy and fire assay analysis. Identified gold occurrence modes including inclusions within pyrite/arsenopyrite (early entrapment) and along grain boundaries (later remobilization), indicating multiple mineralization events. Analyzed mineral assemblages in two samples showing contrasting sulfide contents: Sample GA with 10% pyrite, 2% arsenopyrite, 2% chalcopyrite, and 85% quartz-sericite gangue; Sample GB with 25% pyrite, 3% chalcopyrite, 2% pyrrhotite, and 69% gangue. Evaluated the "nugget effect" through statistical analysis of five fire assay samples per horizon, comparing Sample GA's extreme grade variability (0.17-670.7 µg/g Au) versus Sample GB's consistent distribution (35.7-44.2 µg/g Au). Assessed metallurgical recovery potential based on gold grain size, sulfide associations, and textural settings. Recommended Sample GB for mining due to more uniform gold distribution reducing ore reserve estimation risks, sulfide-associated gold amenable to flotation and cyanidation, finer grain size suitable for standard processing methods, and more predictable recovery despite Sample GA's higher peak values. Addressed environmental management considerations for arsenopyrite-bearing ores including arsenic stabilization strategies and tailings disposal protocols.

Throughout all five labs, developed comprehensive proficiency in macroscopic mineral identification, reflected light microscopy techniques, paragenetic sequence interpretation, quantitative mineral resource calculations, metallurgical assessment, environmental risk evaluation, and evidence-based economic geology decision-making frameworks supported by properly cited scientific literature.`,
      tags: ["Ore Mineralogy", "Reflected Light Microscopy", "Mineral Identification", "Cu-Ni Deposits", "VMS Deposits", "MVT Deposits", "Orogenic Gold", "EPMA Analysis", "Fire Assay", "Paragenetic Analysis", "Economic Geology", "Metallurgy", "Environmental Assessment"]
    },
    {
      id: 8,
      title: "Ore Chimney Property - NI 43-101 Technical Report",
      icon: <Leaf className="w-8 h-8 text-amber-600" />,
      brief: "Comprehensive mineral exploration and resource estimation for greenstone-hosted gold deposit",
      detailed: "Co-authored a complete NI 43-101-style technical exploration report for the Ore Chimney Property, a greenstone-hosted orogenic gold deposit in Ontario's Grenville Province. Conducted comprehensive geological assessment including petrographic analysis, core logging, and mineralogical identification of polymetallic ore samples containing Au, Ag, Zn, and Pb sulfides (pyrite, sphalerite, galena, chalcopyrite). Performed detailed structural geology analysis identifying shear zone-hosted mineralization along the Tudor Formation-Flinton Group contact. Executed resource estimation using the polygon method, calculating 646.5 Troy Oz of gold at an average grade of 4.9 g/t across 0.004353 Mt of ore. Implemented rigorous QA/QC protocols using blanks, standards, and duplicates to verify analytical accuracy and precision for gold, silver, and zinc assays. Analyzed samples using fire assay, Instrumental Neutron Activation Analysis (INAA), and ICP-OES techniques. Evaluated economic feasibility considering current gold prices, drilling costs, environmental impacts, and social factors, ultimately recommending against further investment due to deposit size and risk factors. Gained hands-on experience with diamond drilling methodology, virtual core logging, and professional mineral exploration reporting standards.",
      tags: ["NI 43-101 Reporting", "Resource Estimation", "QA/QC Analysis", "Core Logging", "Economic Feasibility", "Orogenic Gold Deposits", "Structural Geology"]
    },
    {
      id: 9,
      title: "Groundwater Drought Vulnerability Assessment",
      icon: <Droplets className="w-8 h-8 text-indigo-600" />,
      brief: "Thesis proposal on long-term groundwater trends and drought vulnerability",
      detailed: "Developed a thesis proposal to assess long-term groundwater level trends and drought vulnerability using Python-based time series analysis (Pastas) and hydrogeological indicators like the Standardized Groundwater Index (SGI) and groundwater signatures across a regional aquifer system. This research aims to provide critical insights for water resource management and climate adaptation strategies.",
      tags: ["Python", "Hydrology", "Time Series Analysis", "Climate Adaptation"]
    }
  ];

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert('Message sent! (This is a demo - connect to your backend to handle real submissions)');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-700">Arman Kanorwalla</div>
          <div className="flex gap-6">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition">Home</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition">About</a>
            <a href="#projects" className="text-gray-700 hover:text-green-600 transition">Projects</a>
            <a href="#experience" className="text-gray-700 hover:text-green-600 transition">Experience</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="relative inline-block mb-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 tracking-wide" style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}>
              Arman Kanorwalla
            </h1>
            
            {/* Animated Environmental Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Water Drops - positioned around the name */}
              <Droplets className="absolute text-blue-400 w-6 h-6 opacity-60 animate-float" style={{ top: '-40px', left: '-60px', animationDelay: '0s', animationDuration: '3s' }} />
              <Droplets className="absolute text-blue-500 w-5 h-5 opacity-50 animate-float" style={{ top: '-50px', right: '-70px', animationDelay: '1s', animationDuration: '4s' }} />
              <Droplets className="absolute text-cyan-400 w-4 h-4 opacity-70 animate-float" style={{ bottom: '-50px', left: '50%', animationDelay: '2s', animationDuration: '3.5s' }} />
              <Droplets className="absolute text-blue-300 w-5 h-5 opacity-55 animate-float" style={{ top: '5px', left: '-90px', animationDelay: '0.8s', animationDuration: '3.8s' }} />
              <Droplets className="absolute text-cyan-500 w-6 h-6 opacity-65 animate-float" style={{ bottom: '0px', right: '-110px', animationDelay: '1.3s', animationDuration: '4.2s' }} />
              
              {/* Leaves - positioned around the name */}
              <Leaf className="absolute text-green-500 w-6 h-6 opacity-60 animate-drift" style={{ top: '-30px', right: '-100px', animationDelay: '0.5s', animationDuration: '5s' }} />
              <Leaf className="absolute text-emerald-400 w-5 h-5 opacity-50 animate-drift" style={{ bottom: '-40px', left: '-80px', animationDelay: '1.5s', animationDuration: '4.5s' }} />
              <Leaf className="absolute text-green-600 w-4 h-4 opacity-70 animate-drift" style={{ top: '10px', right: '-120px', animationDelay: '2.5s', animationDuration: '6s' }} />
              <Leaf className="absolute text-emerald-500 w-5 h-5 opacity-55 animate-drift" style={{ bottom: '10px', right: '-85px', animationDelay: '0.3s', animationDuration: '5.5s' }} />
              <Leaf className="absolute text-green-400 w-6 h-6 opacity-60 animate-drift" style={{ top: '-45px', left: '-50px', animationDelay: '1.8s', animationDuration: '5.2s' }} />
              
              {/* Globe/Earth elements - positioned around the name */}
              <Globe className="absolute text-blue-600 w-6 h-6 opacity-40 animate-pulse-slow" style={{ bottom: '-45px', right: '-90px', animationDelay: '0s' }} />
              <Globe className="absolute text-green-700 w-5 h-5 opacity-30 animate-pulse-slow" style={{ top: '5px', left: '-100px', animationDelay: '1s' }} />
              <Globe className="absolute text-teal-600 w-5 h-5 opacity-35 animate-pulse-slow" style={{ top: '-35px', left: '45%', animationDelay: '1.6s' }} />
              
              {/* Additional Building2/Structure icons for environmental infrastructure */}
              <Building2 className="absolute text-gray-500 w-5 h-5 opacity-40 animate-pulse-slow" style={{ bottom: '-55px', left: '-70px', animationDelay: '0.4s' }} />
              <Building2 className="absolute text-gray-600 w-4 h-4 opacity-35 animate-pulse-slow" style={{ top: '-20px', right: '-95px', animationDelay: '1.2s' }} />
            </div>
          </div>
          
          <p className="text-2xl text-green-700 mb-6 font-semibold">Environmental Scientist | Geoscience Specialist</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bridging environmental compliance, geospatial analysis, and sustainable solutions to protect our planet's resources
          </p>
          <div className="mt-8">
            <a href="#projects" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl">
              View My Work <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Background animated elements */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <Droplets className="absolute text-blue-300 w-8 h-8 animate-float" style={{ top: '20%', left: '15%', animationDelay: '0s', animationDuration: '4s' }} />
          <Leaf className="absolute text-green-300 w-8 h-8 animate-drift" style={{ top: '60%', right: '10%', animationDelay: '1s', animationDuration: '5s' }} />
          <Droplets className="absolute text-cyan-300 w-6 h-6 animate-float" style={{ bottom: '30%', left: '80%', animationDelay: '2s', animationDuration: '3.5s' }} />
          <Leaf className="absolute text-emerald-300 w-7 h-7 animate-drift" style={{ top: '40%', left: '5%', animationDelay: '1.5s', animationDuration: '6s' }} />
          <Globe className="absolute text-blue-200 w-9 h-9 animate-pulse-slow" style={{ top: '70%', right: '20%', animationDelay: '0.5s' }} />
          <Droplets className="absolute text-cyan-200 w-7 h-7 animate-float" style={{ top: '15%', right: '25%', animationDelay: '2.5s', animationDuration: '4.5s' }} />
          <Leaf className="absolute text-green-200 w-6 h-6 animate-drift" style={{ bottom: '20%', left: '12%', animationDelay: '1.8s', animationDuration: '5.3s' }} />
          <Building2 className="absolute text-gray-300 w-8 h-8 animate-pulse-slow" style={{ top: '50%', right: '8%', animationDelay: '2.2s' }} />
        </div>
        
        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) translateX(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) translateX(10px) rotate(5deg);
            }
            50% {
              transform: translateY(-40px) translateX(-5px) rotate(-5deg);
            }
            75% {
              transform: translateY(-20px) translateX(-10px) rotate(3deg);
            }
          }
          
          @keyframes drift {
            0%, 100% {
              transform: translateX(0px) translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateX(15px) translateY(10px) rotate(10deg);
            }
            50% {
              transform: translateX(-10px) translateY(-15px) rotate(-10deg);
            }
            75% {
              transform: translateX(-20px) translateY(5px) rotate(5deg);
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          .animate-drift {
            animation: drift 5s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Your Photo Here</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 mb-4">
                I recently graduated from the University of Waterloo with a Bachelor of Science in Environmental Science, specializing in Geoscience. My academic journey has equipped me with expertise in hydrology, geochemistry, geomorphology, and Quaternary geology.
              </p>
              <p className="text-gray-700 mb-4">
                Through my professional experiences at the City of Kitchener and City of Toronto, I've developed strong technical skills in environmental compliance, geospatial analysis, and groundwater monitoring. I'm passionate about leveraging technology and data-driven approaches to address environmental challenges and inform sustainable decision-making.
              </p>
              <p className="text-gray-700 mb-4">
                My technical toolkit includes ArcGIS Pro, QGIS, Python, R-Studio, MODFLOW, and AutoCAD, which I use to analyze environmental data, create spatial models, and develop innovative solutions for water resource management.
              </p>
              <p className="text-gray-700">
                I'm currently seeking opportunities where I can apply my environmental science expertise and geospatial analysis skills to make a meaningful impact. Beyond work, I'm actively involved in animal welfare initiatives and served as Secretary of the Earth & Environmental Science Club at the University of Waterloo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {project.icon}
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{project.brief}</p>
                  
                  {expandedProject === project.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700 mb-4">{project.detailed}</p>
                      
                      {project.images && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Project Images</h4>
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
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    className="mt-4 text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                  >
                    {expandedProject === project.id ? 'Show Less' : 'Read More'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedProject === project.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Work Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
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
                      
                      <p className="text-gray-600 mb-4 ml-15">{exp.brief}</p>
                      
                      {expandedExperience === exp.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 ml-15">
                          <p className="text-gray-700 mb-4">{exp.detailed}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={() => setExpandedExperience(expandedExperience === exp.id ? null : exp.id)}
                        className="mt-4 ml-15 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                      >
                        {expandedExperience === exp.id ? 'Show Less' : 'Read More'}
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedExperience === exp.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Let's Connect</h3>
              <p className="text-gray-600 mb-6">
                I'm always interested in discussing environmental science projects, collaborations, or opportunities. Feel free to reach out!
              </p>
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/armankanorwalla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="font-semibold">Connect on LinkedIn</span>
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-6 h-6" />
                  <span>azkanorw@uwaterloo.ca</span>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 Arman Kanorwalla. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}