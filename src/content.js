// All site copy lives here. Presentation lives in components.
import projectData from './projects.json';

export const profile = {
  name: 'Arman Kanorwalla',
  title: 'Environmental Scientist & Geoscience Specialist',
  tagline: 'Mostly water so far, and lately carbon.',
  status: 'Actively Seeking Opportunities',
  location: 'Mumbai, India and Toronto, Canada',
  relocation: 'Willing to relocate',
  degreeLine: 'BSc Environmental Science, University of Waterloo (2025)',
  stats: { coopTerms: 5, yearsExperience: '2+' },
};

export const contact = {
  email: 'armankanor3@gmail.com',
  linkedin: 'https://www.linkedin.com/in/armankanorwalla',
  intro:
    "If you're hiring, have a question about something on this site, or want to talk about water or carbon work, write to me. Email is the fastest way to reach me.",
};

// The one-page resume linked from every page. To update it, replace the file in public/resume/
// and keep the same file name, so the links keep working.
export const resume = {
  href: '/resume/Arman-Kanorwalla-Resume.pdf',
  label: 'Resume',
};

// The Easter egg: a small 3D island (public/otter.html) with an otter and my hobbies on it.
// It is linked from the hobbies paragraph on the About page and from the footer small print.
export const otter = {
  href: '/otter.html',
  lead: "If you'd like to see all of that as an otter, ",
  link: "here's the island",
};

export const bio = [
  "I'm an environmental scientist. Mostly water so far, and lately carbon.",
  "I grew up in Mumbai. In the monsoon the streets near my house flooded and school would shut for days, mostly because the drains were too small and clogged with garbage. That's why I studied environmental science at the University of Waterloo, and why most of my work since has been about water.",
  "I did two co-op terms at the City of Kitchener and eight months at the City of Toronto. In Toronto I built a database for 22 groundwater and soil monitoring locations, with Python checks that flag anything over the limit. In Kitchener I compared water quality standards across eight municipalities to support the City's first update in 25 years. I hold WHMIS 2015 certification and an unrestricted driver's license.",
  "Right now I'm back at Rossari Biotech in Mumbai, where I first interned in 2022, going through a manufacturing site's Scope 1 and 2 emissions data to find the biggest cuts and what they'd cost. Longer term I'd like to end up in environmental or ESG consulting, ideally working on water.",
  "Outside work I make time for community service. I volunteer in animal welfare with World for All, and at Waterloo I was secretary of the Earth and Environmental Science Club. Before university I tutored grade 8 and 9 students for their board exams through Angel Express Foundation. When I'm not doing any of that, I'm usually cooking, working out or gaming.",
  "The landscape on the home page is the Waterloo Moraine, drawn from real elevation data. I wrote a field-trip guidebook to the glacial geology around it while I was at Waterloo.",
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
  {
    category: 'Carbon & ESG',
    items: [
      { name: 'GHG Accounting', desc: 'Scope 2, GHG Protocol' },
      { name: 'ESG Reporting', desc: 'GRI, SASB' },
    ],
  },
];

