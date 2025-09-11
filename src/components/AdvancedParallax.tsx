'use client'

import { useRef, useEffect, useState } from 'react'

interface Layer {
  image: string
  speed: number
  scale: number
  opacity?: number
  blendMode?: string
}

interface AdvancedParallaxProps {
  layers: Layer[]
  children: React.ReactNode
}

export default function AdvancedParallax({ layers, children }: AdvancedParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rawMousePosition, setRawMousePosition] = useState({ x: 0, y: 0 }) // For cursor only
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        
        setMousePosition({ x, y })
        setRawMousePosition({ x: e.clientX, y: e.clientY }) // Store raw position
      }
    }

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (isMobile && e.gamma && e.beta) {
        const x = (e.gamma / 45) * 0.5 // Reduced sensitivity for mobile
        const y = (e.beta / 45) * 0.5  // Reduced sensitivity for mobile
        setMousePosition({ x, y })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      
      // Add device orientation for mobile tilt effect
      if (typeof DeviceOrientationEvent !== 'undefined') {
        window.addEventListener('deviceorientation', handleDeviceOrientation)
      }
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden cursor-none" // Hide default cursor
    >
      {/* Multiple Parallax Layers */}
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${layer.image})`,
            transform: `translateX(${mousePosition.x * layer.speed * 30}px) translateY(${mousePosition.y * layer.speed * 30}px) scale(${layer.scale})`,
            opacity: layer.opacity || 1,
            mixBlendMode: layer.blendMode as any || 'normal',
            zIndex: index,
            willChange: 'transform',
            filter: 'brightness(1.1) contrast(1.1)'
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-10" />
      
      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        {children}
      </div>

      {/* Custom Cursor (desktop only) */}
      {!isMobile && (
        <div
          className="fixed w-8 h-8 rounded-full border-2 border-white/80 pointer-events-none z-50 transition-all duration-100 ease-out backdrop-blur-sm"
          style={{
            left: `${rawMousePosition.x}px`,
            top: `${rawMousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
          }}
        />
      )}
    </div>
  )
}