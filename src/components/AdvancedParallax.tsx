'use client'

import { useRef, useEffect, useState } from 'react'

interface Layer {
  image: string
  speed: number
  scale: number
  opacity?: number
}

interface AdvancedParallaxProps {
  layers: Layer[]
  children: React.ReactNode
}

export default function AdvancedParallax({ layers, children }: AdvancedParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        
        setMousePosition({ x, y })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden cursor-none"
    >
      {/* Multiple Parallax Layers */}
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url(${layer.image})`,
            transform: `translateX(${mousePosition.x * layer.speed * 20}px) translateY(${mousePosition.y * layer.speed * 20}px) scale(${layer.scale})`,
            opacity: layer.opacity || 1,
            zIndex: index,
            willChange: 'transform'
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-10" />
      
      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        {children}
      </div>

      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 rounded-full border-2 border-white/80 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x * 20 + 'px',
          top: mousePosition.y * 20 + 'px',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  )
}