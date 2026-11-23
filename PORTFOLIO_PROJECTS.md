# Portfolio: Projects Section Content

**Owner:** Arman Zoeb Kanorwalla, BSc Honours Environmental Science (Geoscience), University of Waterloo, 2025
**Purpose:** final copy for the **Projects** section of the portfolio website: 15 selected projects.

## Notes for the coding assistant

- **Order:** projects are listed newest first, grouped by academic year. Projects marked ⭐ should be featured, either in a top row or carousel, or on the home page.
- **Fields:** each project uses the same fields, so you can map it straight to a card plus a detail page.
  - `slug`: the URL segment.
  - `title` and `tagline`: the tagline is a one-liner for cards.
  - `card_summary`: about 35 words, for grid cards.
  - `overview`: the detail-page intro.
  - `what_i_did` and `outcomes`: bullet lists for the detail page.
  - `tags`: for filter chips.
  - `assets`: candidate images and downloads. Paths are relative to the `projects/` folder.
- **Suggested filter tags:** `Groundwater & Hydrology`, `GIS & Remote Sensing`, `Geochemistry`, `Mineral Exploration`, `Field Geology`, `Data Science (Python/R)`, `Environmental Policy`, `Remediation`.
- **Privacy:** the original PDFs and DOCX files show student ID numbers (mine and my teammates'). **Do not link the raw files as downloads.** Either export cleaned PDFs with the IDs removed, or use images and screenshots only.
- **Images:** `.heic` photos need converting to `.jpg` or `.webp`. The `.mp4` presentation video is about 146 MB, so compress it or host it externally (YouTube or Vimeo) rather than serving it from the site.
- **Credit:** on group projects, always list the teammates as shown.

---

## After graduation · 2025–26

### 16. ⭐ Scope 1 & 2 GHG Inventory: Kitchener and Hamilton Municipal Buildings
- **slug:** `ghg-inventory-kitchener-hamilton`
- **tagline:** I recalculated three years of building emissions for two Ontario cities from their own published energy data. Electricity use barely moved, but Scope 2 roughly doubled.
- **when / context:** Fall 2026 · independent project
- **role:** Sole author
- **tags:** GHG Accounting
- **tools & methods:** Excel, GHG Protocol Corporate Standard (operational control), GHG Protocol Scope 2 Guidance (location-based and market-based), ECCC Emission Factors and Reference Values, IPCC AR5 GWPs, City of Kitchener O. Reg. 25/23 facility tables, City of Hamilton Annual Energy Reports
- **card_summary:** An Excel Scope 1 and 2 inventory of Kitchener's and Hamilton's municipal buildings for 2022 to 2024, checked against what each city reported.
- **overview:** I've lived in Kitchener and I plan to work in Ontario, so I picked two Ontario cities whose numbers I could actually check: Kitchener and Hamilton. Both publish how much electricity and natural gas their buildings use each year. I took those figures for 2022, 2023 and 2024, recalculated Scope 1 (natural gas burned in buildings) and Scope 2 (grid electricity) with Environment and Climate Change Canada emission factors, and compared my totals with what each city reported. The main focus is Scope 2. This is my own recalculation from public data, so it isn't an official inventory and neither city asked for it.
- **what_i_did:**
  - Set the boundary using operational control: 84 to 86 Kitchener buildings and pumping stations each year, and Hamilton's 16 to 20 portfolio categories, since Hamilton only publishes category totals.
  - Typed every input in from the reports with page references, and kept every emission factor on one sheet so changing a value updates the whole workbook.
  - Converted Kitchener's natural gas from therms back to cubic metres. My 2023 total came within 0.001% of the 2,722,681 m³ the City states in its energy plan.
  - Calculated Scope 2 both location-based and market-based. I went through both cities' reports for clean energy credits, green power contracts, on-site solar and biogas, and found nothing either city could claim, so the market-based result equals the location-based one.
  - Split the change in Scope 2 into how much came from the buildings using more electricity and how much came from the grid itself.
  - Logged 15 data problems and how I handled each, including a gap of about 400 t inside one of Hamilton's 2024 tables.
- **outcomes:**
  - From 2022 to 2024, electricity use rose only about 3% in both cities, but location-based Scope 2 roughly doubled: from 1,091 to 2,168 tCO2e in Kitchener and from 7,649 to 15,103 tCO2e in Hamilton.
  - About 97% of that increase came from Ontario's grid getting more carbon-intensive (38 to 73 g CO2e/kWh), not from the buildings.
  - Kitchener's own reports show its building emissions falling 9% over those years, while my recalculation shows them rising 3%. The difference comes from the electricity factor: Kitchener's figures imply about 28 g/kWh for 2022 and 2023, and Hamilton's factors lag by about two years.
  - Scope 2 went from about 16% to 30% of Kitchener's building emissions, and from 20% to 34% of Hamilton's.
  - A lagged factor isn't wrong, but while Ontario's grid keeps getting dirtier it understates current Scope 2, so the factor year should be disclosed.

## Year 5 · 2024–25

### 1. ⭐ Mapping Groundwater Vulnerability Across Alberta
- **slug:** `alberta-groundwater-vulnerability`
- **tagline:** Honours thesis proposal on finding a practical, decision-ready way to map groundwater risk across a province.
- **when / context:** Summer 2025 · EARTH 436A/491 Honours Thesis · supervised by Dr. Andrea Brookfield
- **role:** Sole author
- **tags:** Groundwater & Hydrology, GIS & Remote Sensing, Data Science (Python/R)
- **tools & methods:** DRASTIC and other overlay/index methods, statistical and machine-learning approaches, MODFLOW/MT3D process models (reviewed as an option), Pastas time-series analysis, Alberta GOWN observation-well data, Alberta Geological Survey GIS layers
- **card_summary:** A thesis proposal that reviews five families of groundwater-vulnerability methods against Alberta's real data. It recommends a hybrid approach that combines contamination-risk mapping with drought sensitivity from multi-decade well records.
- **overview:** More than 90% of rural Albertans rely on groundwater, and that groundwater is under pressure from pumping, agriculture and climate change. The literature offers many ways to assess vulnerability, but few are realistic to apply across a whole province. My proposal sorts the options into five families: overlay/index, statistical/ML, process-based models, time-series analysis, and hybrids. I then tested each against what Alberta's monitoring and GIS data can actually support. The aim was a method that decision-makers could use now, not one that is only possible in theory.
- **what_i_did:**
  - Wrote a structured literature review of groundwater-vulnerability assessment methods, covering their strengths, assumptions and data needs.
  - Audited Alberta's data landscape: the 10 hydrogeological regions, GOWN well records, water-chemistry coverage, and GIS layers for geology, soils and depth to water.
  - Compared every method on interpretability, province-wide coverage and how much data it needs.
  - Critically reviewed a related honours thesis that applied Pastas and the Standardised Groundwater Index (SGI) to drought in the South Saskatchewan River Basin.
- **outcomes:**
  - Recommended a **hybrid framework**: a province-wide intrinsic overlay map for contamination susceptibility, plus a drought-sensitivity layer built from GOWN time series, with statistical validation wherever water-chemistry data is dense.
  - Identified where detailed process models (for example in the Paskapoo and Milk River aquifers) add the most value for local decisions.
- **assets:** `Year 5 (2024-25)/01 Honours Thesis Proposal - Alberta Groundwater Vulnerability/Final_Thesis_Proposal_AK.pdf` (figures: Alberta hydrogeological regions map, DRASTIC map)

### 2. ⭐ Ore Chimney Gold Property: NI 43-101 Technical Report
- **slug:** `ore-chimney-ni-43-101`
- **tagline:** Took a gold prospect from drill-core assays to an investment recommendation, in industry-standard report format.
- **when / context:** Winter 2025 · EARTH 471 (Mineral Deposits)
- **team:** Celina Cayabyab, Michael Forte, Kiara Harmon, Arman Kanorwalla
- **tags:** Mineral Exploration, Geochemistry
- **tools & methods:** NI 43-101 reporting, QA/QC with CH-4 certified reference material, blanks and duplicates, polygon resource estimation, economic analysis
- **card_summary:** A 26-page NI 43-101-style report on a greenstone-hosted gold prospect in eastern Ontario. We validated 164 core assays, estimated an indicated gold resource, and recommended against further investment for now.
- **overview:** Acting as exploration geologists, my team evaluated a virtual drilling program on the Ore Chimney Property in Barrie Township, Ontario. The property sits in the Grenville Province on a sheared contact between Hermon Group metavolcanics and Flinton Group metasediments. We followed the structure of a real NI 43-101 technical report, from regional geology and deposit model through to resource estimate, economics and recommendations.
- **what_i_did:**
  - Interpreted the regional and property geology. Gold sits in quartz-carbonate veins that follow foliation, concentrated at an S-fold hinge in a shear zone.
  - Ran QA/QC on 164 core samples plus reference materials, blanks and duplicates. Gold data passed; silver and zinc did not.
  - Built a polygon-method resource estimate with a 0.84 g/t gold cut-off and an assumed density of 3 g/cm³.
  - Wrote up the economic, social and environmental risks, including nearby communities, lakes, acid mine drainage and drilling costs.
- **outcomes:**
  - Indicated resource of **~4,350 t at 4.9 g/t Au ≈ 646 oz**, worth about **US$2.1M** at the April 2025 gold price.
  - Concluded the deposit is too small and too risky to develop: about 1,000 times smaller than typical producing Ontario gold mines.
  - Recommended geophysical surveying to firm up the low-confidence polymetallic potential before any more drilling.
- **assets:** `Year 5 (2024-25)/02 Ore Chimney NI 43-101 Exploration Report (EARTH 471)/Ore_Chimney_Property_Map.pdf`, `EARTH471_ExplorationProject_CC_MF_KH_AK.pdf` (polygon map, assay plots)

### 3. ⭐ Does Rain Raise Groundwater? A Statistical Test Across Three Regions
- **slug:** `groundwater-precipitation-statistics`
- **tagline:** Python analysis of well and rainfall records from Southern Ontario, Northern Ontario and British Columbia.
- **when / context:** Winter 2025 · EARTH 355 (Water: Data to Decisions) · research poster
- **team:** Arman Kanorwalla & Rishaan Ghai
- **tags:** Data Science (Python/R), Groundwater & Hydrology
- **tools & methods:** Python (pandas, SciPy, statsmodels, matplotlib), Pearson correlation, Mann-Kendall trend test, Theil-Sen slope, time-series and distribution plots, Ontario Provincial Groundwater Monitoring Network and BC observation-well data
- **card_summary:** We tested the common assumption that more rain means higher groundwater using 2011 well and precipitation data from three regions. The answer: not at hourly or daily scales, and the poster explains why.
- **overview:** Most people assume groundwater rises when it rains. In Southern Ontario's glacial terrain, though, much of the rain runs off or evaporates, and recharge can lag by weeks. We pulled public groundwater-level and precipitation records for a Southern Ontario well and compared them with sites in Northern Ontario and British Columbia. We then ran correlation and trend tests to see whether rainfall events show up in water levels.
- **what_i_did:**
  - Sourced, cleaned and aligned the groundwater and precipitation time series from government databases.
  - Ran Pearson correlation, significance tests, Mann-Kendall and Theil-Sen trend analysis in Python.
  - Built time-series, histogram and scatter visualisations and designed the research poster.
- **outcomes:**
  - Found no significant short-term correlation between rainfall and groundwater level. Southern Ontario groundwater showed only a slight upward trend over the year.
  - Showed that hourly and daily data hide delayed recharge.
  - Recommended monthly aggregation, lag analysis, multi-year records, and covariates such as soil type, land use and evapotranspiration.
- **assets:** `Year 5 (2024-25)/03 Groundwater vs Precipitation Statistical Poster (EARTH 355)/Final Project poster.pdf` (render as the hero image)

### 4. Field Geological Mapping: Bass Lake Syncline, La Cloche
- **slug:** `la-cloche-field-mapping`
- **tagline:** Mapped a folded Precambrian sedimentary sequence and its intrusive dykes from outcrop to finished map.
- **when / context:** Winter–Spring 2025 · EARTH 390 field school
- **team:** Quinn Coughlin, Arman Kanorwalla, Jhoppes Wang
- **tags:** Field Geology
- **tools & methods:** Field mapping, strike and dip measurement, stereonets, cross-sections, stratigraphic and structural interpretation
- **card_summary:** A field-mapping project producing a geological map, three domain stereonets, cross-sections and a written local geology report for a folded quartzite, argillite and diamictite sequence cut by Sudbury and Nipissing dykes.
- **overview:** In the field, our team mapped part of the southern limb of a syncline in the La Cloche area. The succession runs from oldest to youngest: sub-arkosic arenite (quartzite), argillite, diamictite and arkosic siltstone. All units dip north and are cut by two generations of mafic dykes. We turned our outcrop observations into a map, structural data and a geologic history.
- **what_i_did:**
  - Logged lithologies and measured bedding and foliation at outcrops.
  - Built stereonets for three structural domains and interpreted the fold geometry: an open fold with hinge 261°/20° and axial plane 261°/86°.
  - Worked out younging directions, unconformities and cross-cutting relationships. The older Nipissing diabase is more deformed; the Sudbury dyke is thicker and younger.
  - Co-wrote the local geology report, cross-sections and geologic history.
- **outcomes:** A finished geological map with legend, stereonets and a written synthesis of stratigraphy, structure and intrusive history.
- **assets:** `Year 5 (2024-25)/04 Field Geological Mapping - La Cloche (EARTH 390)/Geological Map And 3 Steronets.pdf`, `Legend.pdf`, field photos `IMG_6420.jpeg`, `IMG_7783.heic`, `IMG_7784.heic` (convert the HEIC files)

### 5. Python for Environmental Data: Statistics Lab Portfolio
- **slug:** `python-environmental-data-labs`
- **tagline:** 11 Jupyter notebooks taking real environmental datasets from raw data to statistical decisions.
- **when / context:** Winter 2025 · EARTH 355
- **role:** Individual
- **tags:** Data Science (Python/R)
- **tools & methods:** Python, Jupyter, pandas, NumPy, SciPy, statsmodels, scikit-learn, matplotlib
- **card_summary:** A series of Python notebooks covering descriptive statistics, hypothesis tests, regression, trend detection and spatial point-pattern analysis on environmental data such as tree rings, water quality and playa features.
- **overview:** This lab series was my core training in using code to analyse environmental data. Each notebook works through one statistical technique on a real dataset, from reading and cleaning data to visualising results and drawing a decision from a test.
- **what_i_did:**
  - Data handling and descriptive statistics, histograms, kernel density and LOWESS smoothing.
  - Confidence intervals, one-sample t-tests, chi-square and runs tests.
  - Correlation and linear regression in statsmodels and scikit-learn.
  - Mann-Kendall trend tests for time series.
  - Spatial mapping, quadrat analysis, nearest-neighbour analysis and convex hulls.
- **outcomes:** A reusable toolkit that I then applied directly in my groundwater-precipitation research poster and thesis work.
- **assets:** `Year 5 (2024-25)/05 Python Environmental Data Analysis Labs (EARTH 355)/Coding labs/` (notebook PDFs; consider showing two or three plot screenshots)

---

## Year 4 · 2023–24

### 6. ⭐ Reconstructing Glacial History at Abitau Lake, NWT
- **slug:** `abitau-lake-quaternary-geochemistry`
- **tagline:** Combined GIS landform mapping with lake-sediment ICP-MS geochemistry to rebuild how ice moved across the Canadian Shield.
- **when / context:** Fall 2023 · EARTH 440 (Quaternary Geology) · two-part term project
- **role:** Sole author
- **tags:** GIS & Remote Sensing, Geochemistry, Field Geology
- **tools & methods:** QGIS, ArcGIS Pro, remote sensing, Geological Survey of Canada (GSC) surficial geology maps (CGM 350, NTS 75-B), ICP-MS data from GSC Open File 8082, element-distribution mapping
- **card_summary:** A regional study of the Abitau Lake map sheet (NTS 75-B). I mapped drumlins, eskers and crag-and-tails to set an ice-flow chronology, then tested it with ICP-MS chemistry from more than 30 lake-sediment samples.
- **overview:** The Abitau Lake area sits just north of the Saskatchewan border on the Rae Province of the Canadian Shield, and is covered by deposits from the last glaciation. In **Part 1** I mapped landforms and surficial units in GIS: drumlins, eskers, roches moutonnées, kames, crag-and-tails, and glaciofluvial, glaciolacustrine and organic deposits. From these I inferred a dominantly **southwest ice-flow direction**. In **Part 2** I brought in the GSC's 2015 lake-sediment geochemistry survey and mapped element distributions to test that chronology.
- **what_i_did:**
  - Built GIS projects in QGIS and ArcGIS Pro with surficial geology layers, streamlined landforms and sample locations.
  - Interpreted glacial landforms to reconstruct ice-flow direction and deglaciation.
  - Processed ICP-MS results and mapped element concentrations to trace glacial transport and sediment provenance.
  - Presented both parts with slides and a recorded video presentation.
- **outcomes:**
  - The geochemical patterns **supported the proposed ice-flow chronology**: element distributions matched glacial transport paths.
  - Flagged an anomaly: sulfur is concentrated at only four sites. Also identified gaps in sampling coverage as the main limitation.
- **assets:** `Year 4 (2023-24)/01 Abitau Lake NWT Quaternary Geology & Geochemistry (EARTH 440)/` (map screenshots `Screenshot 2023-12-08 *.png`, `Term Project Part I slides.pdf`, `440project2.mp4`)

### 7. Field-Trip Guidebook: Glacial Geology of the Waterloo Region
- **slug:** `waterloo-quaternary-guidebook`
- **tagline:** An illustrated guide to how the Laurentide Ice Sheet shaped the landscape I studied on.
- **when / context:** Fall 2023 · EARTH 440
- **role:** Sole author
- **tags:** Field Geology, GIS & Remote Sensing
- **tools & methods:** Quaternary stratigraphy, landform interpretation, scientific writing, figure design
- **card_summary:** A multi-stop guidebook covering the last glaciation in the Waterloo Region: ice-sheet dynamics, diamicton and till, the Waterloo Moraine, deglaciation around Conestogo Lake, and the Paris-Galt Moraine east of Cambridge.
- **overview:** Waterloo Region was once under roughly 1.5 km of ice. This guidebook takes readers through a series of field trips. Each one explains the sediments and landforms at a stop and links them to glacial erosion, transport and deposition during and after the Last Glacial Maximum.
- **what_i_did:**
  - Wrote the guidebook sections for each trip:
    - Trip 1: introduction to the last glaciation.
    - Trips 2B and 2C: deglaciation and the Waterloo Moraine, and the Conestogo Lake area.
    - Trip 3: the Paris-Galt Moraine area east of Cambridge.
  - Built annotated figures and maps from field-trip material and published research.
- **outcomes:** A complete, referenced guidebook that a reader can follow on site.
- **assets:** `Year 4 (2023-24)/04 Waterloo Region Quaternary Field Trip Guidebook (EARTH 440)/EARTH 440 Guidebook.pdf` and annotated screenshots

### 8. Till Fabric Analysis: Reading Ice Direction From Pebbles
- **slug:** `till-fabric-analysis`
- **tagline:** Used eigenvalue statistics and stereonets to reveal how two glacial tills were deposited.
- **when / context:** Fall 2023 · EARTH 440
- **team:** Arman Kanorwalla & Luka Ninkovic
- **tags:** Field Geology, Data Science (Python/R)
- **tools & methods:** Stereonet, EigenCalc, orientation tensors, Kamb contouring, ternary and modality-isotropy diagrams, S1/S3 biplots
- **card_summary:** We computed eigenvalues for clast orientations in two till units, classified them as a strong and a moderate bimodal fabric, and interpreted what each says about ice movement and later deformation.
- **overview:** The way pebbles line up in glacial till records how the ice moved. We took orientation data from two till fabrics and analysed them statistically and on stereonets to compare fabric strength and depositional process.
- **what_i_did:**
  - Calculated orientation tensors and eigenvalues, plus isotropy and elongation indices: 0.021 and 0.935 for Fabric 1, 0.147 and 0.757 for Fabric 5.
  - Plotted stereonets with V1 axes and Kamb contours, ternary diagrams and S1/S3 biplots.
  - Classified both fabrics and interpreted how they formed.
- **outcomes:**
  - The lower **Fabric 1 is strong** but has likely been deformed.
  - The younger **Fabric 5 is moderate** and most likely formed by clast ploughing beneath the most recent ice sheet.
- **assets:** `Year 4 (2023-24)/06 Till Fabric Analysis (EARTH 440)/` (stereonet screenshots)

---

## Year 3 · 2022–23

### 9. ⭐ Using GIS to Monitor Groundwater Contamination in Toronto
- **slug:** `toronto-gis-groundwater-report`
- **tagline:** A technical report from my City of Toronto co-op on managing contaminated-site and monitoring-well data with GIS.
- **when / context:** March 2023 · written during my co-op with City of Toronto Transportation Services (Asset Management)
- **role:** Sole author
- **tags:** GIS & Remote Sensing, Groundwater & Hydrology, Environmental Policy
- **tools & methods:** ArcGIS, monitoring-well networks, Ontario soil and groundwater standards, technical writing
- **card_summary:** A formal technical report on how Toronto's asset-management team monitors groundwater contamination along city rights-of-way, and why a GIS-based system is the right tool to manage it.
- **overview:** In my co-op I built a relational database of groundwater and soil monitoring locations and linked well records to GIS layers. This report documents how the City monitors contamination through monitoring wells and makes the case for GIS as the central tool for integrating, analysing, visualising and modelling contaminant data.
- **what_i_did:**
  - Documented the monitoring-well workflow and how it fits with provincial soil and groundwater standards.
  - Researched GIS methods for contaminant tracking and plume modelling.
  - Wrote recommendations for City staff.
- **outcomes:** Recommendations covered:
  - Protecting the public and staff.
  - Ensuring regulatory compliance and limiting liability.
  - Monitoring how contaminants of concern migrate into the right-of-way.
  - Centralising well and contamination data for future decisions.
- **related co-op work to mention:** a database of 22 monitoring locations with automated exceedance flags, review of more than 50 monitoring reports, and a GIS framework for more than 150 wells across the city.
- **assets:** `Year 3 (2022-23)/02 Technical Report - GIS Groundwater Contamination Monitoring Toronto/Arman Kanorwalla Final draft.docx` (hero and thumb are Figure 3, the sample three-year contaminant chart, with the well number cropped off the title)

### 10. ⭐ Microbes vs Pollution: Four Geomicrobiology Experiments
- **slug:** `geomicrobiology-remediation`
- **tagline:** Lab experiments using bacteria to form minerals, break down oil, leach metals and neutralise acid mine drainage.
- **when / context:** Fall 2022 · EARTH 321 (Geomicrobiology)
- **team:** Arman Kanorwalla with lab partner Cameron Sills
- **tags:** Remediation, Geochemistry
- **tools & methods:** Bioreactor and leaching-column design, light microscopy, ICP-OES, pH monitoring, most-probable-number (MPN) counts
- **card_summary:** Four experiments, each written up as a full paper, testing microbes as environmental tools. They cover banded-iron-formation minerals, oil-spill bioremediation, bioleaching of mine tailings, and sulfate-reducing bacteria treating acid mine drainage.
- **overview:** These experiments explored how microbes drive geochemical change. Two looked at Earth's history and resource recovery; the other two looked at cleaning up contamination.
- **what_i_did:**
  - **Banded iron formations:** added ferrous iron to cyanobacteria cultures to mimic hydrothermal vents, and saw iron-oxyhydroxide minerals form at the cell walls.
  - **Oil-spill beach:** built a simulated contaminated beach and confirmed hydrocarbon-degrading bacteria under the microscope.
  - **Bioleaching:** ran a syringe column of mine tailings with iron- and sulfur-oxidising bacteria and analysed the leachate for metals by ICP-OES.
  - **Acid mine drainage:** ran a 4-week leaching column with sulfate-reducing bacteria, tracking effluent pH and sulfur.
- **outcomes:**
  - Sulfate-reducing bacteria significantly lowered sulfur concentrations in the acid-mine-drainage effluent.
  - The bioleaching leachate confirmed that metals were being extracted, and also showed the risk of creating acid mine drainage.
  - Each report also discusses honestly what went wrong. For example, the sample in the oil-spill test was too weak to fully clean up the spill.
- **assets:** `Year 3 (2022-23)/03 Geomicrobiology Remediation Project Series (EARTH 321)/Lab */IMG-*.jpg` and the lab-report PDFs

### 11. ArcGIS Mapping Series
- **slug:** `arcgis-mapping-series`
- **tagline:** Six applied GIS projects, from precipitation mapping to pollution-source tracing and landslide risk.
- **when / context:** Fall 2022 · EARTH 342 (GIS for Earth Sciences)
- **team:** Arman Kanorwalla & Aryan Makar
- **tags:** GIS & Remote Sensing
- **tools & methods:** ArcGIS Pro, geodatabases, symbology and cartography, spatial joins, structural data plotting, Landsat basemaps
- **card_summary:** Applied ArcGIS projects covering Ontario precipitation versus latitude, mining claims near Lake Temagami, a geological map from structural data, groundwater pollution-source tracing, and landslide susceptibility.
- **overview:** A hands-on series in which each lab solved an earth-science problem with GIS and produced a finished map layout.
- **what_i_did:**
  - **Ontario precipitation (2005):** a classified precipitation map plus a precipitation-versus-latitude chart.
  - **Mining claims:** mapped existing and new claims, township and property boundaries for a gold company.
  - **Geologic mapping:** built a geologic map from a scanned GSC sheet and a structural-data CSV.
  - **Groundwater pollution:** traced a contamination source over a Landsat basemap.
  - **Landslide susceptibility:** analysis and map.
- **outcomes:** A set of publication-style maps showing cartography, data integration and spatial analysis.
- **assets:** `Year 3 (2022-23)/04 ArcGIS Lab Series (EARTH 342)/Lab2/EARTH342LAB2Task1.pdf`, `Lab3/Task1.pdf`, `Lab5/Remote Print Job.pdf`, `Lab6/Earth 342 lab 6 task 3.pdf` (export map PNGs for a gallery)

### 12. Environmental Assessment Policy: IAA Briefing Note and Highway 413 Review
- **slug:** `impact-assessment-policy`
- **tagline:** Policy writing that holds Canada's Impact Assessment Act and a major Ontario highway project to account.
- **when / context:** Fall 2022 · ERS 215
- **role:** Sole author
- **tags:** Environmental Policy
- **tools & methods:** Policy analysis, briefing-note format, the UN Sustainable Development Goals, Impact Assessment Agency of Canada documents
- **card_summary:** A ministerial briefing note on aligning Canada's Impact Assessment Act with the UN SDGs, and a formal public comment raising groundwater, species-at-risk and climate concerns about Ontario's Highway 413.
- **overview:** Two pieces of applied environmental-policy writing. The **briefing note** compares the Impact Assessment Act (2019) with the UN Sustainable Development Goals and gives the federal Environment Minister options with their trade-offs. The **public comment** argues that the federal analysis of Highway 413 (the GTA West project) underweighted several impacts.
- **what_i_did:**
  - Evaluated two reform options: an elected Indigenous advisory body, or replacing single-minister decisions with a multi-stakeholder review panel.
  - Recommended the **review panel** as the faster, lower-cost route to SDG alignment and better Indigenous representation.
  - In the Highway 413 comment, flagged 95 watercourse crossings, groundwater contamination risk, 8 federally listed migratory bird species at risk, at-risk fish, and climate impacts.
- **outcomes:** Two clear, referenced policy documents written for decision-makers.
- **assets:** text-based; use a map or highway graphic for the card

---

## Year 2 · 2021–22

### 13. Skarns of the Grenville Province: Bancroft Outcrop Study
- **slug:** `bancroft-skarn-grenville`
- **tagline:** Pieced together a billion-year tectonic story behind a skarn outcrop near Bancroft, Ontario.
- **when / context:** Fall 2021 · EARTH 231 (Mineralogy) · group paper and presentation
- **team:** Group 9: Harry Barnes, Noel Campfens, Blue Ketchum, Arman Kanorwalla
- **tags:** Field Geology, Mineral Exploration
- **tools & methods:** Outcrop description, geologic map interpretation, literature synthesis
- **card_summary:** A group paper and presentation on skarn formation at Bancroft-area outcrops. I wrote the Grenville Province's tectonic history and placed our outcrop in the Elsonian–Elzevirian metasedimentary belt.
- **overview:** Skarns form where magma alters carbonate rocks through contact metamorphism and metasomatism. Our group described a skarn outcrop near Bancroft, built a local geologic map, and explained its origin within the Grenville Province, the last major tectonic event to shape the Canadian Shield.
- **what_i_did:**
  - Wrote the geologic history of the Grenville Province, from the Makkovikian and Labradorian events through to the Grenvillian orogeny (about 1.9 to 1.0 billion years ago).
  - Wrote the history of our outcrop, linking it to rift-basin sedimentation and later thrusting during the collision with Amazonia.
  - Built the history section of the presentation.
- **outcomes:** A complete paper and slide deck tying mineral observations to regional tectonics.
- **assets:** `Year 2 (2021-22)/02 Skarn & Grenville Province Group Project (EARTH 231)/EARTH 231 group project presentation.pptx`, `EARTH 231 Project map.docx`

### 14. Field Hydrology: Measuring Water in the Field
- **slug:** `field-hydrology-labs`
- **tagline:** Hands-on hydrology at Columbia Lake and around Waterloo, covering seepage, rainfall, streamflow and water quality.
- **when / context:** Fall 2021 · EARTH 223
- **team:** Lab group 1 (section 004)
- **tags:** Groundwater & Hydrology
- **tools & methods:** Seepage meters, tipping-bucket rain gauges, piezometers, stream gauging, water-balance calculations, Excel
- **card_summary:** Five field labs that measured groundwater–surface water exchange, rainfall events, streamflow and water quality, then turned the raw field data into fluxes, water balances and interpretations.
- **overview:** My first real field hydrology. Each lab began with field measurements and ended with calculations and interpretation in Excel.
- **what_i_did:**
  - Calculated seepage-meter fluxes along a stream and showed it was a **gaining stream**.
  - Analysed weather-station rainfall records, including the limits of tipping-bucket resolution.
  - Interpreted piezometer and well data for groundwater–surface water interaction.
  - Built a stream-gauge water balance.
  - Ran a water-quality assessment at Mannheim.
- **outcomes:** Five completed datasets and reports. This was the foundation for my later groundwater work.
- **assets:** `Year 2 (2021-22)/03 Field Hydrology Lab Series (EARTH 223)/` (charts from the lab PDFs; `Columbia Lake 2021.xlsx`)

### 15. Ontario's Bedrock in 3D: Stratigraphy Lab Series
- **slug:** `ontario-3d-geology-stratigraphy`
- **tagline:** Explored Ontario's Paleozoic bedrock with a 3D digital geological model.
- **when / context:** Fall 2021 · EARTH 235 (Stratigraphy & Earth History)
- **role:** Individual
- **tags:** Field Geology, GIS & Remote Sensing
- **tools & methods:** 3D geological model of Ontario's Paleozoic bedrock, geologic maps, litho-, bio- and chronostratigraphy
- **card_summary:** A lab series ending in a 3D tour of Ontario's Paleozoic bedrock. I used a digital geological model to test how unconformities and rock units really vary below ground compared with standard charts.
- **overview:** These labs built from reading geologic maps of Canada, through stratigraphic principles, to a 3D digital model of Ontario's Paleozoic bedrock. The model was developed by University of Waterloo Earth Science students.
- **what_i_did:**
  - Interpreted geologic maps and the geologic map of Canada.
  - Built litho-, bio- and chronostratigraphic correlations.
  - Used the 3D model to examine the late Ordovician to early Silurian disconformity (around the Queenston Formation) and showed it is less uniform than the lithostratigraphic chart suggests.
- **outcomes:** A grounding in stratigraphy and 3D subsurface visualisation that carried into my later mapping work.
- **assets:** `Year 2 (2021-22)/04 Ontario 3D Geological Model & Stratigraphy Labs (EARTH 235)/` (screenshots of the 3D model from the Lab 7 and 8 documents)

---

## Quick reference: suggested featured order
1. Mapping Groundwater Vulnerability Across Alberta
2. Ore Chimney Gold Property: NI 43-101 Technical Report
3. Reconstructing Glacial History at Abitau Lake, NWT
4. Does Rain Raise Groundwater?
5. Using GIS to Monitor Groundwater Contamination in Toronto
6. Microbes vs Pollution: Four Geomicrobiology Experiments
