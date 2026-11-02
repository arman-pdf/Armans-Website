// All site copy lives here. Presentation lives in components.

export const profile = {
  name: 'Arman Kanorwalla',
  title: 'Environmental Scientist & Geoscience Specialist',
  tagline:
    'Environmental scientist specialising in groundwater monitoring, GIS & geospatial analysis, environmental compliance, and ESG.',
  status: 'Actively Seeking Opportunities',
  location: 'Waterloo, Ontario',
  relocation: 'Willing to relocate',
  degreeLine: 'BSc Environmental Science, University of Waterloo (2025)',
  stats: { coopTerms: 5, yearsExperience: '2+' },
};

export const contact = {
  email: 'azkanorw@uwaterloo.ca',
  linkedin: 'https://www.linkedin.com/in/armankanorwalla',
  intro:
    "I'm always interested in discussing environmental science projects, research opportunities, and sustainable solutions.",
};

export const bio = [
  "I'm a University of Waterloo graduate with a Bachelor of Science, Honours Environmental Science, Specialising in Geoscience (degree conferred October 2025).",
  "Through my professional experiences at the City of Kitchener and City of Toronto, I've developed strong technical skills in environmental compliance, geospatial analysis, and groundwater monitoring.",
  "My technical toolkit includes ArcGIS Pro, QGIS, Python (Pandas, Pastas), R Studio, MODFLOW, ICP-MS, and AutoCAD. I hold WHIMS 2015 certification and an unrestricted driver's license.",
  "Beyond work, I'm actively involved in animal welfare volunteering (World for All) and served as Secretary of the Earth & Environmental Science Club.",
];

export const skills = [
  {
    category: 'GIS & Mapping',
    items: [
      { name: 'ArcGIS Pro', desc: 'Spatial Analysis' },
      { name: 'QGIS', desc: 'Open Source GIS' },
      { name: 'Remote Sensing', desc: 'Satellite Imagery' },
    ],
  },
  {
    category: 'Programming',
    items: [
      { name: 'Python', desc: 'Pandas, Pastas' },
      { name: 'R Studio', desc: 'Statistical Analysis' },
      { name: 'SQL', desc: 'Database Queries' },
    ],
  },
  {
    category: 'Modeling',
    items: [
      { name: 'MODFLOW', desc: 'Groundwater Flow' },
      { name: 'LeapFrog', desc: '3D Geological' },
      { name: 'AutoCAD', desc: 'Technical Drawing' },
    ],
  },
  {
    category: 'Lab & Field',
    items: [
      { name: 'ICP-MS', desc: 'Trace Elements' },
      { name: 'ICP-OES', desc: 'Elemental Analysis' },
      { name: 'ESA', desc: 'Field Assessment' },
    ],
  },
];

