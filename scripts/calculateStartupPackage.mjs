const categories = [
  ["Fleet & haul", [
    ["Heavy-duty crew trucks", 6, 58000], ["Crew transport vans", 2, 65000], ["Dump trailers", 4, 20000], ["Equipment trailers", 4, 17000], ["Enclosed tool trailers", 4, 15000], ["Medium-duty dump truck", 1, 95000],
  ]],
  ["Field equipment", [
    ["Compact track loaders", 3, 92513], ["Loader attachments and work tools", 3, 20000], ["Mini excavators", 2, 95000], ["Compact tractors and implements", 4, 45000], ["Mini track loaders", 4, 35000], ["Used brush chippers", 3, 42000], ["Stump grinders", 2, 35000], ["Water trailers", 6, 8000], ["Portable generators", 8, 3500],
  ]],
  ["Crew tools, PPE & safety", [
    ["Professional chain-saw kits", 40, 1600], ["Brushcutter and pole-saw kits", 30, 800], ["Hand-tool pod kits", 10, 3000], ["Field radios", 40, 350], ["Individual PPE kits", 100, 1100], ["First-aid / trauma kits", 10, 1500], ["AED units", 4, 2000], ["Fire extinguishers", 40, 120], ["Traffic, exclusion-zone & crew-communication gear", 10, 2000], ["Portable shade and wash stations", 10, 3000],
  ]],
  ["Wood recovery & shop", [
    ["Portable sawmills", 2, 45000], ["Material-handling forklift", 1, 45000], ["Pallet jacks and material carts", 1, 12000], ["Drying and storage racks", 1, 75000], ["Dust collection and air filtration", 1, 125000], ["Guarded stationary woodworking equipment", 1, 180000], ["Hand-tool bench kits", 20, 2000], ["Workbenches and fixtures", 1, 60000], ["Metal detection, grading and moisture tools", 1, 15000],
  ]],
  ["Site, training & administration", [
    ["Field office, IT and communications", 1, 65000], ["Container workshops and tool cribs", 4, 20000], ["Tool tracking and locker system", 1, 50000], ["Washdown and fire-storage setup", 1, 40000], ["Site security and cameras", 1, 25000], ["GIS and field tablets", 1, 20000],
  ]],
  ["Opening consumables & spares", [
    ["Saw chains, bars, blades, fuel, oils and filters", 1, 75000], ["Hardware, abrasives, adhesives and finishes", 1, 70000], ["Field cones, signs, ropes and tarps", 1, 35000], ["Spare tires, fluids and maintenance parts", 1, 50000], ["PPE replenishment and consumables", 1, 35000], ["Administration, printing and onboarding supplies", 1, 20000],
  ]],
  ["Launch readiness (planning allowances)", [
    ["Safety-program and training validation", 1, 75000], ["Legal, environmental and contract readiness", 1, 100000], ["Initial insurance and bonding allowance", 1, 150000], ["Accounting, payroll systems and initial administration", 1, 75000],
  ]],
];

const subtotalByCategory = categories.map(([category, lines]) => ({ category, total: lines.reduce((sum, [, qty, unit]) => sum + qty * unit, 0) }));
const subtotal = subtotalByCategory.reduce((sum, entry) => sum + entry.total, 0);
const contingencyBase = subtotal - 400000;
const contingency = contingencyBase * 0.15;
const total = subtotal + contingency;
console.log(JSON.stringify({ subtotalByCategory, subtotal, contingencyBase, contingency, total }, null, 2));
