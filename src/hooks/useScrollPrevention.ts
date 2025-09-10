'use client'

import { useEffect } from 'react'

export function useScrollPrevention() {
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY
    
    // Prevent scrolling during initial load
    const preventScroll = (e: Event) => {
      e.preventDefault()
    }

    // Add event listener to prevent scroll
    window.addEventListener('scroll', preventScroll, { passive: false })
    
    // Restore after a short delay
    const timer = setTimeout(() => {
      window.removeEventListener('scroll', preventScroll)
      window.scrollTo(0, scrollY) // Restore original position
    }, 100)

    return () => {
      window.removeEventListener('scroll', preventScroll)
      clearTimeout(timer)
    }
  }, [])
}