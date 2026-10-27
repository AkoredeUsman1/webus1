/* ------------------------------------------------------------------ *
 * Shared project catalogue.
 *
 * Kept out of Projects.jsx so that component files only export
 * components (react-refresh) while the showcase and the
 * /projects/:slug detail page can both read the same data.
 * ------------------------------------------------------------------ */

export const BASE = "https://webgaze-clone.vercel.app/images/projects";

export const PROJECTS = [
  { n: "01", title: "Care Partners Australia", cat: "Web Design · Branding · UI/UX", img: `${BASE}/care-partners-australia-cover.jpg`, slug: "care-partners-australia" },
  { n: "02", title: "Australian Ghanaian Chamber of Commerce", cat: "Web Design · Branding", img: `${BASE}/australian-ghanaian-chamber-of-commerce-cover.jpg`, slug: "australian-ghanaian-chamber-of-commerce" },
  { n: "03", title: "WINSTAMAC", cat: "Web Design · UI/UX", img: `${BASE}/winstamac-cover.webp`, slug: "winstamac" },
  { n: "04", title: "Sababa Global Trade & Logistics", cat: "Web Design · Branding", img: `${BASE}/sababa-global-cover.webp`, slug: "sababa-global" },
  { n: "05", title: "Viride Energy Africa", cat: "Web Design · Development", img: `${BASE}/viride-energy-africa-cover.webp`, slug: "viride-energy-africa" },
  { n: "06", title: "Ben Ari Accounting", cat: "Web Design · Product Design", img: `${BASE}/ben-ari-accounting-cover.jpg`, slug: "ben-ari-accounting" },
  { n: "07", title: "PhytoScience Australia", cat: "Web Design · Branding", img: `${BASE}/phytoscience-australia-cover.webp`, slug: "phytoscience-australia" },
  { n: "08", title: "Petra Care Services", cat: "Web Design · UI/UX", img: `${BASE}/petra-care-services-cover.webp`, slug: "petra-care-services" },
  { n: "09", title: "Onboard Plumbing", cat: "Web Design · Branding", img: `${BASE}/onboard-plumbing-cover.jpg`, slug: "onboard-plumbing" },
  { n: "10", title: "Janny Global", cat: "Web Design · Mobile UI", img: `${BASE}/janny-global-cover.webp`, slug: "janny-global" },
  { n: "11", title: "DownUnder Radio", cat: "Web Design · Branding", img: `${BASE}/downunder-radio-cover.jpg`, slug: "downunder-radio" },
  { n: "12", title: "Salaka Dance Ensemble", cat: "Web Design · Branding", img: `${BASE}/salaka-dance-ensemble-cover.webp`, slug: "salaka-dance-ensemble" },
];

export const SUBTITLE =
  "A selection of recent websites, brand systems, and digital experiences for clients across Australia and beyond.";
