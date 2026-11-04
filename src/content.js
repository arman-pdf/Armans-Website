// All site copy lives here. Presentation lives in components.
import projectData from './projects.json';

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

// Imported from PORTFOLIO_PROJECTS.md by scripts/import-projects.mjs. Edit the markdown, then re-run the script.
export const projects = projectData;

// Where each project's files live. Any of these work for `report` and `github`:
//   - a file hosted on this site:  '/projects/ore-chimney-ni-43-101/report.pdf'  (put it in public/projects/<slug>/)
//   - an outside link (Drive, GitHub, ...)
//   'ore-chimney-ni-43-101': { report: '/projects/ore-chimney-ni-43-101/report.pdf', github: 'https://github.com/...' }
// ONLY use cleaned files: raw course PDFs/DOCX contain student ID numbers.
// Keys are project slugs. Nothing renders for projects without an entry.
export const projectLinks = {};
