'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import ParallaxBackground from '@/components/ParallaxBackground'
// or use AdvancedParallax for multi-layer effect:
import AdvancedParallax from '@/components/AdvancedParallax'

export default function Home() {
  // For multi-layer parallax:
  const parallaxLayers = [
    {
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
      speed: 0.1,
      scale: 1.2,
      opacity: 0.3
    },
    {
      image: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=1200',
      speed: 0.2,
      scale: 1.1,
      opacity: 0.5
    },
    {
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200',
      speed: 0.3,
      scale: 1.0,
      opacity: 0.7
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section with Parallax */}
      <ParallaxBackground 
        imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
        intensity={0.2}
      >
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Discover Jharkhand
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Experience the natural beauty, rich culture, and adventurous spirit of India's hidden gem
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Link 
                href="/destinations"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm bg-opacity-90"
              >
                Explore Destinations
              </Link>
              <Link 
                href="/itinerary"
                className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 backdrop-blur-sm"
              >
                Plan Your Trip
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </ParallaxBackground>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
              Why Choose Jharkhand Explore?
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🗺️', title: 'AI-Powered Itineraries', desc: 'Get personalized trip plans based on your preferences' },
              { icon: '💬', title: 'Multilingual Support', desc: 'Chat in English or Hindi for all your travel queries' },
              { icon: '🛍️', title: 'Local Marketplace', desc: 'Discover authentic handicrafts and homestays' }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.1}>
                <motion.div 
                  className="text-center p-6 bg-green-50 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}