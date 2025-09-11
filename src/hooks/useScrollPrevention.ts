'use client'

import { useEffect } from 'react'

export function useScrollPrevention() {
  useEffect(() => {
    // Save current scroll position
    const savedScrollPosition = window.scrollY
    
    // Temporarily disable scroll
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    
    // Restore after components are mounted
    const timer = setTimeout(() => {
      document.body.style.overflow = originalStyle
      window.scrollTo(0, savedScrollPosition)
    }, 100)

    return () => {
      document.body.style.overflow = originalStyle
      clearTimeout(timer)
    }
  }, [])
}