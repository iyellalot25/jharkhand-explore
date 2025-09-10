'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '',
  threshold = 0.1
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '-50px 0px', // Prevents triggering when far from viewport
  })

  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView) {
      hasAnimated.current = true
    }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: 'easeOut'
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }} // Improves performance
    >
      {children}
    </motion.div>
  )
}