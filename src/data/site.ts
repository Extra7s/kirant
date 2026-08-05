export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Rooms & Suites', href: '/room' },
  { name: 'Wellness & Spa', href: '/wellness' },
  { name: 'Dining', href: '/dining' },
  { name: 'History', href: '/history' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

export type FloorPlanRoom = {
  id: string
  name: string
  href: string
  x: number
  y: number
  w: number
  h: number
  labelPos: { x: number; y: number }
}

export const floorPlanRooms: FloorPlanRoom[] = [
  {
    id: 'home',
    name: 'Home',
    href: '/',
    x: 699,
    y: 234.5,
    w: 299,
    h: 214,
    labelPos: { x: 848.5, y: 341.5 },
  },
  {
    id: 'wellness',
    name: 'Wellness & Spa',
    href: '/wellness',
    x: 168,
    y: 3.5,
    w: 527.5,
    h: 209,
    labelPos: { x: 431.8, y: 108 },
  },
  {
    id: 'dining',
    name: 'Dining',
    href: '/dining',
    x: 699.5,
    y: 3.5,
    w: 298.5,
    h: 209,
    labelPos: { x: 848.7, y: 108 },
  },
  {
    id: 'room',
    name: 'Rooms & Suites',
    href: '/room',
    x: 168,
    y: 234.5,
    w: 359,
    h: 214,
    labelPos: { x: 347.5, y: 341.5 },
  },
  {
    id: 'gallery',
    name: 'Gallery',
    href: '/gallery',
    x: 1001,
    y: 37.5,
    w: 137,
    h: 411,
    labelPos: { x: 1069.5, y: 243 },
  },
  {
    id: 'contact',
    name: 'Contact',
    href: '/contact',
    x: 530,
    y: 215.5,
    w: 166,
    h: 135,
    labelPos: { x: 613, y: 283 },
  },
  {
    id: 'history',
    name: 'History',
    href: '/history',
    x: 3,
    y: 37.5,
    w: 163,
    h: 411,
    labelPos: { x: 84.5, y: 243 },
  },
  {
    id: 'about',
    name: 'About',
    href: '/about',
    x: 530,
    y: 353,
    w: 166,
    h: 185,
    labelPos: { x: 613, y: 445 },
  },
]

export const floorPlanOutline =
  'M530 538.5H696V353.502L695.502 353.5L530.502 353L530 352.998V538.5ZM695 354.498V537.5H531V354.001L695 354.498ZM1001 37.999L1000.5 447.999L1000.5 448.5H1001L1137.5 448.514H1138V37.5H1001L1001 37.999ZM3 448.5H166V37.5H3V448.5ZM168 448.5H527V234.5H168V448.5ZM699 448.5H998V234.5H699V448.5ZM1137 38.5V447.513L1001.5 447.5L1002 38.5H1137ZM997 235.5V447.5H700V235.5H997ZM526 235.5V447.5H169V235.5H526ZM165 38.5V447.5H4V38.5H165ZM530 350.5H696V215.5H530V350.5ZM695 216.5V349.5H531V216.5H695ZM168 231.5H527V215.5H168V231.5ZM699 231.5H998V215.5H699V231.5ZM997 216.5V230.5H700V216.5H997ZM526 216.5V230.5H169V216.5H526ZM168 212.505L168.5 212.504L695.294 212H695.793V211.5L695.737 4V3.5H168V212.505ZM997.005 3C995.886 2.98899 780.205 3.35685 699.499 3.50684L699 3.50781V212.5H998.011L998.009 211.999L997.5 3.49902L997.499 3.00488L997.005 3ZM694.737 4.5L694.792 211L169 211.503V4.5H694.737ZM997.008 211.5H700V4.50586C779.036 4.35911 985.043 4.00771 996.501 4L997.008 211.5ZM527 451.505L526.5 451.504L0.5 451V34.998L165.57 34.4883L166.07 34.4863L166.069 33.9873L166.001 0.5H1001V34.4844L1001.5 34.4863L1140.5 34.998L1141 451.5H699V541.5H527V451.505Z'

export const keyholePath =
  'M 688,185 L 781,238 L 781,337 L 732,381 L 732,388 L 758,552 L 688,599 L 618,552 L 644,388 L 644,381 L 596,337 L 596,238 Z'

export const hexagonClipPath =
  'M 0.5 0.24089 L 0.56759 0.30990 L 0.56759 0.43880 L 0.53198 0.49609 L 0.53198 0.50521 L 0.55087 0.71875 L 0.5 0.77995 L 0.44913 0.71875 L 0.46802 0.50521 L 0.46802 0.49609 L 0.43241 0.43880 L 0.43241 0.30990 Z'

export const rooms = [
  { title: 'Double Room', image: '/images/room/double-bedroom-3.webp' },
  { title: 'Twin Room', image: '/images/room/twin-bedroom-1.webp' },
  { title: 'Single Room', image: '/images/room/single-bedroom-1.webp' },
  { title: 'King Queen Room', image: '/images/room/king-queen-bedroom-1.webp' },
  {
    title: 'Double Bedroom Suite',
    image: '/images/room/double-bedroom-suite-3.webp',
  },
  {
    title: 'Double Bedroom Rooftop Suite',
    image: '/images/room/double-bedroom-suite-1.webp',
  },
]

export const stats = [
  { number: '40', unit: 'Keys', description: 'Luxurious Rooms & Private Villas' },
  {
    number: '10',
    unit: 'Acres',
    description: 'Pristine Himalayan Foothills Sanctuary',
  },
  {
    number: '03',
    unit: 'Venues',
    description: 'Bespoke Organic Fine Dining Realms',
  },
  {
    number: '360°',
    unit: 'Views',
    description: 'Panoramic Himalayan Mountain Vistas',
  },
]

export const reels = [
  '/videos/reels/reel-0.mp4',
  '/videos/reels/reel-2.mp4',
  '/videos/reels/reel-3.mp4',
  '/videos/reels/reel-4.mp4',
  '/videos/reels/reel-5.mp4',
  '/videos/reels/reel-6.mp4',
]

export const reviews = [
  {
    name: 'Aarpana Shrestha',
    date: 'Sep 2025',
    quote:
      '"A Himalayan retreat like no other. Standing on the private rooftop terrace looking out at the panoramic peaks of the Annapurna range was pure magic. The attention to detail and authentic warmth of The Kirant sets a new standard for luxury in the hills."',
    image: '/images/review/reviews-1.webp',
  },
  {
    name: 'Rohan Rajbhandari',
    date: 'Oct 2025',
    quote:
      '"From the moment we arrived, the Nepalese hospitality was impeccable. The spacious layout and pristine views of the mist-covered valley from our balcony made our stay feel grand. Every architectural detail perfectly blends traditional Kiranti heritage with modern elegance."',
    image: '/images/review/reviews-2.webp',
  },
  {
    name: 'Pooja Adhikari',
    date: 'Nov 2025',
    quote:
      '"An unforgettable culinary and wellness journey. The bespoke treatments at the spa using local Himalayan herbs rejuvenated my spirit, while the organic dining options and premium comforts of the suite provided the perfect sanctuary."',
    image: '/images/review/reviews-3.webp',
  },
  {
    name: 'Siddharth Thapa',
    date: 'Dec 2025',
    quote:
      '"Waking up to the golden sunrise over the snowy peaks and enjoying a warm, curated dining experience by the fireplace made our anniversary truly magical. The Kirant defines premium mountain hospitality."',
    image: '/images/review/reviews-4.webp',
  },
  {
    name: 'Nisha Chhetri',
    date: 'Jan 2026',
    quote:
      '"The perfect cozy getaway to escape the city noise. Sitting by the large glass window with a cup of local Himalayan tea, watching the clouds drift over the pine trees allowed me to completely disconnect. A masterpiece of design and serenity."',
    image: '/images/review/reviews-5.webp',
  },
]

export const preloadAssets = [
  '/images/key-hole-1.webp',
  '/images/home/hotel-front-view-6.webp',
  '/images/home/reception-1.webp',
  '/images/home/reception-3.webp',
  '/images/dining/dining-1.webp',
  '/images/wellness/meditation-1.webp',
  ...rooms.map((room) => room.image),
  ...reviews.map((review) => review.image),
]
