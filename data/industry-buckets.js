// Industry buckets for the Veteran Business tool.
//
// `examples` are hand-written from real FY2025 awards to SDVOSB-flagged firms
// pulled from USASpending.gov (see spend-fy2025.json: every example's amount
// matches a record in that bucket's `topAwards` or `sampleAwards`). Company
// names are left out on purpose. Sizes: small is under $250,000, medium is
// $250,000 to $5 million, large is above that, except where a `note` says the
// bucket is thin and sizes are relative.

export const INDUSTRY_BUCKETS = [
  {
    id: 'it-software',
    label: 'IT & software',
    naics: [541511, 541512, 541519],
    plain: 'Writing software, running help desks, managing networks and cloud accounts, and selling software licenses to government offices.',
    examples: [
      { who: 'VA', what: 'VA paid $249,681 for an infusion-pump management software license at a California medical center.', amount: 249681, size: 'small' },
      { who: 'VA', what: 'VA paid $5 million to build and maintain the facility pages on VA.gov.', amount: 4970719, size: 'medium' },
      { who: 'VA', what: 'VA paid $409 million for help-desk and monitoring support that keeps VA staff laptops and workstations running.', amount: 408590308, size: 'large' },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    naics: [541512, 541519],
    plain: 'Protecting government computers and networks: locking down systems, monitoring for break-ins, and building software that handles sensitive data safely.',
    examples: [
      { who: 'the State Department', what: 'The State Department paid $250,000 for cloud hosting for its consular computer systems.', amount: 250000, size: 'small' },
      { who: 'the Defense Information Systems Agency', what: 'DISA paid $5 million for phase three of a program that protects military communications from interception.', amount: 4969365, size: 'medium' },
      { who: 'VA', what: 'VA paid $363 million for teams that build, secure and run the software that moves health data between VA systems.', amount: 362634553, size: 'large' },
    ],
  },
  {
    id: 'consulting',
    label: 'Management consulting',
    naics: [541611, 541618],
    plain: 'Advising government offices on how to run programs: writing plans and handbooks, managing projects, analyzing data, and supplying program staff.',
    examples: [
      { who: 'VA', what: 'VA paid $248,943 to write the handbook its facilities use to run their energy and water management program.', amount: 248943, size: 'small' },
      { who: 'VA', what: 'VA paid $5 million for staff who run its Pathfinder program and coordinate with veteran service organizations.', amount: 4986419, size: 'medium' },
      { who: 'VA', what: 'VA paid $155 million for program support behind the White House priority goal of preventing veteran suicide.', amount: 154948480, size: 'large' },
    ],
  },
  {
    id: 'training',
    label: 'Training & education services',
    naics: [611430, 611699],
    plain: 'Teaching classes and running courses for government employees and troops, from safety briefings to full-time instructors at military schools.',
    examples: [
      { who: 'VA', what: 'VA paid $250,000 to teach Stop the Bleed emergency bleeding-control classes to staff in California.', amount: 250000, size: 'small' },
      { who: 'VA', what: 'VA paid $5 million for instructors at the program management school of its Acquisition Academy in Maryland.', amount: 4982623, size: 'medium' },
      { who: 'the Army', what: 'The Army paid $36 million for contract instructors at its Cyber Center of Excellence in Georgia.', amount: 36012032, size: 'large' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & creative',
    naics: [541613, 541810, 541430],
    plain: 'Advertising campaigns, recruiting ads, graphic design, social media, and communications work for government agencies.',
    examples: [
      { who: 'the EPA', what: 'The EPA paid $107,460 for bus and billboard ads warning the public about lead-based paint.', amount: 107460, size: 'small' },
      { who: 'VA', what: 'VA paid $4 million for advertising under its ChooseVA campaign to recruit healthcare workers.', amount: 4000000, size: 'medium' },
      { who: 'VA', what: 'VA paid $34 million for a nationwide marketing and advertising campaign to recruit hospital staff.', amount: 34307425, size: 'large' },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    naics: [541330],
    plain: 'Designing buildings, bridges, utilities and equipment, inspecting construction, and supplying engineers to military program offices.',
    examples: [
      { who: 'the Forest Service', what: 'The Forest Service paid $249,880 to design a replacement bridge on a forest road in North Carolina.', amount: 249880, size: 'small' },
      { who: 'VA', what: 'VA paid $4.9 million for engineers to design earthquake-safety upgrades at a New Mexico medical center.', amount: 4887814, size: 'medium' },
      { who: 'the Coast Guard', what: 'The Coast Guard paid $75 million for a two-year technical engineering support contract at its headquarters.', amount: 74794159, size: 'large' },
    ],
  },
  {
    id: 'staffing',
    label: 'Staffing',
    naics: [561320],
    plain: 'Supplying temporary workers the government needs but does not hire directly: nurses, clerks, technicians, role players for training.',
    examples: [
      { who: 'VA', what: 'VA paid $248,523 for temporary dental assistants at a California medical center.', amount: 248523, size: 'small' },
      { who: 'VA', what: 'VA paid $4 million for agency nurses to fill shifts at a Louisiana medical center.', amount: 4025023, size: 'medium' },
      { who: 'DHS', what: 'DHS paid $53 million for role players who act out scenarios for trainees at the federal law enforcement academy in Glynco, Georgia.', amount: 52671377, size: 'large' },
    ],
  },
  {
    id: 'facilities',
    label: 'Facilities support',
    naics: [561210],
    plain: 'Running the day-to-day operations of a base or building: maintenance crews, boiler operators, supply and transportation, base support services.',
    examples: [
      { who: 'VA', what: 'VA paid $248,462 for six months of boiler and chiller operators at a Georgia medical center.', amount: 248462, size: 'small' },
      { who: 'the Air Force', what: 'The Air Force paid $4.8 million for day-to-day preventive maintenance at Dobbins Air Reserve Base in Georgia.', amount: 4806780, size: 'medium' },
      { who: 'the Army', what: 'The Army paid $43 million to run base operations and maintenance at Fort Huachuca, Arizona.', amount: 42554699, size: 'large' },
    ],
  },
  {
    id: 'janitorial',
    label: 'Janitorial',
    naics: [561720],
    plain: 'Cleaning government buildings, clinics and hospitals, including hospital-grade disinfection work.',
    examples: [
      { who: 'VA', what: 'VA paid $236,064 to clean its outpatient clinic in Eureka, California.', amount: 236064, size: 'small' },
      { who: 'VA', what: 'VA paid $4.2 million for janitorial services at a North Carolina medical center.', amount: 4232292, size: 'medium' },
      { who: 'the Defense Health Agency', what: 'The Defense Health Agency paid $24 million for hospital-grade cleaning at Tripler Army Medical Center in Hawaii.', amount: 23586656, size: 'large' },
    ],
  },
  {
    id: 'landscaping',
    label: 'Landscaping & grounds',
    naics: [561730],
    plain: 'Mowing, tree trimming, snow removal and grounds care at bases, medical centers and national cemeteries.',
    examples: [
      { who: 'VA', what: 'VA paid $244,575 for a year of grounds maintenance at Danville National Cemetery in Illinois.', amount: 244575, size: 'small' },
      { who: 'VA', what: 'VA paid $2.5 million for tree trimming across the Greater Los Angeles healthcare system.', amount: 2489306, size: 'medium' },
      { who: 'the Army', what: 'The Army paid $37 million for turf and grounds care at Arlington National Cemetery over a base year plus four option years.', amount: 37269024, size: 'large' },
    ],
  },
  {
    id: 'pest-control',
    label: 'Pest control',
    naics: [561710],
    plain: 'Keeping bugs and rodents out of government buildings, mostly VA hospitals and clinics, on recurring service contracts.',
    examples: [
      { who: 'VA', what: 'VA paid $231,444 for pest control at its facilities in Maine.', amount: 231444, size: 'small' },
      { who: 'VA', what: 'VA paid $1 million for bed bug treatment and canine inspections at its Indiana hospitals.', amount: 1038000, size: 'medium' },
      { who: 'VA', what: 'VA paid $3.4 million for a multi-year pest control contract in California, the largest award in this bucket.', amount: 3426964, size: 'large' },
    ],
  },
  {
    id: 'security',
    label: 'Security guard services',
    naics: [561612],
    plain: 'Armed and unarmed guards at government buildings, hospitals, courthouses and airports.',
    examples: [
      { who: 'VA', what: 'VA paid $240,588 for security guards at its clinic in Guam.', amount: 240588, size: 'small' },
      { who: 'VA', what: 'VA paid $4.6 million for unarmed security guards at a Texas medical center.', amount: 4619714, size: 'medium' },
      { who: 'USDA', what: 'USDA paid $32 million for armed guards at its Washington headquarters and its Beltsville, Maryland campus.', amount: 31691743, size: 'large' },
    ],
  },
  {
    id: 'construction',
    label: 'General construction',
    naics: [236220, 236118],
    plain: 'Building and renovating government facilities: hospital wings, boiler plants, roads, and small repair jobs on existing buildings.',
    examples: [
      { who: 'VA', what: 'VA paid $248,905 to renovate a hospital room in Florida for telemetry monitoring.', amount: 248905, size: 'small' },
      { who: 'VA', what: 'VA paid $4.9 million to fully renovate about 8,500 square feet of first-floor space at a California facility.', amount: 4913000, size: 'medium' },
      { who: 'VA', what: 'VA paid $78 million to design and build a replacement boiler plant at the Reno, Nevada medical center.', amount: 77604919, size: 'large' },
    ],
  },
  {
    id: 'electrical',
    label: 'Electrical',
    naics: [238210],
    plain: 'Electrical work in government buildings: outlets and wiring, generators, fire alarms, nurse-call systems, and replacing substations and switchgear.',
    examples: [
      { who: 'VA', what: 'VA paid $243,977 to install electrical outlets for wayfinding signs at the Dayton, Ohio medical center.', amount: 243977, size: 'small' },
      { who: 'VA', what: 'VA paid $4 million to install backup generators for two buildings at a New York medical center.', amount: 4016339, size: 'medium' },
      { who: 'VA', what: 'VA paid $22 million to replace the main electrical substations and transformers at the San Diego medical center.', amount: 21638532, size: 'large' },
    ],
  },
  {
    id: 'hvac-plumbing',
    label: 'HVAC & plumbing',
    naics: [238220],
    plain: 'Heating, cooling and plumbing work: repairing air handlers, replacing chillers and boilers, and fixing steam and water lines.',
    examples: [
      { who: 'VA', what: 'VA paid $240,210 to repair an exhaust fan assembly at the Atlanta medical center.', amount: 240210, size: 'small' },
      { who: 'VA', what: 'VA paid $4.9 million to replace the central chillers at a New Jersey medical center.', amount: 4925960, size: 'medium' },
      { who: 'VA', what: 'VA paid $49 million to replace the boilers at the Albany, New York medical center.', amount: 48924251, size: 'large' },
    ],
  },
  {
    id: 'roofing',
    label: 'Roofing',
    naics: [238160],
    plain: 'Repairing and replacing roofs on government buildings, plus emergency tarping after storms.',
    examples: [
      { who: 'the Navy', what: 'The Navy paid $213,097 to replace the roof and gutters on a building at Naval Air Station Oceana in Virginia.', amount: 213097, size: 'small' },
      { who: 'VA', what: 'VA paid $5 million to replace the roofs on eight buildings at the Tuscaloosa, Alabama medical center.', amount: 4988786, size: 'medium' },
      { who: 'the Army', what: 'The Army paid $21 million to tarp damaged roofs and make small repairs along Florida\'s Atlantic coast after Hurricane Milton.', amount: 20808012, size: 'large' },
    ],
  },
  {
    id: 'trucking',
    label: 'Trucking & freight',
    naics: [484110, 484121],
    plain: 'Hauling things by truck for the government: linens between hospitals, supplies to fire camps, topsoil to cemeteries.',
    examples: [
      { who: 'VA', what: 'VA paid $32,550 to haul topsoil to Calverton National Cemetery in New York.', amount: 32550, size: 'small' },
      { who: 'VA', what: 'VA paid $596,640 to truck linens between medical centers on a Kansas delivery route.', amount: 596640, size: 'medium' },
      { who: 'VA', what: 'VA paid $1.9 million to transport laundry for its Mississippi medical facilities.', amount: 1935124, size: 'large' },
    ],
    note: 'Thin bucket: only 10 SDVOSB awards in FY2025, the largest under $2 million. Sizes are relative to this bucket.',
  },
  {
    id: 'logistics',
    label: 'Logistics & freight brokerage',
    naics: [488510],
    plain: 'Arranging shipments rather than driving them: booking carriers, coordinating customs, and managing deliveries.',
    examples: [
      { who: 'the Forest Service', what: 'The Forest Service paid $19,834 to pick up tree seedlings at a Michigan nursery and deliver them to planting sites.', amount: 19834, size: 'small' },
      { who: 'the Navy', what: 'The Navy paid $24,535 to arrange transport of a CH-46E helicopter.', amount: 24535, size: 'medium' },
      { who: 'the Army', what: 'The Army paid $64,105 for a customs coordinator to clear gear for two joint exercises in Thailand.', amount: 64105, size: 'large' },
    ],
    note: 'Very thin bucket: 5 SDVOSB awards in FY2025 totaling about $140,000. Sizes are relative to this bucket; all are small by federal standards.',
  },
  {
    id: 'medical-supply',
    label: 'Medical supplies wholesale',
    naics: [423450],
    plain: 'Selling medical equipment and supplies to military hospitals and VA: surgical tools, tourniquets, patient lifts, imaging gear.',
    examples: [
      { who: 'the Defense Logistics Agency', what: 'DLA paid $246,635 for a mobile surgical fluid-waste collection unit.', amount: 246635, size: 'small' },
      { who: 'the Defense Logistics Agency', what: 'DLA paid $2.6 million for a bulk order of non-pneumatic tourniquets.', amount: 2640388, size: 'medium' },
      { who: 'the Defense Logistics Agency', what: 'DLA paid $3.4 million for a surgical robot system delivered in North Carolina.', amount: 3446844, size: 'large' },
    ],
  },
  {
    id: 'medical-staffing',
    label: 'Medical staffing',
    naics: [561320, 621999],
    plain: 'Supplying doctors, nurses, technologists and other clinical staff to VA and military hospitals on contract.',
    examples: [
      { who: 'the Indian Health Service', what: 'The Indian Health Service paid $245,572 for a fill-in dentist at a Montana service unit.', amount: 245572, size: 'small' },
      { who: 'VA', what: 'VA paid $4 million for two contract anesthesiologists at a New Mexico medical center.', amount: 4045586, size: 'medium' },
      { who: 'VA', what: 'VA paid $24 million for contract radiology technologists at the Washington, D.C. medical center.', amount: 23642647, size: 'large' },
    ],
  },
  {
    id: 'machine-shop',
    label: 'Machine shop & metal fab',
    naics: [332710, 332999],
    plain: 'Cutting, welding and machining metal parts and structures to order: brackets, housings, hose assemblies, work stands.',
    examples: [
      { who: 'the Navy', what: 'The Navy paid $249,997 to machine housings for underwater hydrophones for a facility in Indiana.', amount: 249997, size: 'small' },
      { who: 'the Air Force', what: 'The Air Force paid $908,325 for fall-protection work stands used by aircraft maintenance crews in Utah.', amount: 908325, size: 'medium' },
      { who: 'the Air Force', what: 'The Air Force paid $3.7 million to build hardened power units for overseas sites.', amount: 3697402, size: 'large' },
    ],
  },
  {
    id: 'aviation-parts',
    label: 'Aviation parts',
    naics: [336413],
    plain: 'Making and supplying aircraft parts and kits, and (under the same code) the training simulators and courseware that go with them.',
    examples: [
      { who: 'the Defense Logistics Agency', what: 'DLA paid $229,000 for replacement aircraft access doors.', amount: 229000, size: 'small' },
      { who: 'the Air Force', what: 'The Air Force paid $2.7 million for F-16 pylon kits that mount a sensor pod.', amount: 2710758, size: 'medium' },
      { who: 'the Air Force', what: 'The Air Force paid $95 million for aircrew training courseware and instructors at four bases including Kirtland and Davis-Monthan.', amount: 94900677, size: 'large' },
    ],
    note: 'The largest awards under this code are aircrew training systems, not parts. Parts orders from DLA mostly run $200,000 to $1.3 million.',
  },
  {
    id: 'auto-repair',
    label: 'Auto repair',
    naics: [811111],
    plain: 'Fixing and maintaining government vehicles: fleet cars and trucks, fire trucks, utility vehicles, and military ground vehicles.',
    examples: [
      { who: 'the Air Force', what: 'The Air Force paid $67,000 to repair the power divider on a P-19 airfield fire truck in Mississippi.', amount: 67000, size: 'small' },
      { who: 'the Air Force', what: 'The Air Force paid $2.5 million for fleet vehicle maintenance at a Florida base.', amount: 2520551, size: 'medium' },
      { who: 'the Air Force', what: 'The Air Force paid $11 million to maintain and manage the vehicle fleet at a Georgia base.', amount: 11228946, size: 'large' },
    ],
  },
  {
    id: 'real-estate',
    label: 'Real estate',
    naics: [531210, 531311],
    plain: 'Leasing and managing property for the government, including rental housing FEMA leases for disaster survivors.',
    examples: [
      { who: 'FEMA', what: 'FEMA paid $248,648 to manage four rental units it leased for disaster survivors in Florida.', amount: 248648, size: 'small' },
      { who: 'FEMA', what: 'FEMA paid $1.6 million on a direct housing lease for survivors of the 2023 Hawaii wildfires.', amount: 1594928, size: 'medium' },
      { who: 'FEMA', what: 'FEMA paid $2.6 million on its largest single direct housing lease for Hawaii wildfire survivors.', amount: 2611180, size: 'large' },
    ],
    note: 'FY2025 top awards in this bucket are almost entirely FEMA disaster housing leases in Hawaii.',
  },
  {
    id: 'food-service',
    label: 'Food service',
    naics: [722511, 722320],
    plain: 'Catering meals, mostly for National Guard and Reserve units during drill weekends and annual training.',
    examples: [
      { who: 'the Army', what: 'The Army paid $29,482 to cater meals for a National Guard drill weekend in North Carolina.', amount: 29482, size: 'small' },
      { who: 'the Army', what: 'The Army paid $84,632 to cater meals for a Louisiana Guard battalion\'s pre-mobilization training in California.', amount: 84632, size: 'medium' },
      { who: 'the Army', what: 'The Army paid $119,256 to feed several Guard units during two weeks of annual training in Tennessee.', amount: 119256, size: 'large' },
    ],
    note: 'Every FY2025 SDVOSB award in this bucket was under $160,000. Sizes are relative to this bucket.',
  },
  {
    id: 'fitness',
    label: 'Fitness',
    naics: [713940],
    plain: 'Gym memberships, fitness classes and instructors, and pool services for troops, federal employees and veterans.',
    examples: [
      { who: 'VA', what: 'VA paid $55,404 for gym access for veterans in its Gerofit exercise program in Texas.', amount: 55404, size: 'small' },
      { who: 'the Coast Guard', what: 'The Coast Guard paid $223,438 for gym memberships for its members in Maryland.', amount: 223438, size: 'medium' },
      { who: 'VA', what: 'VA paid $422,281 for pool maintenance and lifeguards at a New York medical center.', amount: 422281, size: 'large' },
    ],
    note: 'Thin bucket: 11 SDVOSB awards in FY2025, the largest $422,281. Sizes are relative to this bucket.',
  },
  {
    id: 'photo-video',
    label: 'Photo, video & drone',
    naics: [541921, 512110, 541370],
    plain: 'Producing videos, live-streaming events, photography, and (under the same codes) aerial mapping and land surveying.',
    examples: [
      { who: 'the Army', what: 'The Army Research Laboratory paid $128,606 for video production and live-streaming services in Maryland.', amount: 128606, size: 'small' },
      { who: 'the Air Force', what: 'The Air Force paid $771,202 to produce its "What Now, Airman?" video series.', amount: 771202, size: 'medium' },
      { who: 'the Defense Contract Management Agency', what: 'The Defense Contract Management Agency paid $1.7 million for media production services in Georgia.', amount: 1737859, size: 'large' },
    ],
    note: 'Code 541370 pulls in land and boundary surveying, which makes up several of the larger awards here.',
  },
  {
    id: 'environmental',
    label: 'Environmental services',
    naics: [562910, 541620],
    plain: 'Cleaning up contamination, hauling hazardous waste, testing water and air, and advising on environmental compliance.',
    examples: [
      { who: 'VA', what: 'VA paid $237,601 for hazardous waste pickup at a Georgia medical center.', amount: 237601, size: 'small' },
      { who: 'the Air Force', what: 'The Air Force paid $4.8 million for industrial hygiene services (workplace air, noise and chemical testing) at a Georgia base.', amount: 4842019, size: 'medium' },
      { who: 'the EPA', what: 'The EPA paid $13 million to clean up part of the Cherokee County Superfund site in Kansas.', amount: 12956387, size: 'large' },
    ],
  },
  {
    id: 'firearms-training',
    label: 'Firearms & tactical training',
    naics: [611699],
    plain: 'Teaching tactical, survival and threat-response skills: active-threat drills for hospital staff, boarding tactics, SERE instruction.',
    examples: [
      { who: 'VA', what: 'VA paid $250,000 to train hospital staff in California how to respond to an active threat.', amount: 250000, size: 'small' },
      { who: 'the Coast Guard', what: 'The Coast Guard paid $3.4 million for instructors who teach advanced boarding and counter-terrorism tactics.', amount: 3428651, size: 'medium' },
      { who: 'the Army', what: 'The Army paid $9 million for survival, evasion, resistance and escape (SERE) training instructors in Alabama.', amount: 9036212, size: 'large' },
    ],
  },
];

export const SPEND_SNAPSHOT_FY = 2025;

export const NOT_SURE = { id: 'not-sure', label: 'Not sure yet' };
