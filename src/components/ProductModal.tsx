'use client'

import { Product } from '@/data/marketplace'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                ✕
              </button>
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {product.category}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                {product.name}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-600">Location</p>
                  <p className="font-semibold">📍 {product.location}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-600">Price</p>
                  <p className="font-semibold">
                    {product.currency}{product.price}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      / {product.category === 'homestay' ? 'night' : 'person'}
                    </span>
                  </p>
                </div>
              </div>

              {product.rating && (
                <div className="flex items-center mb-6">
                  <span className="text-lg font-semibold mr-2">Rating:</span>
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    ⭐ {product.rating}/5
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Book Now
                </button>
                <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-lg font-semibold transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}