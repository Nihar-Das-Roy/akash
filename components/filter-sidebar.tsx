"use client"

import { useState } from "react"

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  priceRange: [number, number]
  rating: number
  division: string
  discount: boolean
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    rating: 0,
    division: "",
    discount: false,
  })

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
      <h3 className="text-xl font-bold mb-6 text-gray-900">ফিল্টার</h3>

      {/* Price Range */}
      <div className="mb-8 pb-8 border-b">
        <h4 className="font-semibold mb-4 text-gray-800">দাম পরিসীমা</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">সর্বনিম্ন: {filters.priceRange[0]} টাকা</label>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handleFilterChange({
                  priceRange: [Number.parseInt(e.target.value), filters.priceRange[1]],
                })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">সর্বোচ্চ: {filters.priceRange[1]} টাকা</label>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange({
                  priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
                })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-8 pb-8 border-b">
        <h4 className="font-semibold mb-4 text-gray-800">রেটিং</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => handleFilterChange({ rating: Number.parseInt(e.target.value) })}
                className="w-4 h-4"
              />
              <span className="flex items-center gap-1 text-sm text-gray-700">
                {"⭐".repeat(rating)} ({rating})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="mb-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.discount}
            onChange={(e) => handleFilterChange({ discount: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-gray-700 font-medium">শুধুমাত্র ছাড় পণ্য</span>
        </label>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          const resetFilters = {
            priceRange: [0, 500] as [number, number],
            rating: 0,
            division: "",
            discount: false,
          }
          setFilters(resetFilters)
          onFilterChange(resetFilters)
        }}
        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
      >
        ফিল্টার রিসেট করুন
      </button>
    </div>
  )
}
