// app/map/page.tsx
import OSMMap from '@/components/OSMMap';
import { Destination } from '@/types/database';
import { AnimatedSection } from '@/components/AnimatedSection';

// Mock data - in a real application, this would come from your database
const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Betla National Park',
    description: 'A beautiful national park with rich biodiversity and tiger reserve.',
    location: 'Latehar District',
    image: '/images/betla.jpg',
    gallery: [],
    category: 'Wildlife',
    rating: 4.7,
    attractions: ['Safari', 'Elephant Ride', 'Bird Watching']
  },
  {
    id: '2',
    name: 'Dassam Falls',
    description: 'A magnificent waterfall on the Subarnarekha River.',
    location: 'Near Ranchi',
    image: '/images/dassam-falls.jpg',
    gallery: [],
    category: 'Nature',
    rating: 4.5,
    attractions: ['Waterfall', 'Picnic Spot', 'Photography']
  },
  {
    id: '3',
    name: 'Jagannath Temple',
    description: 'A famous temple dedicated to Lord Jagannath, similar to Puri temple.',
    location: 'Ranchi',
    image: '/images/jagannath.jpg',
    gallery: [],
    category: 'Religious',
    rating: 4.3,
    attractions: ['Temple', 'Spiritual Experience']
  }
];

const MapPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-green-800 mb-2">Jharkhand Tourism Map</h1>
        <p className="text-gray-600 mb-8">
          Explore the beautiful state of Jharkhand with our interactive map. Discover destinations, 
          attractions, and trekking routes across the region.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <OSMMap 
  destinations={mockDestinations} 
  className="mb-8" 
  autoInit={true} // This allows automatic loading on the dedicated map page
/>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">🗺️ How to Use the Map</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Destinations</h3>
              <p className="text-sm text-gray-600">
                Click on green markers to see popular tourist destinations with details and links to learn more.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Nearby Attractions</h3>
              <p className="text-sm text-gray-600">
                Blue markers show interesting places near main destinations that you might want to explore.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-800 mb-2">Trekking Routes</h3>
              <p className="text-sm text-gray-600">
                Colored lines represent trekking paths with difficulty levels (green=easy, orange=medium, red=hard).
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default MapPage;