export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image: string
  category: 'handicraft' | 'homestay' | 'experience'
  location: string
  rating?: number
}

export const marketplaceItems: Product[] = [
  // Handicrafts
  {
    id: '1',
    name: 'Dhokra Art Metal Craft',
    description: 'Traditional tribal metal casting art from Jharkhand, made using lost-wax casting technique.',
    price: 1500,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1672403392256-786c846608b8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'handicraft',
    location: 'Ranchi',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Bamboo Handicrafts',
    description: 'Eco-friendly bamboo products including baskets, decor items, and utility products.',
    price: 800,
    currency: '₹',
    image: 'https://plus.unsplash.com/premium_photo-1736505437580-7d2dfc89994e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'handicraft',
    location: 'Khunti',
    rating: 4.2
  },
  { 
    id: '3',
    name: 'Tribal Wood Carvings',
    description: 'Hand-carved wooden artifacts depicting tribal culture and nature motifs.',
    price: 2500,
    currency: '₹',
    image: 'https://plus.unsplash.com/premium_photo-1677702162842-b4a4b3c47a27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'handicraft',
    location: 'Gumla',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Tussar Silk Sarees',
    description: 'Authentic Tussar silk sarees with traditional tribal patterns and natural dyes.',
    price: 3500,
    currency: '₹',
    image: 'https://plus.unsplash.com/premium_photo-1725729875250-05d56e636b66?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'handicraft',
    location: 'Singhbhum',
    rating: 4.8
  },

  // Homestays
  {
    id: '5',
    name: 'Netarhat Forest Homestay',
    description: 'Cozy homestay in Netarhat with panoramic views, home-cooked local meals, and nature walks.',
    price: 2000,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    category: 'homestay',
    location: 'Netarhat',
    rating: 4.6
  },
  {
    id: '6',
    name: 'Tribal Village Experience',
    description: 'Authentic tribal village stay with cultural activities, traditional food, and craft workshops.',
    price: 1500,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
    category: 'homestay',
    location: 'Khunti',
    rating: 4.9
  },
  {
    id: '7',
    name: 'Betla Jungle Retreat',
    description: 'Eco-friendly stay near Betla National Park with safari arrangements and wildlife guidance.',
    price: 2500,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400',
    category: 'homestay',
    location: 'Betla',
    rating: 4.4
  },

  // Experiences
  {
    id: '8',
    name: 'Tribal Cooking Class',
    description: 'Learn to cook traditional Jharkhand dishes with local tribal families.',
    price: 1000,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400',
    category: 'experience',
    location: 'Ranchi',
    rating: 4.7
  },
  {
    id: '9',
    name: 'Handicraft Workshop',
    description: 'Hands-on workshop learning Dhokra metal casting or bamboo craft from master artisans.',
    price: 1200,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1465433045946-ba6506ce5a59?w=400',
    category: 'experience',
    location: 'Various locations',
    rating: 4.8
  },
  {
    id: '10',
    name: 'Nature Photography Tour',
    description: 'Guided photography tour to capture Jharkhand\'s waterfalls, forests, and wildlife.',
    price: 1800,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
    category: 'experience',
    location: 'Multiple destinations',
    rating: 4.5
  }
] 