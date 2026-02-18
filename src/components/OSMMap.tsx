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

  // Updated nearby attractions with more accurate coordinates (PRIORITY 1)
    const nearbyAttractions: MapPoint[] = [
    {
      id: 'attr1',
      name: 'Jonha Falls',
      type: 'attraction',
      position: [23.63, 85.53],
      description: 'Beautiful waterfall often called the Pearl Necklace'
    },
    {
      id: 'attr2',
      name: 'Tagore Hill',
      type: 'attraction',
      position: [23.38, 85.33],
      description: 'Hill named after Rabindranath Tagore with panoramic views of Ranchi'
    },
    {
      id: 'attr3',
      name: 'Palamau Fort',
      type: 'attraction',
      position: [23.55, 84.15],
      description: 'Historic fort with rich cultural heritage near Betla'
    },
    {
      id: 'attr4',
      name: 'Hundru Falls',
      type: 'attraction',
      position: [23.45, 85.65],
      description: 'Stunning waterfall on Subarnarekha River'
    },
    {
      id: 'attr5',
      name: 'Dassam Falls',
      type: 'attraction',
      position: [23.35, 85.32],
      description: 'Magnificent waterfall with multiple cascades'
    },
    {
      id: 'attr7',
      name: 'Sun Temple',
      type: 'attraction',
      position: [23.42, 85.44],
      description: 'Beautiful temple dedicated to the Sun God near Ranchi'
    },
    {
      id: 'attr8',
      name: 'Ranchi Lake',
      type: 'attraction',
      position: [23.36, 85.33],
      description: 'Serene artificial lake perfect for boating and relaxation'
    },
    {
      id: 'attr10',
      name: 'Lodh Falls',
      type: 'attraction',
      position: [23.72, 84.68],
      description: 'Highest waterfall in Jharkhand, surrounded by dense forests'
    },
    {
      id: 'attr12',
      name: 'Deer Park',
      type: 'attraction',
      position: [23.40, 85.35],
      description: 'Wildlife sanctuary with various deer species and birds'
    },
    {
      id: 'attr13',
      name: 'Rock Garden',
      type: 'attraction',
      position: [23.39, 85.34],
      description: 'Beautiful garden with rock sculptures and waterfalls in Ranchi'
    },
    {
      id: 'attr14',
      name: 'Biodiversity Park',
      type: 'attraction',
      position: [23.41, 85.36],
      description: 'Conservation area with diverse flora and fauna'
    },
    {
      id: 'attr15',
      name: 'Tribal Museum',
      type: 'attraction',
      position: [23.37, 85.32],
      description: 'Museum showcasing tribal culture and heritage of Jharkhand'
    },
    {
      id: 'attr17',
      name: 'Gonda Hill',
      type: 'attraction',
      position: [23.39, 85.32],
      description: 'Scenic hill with panoramic views of Ranchi'
    },
    {
      id: 'attr18',
      name: 'Nakshatra Van',
      type: 'attraction',
      position: [23.38, 85.34],
      description: 'Astrological garden with plants associated with different stars'
    },
    {
      id: 'attr19',
      name: 'Panchghag Falls',
      type: 'attraction',
      position: [23.34, 85.52],
      description: 'Picturesque waterfall with five cascading streams near Ranchi'
    },
    {
      id: 'attr23',
      name: 'Sita Falls',
      type: 'attraction',
      position: [23.44, 85.52],
      description: 'Beautiful waterfall named after Goddess Sita, near Ranchi'
    },
    {
      id: 'attr24',
      name: 'Jagannath Temple',
      type: 'attraction',
      position: [23.31694, 85.28167],
      description: 'Historic 17th-century temple dedicated to Lord Jagannath, located atop a hillock in Dhurwa, Ranchi.'
    }
  ];


  // Create a set of hardcoded attraction names for filtering
  const hardcodedAttractionNames = new Set(nearbyAttractions.map(attr => attr.name));

  // Convert destinations to map points with ACTUAL coordinates (PRIORITY 2)
  // Filter out destinations that are already in hardcoded attractions
  const mapPoints: MapPoint[] = destinations
    .filter(dest => !hardcodedAttractionNames.has(dest.name))
    .map((dest, index) => {
      // Use actual coordinates for known destinations, fallback to approximate for others
        const destinationCoordinates: { [key: string]: [number, number] } = {
        // Main destinations from database
        'Hundru Falls': [23.4375, 85.5917],
        'Jonha Falls': [23.6300, 85.5300],
        'Baidyanath Temple': [24.4872, 86.7014],
        'Betla National Park': [23.8800, 84.2000],
        'Ranchi Lake': [23.3600, 85.3300],
        'Tagore Hill': [23.3800, 85.3300],
        'Jubilee Park': [22.7947, 86.1951],
        'Patratu Valley': [23.6600, 85.2800],
        'Dassam Falls': [23.3500, 85.3200],
        'Palamu Fort': [23.9100, 84.0700],
        'Netarhat': [23.4700, 84.2600],
        'Dimna Lake': [22.8500, 86.2500],
        'Sun Temple Ranchi': [23.4200, 85.4400],
        'Dalma Wildlife Sanctuary': [22.9300, 86.2000],
        'Rajrappa Temple': [23.6200, 85.8900],
        'Lodh Falls': [23.7200, 84.6800],
        'Tata Steel Zoological Park': [22.7856, 86.1758],
        'Maithon Dam': [23.8600, 86.8100],
        'Deori Temple': [24.4900, 86.7100],
        'Kanke Dam': [23.4300, 85.3200],
        'Tribal Research Institute Museum': [23.3700, 85.3200],
        'McCluskieganj': [23.6000, 85.0000],
        'Hazaribagh National Park': [23.9900, 85.3600],
        'Parasnath Hills': [23.9700, 86.1500],
        'Usri Falls': [24.3200, 86.2200],
        'Rock Garden Ranchi': [23.3900, 85.3400],
        'Massanjore Dam': [24.4700, 87.2200],
        'Jagannath Temple Ranchi': [23.3169, 85.2817],
        'Konar Dam': [23.7800, 85.5300],
        'Chhinnamastika Temple': [23.6200, 85.8900]
      };


      const position = destinationCoordinates[dest.name] || [
        23.5 + (Math.random() * 0.4 - 0.2), // More realistic spread within Jharkhand
        85.0 + (Math.random() * 0.4 - 0.2)
      ] as [number, number];

      return {
        id: dest.id,
        name: dest.name,
        type: 'destination',
        description: dest.description,
        image: dest.image,
        position
      };
    });

  // Updated trekking routes with more accurate coordinates
  const trekkingRoutes: TrekkingRoute[] = [
    {
      id: 'tr1',
      name: 'Netarhat Trek',
      path: [
        [23.48, 84.27], // Netarhat
        [23.50, 84.30],
        [23.52, 84.32],
        [23.54, 84.34]
      ],
      difficulty: 'medium',
      length: 12,
      duration: '4-5 hours'
    },
    {
      id: 'tr2',
      name: 'Hundru Falls Trail',
      path: [
        [23.40, 85.60], // Approach to Hundru Falls
        [23.42, 85.62],
        [23.44, 85.63],
        [23.45, 85.65] // Hundru Falls
      ],
      difficulty: 'easy',
      length: 6,
      duration: '2-3 hours'
    },
    {
      id: 'tr3',
      name: 'Jonha Falls Trek',
      path: [
        [23.60, 85.50], // Base approach
        [23.62, 85.52],
        [23.63, 85.53], // Jonha Falls
        [23.64, 85.54]
      ],
      difficulty: 'easy',
      length: 4,
      duration: '1-2 hours'
    },
    {
      id: 'tr4',
      name: 'Parasnath Hill Trek',
      path: [
        [23.95, 86.12], // Base
        [23.96, 86.13],
        [23.97, 86.14], // Parasnath Peak
        [23.98, 86.15]
      ],
      difficulty: 'hard',
      length: 18,
      duration: '6-7 hours'
    },
    {
      id: 'tr5',
      name: 'Dassam Falls Trail',
      path: [
        [23.32, 85.30],
        [23.34, 85.31],
        [23.35, 85.32], // Dassam Falls
        [23.36, 85.33]
      ],
      difficulty: 'easy',
      length: 5,
      duration: '2 hours'
    },
    {
      id: 'tr6',
      name: 'Betla Forest Trek',
      path: [
        [23.85, 84.15],
        [23.87, 84.18],
        [23.88, 84.20], // Betla National Park
        [23.89, 84.22]
      ],
      difficulty: 'medium',
      length: 10,
      duration: '3-4 hours'
    },
    {
      id: 'tr7',
      name: 'Lodh Falls Trail',
      path: [
        [23.70, 84.65],
        [23.71, 84.67],
        [23.72, 84.68], // Lodh Falls area
        [23.73, 84.69]
      ],
      difficulty: 'medium',
      length: 8,
      duration: '3 hours'
    },
    {
      id: 'tr8',
      name: 'Dalma Wildlife Trek',
      path: [
        [22.90, 86.18],
        [22.92, 86.19],
        [22.93, 86.20], // Dalma Wildlife Sanctuary
        [22.94, 86.21]
      ],
      difficulty: 'easy',
      length: 7,
      duration: '2.5 hours'
    },
    {
  id: 'tr9',
  name: 'Patratu Valley Ridge Walk',
  path: [
    [23.66, 85.28],
    [23.67, 85.30],
    [23.68, 85.32],
    [23.69, 85.34]  // Scenic ridge overlooking Patratu Dam
  ],
  difficulty: 'medium',
  length: 9,
  duration: '3 hours'
},
{
  id: 'tr10',
  name: 'Rajrappa Temple Riverside Trail',
  path: [
    [23.62, 85.89],
    [23.63, 85.90],
    [23.64, 85.91],
    [23.65, 85.92]  // Along the confluence of Damodar & Bhairavi rivers
  ],
  difficulty: 'easy',
  length: 4,
  duration: '1.5 hours'
},
{
  id: 'tr11',
  name: 'McCluskieganj Colonial Heritage Walk',
  path: [
    [23.60, 85.00],
    [23.61, 85.01],
    [23.62, 85.02],
    [23.63, 85.03]  // Through old Anglo-Indian bungalows & forest stretches
  ],
  difficulty: 'easy',
  length: 5,
  duration: '2 hours'
},
{
  id: 'tr12',
  name: 'Topchanchi Lake Nature Trek',
  path: [
    [23.90, 86.17],
    [23.91, 86.18],
    [23.92, 86.19],
    [23.93, 86.20]  // Around Topchanchi Lake & forested hills
  ],
  difficulty: 'medium',
  length: 6,
  duration: '2-3 hours'
},
{
  id: 'tr13',
  name: 'Usri Falls Canyon Trek',
  path: [
    [24.30, 86.20],
    [24.31, 86.21],
    [24.32, 86.22],
    [24.33, 86.23]  // Narrow gorge trail to Usri Falls
  ],
  difficulty: 'hard',
  length: 7,
  duration: '3-4 hours'
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

      const leafletMap = L.map(mapRef.current!, {
        zoomControl: false
      }).setView([23.5, 85.0], 8);

      // Add zoom control to the top right
      L.control.zoom({
        position: 'topright'
      }).addTo(leafletMap);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);

      // Add destination markers (from database)
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
          dashArray: route.difficulty === 'hard' ? '5, 10' : undefined,
          interactive: true,
          bubblingMouseEvents: true
        }).addTo(leafletMap);
        polyline.setStyle({
          weight: 32,     // clickable area
          opacity: 0.0,   // invisible
          className: 'click-buffer'
        });

        const visiblePolyline = L.polyline(route.path, {
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

      // Add nearby attractions with PURPLE markers (hardcoded - priority)
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
      // First check if it's in hardcoded attractions
      const attractionPoint = nearbyAttractions.find(a => a.name === selectedDestination.name);
      
      // If not, check in database destinations
      const destinationPoint = !attractionPoint 
        ? mapPoints.find(p => p.id === selectedDestination.id)
        : null;
      
      const point = attractionPoint || destinationPoint;
      
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
          <div className="flex items-center">
            <div className="w-4 h-1 bg-red-500 mr-1"></div>
            <span>Hard Trails</span>
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
                Map will load automatically when you click "View All on Map"
              </p>
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