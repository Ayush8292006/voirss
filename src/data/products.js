export const PRODUCTS = [
  {
    id: 'prod-1',
    slug: 'vs-face-oversized-tee',
    name: 'VS FACE Oversized Tee',
    subtitle: 'Limited Drop 01',
    type: 'Tee',
    category: 'graphic-tees',
    price: 1999,
    compareAtPrice: 2799,
    badge: 'Sale',
    matureGraphic: false,
    featured: true,
    colors: [
      { name: 'Bubblegum Pink', hex: '#F9A8D4' },
      { name: 'Vintage White', hex: '#F3F4F6' }
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: false },
      { size: 'XXL', inStock: true }
    ],
    images: [
      '/products/vs-face-tee.jpg',
      '/products/vs-face-tee-back.jpg'
    ],
    description: 'Ultra-heavyweight 240 GSM combed cotton tee featuring the high-contrast Megan photo front print topped with chrome liquid-metal VS insignia on the forehead.',
    details: {
      fabric: '240 GSM 100% Ring-Spun Combed Cotton',
      fit: 'Oversized boxy streetwear cut, exaggerated drop shoulder',
      care: 'Machine wash cold inside-out, tumble dry low, do not iron on print',
      origin: 'Crafted & printed in India'
    }
  },
  {
    id: 'prod-2',
    slug: 'heart-break-club-tee',
    name: 'HEART BREAK CLUB Tee',
    subtitle: 'Graffiti Collage Edition',
    type: 'Tee',
    category: 'graphic-tees',
    price: 2299,
    compareAtPrice: null,
    badge: 'New',
    matureGraphic: false,
    featured: true,
    colors: [
      { name: 'Clean White', hex: '#FFFFFF' },
      { name: 'Washed Black', hex: '#1C1917' }
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: false },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false }
    ],
    images: [
      '/products/heartbreak-tee.jpg',
      '/products/heartbreak-tee-back.jpg'
    ],
    description: 'Hand-drawn underground graffiti collage featuring iconic Y2K grunge doodles: Heart Break Club, PALY, Become A Witch, crying angel face, sad bunny, caution markers, and burning car.',
    details: {
      fabric: '240 GSM 100% Pre-Shrunk Bio-Washed Cotton',
      fit: 'Relaxed drop-shoulder silhouette with reinforced rib collar',
      care: 'Hand wash or delicate cycle cold, dry flat',
      origin: 'Crafted & printed in India'
    }
  },
  {
    id: 'prod-3',
    slug: 'void-underground-comic-tee',
    name: 'VOID UNDERGROUND Comic Tee',
    subtitle: 'Atlanta G.A Issue #04',
    type: 'Tee',
    category: 'graphic-tees',
    price: 2499,
    compareAtPrice: 2999,
    badge: 'Sale',
    matureGraphic: true,
    featured: true,
    colors: [
      { name: 'Void Black', hex: '#0A0A0A' },
      { name: 'Acid Charcoal', hex: '#374151' }
    ],
    sizes: [
      { size: 'XS', inStock: false },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    images: [
      '/products/void-underground.jpg',
      '/products/void-underground-back.jpg'
    ],
    description: 'Retro 90s pulp comic magazine cover aesthetic celebrating Atlanta underground zine culture. Multi-screen vintage ink print with bold red accents and the official Void 18+ insignia.',
    details: {
      fabric: '240 GSM Heavyweight Terry Weave Cotton',
      fit: 'Oversized boxy fit with wide sleeves',
      care: 'Cold wash with like colors, do not bleach',
      origin: 'Crafted & printed in India'
    }
  },
  {
    id: 'prod-4',
    slug: 'broke-but-rich-washed-tee',
    name: 'BROKE BUT RICH Washed Tee',
    subtitle: 'Acid Dumpster Series',
    type: 'Tee',
    category: 'graphic-tees',
    price: 2699,
    compareAtPrice: null,
    badge: 'Sold out in some sizes',
    matureGraphic: false,
    featured: true,
    colors: [
      { name: 'Acid Washed Charcoal', hex: '#4B5563' },
      { name: 'Oil Stained Black', hex: '#18181B' }
    ],
    sizes: [
      { size: 'XS', inStock: false },
      { size: 'S', inStock: false },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: false },
      { size: 'XXL', inStock: true }
    ],
    images: [
      '/products/broke-rich.jpg',
      '/products/broke-rich-back.jpg'
    ],
    description: 'Acid-washed charcoal body with satirical capitalist iconography: a flaming red dumpster overflowing with dollar cash bags and stiletto red heels. Every piece features unique acid-wash distressing.',
    details: {
      fabric: '260 GSM Custom Mineral Acid Wash Cotton',
      fit: 'Signature Void Boxy Cut, distressed collar hem',
      care: 'Gentle hand wash inside out in cold water',
      origin: 'Crafted & printed in India'
    }
  },
  // Additional items to complete the 8-12 card shop collection
  {
    id: 'prod-5',
    slug: 'vs-face-heavyweight-white',
    name: 'VS FACE Monochrome Tee',
    subtitle: 'Studio White Edition',
    type: 'Tee',
    category: 'graphic-tees',
    price: 1999,
    compareAtPrice: 2599,
    badge: 'Sale',
    matureGraphic: false,
    featured: false,
    colors: [
      { name: 'Studio White', hex: '#F9FAFB' }
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: false },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    images: [
      '/products/vs-face-tee.jpg',
      '/products/vs-face-tee-back.jpg'
    ],
    description: 'The viral VS Face oversized graphic printed with monochromatic duo-tone silver ink on raw studio white heavyweight cotton.',
    details: {
      fabric: '240 GSM Combed Cotton',
      fit: 'Oversized boxy cut',
      care: 'Machine wash cold',
      origin: 'Crafted in India'
    }
  },
  {
    id: 'prod-6',
    slug: 'heart-break-club-dark',
    name: 'HEART BREAK CLUB Noir Tee',
    subtitle: 'Midnight Doodle Print',
    type: 'Tee',
    category: 'graphic-tees',
    price: 2299,
    compareAtPrice: null,
    badge: 'New',
    matureGraphic: false,
    featured: false,
    colors: [
      { name: 'Onyx Black', hex: '#111827' }
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: false },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    images: [
      '/products/heartbreak-tee.jpg',
      '/products/heartbreak-tee-back.jpg'
    ],
    description: 'Inverted colorway of the iconic Heart Break Club collage. Glow-in-the-dark doodle outlines on deep onyx black 240 GSM cotton.',
    details: {
      fabric: '240 GSM Bio-Washed Cotton',
      fit: 'Drop shoulder relaxed',
      care: 'Hand wash cold',
      origin: 'Crafted in India'
    }
  },
  {
    id: 'prod-7',
    slug: 'void-society-chrome-logo-tee',
    name: 'VOID SOCIETY Chrome Star Tee',
    subtitle: 'Core Essential Drop',
    type: 'Tee',
    category: 'essentials',
    price: 2199,
    compareAtPrice: 2699,
    badge: 'Best Seller',
    matureGraphic: false,
    featured: true,
    colors: [
      { name: 'Pitch Black', hex: '#0A0A0A' },
      { name: 'Heather Grey', hex: '#9CA3AF' }
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false }
    ],
    images: [
      '/products/void-underground.jpg',
      '/products/void-underground-back.jpg'
    ],
    description: 'High-density chrome metallic chest print of the spiky gothic VOID insignia with 4-point sparkle star centerpiece.',
    details: {
      fabric: '240 GSM 100% Combed Cotton',
      fit: 'Oversized boxy drop-shoulder cut',
      care: 'Inside out wash cold',
      origin: 'Crafted in India'
    }
  },
  {
    id: 'prod-8',
    slug: 'broke-rich-heavy-vintage-wash',
    name: 'BROKE BUT RICH Distressed Tee',
    subtitle: 'Archive Capsule 01',
    type: 'Tee',
    category: 'graphic-tees',
    price: 2699,
    compareAtPrice: 3199,
    badge: 'Sale',
    matureGraphic: false,
    featured: false,
    colors: [
      { name: 'Faded Smoke', hex: '#374151' }
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: false },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: false },
      { size: 'XXL', inStock: false }
    ],
    images: [
      '/products/broke-rich.jpg',
      '/products/broke-rich-back.jpg'
    ],
    description: 'Enzyme-washed distressed edge cut with the iconic dumpster money bags graphic.',
    details: {
      fabric: '260 GSM Heavyweight French Terry',
      fit: 'Oversized boxy fit',
      care: 'Cold hand wash only',
      origin: 'Crafted in India'
    }
  }
];

