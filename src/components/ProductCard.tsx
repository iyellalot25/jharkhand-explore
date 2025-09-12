import Image from 'next/image'
import { Product } from '@/data/marketplace'

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-green-700">
            {product.currency}{product.price}
            <span className="text-sm font-normal text-gray-500"> / {product.category === 'homestay' ? 'night' : 'person'}</span>
          </span>
          
          {product.rating && (
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              ⭐ {product.rating}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>📍 {product.location}</span>
          <button 
            onClick={() => onViewDetails(product)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}