// Each experience has its own page at /work/<slug> (src/pages/ExperienceDetail.jsx).
// Newest first: the first three show on the home page.
//   overview   paragraphs for the top of the page
//   did        what I did, one point per line
//   learned    what I took away from it
//   skills     short labels shown in the side column
//   workedWith tools, records and standards I used
//   links      related pages on this site
export const experiences = [
  {
    slug: 'rossari-ghg-decarbonization',
    company: 'Rossari Biotech',
    role: 'Sustainability Intern (GHG & Decarbonization)',
    period: 'Nov 2026 - Present',
    location: 'Mumbai, India',
    brief:
      "Working out where one manufacturing site's Scope 1 and 2 emissions come from, and which cuts are worth looking at first.",
    overview: [
      "I came back to Rossari four years after my first internship there, this time for a greenhouse gas project on one of its manufacturing sites. Rossari already has software that calculates its emissions, so I work from those numbers. My job is to explain them: where the site's emissions come from, why they move from month to month, and which reduction options make sense once you look at what they cost.",
      "The analysis is mostly done. What's left is a presentation and a short written report, which Rossari can use as the starting point for the site's decarbonization roadmap.",
    ],
    did: [
      "Went through up to three years of monthly Scope 1 and Scope 2 data for the site, alongside its fuel, energy and production records.",
      "Picked out the emissions hotspots and the trends over time, and compared emissions against production so that a quiet month doesn't get mistaken for an efficiency gain.",
      "Benchmarked seven peer specialty chemical manufacturers from their public reports to see how they are cutting emissions.",
      "Reviewed published research and used it with the benchmarking to shortlist reduction options, with the cost tradeoffs for each.",
    ],
    learned: [
      "A drop in emissions doesn't prove anything by itself. It can just mean the plant made less that month, which is why I compare against production.",
      "A peer company's totals can't be lined up against a single site, so I compare what they did and why, and leave the rankings out.",
      "Cost has to be part of the recommendation. I raised it on the first call, because a cleaner option that pushes up operating costs is hard for a plant to say yes to.",
    ],
    skills: ['GHG accounting (Scope 1 & 2)', 'Emissions hotspot analysis', 'Peer benchmarking', 'Literature review', 'Cost tradeoffs'],
    workedWith: "Outputs from Rossari's emissions software, fuel, energy and production records, public sustainability reports, published research",
    links: [
      { to: '/work/rossari-esg', label: 'My first Rossari internship, in 2022' },
      { to: '/projects/ghg-inventory-kitchener-hamilton', label: 'My independent Scope 1 and 2 inventory project' },
    ],
  },
  {
    slug: 'city-of-kitchener',
    company: 'City of Kitchener, Sanitary and Stormwater Utilities',
    role: 'Environmental Compliance & Stormwater Co-op',
    period: 'Jan 2024 - Apr 2024, Sept 2024 - Dec 2024',
    location: 'Kitchener, ON',
    brief:
      'Two co-op terms reviewing development submissions, comparing water quality standards across eight municipalities, and supporting site assessments on six redevelopment sites.',
    overview: [
      "I did two co-op terms with the City's Sanitary and Stormwater Utilities group. A lot of it was desk work: reading what developers and their consultants submitted, checking it against what Ontario and the City require, and writing up what I found.",
      "The biggest single piece was a comparison of water quality standards across eight municipalities, which supported the City's first standards update in 25 years.",
    ],
    did: [
      "Reviewed development submissions, field inspection records and sub-watershed studies, and wrote technical comments against Ontario's CLIECA requirements for municipal stormwater and sanitary systems.",
      "Compared wastewater and drinking water quality standards across eight municipalities and wrote the executive summary, which senior management adopted for the City's first standards update in 25 years.",
      "Supported Phase I and II Environmental Site Assessments for six redevelopment sites by reviewing site histories and environmental records. On site I shadowed senior staff during walkovers and sampling. I didn't lead that work.",
      "Designed a checklist and a standard form for Part 5 construction sign-off, which made approvals more consistent and saved about 30 minutes per application.",
    ],
    learned: [
      "How a city applies stormwater and sanitary rules in practice: one development submission at a time, through written comments.",
      "How Phase I and II site assessments are put together, from the site history and records review through to sampling.",
      "How to write a summary that senior management can use without reading the full comparison behind it.",
    ],
    skills: ['Environmental compliance', 'Stormwater management', 'Water quality standards', 'Phase I/II ESA support', 'Technical writing'],
    workedWith: "Ontario's CLIECA requirements, development submissions, sub-watershed studies, site histories and environmental records",
    links: [],
  },
  {
    slug: 'city-of-toronto',
    company: 'City of Toronto, Transportation Services',
    role: 'Groundwater Monitoring & GIS Co-op',
    period: 'Jan 2023 - Aug 2023',
    location: 'Toronto, ON',
    brief:
      "Built a database for 22 groundwater and soil monitoring locations, with Python checks that flag exceedances, and linked the City's well records to GIS.",
    overview: [
      "At Transportation Services, the asset management team keeps track of monitoring wells on roads next to properties with a high risk of groundwater contamination. The property owners send in lab reports on groundwater and soil, and each report gets checked against the provincial limits.",
      "When I started, each report was summarised separately, so it was hard to see the trend at a well or how one location related to the next. Most of my eight months went into fixing that, and I think it's one of my stronger pieces of work.",
    ],
    did: [
      "Built a relational database for 22 groundwater and soil monitoring locations, with a unique ID for each location and the sampling results in one place.",
      "Wrote Python checks that flag water quality exceedances automatically, so the contaminated sites that need attention come up first and reporting takes less time.",
      "Reviewed and summarised more than 50 groundwater monitoring and soil sampling reports against City and provincial standards, and found gaps that cut data inconsistencies by 15%.",
      "Set up the GIS side: spatial layers for the monitoring wells, the source properties and the affected right-of-way, linked to the database. It was the start of a framework covering more than 150 monitoring wells across the city.",
      "Standardised the folder structure and file naming for the monitoring well records, and made three-year trend charts for the wells showing exceedances.",
      "Visited two of the 22 locations to see the contamination and the remediation work in person.",
    ],
    learned: [
      "One exceedance at one well doesn't tell you much. You need the trend over time and the wells around it to know if contamination is moving.",
      "Before any analysis, the records have to be findable. A good part of the job was folder structure and file naming.",
      "A three-year chart for one well is easier for non-technical staff to read than a table of lab results.",
    ],
    skills: ['Groundwater monitoring', 'GIS', 'Database design', 'Python', 'Data QA/QC'],
    workedWith: 'Python, Excel, ArcGIS, Ontario soil and groundwater standards, lab reports from monitoring wells',
    links: [
      { to: '/projects/toronto-gis-groundwater-report', label: 'The technical report I wrote during this co-op' },
    ],
  },
  {
    slug: 'rossari-esg',
    company: 'Rossari Biotech',
    role: 'ESG Intern',
    period: 'Jun 2022 - Sept 2022',
    location: 'Mumbai, India',
    brief:
      "Benchmarked ESG policies against competitors and ran a stakeholder survey with more than 250 responses for Rossari's sustainability report.",
    overview: [
      "This was my first job in the field, and I got it by writing to one of Rossari's directors. At the time Rossari was just starting on formal sustainability reporting, so the internship was a first look at what its ESG work could become.",
    ],
    did: [
      "Benchmarked Rossari's ESG policies against 12 competitors and industry practice.",
      "Designed and ran the stakeholder survey for the materiality assessment, and analysed more than 250 responses to help set the company's ESG priorities.",
      "Contributed to three sections of the 45-page annual Sustainability Report, which follows the GRI and SASB frameworks.",
    ],
    learned: [
      "What a materiality assessment is for: deciding which issues a company should report on and work on first.",
      "How the GRI and SASB frameworks shape what goes into a sustainability report.",
    ],
    skills: ['ESG benchmarking', 'Materiality assessment', 'Survey design', 'Sustainability reporting', 'GRI', 'SASB'],
    workedWith: 'Competitor sustainability reports, stakeholder survey responses, GRI and SASB frameworks',
    links: [
      { to: '/work/rossari-ghg-decarbonization', label: 'What I am doing at Rossari now' },
    ],
  },
  {
    slug: 'vijay-punjabi-consultants',
    company: 'Vijay Punjabi Consultants Pvt. Ltd',
    role: 'Summer Intern',
    period: 'Mar 2018 - May 2018',
    location: 'Mumbai, India',
    brief: 'Three months shadowing project architects on construction sites in Mumbai, before university.',
    overview: [
      "This was before university, at an architecture and construction planning firm in Mumbai. It isn't environmental work, but it is part of what I've done, so it's here.",
    ],
    did: [
      "Shadowed senior project architects on site.",
      "Helped with day-to-day issues around labour, government regulations and raw materials.",
    ],
    learned: [
      "How architects build models and prepare construction drawings in CAD.",
      "What the building code asks of residential and commercial towers.",
    ],
    skills: ['AutoCAD', 'Construction planning', 'Building codes'],
    workedWith: 'CAD construction drawings, building code specifications',
    links: [],
  },
];

