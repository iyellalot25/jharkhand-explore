'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Navbar = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/itinerary', label: 'Plan Trip' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/chat', label: 'Chat' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold hover:text-orange-400 transition-colors">
              Jharkhand Explore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-orange-400 transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href ? 'text-orange-400 bg-green-800' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Admin Portal Button */}
            <Link
              href="/admin/login"
              className="bg-white text-green-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Admin Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-orange-400 focus:outline-none focus:text-orange-400"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-800 rounded-lg mt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-orange-400 bg-green-900'
                    : 'text-white hover:text-orange-400 hover:bg-green-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Admin Portal Button for Mobile */}
            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-white text-green-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors text-center mt-2"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar