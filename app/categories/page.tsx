"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import FilterSidebar, { type FilterState } from "@/components/filter-sidebar"
import ProductCard from "@/components/product-card"
import { divisionsData, productsData } from "@/lib/data"
import Link from "next/link"

export default function CategoriesPage() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    rating: 0,
    division: "",
    discount: false,
  })

  const filteredProducts = productsData.filter((product) => {
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    const ratingMatch = filters.rating === 0 || product.rating >= filters.rating
    const divisionMatch = filters.division === "" || product.division === filters.division
    const discountMatch = !filters.discount || product.discount > 0

    return priceMatch && ratingMatch && divisionMatch && discountMatch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 px-4 py-3">
        <div className="container mx-auto text-sm text-gray-600">
          <Link href="/" className="text-blue-900 hover:text-orange-500">
            হোম
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">ক্যাটাগরি</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">সমস্ত পণ্য</h1>
          <p className="text-gray-600 mb-8">{filteredProducts.length} টি পণ্য পাওয়া গেছে</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar onFilterChange={setFilters} />

              {/* Division Quick Links */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h4 className="font-bold mb-4 text-gray-900">বিভাগ দ্বারা ব্রাউজ করুন</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {divisionsData.map((division) => (
                    <button
                      key={division.slug}
                      onClick={() => setFilters({ ...filters, division: division.name })}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        filters.division === division.name
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-sm">{division.name}</span>
                      <span className="text-xs ml-2">
                        ({productsData.filter((p) => p.division === division.name).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-lg shadow-md text-center">
                  <p className="text-gray-600 text-lg mb-4">কোনো পণ্য পাওয়া যায়নি</p>
                  <button
                    onClick={() =>
                      setFilters({
                        priceRange: [0, 500],
                        rating: 0,
                        division: "",
                        discount: false,
                      })
                    }
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    ফিল্টার রিসেট করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
