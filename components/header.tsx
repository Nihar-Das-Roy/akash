"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, Phone } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "হোম", href: "/" },
    { name: "আমাদের সম্পর্কে", href: "/about" },
    { name: "সেবা", href: "/services" },
    { name: "ক্যাটাগরি", href: "/categories" },
    { name: "যোগাযোগ", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-orange-500">
      <div className="container mx-auto px-4">
        {/* Top Info Bar */}
        <div className="hidden md:flex justify-between items-center text-sm bg-gray-50 py-2 border-b border-gray-200">
          <div className="flex gap-6">
            <a href="tel:01334762288" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <Phone size={16} />
              <span>০১৩৩৪৭৬২২৮৮</span>
            </a>
            <a href="mailto:masbsl.com@gmail.com" className="text-gray-700 hover:text-orange-500">
              masbsl.com@gmail.com
            </a>
          </div>
          <div className="text-gray-600">
            <span>📍 বাগেরহাট, খুলনা</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-900 to-orange-500 text-white px-4 py-2 rounded-lg font-bold text-xl">
              ⛵ Captain Shop
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-500 font-medium transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-orange-500" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden flex flex-col gap-3 pb-4 border-t pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-500 font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