export const LOOKBOOK_ITEMS = [
  { id: 1, image: '/lookbook/look-1.jpg', title: 'DROP 01 // TOKYO NOIR', caption: 'Flash photography on neon alleys' },
  { id: 2, image: '/lookbook/look-2.jpg', title: 'ATLANTA UNDERGROUND', caption: 'Basement zine archive session' },
  { id: 3, image: '/lookbook/look-3.jpg', title: 'ACID DUMPSTER STUDIO', caption: 'Distressed mineral wash process' },
  { id: 4, image: '/lookbook/look-4.jpg', title: 'CHROME STAR EDITORIAL', caption: 'Liquid metal typography on model' },
  { id: 5, image: '/lookbook/look-5.jpg', title: 'HEART BREAK ARCHIVE', caption: 'Doodle collage raw proofs' },
  { id: 6, image: '/lookbook/look-6.jpg', title: 'PARADISE IN RUINS', caption: 'Heavyweight 240 GSM silhouettes' }
];

export const SIZE_CHART = [
  { size: 'XS', chestIn: '40', lengthIn: '27.5', shoulderIn: '21', chestCm: '101', lengthCm: '70' },
  { size: 'S', chestIn: '42', lengthIn: '28.5', shoulderIn: '22', chestCm: '106', lengthCm: '72' },
  { size: 'M', chestIn: '44', lengthIn: '29.5', shoulderIn: '23', chestCm: '112', lengthCm: '75' },
  { size: 'L', chestIn: '46', lengthIn: '30.5', shoulderIn: '24', chestCm: '117', lengthCm: '77' },
  { size: 'XL', chestIn: '48', lengthIn: '31.5', shoulderIn: '25', chestCm: '122', lengthCm: '80' },
  { size: 'XXL', chestIn: '50', lengthIn: '32.5', shoulderIn: '26', chestCm: '127', lengthCm: '82' }
];

