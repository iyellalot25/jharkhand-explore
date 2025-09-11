'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import AdvancedParallax from '@/components/AdvancedParallax'

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  
  // Multi-layer parallax configuration
  const parallaxLayers = [
    {
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop', // Distant mountains
      speed: 0.05,
      scale: 1.3,
      opacity: 0.4
    },
    {
      image: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=1200&auto=format&fit=crop', // Forest layer
      speed: 0.1,
      scale: 1.2,
      opacity: 0.6
    },
    {
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&auto=format&fit=crop', // Waterfall foreground
      speed: 0.2,
      scale: 1.1,
      opacity: 0.8
    },
    {
      image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=1200&auto=format&fit=crop', // Texture overlay
      speed: 0.3,
      scale: 1.0,
      opacity: 0.3,
      blendMode: 'overlay'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll indicator when user starts scrolling
      if (window.scrollY > 50) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Advanced Multi-layer Parallax */}
      <AdvancedParallax layers={parallaxLayers}>
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            >
              Discover Jharkhand
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/95 mb-10 drop-shadow-lg font-light"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            >
              Where Nature's Beauty Meets Tribal Heritage
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
            >
              <Link 
                href="/destinations"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl backdrop-blur-md bg-opacity-90 border-2 border-green-500/30"
              >
                🌄 Explore Destinations
              </Link>
              <Link 
                href="/itinerary"
                className="border-3 border-white/80 text-white hover:bg-white hover:text-green-900 px-10 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 backdrop-blur-md bg-white/10"
              >
                🗺️ Plan Your Trip
              </Link>
            </motion.div>

            {/* Scroll indicator - conditionally rendered */}
            {showScrollIndicator && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="animate-bounce">
                  <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                  </div>
                  <p className="text-white/70 text-sm mt-2">Scroll to explore</p>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatedSection>
      </AdvancedParallax>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-green-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.h2 
              className="text-4xl font-bold text-center text-green-800 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose Jharkhand Explore?
            </motion.h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: '🤖', 
                title: 'AI-Powered Itineraries', 
                desc: 'Get personalized trip plans crafted by our intelligent AI based on your preferences and interests',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: '🌐', 
                title: 'Multilingual Support', 
                desc: 'Chat seamlessly in English or Hindi for all your travel queries and local insights',
                color: 'from-green-500 to-emerald-500'
              },
              { 
                icon: '🛍️', 
                title: 'Local Marketplace', 
                desc: 'Discover authentic handicrafts and homestays while supporting local communities',
                color: 'from-orange-500 to-amber-500'
              }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.1}>
                <motion.div 
                  className="text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl text-white shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16">
              Jharkhand in Numbers
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '30+', label: 'Waterfalls', icon: '💦' },
              { number: '15+', label: 'Wildlife Sanctuaries', icon: '🐘' },
              { number: '50+', label: 'Tribal Communities', icon: '🎭' },
              { number: '100+', label: 'Heritage Sites', icon: '🏛️' }
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.1}>
                <motion.div
                  className="p-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-green-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-green-200 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}