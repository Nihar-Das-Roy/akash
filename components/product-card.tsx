"use client"

import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 bg-gray-200 overflow-hidden group">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />

          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discountPercent}%
            </div>
          )}

          {product.district && (
            <div className="absolute top-3 left-3 bg-blue-900 text-white px-3 py-1 rounded-full text-xs">
              {product.district}
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-lg text-gray-900 hover:text-orange-500 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-orange-500">
            {product.price} টাকা
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice} টাকা
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            কার্টে যোগ করুন
          </button>

          <button
            className="p-2 border-2 border-gray-300 rounded-lg hover:border-orange-500 transition"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

