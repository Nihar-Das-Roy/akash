"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import ReviewSection from "@/components/review-section"
import { productsData, reviewsData } from "@/lib/data"
import { addToCart } from "@/lib/store"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage({ params }: PageProps) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [cartMessage, setCartMessage] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const getProductId = async () => {
    const p = await params
    setId(p.id)
  }

  useEffect(() => {
    getProductId()
  }, [])

  if (!id) return null

  const product = productsData.find((p) => p.id === id)
  const productReviews = reviewsData.filter((r) => r.productId === id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">পণ্য খুঁজে পাওয়া যায়নি</p>
            <Link href="/categories" className="text-blue-900 hover:text-orange-500">
              ক্যাটাগরিতে ফিরে যান
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product.id, product.price, quantity)
    setCartMessage("সফলভাবে কার্টে যোগ হয়েছে!")
    setTimeout(() => setCartMessage(""), 3000)
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

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
          <Link href="/categories" className="text-blue-900 hover:text-orange-500">
            ক্যাটাগরি
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discountPercent > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                    -{discountPercent}%
                  </div>
                )}
              </div>

              {/* Image Badges */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.district}
                </span>
                <span className="bg-orange-100 text-orange-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.division}
                </span>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} রিভিউ)</span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                <p className="text-gray-600 mb-2">মূল্য</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-orange-500">{product.price} টাকা</span>
                  {product.originalPrice > product.price && (
                    <span className="text-2xl text-gray-400 line-through">{product.originalPrice} টাকা</span>
                  )}
                </div>
                {discountPercent > 0 && <p className="text-green-600 font-semibold">{discountPercent}% ছাড় পান</p>}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-700">পরিমাণ:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {cartMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 text-green-800 px-4 py-3 rounded-lg font-semibold"
                  >
                    {cartMessage}
                  </motion.div>
                )}

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition font-bold text-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  কার্টে যোগ করুন
                </button>

                <button
                  onClick={() => router.push(`/checkout?product=${product.id}&quantity=${quantity}`)}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg"
                >
                  ক্যাশ অন ডেলিভারিতে অর্ডার করুন
                </button>

                <button className="w-full bg-yellow-400 text-blue-900 py-4 rounded-lg hover:bg-yellow-500 transition font-bold text-lg">
                  Pay Online (SSLCommerz)
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex-1 py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2 ${
                      isWishlisted ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                    উইশলিস্ট
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    শেয়ার করুন
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex gap-3">
                  <Truck className="text-orange-500 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">দ্রুত ডেলিভারি</p>
                    <p className="text-sm text-gray-600">সারা দেশে</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="text-orange-500 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">নিরাপদ ক্রয়</p>
                    <p className="text-sm text-gray-600">১০০% সুরক্ষিত</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <ReviewSection productId={product.id} initialReviews={productReviews} productRating={product.rating} />
          </div>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
