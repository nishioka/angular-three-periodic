export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  period: number;
  group: number;
  category: string;
  atomicMass: number;
  color: string;
}

export const periodicElements: Element[] = [
  // Period 1
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, period: 1, group: 1, category: 'nonmetal', atomicMass: 1.008, color: '#ff6b6b' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, period: 1, group: 18, category: 'noble-gas', atomicMass: 4.003, color: '#4ecdc4' },
  
  // Period 2  
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, period: 2, group: 1, category: 'alkali-metal', atomicMass: 6.941, color: '#45b7d1' },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, period: 2, group: 2, category: 'alkaline-earth-metal', atomicMass: 9.012, color: '#96ceb4' },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, period: 2, group: 13, category: 'metalloid', atomicMass: 10.811, color: '#feca57' },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, period: 2, group: 14, category: 'nonmetal', atomicMass: 12.011, color: '#ff9ff3' },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, period: 2, group: 15, category: 'nonmetal', atomicMass: 14.007, color: '#54a0ff' },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, period: 2, group: 16, category: 'nonmetal', atomicMass: 15.999, color: '#5f27cd' },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, period: 2, group: 17, category: 'halogen', atomicMass: 18.998, color: '#f0932b' },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, period: 2, group: 18, category: 'noble-gas', atomicMass: 20.180, color: '#eb4d4b' },
  
  // Period 3
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, period: 3, group: 1, category: 'alkali-metal', atomicMass: 22.990, color: '#6c5ce7' },
  { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, period: 3, group: 2, category: 'alkaline-earth-metal', atomicMass: 24.305, color: '#a29bfe' },
  { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, period: 3, group: 13, category: 'post-transition-metal', atomicMass: 26.982, color: '#fd79a8' },
  { symbol: 'Si', name: 'Silicon', atomicNumber: 14, period: 3, group: 14, category: 'metalloid', atomicMass: 28.086, color: '#fdcb6e' },
  { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, period: 3, group: 15, category: 'nonmetal', atomicMass: 30.974, color: '#e17055' },
  { symbol: 'S', name: 'Sulfur', atomicNumber: 16, period: 3, group: 16, category: 'nonmetal', atomicMass: 32.065, color: '#81ecec' },
  { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, period: 3, group: 17, category: 'halogen', atomicMass: 35.453, color: '#74b9ff' },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, period: 3, group: 18, category: 'noble-gas', atomicMass: 39.948, color: '#0984e3' },
  
  // Period 4
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, period: 4, group: 1, category: 'alkali-metal', atomicMass: 39.098, color: '#00b894' },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, period: 4, group: 2, category: 'alkaline-earth-metal', atomicMass: 40.078, color: '#00cec9' },
  { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, period: 4, group: 3, category: 'transition-metal', atomicMass: 44.956, color: '#6c5ce7' },
  { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, period: 4, group: 4, category: 'transition-metal', atomicMass: 47.867, color: '#a29bfe' },
  { symbol: 'V', name: 'Vanadium', atomicNumber: 23, period: 4, group: 5, category: 'transition-metal', atomicMass: 50.942, color: '#fd79a8' },
  { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, period: 4, group: 6, category: 'transition-metal', atomicMass: 51.996, color: '#e84393' },
  { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, period: 4, group: 7, category: 'transition-metal', atomicMass: 54.938, color: '#2d3436' },
  { symbol: 'Fe', name: 'Iron', atomicNumber: 26, period: 4, group: 8, category: 'transition-metal', atomicMass: 55.845, color: '#636e72' },
  { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, period: 4, group: 9, category: 'transition-metal', atomicMass: 58.933, color: '#b2bec3' },
  { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, period: 4, group: 10, category: 'transition-metal', atomicMass: 58.693, color: '#ddd' },
  { symbol: 'Cu', name: 'Copper', atomicNumber: 29, period: 4, group: 11, category: 'transition-metal', atomicMass: 63.546, color: '#e17055' },
  { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, period: 4, group: 12, category: 'transition-metal', atomicMass: 65.38, color: '#00b894' },
  { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, period: 4, group: 13, category: 'post-transition-metal', atomicMass: 69.723, color: '#fd79a8' },
  { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, period: 4, group: 14, category: 'metalloid', atomicMass: 72.64, color: '#fdcb6e' },
  { symbol: 'As', name: 'Arsenic', atomicNumber: 33, period: 4, group: 15, category: 'metalloid', atomicMass: 74.922, color: '#feca57' },
  { symbol: 'Se', name: 'Selenium', atomicNumber: 34, period: 4, group: 16, category: 'nonmetal', atomicMass: 78.96, color: '#ff9ff3' },
  { symbol: 'Br', name: 'Bromine', atomicNumber: 35, period: 4, group: 17, category: 'halogen', atomicMass: 79.904, color: '#f0932b' },
  { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, period: 4, group: 18, category: 'noble-gas', atomicMass: 83.798, color: '#54a0ff' },

  // Period 5
  { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, period: 5, group: 1, category: 'alkali-metal', atomicMass: 85.468, color: '#ff6b6b' },
  { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, period: 5, group: 2, category: 'alkaline-earth-metal', atomicMass: 87.62, color: '#4ecdc4' },
  { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, period: 5, group: 3, category: 'transition-metal', atomicMass: 88.906, color: '#45b7d1' },
  { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, period: 5, group: 4, category: 'transition-metal', atomicMass: 91.224, color: '#96ceb4' },
  { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, period: 5, group: 5, category: 'transition-metal', atomicMass: 92.906, color: '#feca57' },
  { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, period: 5, group: 6, category: 'transition-metal', atomicMass: 95.96, color: '#ff9ff3' },
  { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, period: 5, group: 7, category: 'transition-metal', atomicMass: 98, color: '#54a0ff' },
  { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, period: 5, group: 8, category: 'transition-metal', atomicMass: 101.07, color: '#5f27cd' },
  { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, period: 5, group: 9, category: 'transition-metal', atomicMass: 102.906, color: '#f0932b' },
  { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, period: 5, group: 10, category: 'transition-metal', atomicMass: 106.42, color: '#eb4d4b' },
  { symbol: 'Ag', name: 'Silver', atomicNumber: 47, period: 5, group: 11, category: 'transition-metal', atomicMass: 107.868, color: '#6c5ce7' },
  { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, period: 5, group: 12, category: 'transition-metal', atomicMass: 112.411, color: '#a29bfe' },
  { symbol: 'In', name: 'Indium', atomicNumber: 49, period: 5, group: 13, category: 'post-transition-metal', atomicMass: 114.818, color: '#fd79a8' },
  { symbol: 'Sn', name: 'Tin', atomicNumber: 50, period: 5, group: 14, category: 'post-transition-metal', atomicMass: 118.71, color: '#fdcb6e' },
  { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, period: 5, group: 15, category: 'metalloid', atomicMass: 121.76, color: '#e17055' },
  { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, period: 5, group: 16, category: 'metalloid', atomicMass: 127.6, color: '#81ecec' },
  { symbol: 'I', name: 'Iodine', atomicNumber: 53, period: 5, group: 17, category: 'halogen', atomicMass: 126.904, color: '#74b9ff' },
  { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, period: 5, group: 18, category: 'noble-gas', atomicMass: 131.293, color: '#0984e3' },

  // Period 6
  { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, period: 6, group: 1, category: 'alkali-metal', atomicMass: 132.905, color: '#00b894' },
  { symbol: 'Ba', name: 'Barium', atomicNumber: 56, period: 6, group: 2, category: 'alkaline-earth-metal', atomicMass: 137.327, color: '#00cec9' },
  
  // Lanthanides (Period 6, separate positioning)
  { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, period: 6, group: 3, category: 'lanthanide', atomicMass: 138.905, color: '#ff7675' },
  { symbol: 'Ce', name: 'Cerium', atomicNumber: 58, period: 6, group: 3, category: 'lanthanide', atomicMass: 140.116, color: '#fd79a8' },
  { symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, period: 6, group: 3, category: 'lanthanide', atomicMass: 140.908, color: '#fdcb6e' },
  { symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, period: 6, group: 3, category: 'lanthanide', atomicMass: 144.242, color: '#e17055' },
  { symbol: 'Pm', name: 'Promethium', atomicNumber: 61, period: 6, group: 3, category: 'lanthanide', atomicMass: 145, color: '#81ecec' },
  { symbol: 'Sm', name: 'Samarium', atomicNumber: 62, period: 6, group: 3, category: 'lanthanide', atomicMass: 150.36, color: '#74b9ff' },
  { symbol: 'Eu', name: 'Europium', atomicNumber: 63, period: 6, group: 3, category: 'lanthanide', atomicMass: 151.964, color: '#0984e3' },
  { symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, period: 6, group: 3, category: 'lanthanide', atomicMass: 157.25, color: '#00b894' },
  { symbol: 'Tb', name: 'Terbium', atomicNumber: 65, period: 6, group: 3, category: 'lanthanide', atomicMass: 158.925, color: '#00cec9' },
  { symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, period: 6, group: 3, category: 'lanthanide', atomicMass: 162.5, color: '#6c5ce7' },
  { symbol: 'Ho', name: 'Holmium', atomicNumber: 67, period: 6, group: 3, category: 'lanthanide', atomicMass: 164.93, color: '#a29bfe' },
  { symbol: 'Er', name: 'Erbium', atomicNumber: 68, period: 6, group: 3, category: 'lanthanide', atomicMass: 167.259, color: '#fd79a8' },
  { symbol: 'Tm', name: 'Thulium', atomicNumber: 69, period: 6, group: 3, category: 'lanthanide', atomicMass: 168.934, color: '#fdcb6e' },
  { symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, period: 6, group: 3, category: 'lanthanide', atomicMass: 173.054, color: '#e17055' },
  { symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, period: 6, group: 3, category: 'lanthanide', atomicMass: 174.967, color: '#81ecec' },

  // Period 6 continued
  { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, period: 6, group: 4, category: 'transition-metal', atomicMass: 178.49, color: '#74b9ff' },
  { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, period: 6, group: 5, category: 'transition-metal', atomicMass: 180.948, color: '#0984e3' },
  { symbol: 'W', name: 'Tungsten', atomicNumber: 74, period: 6, group: 6, category: 'transition-metal', atomicMass: 183.84, color: '#00b894' },
  { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, period: 6, group: 7, category: 'transition-metal', atomicMass: 186.207, color: '#00cec9' },
  { symbol: 'Os', name: 'Osmium', atomicNumber: 76, period: 6, group: 8, category: 'transition-metal', atomicMass: 190.23, color: '#6c5ce7' },
  { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, period: 6, group: 9, category: 'transition-metal', atomicMass: 192.217, color: '#a29bfe' },
  { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, period: 6, group: 10, category: 'transition-metal', atomicMass: 195.084, color: '#fd79a8' },
  { symbol: 'Au', name: 'Gold', atomicNumber: 79, period: 6, group: 11, category: 'transition-metal', atomicMass: 196.967, color: '#fdcb6e' },
  { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, period: 6, group: 12, category: 'transition-metal', atomicMass: 200.59, color: '#e17055' },
  { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, period: 6, group: 13, category: 'post-transition-metal', atomicMass: 204.383, color: '#81ecec' },
  { symbol: 'Pb', name: 'Lead', atomicNumber: 82, period: 6, group: 14, category: 'post-transition-metal', atomicMass: 207.2, color: '#74b9ff' },
  { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, period: 6, group: 15, category: 'post-transition-metal', atomicMass: 208.98, color: '#0984e3' },
  { symbol: 'Po', name: 'Polonium', atomicNumber: 84, period: 6, group: 16, category: 'post-transition-metal', atomicMass: 209, color: '#00b894' },
  { symbol: 'At', name: 'Astatine', atomicNumber: 85, period: 6, group: 17, category: 'halogen', atomicMass: 210, color: '#00cec9' },
  { symbol: 'Rn', name: 'Radon', atomicNumber: 86, period: 6, group: 18, category: 'noble-gas', atomicMass: 222, color: '#6c5ce7' },

  // Period 7
  { symbol: 'Fr', name: 'Francium', atomicNumber: 87, period: 7, group: 1, category: 'alkali-metal', atomicMass: 223, color: '#a29bfe' },
  { symbol: 'Ra', name: 'Radium', atomicNumber: 88, period: 7, group: 2, category: 'alkaline-earth-metal', atomicMass: 226, color: '#fd79a8' },

  // Actinides (Period 7, separate positioning)
  { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, period: 7, group: 3, category: 'actinide', atomicMass: 227, color: '#fdcb6e' },
  { symbol: 'Th', name: 'Thorium', atomicNumber: 90, period: 7, group: 3, category: 'actinide', atomicMass: 232.038, color: '#e17055' },
  { symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, period: 7, group: 3, category: 'actinide', atomicMass: 231.036, color: '#81ecec' },
  { symbol: 'U', name: 'Uranium', atomicNumber: 92, period: 7, group: 3, category: 'actinide', atomicMass: 238.029, color: '#74b9ff' },
  { symbol: 'Np', name: 'Neptunium', atomicNumber: 93, period: 7, group: 3, category: 'actinide', atomicMass: 237, color: '#0984e3' },
  { symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, period: 7, group: 3, category: 'actinide', atomicMass: 244, color: '#00b894' },
  { symbol: 'Am', name: 'Americium', atomicNumber: 95, period: 7, group: 3, category: 'actinide', atomicMass: 243, color: '#00cec9' },
  { symbol: 'Cm', name: 'Curium', atomicNumber: 96, period: 7, group: 3, category: 'actinide', atomicMass: 247, color: '#6c5ce7' },
  { symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, period: 7, group: 3, category: 'actinide', atomicMass: 247, color: '#a29bfe' },
  { symbol: 'Cf', name: 'Californium', atomicNumber: 98, period: 7, group: 3, category: 'actinide', atomicMass: 251, color: '#fd79a8' },
  { symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, period: 7, group: 3, category: 'actinide', atomicMass: 252, color: '#fdcb6e' },
  { symbol: 'Fm', name: 'Fermium', atomicNumber: 100, period: 7, group: 3, category: 'actinide', atomicMass: 257, color: '#e17055' },
  { symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, period: 7, group: 3, category: 'actinide', atomicMass: 258, color: '#81ecec' },
  { symbol: 'No', name: 'Nobelium', atomicNumber: 102, period: 7, group: 3, category: 'actinide', atomicMass: 259, color: '#74b9ff' },
  { symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, period: 7, group: 3, category: 'actinide', atomicMass: 262, color: '#0984e3' },

  // Period 7 continued
  { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, period: 7, group: 4, category: 'transition-metal', atomicMass: 267, color: '#00b894' },
  { symbol: 'Db', name: 'Dubnium', atomicNumber: 105, period: 7, group: 5, category: 'transition-metal', atomicMass: 270, color: '#00cec9' },
  { symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, period: 7, group: 6, category: 'transition-metal', atomicMass: 271, color: '#6c5ce7' },
  { symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, period: 7, group: 7, category: 'transition-metal', atomicMass: 270, color: '#a29bfe' },
  { symbol: 'Hs', name: 'Hassium', atomicNumber: 108, period: 7, group: 8, category: 'transition-metal', atomicMass: 277, color: '#fd79a8' },
  { symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, period: 7, group: 9, category: 'transition-metal', atomicMass: 276, color: '#fdcb6e' },
  { symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, period: 7, group: 10, category: 'transition-metal', atomicMass: 281, color: '#e17055' },
  { symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, period: 7, group: 11, category: 'transition-metal', atomicMass: 280, color: '#81ecec' },
  { symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, period: 7, group: 12, category: 'transition-metal', atomicMass: 285, color: '#74b9ff' },
  { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, period: 7, group: 13, category: 'post-transition-metal', atomicMass: 284, color: '#0984e3' },
  { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, period: 7, group: 14, category: 'post-transition-metal', atomicMass: 289, color: '#00b894' },
  { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, period: 7, group: 15, category: 'post-transition-metal', atomicMass: 288, color: '#00cec9' },
  { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, period: 7, group: 16, category: 'post-transition-metal', atomicMass: 293, color: '#6c5ce7' },
  { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, period: 7, group: 17, category: 'halogen', atomicMass: 294, color: '#a29bfe' },
  { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, period: 7, group: 18, category: 'noble-gas', atomicMass: 294, color: '#fd79a8' },
];

export function getElementColor(category: string): string {
  const colors: { [key: string]: string } = {
    'alkali-metal': '#ff6b6b',
    'alkaline-earth-metal': '#4ecdc4',
    'transition-metal': '#45b7d1',
    'post-transition-metal': '#96ceb4',
    'metalloid': '#feca57',
    'nonmetal': '#ff9ff3',
    'halogen': '#f0932b',
    'noble-gas': '#54a0ff',
    'lanthanide': '#e17085',
    'actinide': '#ff7675',
  };
  return colors[category] || '#95a5a6';
}