export const education = {
  id: 'uwaterloo',
  company: 'University of Waterloo',
  role: 'BSc Honours Environmental Science, Geoscience Specialisation',
  period: '2020 - Aug 2025',
  location: 'Waterloo, ON',
  brief:
    'Honours Environmental Science with specialisation in Geoscience. Relevant coursework in hydrology, geochemistry, GIS, and environmental assessment.',
  detailed:
    'Relevant coursework: Hydrology, Geochemistry, Geomorphology, Quaternary Geology, Ecohydrology, Geomicrobiology, Environmental Assessment, GIS & Remote Sensing, Mineral Deposits. Secretary of Earth & Environmental Science Club. Active in animal welfare volunteering with World for All.',
  tags: ['Hydrology', 'Geochemistry', 'GIS', 'Environmental Assessment'],
};

export const projectsIntro =
  "Everything from my degree and co-op terms that I think is worth showing, newest first. If you're short on time, start with the flagged ones.";

// Imported from PORTFOLIO_PROJECTS.md by scripts/import-projects.mjs. Edit the markdown, then re-run the script.
export const projects = projectData;

// Where each project's files live. Any of these work for `report` and `github`:
//   - a file hosted on this site:  '/projects/ore-chimney-ni-43-101/report.pdf'  (put it in public/projects/<slug>/)
//   - an outside link (Drive, GitHub, ...)
//   'ore-chimney-ni-43-101': { report: '/projects/ore-chimney-ni-43-101/report.pdf', github: 'https://github.com/...' }
// ONLY use cleaned files: raw course PDFs/DOCX contain student ID numbers.
// Keys are project slugs. Nothing renders for projects without an entry.
export const projectLinks = {};
