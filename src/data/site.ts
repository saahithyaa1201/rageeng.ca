export type Service = {
  id: string;
  name: string;
  title: string;
  description: string;
  points: string[];
  icon: string;
};

export const services: Service[] = [
  {
    id: "mechanical",
    name: "Mechanical",
    title: "Comfort systems engineered to perform",
    description:
      "HVAC, ventilation and load calculations sized for the way the space is actually used.",
    points: [
      "Heating & cooling load analysis",
      "HVAC layout and duct design",
      "Kitchen and make-up air systems",
      "Energy compliance documentation",
    ],
    icon: "⚙️",
  },
  {
    id: "electrical",
    name: "Electrical",
    title: "Powering innovation and reliability",
    description:
      "Life-safety, lighting and power distribution designed for safe, smooth operation.",
    points: [
      "Service sizing and panel schedules",
      "Lighting and photometric layouts",
      "Fire alarm and emergency systems",
      "Low-voltage and data rough-in",
    ],
    icon: "⚡",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    title: "Clean, code-ready water and drainage",
    description:
      "Supply, drainage and venting laid out to keep buildings efficient and inspection-ready.",
    points: [
      "Domestic water and drainage design",
      "Grease interceptor sizing",
      "Backflow prevention",
      "Fixture and riser schedules",
    ],
    icon: "🔧",
  },
];

export type ServiceSector = {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  icon: string;
  color: string;
};

export const sectors: ServiceSector[] = [
  {
    id: "industrial",
    name: "Industrial (3 projects)",
    shortDesc: "91 Sluse Road – Technical Concrete Solutions (TCS)",
    fullDesc:
      "Industrial portfolio focused on production, utility, and facility performance.",
    highlights: [
      "91 Sluse Road",
      "2183–2187 Fasan Drive",
      "15 Jack Chute Road",
    ],
    icon: "🏭",
    color: "#607d8b",
  },
  {
    id: "custom-homes",
    name: "Residential (4 projects)",
    shortDesc: "Residential property portfolio across southern Ontario.",
    fullDesc:
      "Residential projects spanning modern homes and larger private residences.",
    highlights: [
      "115 Zaph Avenue",
      "7558 Cronk Side Road (Ramara House)",
      "11 Gaydon Avenue",
      "499 Rebecca St.",
    ],
    icon: "🏡",
    color: "#6b8e6b",
  },
  {
    id: "modular-house",
    name: "Modular House (3 projects)",
    shortDesc: "Modular residential developments and compact living projects.",
    fullDesc:
      "Modular housing and efficient residential systems designed for repeatable performance.",
    highlights: [
      "83 Lincoln Avenue",
      "129 Kent Street",
      "1041 Willowdale Avenue",
    ],
    icon: "🧩",
    color: "#5a7fa8",
  },
  {
    id: "townhouse",
    name: "Townhouse (2 projects)",
    shortDesc: "Townhouse developments and stacked residential planning.",
    fullDesc:
      "Multi-unit townhouse projects delivered with coordinated planning and efficient service layouts.",
    highlights: [
      "2620 Brock Road, Pickering",
      "333 Ritson Road North, Oshawa",
    ],
    icon: "🏘️",
    color: "#a0522d",
  },
  {
    id: "midrise-residential",
    name: "Midrise Residential (1 project)",
    shortDesc: "Midrise residential project focused on efficient shared infrastructure.",
    fullDesc:
      "Midrise residential design with coordinated MEP systems for shared occupancy and vertical circulation.",
    highlights: [
      "40 King Street West, Oshawa",
    ],
    icon: "🏢",
    color: "#c9a84c",
  },
  {
    id: "multiplex-infill",
    name: "Multiplex Residential Infill (6 projects)",
    shortDesc: "Infill residential portfolio across Toronto neighbourhoods.",
    fullDesc:
      "Multi-unit infill housing projects designed for efficient urban redevelopment.",
    highlights: [
      "74 Amherst Road",
      "119 Belgravia Road",
      "521 Lansdowne Avenue",
      "376 Manning Avenue",
      "277 Cedarvale Road",
      "341 Morningside Avenue",
    ],
    icon: "🏙️",
    color: "#26a69a",
  },
  {
    id: "commercial-retail",
    name: "Commercial & Retail (3 projects)",
    shortDesc: "Commercial and retail portfolio with mixed-use tenant spaces.",
    fullDesc:
      "Commercial and retail environments designed for flow, flexibility, and reliable service coordination.",
    highlights: [
      "Bronte Road & Charles Cornwall Road",
      "3250 Argentia Road",
      "171 Speers Road",
    ],
    icon: "🏬",
    color: "#7e57c2",
  },
  {
    id: "daycare-recreation",
    name: "Daycare & Recreation (3 projects)",
    shortDesc: "Community-focused childcare and recreation centres.",
    fullDesc:
      "Daycare and recreation spaces designed for health, comfort, and active daily use.",
    highlights: [
      "15 St. Albans Street (Kidsville Daycare)",
      "5637 Finch Avenue East (Kidsville Daycare)",
      "1120 Birchmount Road (Aerosports Parks)",
    ],
    icon: "🎾",
    color: "#8d6748",
  },
  {
    id: "office",
    name: "Office (1 project)",
    shortDesc: "Office project focused on work-ready coordinated systems.",
    fullDesc:
      "Single office project emphasizing efficient layouts, high-performance systems, and comfort.",
    highlights: [
      "233 Armstrong Avenue, Georgetown",
    ],
    icon: "💼",
    color: "#546e7a",
  },
  {
    id: "laboratory",
    name: "Laboratory (3 projects)",
    shortDesc: "Specialized laboratory facilities and technical environments.",
    fullDesc:
      "Technical laboratory spaces requiring precise ventilation, utility coordination, and clean system planning.",
    highlights: [
      "6665 Millcreek Drive, Unit 2 (Merieux NutriSciences)",
      "6660 Campobello Road (Merieux NutriSciences)",
      "90 Gough Road, Units 3 & 4 (Merieux NutriSciences)",
    ],
    icon: "🧪",
    color: "#ef6c00",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  sectorId: string;
  location: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "lava-grille-markham",
    title: "Lava Grille",
    category: "Restaurants",
    sectorId: "restaurants",
    location: "Markham, ON",
    summary: "Full MEP set for a high-volume grill house with heavy kitchen exhaust demands.",
  },
  {
    slug: "wild-wings-ingersoll",
    title: "Wild Wings – Ingersoll",
    category: "Restaurants",
    sectorId: "restaurants",
    location: "Ingersoll, ON",
    summary: "Sports bar fit-out coordinating kitchen, AV power and dining comfort.",
  },
  {
    slug: "wild-wings-guelph",
    title: "Wild Wings – Guelph",
    category: "Restaurants",
    sectorId: "restaurants",
    location: "Guelph, ON",
    summary: "Franchise rollout with standardised MEP package adapted to local code.",
  },
  {
    slug: "wild-wings-windsor",
    title: "Wild Wings – Windsor",
    category: "Restaurants",
    sectorId: "restaurants",
    location: "Windsor, ON",
    summary: "Multi-unit restaurant MEP package tailored for a high-volume casual dining concept.",
  },
  {
    slug: "2-storey-addition",
    title: "2 STOREY ADDITION TO EXISTING SINGLE STOREY BUILDING",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Ontario",
    summary: "Complete MEP design for a two-storey residential addition.",
  },
  {
    slug: "ajax-resident",
    title: "AJAX RESIDENT",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Ajax, ON",
    summary: "Full mechanical, electrical, and plumbing engineering for a custom residence.",
  },
  {
    slug: "14-glenridge-road-brampton",
    title: "14 GLENRIDGE ROAD – BRAMPTON",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Brampton, ON",
    summary: "MEP services for a premium residential property.",
  },
  {
    slug: "dominica-cottage",
    title: "DOMINICA COTTAGE",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Ontario",
    summary: "Bespoke MEP engineering for a luxury cottage build.",
  },
  {
    slug: "havelock-cottage",
    title: "HAVELOCK COTTAGE",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Havelock, ON",
    summary: "Comprehensive MEP systems designed for cottage living.",
  },
  {
    slug: "44-couchching-tiny",
    title: "44 COUCHCHING – TINY",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Tiny, ON",
    summary: "Mechanical and electrical design for a contemporary home.",
  },
  {
    slug: "115-zaph-ave-toronto",
    title: "115 ZAPH AVE – TORONTO",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Toronto, ON",
    summary: "Custom residential MEP engineering for an urban home.",
  },
  {
    slug: "132-torran-road-vaughan",
    title: "132 TORRAN ROAD – VAUHAN",
    category: "Custom Homes & Residentials",
    sectorId: "custom-homes",
    location: "Vaughan, ON",
    summary: "Advanced mechanical and electrical planning for a large residence.",
  },
  {
    slug: "code-ninjas-brampton",
    title: "CODE NINJAS – BRAMPTON",
    category: "Institutional",
    sectorId: "modular-house",
    location: "Brampton, ON",
    summary: "MEP design for a children's coding franchise location, ensuring safety and comfort.",
  },
  {
    slug: "code-ninjas-mississauga",
    title: "CODE NINJAS – MISSISSAUGA",
    category: "Institutional",
    sectorId: "modular-house",
    location: "Mississauga, ON",
    summary: "Complete mechanical and electrical systems for an educational space.",
  },
  {
    slug: "code-ninjas-remembrance-rd-brampton",
    title: "CODE NINJAS – REMEMBRANCE RD, BRAMPTON",
    category: "Institutional",
    sectorId: "modular-house",
    location: "Brampton, ON",
    summary: "Learning studio fit-out tailored to franchise requirements.",
  },
  {
    slug: "plaza-retail-unit",
    title: "Retail Plaza Fit-Out",
    category: "Commercial & Retail Units",
    sectorId: "townhouse",
    location: "Mississauga, ON",
    summary: "Multi-tenant retail plaza MEP coordination from base building to tenant fit-out.",
  },
  {
    slug: "distribution-warehouse",
    title: "Distribution Warehouse",
    category: "Industrial Units",
    sectorId: "industrial",
    location: "Brampton, ON",
    summary: "High-bay lighting, dock leveller power and industrial HVAC for a 80,000 sq ft facility.",
  },
  {
    slug: "dental-clinic-toronto",
    title: "Dental Clinic",
    category: "Healthcare Facilities",
    sectorId: "multiplex-infill",
    location: "Toronto, ON",
    summary: "ASHRAE 170 compliant ventilation, medical gas rough-in and infection-control washrooms.",
  },
  {
    slug: "corporate-office-north-york",
    title: "Corporate Office Fit-Out",
    category: "Office Spaces",
    sectorId: "commercial-retail",
    location: "North York, ON",
    summary: "Open-plan office with VAV zoning, LED daylight harvesting and EV charging.",
  },
  {
    slug: "community-church",
    title: "Community Church",
    category: "Place of Worship",
    sectorId: "daycare-recreation",
    location: "Scarborough, ON",
    summary: "Quiet HVAC design, ceremony lighting control and accessible washroom plumbing.",
  },
  {
    slug: "backflow-highrise",
    title: "High-Rise Premise Isolation",
    category: "Premise Isolation",
    sectorId: "office",
    location: "Toronto, ON",
    summary: "Backflow prevention, sub-metering and pressure-zone design for a 24-storey mixed building.",
  },
  {
    slug: "free-bird-gym",
    title: "FREE BIRD 24/7 GYM- ONTARIO",
    category: "Sports & Gym Facilities",
    sectorId: "laboratory",
    location: "Ontario",
    summary: "Complete MEP engineering for a 24/7 fitness facility.",
  },
  {
    slug: "ford-dealership",
    title: "Ford Dealership",
    category: "Automotive & Service Centres",
    sectorId: "automotive",
    location: "Oshawa, ON",
    summary: "Full MEP for service bays, EV charger infrastructure and showroom lighting.",
  },
  {
    slug: "mixed-use-condos",
    title: "Mixed-Use Condo Tower",
    category: "Mixed-Use Developments",
    sectorId: "mixed-use",
    location: "Etobicoke, ON",
    summary: "Coordinated MEP design across 22-storey residential tower with ground-floor retail.",
  },
];

export const categories = [
  "All",
  "Restaurants",
  "Custom Homes & Residentials",
  "Institutional",
  "Commercial & Retail Units",
  "Industrial Units",
  "Healthcare Facilities",
  "Office Spaces",
  "Place of Worship",
  "Premise Isolation",
  "Sports & Gym Facilities",
  "Automotive & Service Centres",
  "Mixed-Use Developments",
] as const;

export const clients = [
  "Boardwalk",
  "Church's",
  "Gino's Pizza",
  "Lava Grill",
  "Code Ninjas",
  "NAPA",
  "Midas",
  "Wild Wing",
];

export const stats = [
  { value: "12+", label: "Years of practice" },
  { value: "300+", label: "Projects completed" },
  { value: "200+", label: "Satisfied clients" },
  { value: "98%", label: "Client satisfaction" },
];