export const experiences = [
  {
    id: 'kitchener',
    company: 'City of Kitchener, Sanitary and Stormwater Utilities',
    role: 'Environmental Compliance & Stormwater Co-op',
    period: 'Jan 2024 - Apr 2024, Sept 2024 - Dec 2024',
    location: 'Kitchener, ON',
    brief:
      "Analysed development submissions, field inspections, and sub-watershed studies ensuring adherence to Ontario's CLIECA requirements",
    detailed:
      "Analysed and evaluated development submissions, field inspections, and sub-watershed studies, preparing technical comments that ensured adherence to Ontario's CLIECA requirements for municipal stormwater and sanitary systems. Delivered a comparative analysis of wastewater and drinking water quality standards across multiple municipalities to support the City's first water standards update in 25 years. Designed a checklist and standardised form for Part 5 construction sign-off, streamlining the approval process and improving documentation time by 30 minutes per application.",
    tags: ['Environmental Compliance', 'CLIECA', 'Stormwater Management', 'ESA'],
  },
  {
    id: 'toronto',
    company: 'City of Toronto, Transportation Services',
    role: 'Groundwater Monitoring & GIS Co-op',
    period: 'Jan 2023 – Aug 2023',
    location: 'Toronto, ON',
    brief:
      "Developed relational database of 22 groundwater wells and pioneered geospatial framework for Toronto's groundwater data",
    detailed:
      "Developed and maintained a relational database of 22 groundwater wells, integrating soil and water quality parameters to streamline analysis. Reviewed and summarised over 50 groundwater monitoring reports, reducing data inconsistencies by 15%. Pioneered a geospatial framework for Toronto's groundwater data, linking well records to GIS layers to support data-driven environmental decisions for over 150 monitoring sites citywide.",
    tags: ['GIS', 'Groundwater Monitoring', 'Database Management'],
  },
  {
    id: 'rossari',
    company: 'Rossari Biotech',
    role: 'Environment Social Governance Intern',
    period: 'Jun 2022 - Sept 2022',
    location: 'Mumbai, India',
    brief:
      'Conducted ESG policy benchmarking and designed stakeholder surveys as part of Materiality Index with 250+ participants',
    detailed:
      "Conducted ESG policy benchmarking and analysis, researching industry best practices and competitor sustainability strategies. Designed and implemented stakeholder surveys as part of a Materiality Index, collecting and analysing responses from 250+ participants to help define the company's ESG priorities. Contributed to Rossari's annual Sustainability Report aligned with GRI and SASB frameworks.",
    tags: ['ESG Policy', 'Sustainability Reporting', 'GRI', 'SASB'],
  },
  {
    id: 'vpc',
    company: 'Vijay Punjabi Consultants Pvt. Ltd',
    role: 'Summer Intern',
    period: 'Mar 2018 - May 2018',
    location: 'Mumbai, India',
    brief: 'Architecture and construction planning internship with senior project architects',
    detailed:
      'Shadowed Senior Project Architects on site and assisted with day-to-day responsibilities on various issues related to labour, government regulations, and raw materials. Learned how architects build models, prepare construction drawings on CAD, and about building code specifications for residential and commercial towers.',
    tags: ['Architecture', 'AutoCAD', 'Construction Planning'],
  },
];

export const education = {
  id: 'uwaterloo',
  company: 'University of Waterloo',
  role: 'BSc Honours Environmental Science, Geoscience Specialisation',
  period: '2020 - October 2025',
  location: 'Waterloo, ON',
  brief:
    'Honours Environmental Science with specialisation in Geoscience. Relevant coursework in hydrology, geochemistry, GIS, and environmental assessment.',
  detailed:
    'Relevant coursework: Hydrology, Geochemistry, Geomorphology, Quaternary Geology, Ecohydrology, Geomicrobiology, Environmental Assessment, GIS & Remote Sensing, Mineral Deposits. Secretary of Earth & Environmental Science Club. Active in animal welfare volunteering with World for All.',
  tags: ['Hydrology', 'Geochemistry', 'GIS', 'Environmental Assessment'],
};

export const projectsIntro =
  'A selection of academic and professional projects spanning environmental assessment, geological mapping, and data analysis.';

