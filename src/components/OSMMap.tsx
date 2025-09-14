// components/OSMMap.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Destination } from '@/types/database';

// Define types for map points and routes
interface MapPoint {
  id: string;
  position: [number, number];
  name: string;
  type: 'destination' | 'attraction' | 'trekking';
  description?: string;
  image?: string;
}

interface TrekkingRoute {
  id: string;
  name: string;
  path: [number, number][];
  difficulty: 'easy' | 'medium' | 'hard';
  length: number; // in km
  duration: string; // estimated time
}

interface OSMMapProps {
  destinations: Destination[];
  selectedDestination?: Destination | null;
  className?: string;
  onMapInit?: () => void;
  autoInit?: boolean;
}

const OSMMap = ({ 
  destinations, 
  selectedDestination, 
  className = '', 
  onMapInit, 
  autoInit = false
}: OSMMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Convert destinations to map points with fixed positions
  const mapPoints: MapPoint[] = destinations.map((dest, index) => ({
    id: dest.id,
    name: dest.name,
    type: 'destination',
    description: dest.description,
    image: dest.image,
    position: [
      23.5 + (index * 0.3),
      85.0 + (index * 0.2)
    ] as [number, number]
  }));

  // Sample trekking routes for Jharkhand
    // Expanded trekking routes for Jharkhand
  const trekkingRoutes: TrekkingRoute[] = [
    {
      id: 'tr1',
      name: 'Netarhat Trek',
      path: [
        [23.5, 84.3],
        [23.52, 84.32],
        [23.54, 84.34],
        [23.56, 84.36]
      ],
      difficulty: 'medium',
      length: 12,
      duration: '4-5 hours'
    },
    {
      id: 'tr2',
      name: 'Hundru Falls Trail',
      path: [
        [23.4, 85.6],
        [23.41, 85.61],
        [23.42, 85.62],
        [23.43, 85.63]
      ],
      difficulty: 'easy',
      length: 6,
      duration: '2-3 hours'
    },
    {
      id: 'tr3',
      name: 'Jonha Falls Trek',
      path: [
        [23.63, 85.53],
        [23.635, 85.535],
        [23.64, 85.54],
        [23.645, 85.545]
      ],
      difficulty: 'easy',
      length: 4,
      duration: '1-2 hours'
    },
    {
      id: 'tr4',
      name: 'Parasnath Hill Trek',
      path: [
        [23.96, 86.14],
        [23.97, 86.15],
        [23.98, 86.16],
        [23.99, 86.17]
      ],
      difficulty: 'hard',
      length: 18,
      duration: '6-7 hours'
    },
    {
      id: 'tr5',
      name: 'Dassam Falls Trail',
      path: [
        [23.35, 85.32],
        [23.36, 85.33],
        [23.37, 85.34],
        [23.38, 85.35]
      ],
      difficulty: 'easy',
      length: 5,
      duration: '2 hours'
    },
    {
      id: 'tr6',
      name: 'Betla Forest Trek',
      path: [
        [23.88, 84.20],
        [23.89, 84.21],
        [23.90, 84.22],
        [23.91, 84.23]
      ],
      difficulty: 'medium',
      length: 10,
      duration: '3-4 hours'
    },
    {
      id: 'tr7',
      name: 'Lodh Falls Trail',
      path: [
        [23.72, 84.68],
        [23.73, 84.69],
        [23.74, 84.70],
        [23.75, 84.71]
      ],
      difficulty: 'medium',
      length: 8,
      duration: '3 hours'
    },
    {
      id: 'tr8',
      name: 'Dalma Wildlife Trek',
      path: [
        [22.93, 86.20],
        [22.94, 86.21],
        [22.95, 86.22],
        [22.96, 86.23]
      ],
      difficulty: 'easy',
      length: 7,
      duration: '2.5 hours'
    }
  ];

  // Expanded nearby attractions for Jharkhand
  const nearbyAttractions: MapPoint[] = [
    {
      id: 'attr1',
      name: 'Jonha Falls',
      type: 'attraction',
      position: [23.63, 85.53] as [number, number],
      description: 'Beautiful waterfall often called the Pearl Necklace'
    },
    {
      id: 'attr2',
      name: 'Tagore Hill',
      type: 'attraction',
      position: [23.38, 85.33] as [number, number],
      description: 'Hill named after Rabindranath Tagore with panoramic views'
    },
    {
      id: 'attr3',
      name: 'Palamau Fort',
      type: 'attraction',
      position: [23.55, 84.15] as [number, number],
      description: 'Historic fort with rich cultural heritage'
    },
    {
      id: 'attr4',
      name: 'Hundru Falls',
      type: 'attraction',
      position: [23.45, 85.65] as [number, number],
      description: 'Stunning waterfall on Subarnarekha River'
    },
    {
      id: 'attr5',
      name: 'Dassam Falls',
      type: 'attraction',
      position: [23.35, 85.32] as [number, number],
      description: 'Magnificent waterfall with multiple cascades'
    },
    {
      id: 'attr6',
      name: 'Parasnath Temple',
      type: 'attraction',
      position: [23.96, 86.14] as [number, number],
      description: 'Sacred Jain pilgrimage site on highest hill in Jharkhand'
    },
    {
      id: 'attr7',
      name: 'Sun Temple',
      type: 'attraction',
      position: [23.42, 85.44] as [number, number],
      description: 'Beautiful temple dedicated to the Sun God'
    },
    {
      id: 'attr8',
      name: 'Ranchi Lake',
      type: 'attraction',
      position: [23.36, 85.33] as [number, number],
      description: 'Serene artificial lake perfect for boating and relaxation'
    },
    {
      id: 'attr9',
      name: 'Baba Baidyanath Temple',
      type: 'attraction',
      position: [24.16, 86.70] as [number, number],
      description: 'One of the twelve Jyotirlingas, sacred Shiva temple'
    },
    {
      id: 'attr10',
      name: 'Lodh Falls',
      type: 'attraction',
      position: [23.72, 84.68] as [number, number],
      description: 'Highest waterfall in Jharkhand, surrounded by dense forests'
    },
    {
      id: 'attr11',
      name: 'Shikharji',
      type: 'attraction',
      position: [23.97, 86.15] as [number, number],
      description: 'Sacred mountain peak with numerous Jain temples'
    },
    {
      id: 'attr12',
      name: 'Deer Park',
      type: 'attraction',
      position: [23.40, 85.35] as [number, number],
      description: 'Wildlife sanctuary with various deer species and birds'
    },
    {
      id: 'attr13',
      name: 'Rock Garden',
      type: 'attraction',
      position: [23.39, 85.34] as [number, number],
      description: 'Beautiful garden with rock sculptures and waterfalls'
    },
    {
      id: 'attr14',
      name: 'Biodiversity Park',
      type: 'attraction',
      position: [23.41, 85.36] as [number, number],
      description: 'Conservation area with diverse flora and fauna'
    },
    {
      id: 'attr15',
      name: 'Tribal Museum',
      type: 'attraction',
      position: [23.37, 85.32] as [number, number],
      description: 'Museum showcasing tribal culture and heritage of Jharkhand'
    }
  ];

  // Initialize map function
  const initMap = useCallback(async () => {
    if (!mapRef.current || mapInstance.current || isMapInitialized) return;

    try {
      setIsLoading(true);
      
      const L = await import('leaflet');
      
      // Fix for default markers in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      if (mapRef.current && (mapRef.current as any)._leaflet_id) {
        setIsLoading(false);
        return;
      }

      // Initialize map with proper height calculation (subtract header height)
      const headerHeight = 64; // Approximate height of the header
      const mapHeight = mapContainerRef.current?.clientHeight || 400 - headerHeight;
      
      const leafletMap = L.map(mapRef.current!, {
        zoomControl: false // We'll add custom zoom control later
      }).setView([23.5, 85.0], 8);

      // Add zoom control to the top right (not bottom right)
      L.control.zoom({
        position: 'topright'
      }).addTo(leafletMap);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);

      // Add destination markers
      mapPoints.forEach(point => {
        const marker = L.marker(point.position).addTo(leafletMap);
        
        marker.bindPopup(`
          <div class="p-2 max-w-xs">
            <h3 class="font-semibold text-green-800 text-lg mb-1">${point.name}</h3>
            ${point.description ? `<p class="text-sm text-gray-600">${point.description.substring(0, 100)}...</p>` : ''}
          </div>
        `);
      });

      // Add trekking routes
      trekkingRoutes.forEach(route => {
        const polyline = L.polyline(route.path, {
          color: route.difficulty === 'easy' ? 'green' : route.difficulty === 'medium' ? 'orange' : 'red',
          weight: 5,
          opacity: 0.8,
          dashArray: route.difficulty === 'hard' ? '5, 10' : undefined
        }).addTo(leafletMap);
        
        const popupContent = `
          <div class="p-3">
            <h3 class="font-semibold text-green-800 text-lg mb-2">${route.name}</h3>
            <div class="space-y-1 text-sm">
              <p><span class="font-medium">Difficulty:</span> 
                <span class="inline-block w-3 h-3 rounded-full ${
                  route.difficulty === 'easy' ? 'bg-green-500' : 
                  route.difficulty === 'medium' ? 'bg-orange-500' : 'bg-red-500'
                } mr-1"></span>
                ${route.difficulty}
              </p>
              <p><span class="font-medium">Length:</span> ${route.length} km</p>
              <p><span class="font-medium">Duration:</span> ${route.duration}</p>
            </div>
          </div>
        `;

        polyline.bindPopup(popupContent);
      });

      // Add nearby attractions with PURPLE markers
      nearbyAttractions.forEach(attr => {
        const marker = L.marker(attr.position, {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(leafletMap);
        
        marker.bindPopup(`
          <div class="p-3">
            <h3 class="font-semibold text-purple-700 text-lg mb-2">${attr.name}</h3>
            ${attr.description ? `<p class="text-sm text-gray-600">${attr.description}</p>` : ''}
            <div class="mt-2 flex items-center text-xs text-purple-600">
              <span class="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
              Nearby Attraction
            </div>
          </div>
        `);
      });

      // Fit map to show all features with padding
      const allPoints = [
        ...mapPoints.map(p => p.position),
        ...nearbyAttractions.map(a => a.position),
        ...trekkingRoutes.flatMap(r => r.path)
      ];

      const bounds = L.latLngBounds(allPoints);
      leafletMap.fitBounds(bounds, { padding: [50, 50] });

      mapInstance.current = leafletMap;
      setIsMapInitialized(true);
      setIsLoading(false);
      
      if (onMapInit) {
        onMapInit();
      }
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to load map. Please try again later.');
      setIsLoading(false);
    }
  }, [isMapInitialized, mapPoints, onMapInit]);

  // Set up intersection observer only if autoInit is true
  useEffect(() => {
    if (!autoInit) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      if (mapContainerRef.current) {
        observer.unobserve(mapContainerRef.current);
      }
    };
  }, [autoInit]);

  // Initialize map when component comes into view
  useEffect(() => {
    if (autoInit && isInView && !isMapInitialized) {
      initMap();
    }
  }, [autoInit, isInView, isMapInitialized, initMap]);

  // Center map on selected destination
  useEffect(() => {
    if (mapInstance.current && selectedDestination) {
      const point = mapPoints.find(p => p.id === selectedDestination.id);
      if (point) {
        mapInstance.current.setView(point.position, 12);
        mapInstance.current.eachLayer((layer: any) => {
          if (layer instanceof (window as any).L.Marker && 
              layer.getLatLng().lat === point.position[0] && 
              layer.getLatLng().lng === point.position[1]) {
            layer.openPopup();
          }
        });
      }
    }
  }, [selectedDestination, mapPoints]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        setIsMapInitialized(false);
      }
    };
  }, []);

  // Function to manually trigger map initialization
  const initializeMapManually = useCallback(() => {
    if (!isMapInitialized) {
      initMap();
    }
  }, [initMap, isMapInitialized]);

  // Expose the manual initialization function
  useEffect(() => {
    (window as any).initializeOSMMap = initializeMapManually;
    
    return () => {
      delete (window as any).initializeOSMMap;
    };
  }, [initializeMapManually]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full rounded-lg overflow-hidden shadow-md ${className || ''}`}
      id="osm-map-container"
    >
      {/* Header - Always visible */}
      <div className="bg-green-800 text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-xl font-semibold">🌍 Explore Jharkhand</h2>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Destinations</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
            <span>Attractions</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-green-500 mr-1"></div>
            <span>Easy Trails</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-orange-500 mr-1"></div>
            <span>Medium Trails</span>
          </div>
        </div>
      </div>
      
      {/* Map container - Separate from header */}
      <div ref={mapContainerRef} className="h-96 w-full relative bg-gray-100">
        <div ref={mapRef} className="h-full w-full"></div>
        
        {!isMapInitialized && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-10">
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Interactive Map</h3>
              <p className="text-gray-600 text-sm mb-4 max-w-xs">
                Click the button below to load the interactive map and explore destinations across Jharkhand.
              </p>
              <button 
                onClick={initializeMapManually}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Load Interactive Map
              </button>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-2"></div>
              <div className="text-green-800 font-medium">Loading map...</div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-10">
            <div className="text-center p-4">
              <div className="text-red-600 font-medium mb-2">⚠️ Map Loading Failed</div>
              <div className="text-gray-600 text-sm mb-4 max-w-xs">{error}</div>
              <button 
                onClick={initMap}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer - Always visible */}
      <div className="bg-white p-4 border-t">
        <p className="text-sm text-gray-600">
          Use the map to explore tourist destinations, nearby attractions, and trekking routes across Jharkhand.
        </p>
      </div>
    </motion.div>
  );
};

export default OSMMap;