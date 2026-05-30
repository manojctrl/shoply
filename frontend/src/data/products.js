export const categories = [
  {
    name: 'Electronics',
    description: 'Daily tech, desk upgrades, and smart essentials.',
    accent: 'from-sky-500 to-cyan-400',
  },
  {
    name: 'Fashion',
    description: 'Clean staples with a polished, everyday feel.',
    accent: 'from-rose-500 to-orange-400',
  },
  {
    name: 'Home',
    description: 'Soft textures, clever storage, and calm spaces.',
    accent: 'from-emerald-500 to-teal-400',
  },
];

export const products = [
  {
    id: 1,
    name: 'Nova Wireless Headphones',
    category: 'Electronics',
    price: 89.99,
    compareAt: 129.99,
    rating: 4.8,
    reviews: 214,
    badge: 'Best seller',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Balanced sound, plush cushions, and all-day battery life for commutes or focus blocks.',
  },
  {
    id: 2,
    name: 'Linen Everyday Tote',
    category: 'Fashion',
    price: 42.0,
    compareAt: 58.0,
    rating: 4.7,
    reviews: 98,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
    description: 'A structured carryall with soft handles, inner pockets, and room for the whole day.',
  },
  {
    id: 3,
    name: 'Ceramic Pour-Over Set',
    category: 'Home',
    price: 36.5,
    compareAt: 49.0,
    rating: 4.9,
    reviews: 142,
    badge: 'Top rated',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    description: 'A slow-morning coffee kit with a ribbed dripper, matching server, and easy-clean finish.',
  },
  {
    id: 4,
    name: 'Desk Glow Lamp',
    category: 'Electronics',
    price: 64.99,
    compareAt: 79.99,
    rating: 4.6,
    reviews: 76,
    badge: 'Limited',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    description: 'Warm dimmable light, a compact base, and a clean profile for better evening work.',
  },
  {
    id: 5,
    name: 'Cloud Knit Pullover',
    category: 'Fashion',
    price: 72.0,
    compareAt: 96.0,
    rating: 4.8,
    reviews: 121,
    badge: 'Soft touch',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    description: 'A relaxed knit with ribbed cuffs, easy layering, and a soft brushed handfeel.',
  },
  {
    id: 6,
    name: 'Oak Bedside Tray',
    category: 'Home',
    price: 28.0,
    compareAt: 35.0,
    rating: 4.5,
    reviews: 63,
    badge: 'Handmade',
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
    description: 'A warm wood catchall for keys, jewelry, candles, or the little things that need a home.',
  },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
