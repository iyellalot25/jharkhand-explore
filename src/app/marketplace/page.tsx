'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import { marketplaceItems, Product } from '@/data/marketplace'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedCard from '@/components/AnimatedCard'
import { motion } from 'framer-motion'

type Category = 'all' | 'handicraft' | 'homestay' | 'experience'

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = marketplaceItems.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories: { id: Category; name: string; count: number }[] = [
    { id: 'all', name: 'All Products', count: marketplaceItems.length },
    { id: 'handicraft', name: 'Handicrafts', count: marketplaceItems.filter(p => p.category === 'handicraft').length },
    { id: 'homestay', name: 'Homestays', count: marketplaceItems.filter(p => p.category === 'homestay').length },
    { id: 'experience', name: 'Experiences', count: marketplaceItems.filter(p => p.category === 'experience').length },
  ]

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <motion.h1 
            className="text-4xl font-bold text-green-800 text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Local Marketplace
          </motion.h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <motion.p 
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover authentic Jharkhand handicrafts, homestays, and cultural experiences. 
            Support local artisans and communities.
          </motion.p>
        </AnimatedSection>

        {/* Search and Filter */}
        <AnimatedSection delay={0.4}>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <motion.input
                type="text"
                placeholder="Search products, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name} ({category.count})
                </motion.button>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <AnimatedSection delay={0.6}>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <AnimatedCard key={product.id} index={index}>
                  <ProductCard 
                    product={product} 
                    onViewDetails={handleViewDetails}
                  />
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.8}>
          <motion.div 
            className="mt-16 bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
              Supporting Local Communities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { number: '50+', text: 'Local Artisans Supported' },
                { number: '100%', text: 'Authentic Handmade Products' },
                { number: '25+', text: 'Villages Participating' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  )
}