// Placeholder list: replaced with Arman's picks in step 8b.
export const projects = [
  {
    slug: 'skarn-grenville',
    title: 'Skarn Formation Field Study - Grenville Province',
    brief: 'Field mapping and mineralogical analysis of skarn deposits in the Grenville Province',
    detailed: `Led comprehensive field study examining skarn formation processes in the Grenville Province (44°54'57.4"N 78°04'38.4"W). Conducted detailed geological mapping identifying granite intrusions and marble units with diverse mineral compositions including tremolite, wollastonite, and phlogopite. Analyzed contact metamorphism and metasomatism processes where plutonic intrusions transformed limestone-rich environments into marble with distinct skarn minerals.`,
    tags: ['Field Mapping', 'Mineralogy', 'Petrology', 'Structural Geology'],
  },
  {
    slug: 'water-quality-uw',
    title: 'Water Quality Assessment - University of Waterloo',
    brief: 'Water quality assessment of local sources around University of Waterloo campus',
    detailed:
      'Developed a comprehensive assessment of water quality from local sources around the University of Waterloo. Drafted a detailed report comparing analytical results to Canadian drinking water standards. Proposed alternate local sources as potential sources of drinking water based on quality assessment findings.',
    tags: ['Water Quality', 'Environmental Assessment', 'Canadian Standards'],
  },
  {
    slug: 'geomorphology-labs',
    title: 'Geomorphology Laboratory Studies',
    brief: 'GIS-based geological mapping using satellite imagery and aerial photography',
    detailed:
      'Utilized satellite images, air photos, and ArcGIS to create detailed geologic maps. Completed a comprehensive assessment report for a mineral exploration company using GIS analysis and spatial data interpretation.',
    tags: ['ArcGIS', 'Remote Sensing', 'Geological Mapping'],
  },
  {
    slug: 'ontario-3d-bedrock',
    title: 'Ontario 3D Bedrock Geology Study',
    brief: "3D geological modeling and interpretation of Ontario's bedrock using LeapFrog software",
    detailed:
      'Thoroughly studied the bedrock geology of Ontario through 3D geology software (LeapFrog), creating detailed three-dimensional geological models. Made interpretations and correlations to bedrock formation processes across the province.',
    tags: ['3D Modeling', 'LeapFrog', 'Bedrock Geology'],
  },
  {
    slug: 'sustainability-framework',
    title: 'Environmental and Sustainability Assessment Framework',
    brief: 'Development of sustainability assessment framework for Canadian environmental processes',
    detailed:
      'Created a comprehensive assessment focusing on the purposes and design of environmental assessment processes, with specific reference to Canadian federal and Ontario provincial legal mandates. Developed a framework that evolved into a sustainability assessment tool.',
    tags: ['Environmental Assessment', 'Sustainability', 'Policy Analysis'],
  },
  {
    slug: 'abitau-lake',
    title: 'Quaternary Geology & Geochemical Analysis - Abitau Lake, NWT',
    brief: 'Geological assessment analysing Quaternary deposits, glacial landforms, and geochemical mapping',
    detailed:
      'Conducted a geological assessment of the Abitau Lake area, analysing Quaternary deposits, glacial landforms, and surficial geology using GIS and remote sensing to reconstruct past glacial movements. Performed geochemical analysis using ICP-MS data from lake sediment samples.',
    tags: ['GIS', 'Remote Sensing', 'Quaternary Geology', 'ICP-MS'],
  },
  {
    slug: 'mineral-deposits',
    title: 'Mineral Deposits Laboratory and Exploration Project',
    brief: 'Petrographic and geochemical analysis of polymetallic ore samples (Au, Ni-Cu-PGE)',
    detailed:
      'Performed petrographic and geochemical analysis of polymetallic ore samples using techniques such as RL microscopy, fire assay, and QA/QC to evaluate mineralogy and economic potential. Co-authored an NI 43-101 style technical exploration report for a greenstone-hosted gold deposit.',
    tags: ['Ore Mineralogy', 'RL Microscopy', 'NI 43-101'],
  },
  {
    slug: 'groundwater-trends-thesis',
    title: 'Groundwater Trends Thesis Proposal',
    brief: 'Python-based time series analysis to assess groundwater trends and drought vulnerability',
    detailed:
      'Developed a thesis proposal to assess long-term groundwater level trends and drought vulnerability using Python-based time series analysis (Pastas) and hydrogeological indicators like the Standardised Groundwater Index (SGI).',
    tags: ['Python', 'Pastas', 'Time Series Analysis', 'Hydrology'],
  },
  {
    slug: 'remediation-geochemistry',
    title: 'Applied Environmental Remediation & Geochemistry Projects',
    brief: 'Microbially mediated geochemical processes including bioremediation of Acid Mine Drainage',
    detailed:
      'Investigated microbially mediated geochemical processes through four laboratory projects, including bioremediation of Acid Mine Drainage using sulfate-reducing bacteria, bioleaching of mine tailings, and hydrocarbon degradation in contaminated soils.',
    tags: ['Bioremediation', 'Acid Mine Drainage', 'Geomicrobiology'],
  },
  {
    slug: 'glacial-field-guide',
    title: 'Quaternary Glacial Geology Field Guide',
    brief: 'Field guide documenting Catfish Creek Till, Waterloo Moraine, and regional glacial features',
    detailed:
      'Compiled a multi-part field trip guidebook investigating Quaternary glacial and post-glacial environments across the Waterloo and Cambridge region. Documented key stops including Grand River erosional banks, Conestogo Lake sections, and the Paris–Galt Moraine.',
    tags: ['Quaternary Geology', 'Glacial Geology', 'Field Mapping'],
  },
];
