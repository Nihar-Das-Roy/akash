"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import { useCart } from "@/hooks/use-cart"
import { productsData } from "@/lib/data"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

export default function CartPage() {
  const { cart, isLoading, removeFromCart, updateQuantity, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const cartItems = cart.items
    .map((item) => {
      const product = productsData.find((p) => p.id === item.productId)
      return { ...item, product }
    })
    .filter((item) => item.product)

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
          <span className="text-gray-800">কার্ট</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">শপিং কার্ট</h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-lg shadow-md text-center"
            >
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">আপনার কার্ট খালি</h2>
              <p className="text-gray-600 mb-8">এখনও কোনো পণ্য যোগ করেননি। কেনাকাটা শুরু করুন এবং আশ্চর্যজনক পণ্য আবিষ্কার করুন।</p>
              <Link
                href="/categories"
                className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-bold"
              >
                কেনাকাটা চালিয়ে যান
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex gap-4"
                    >
                      {/* Product Image */}
                      <Link href={`/product/${item.productId}`} className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.product?.image || "/placeholder.svg"}
                          alt={item.product?.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link href={`/product/${item.productId}`}>
                          <h3 className="font-bold text-gray-900 hover:text-orange-500 mb-2">{item.product?.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-3">{item.product?.district}</p>
                        <p className="text-lg font-bold text-orange-500">{item.price} টাকা</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">মোট</p>
                          <p className="text-lg font-bold text-blue-900">{item.price * item.quantity} টাকা</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 transition font-semibold flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          মুছুন
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">অর্ডার সারাংশ</h2>

                  {/* Order Details */}
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between text-gray-700">
                      <span>পণ্যের সংখ্যা:</span>
                      <span className="font-semibold">{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>মোট আইটেম:</span>
                      <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>পণ্যের মূল্য:</span>
                      <span className="font-semibold">{cart.total} টাকা</span>
                    </div>
                  </div>

                  {/* Delivery & Tax */}
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between text-gray-700">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-semibold text-green-600">বিনামূল্যে</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>ট্যাক্স:</span>
                      <span className="font-semibold">0 টাকা</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <span className="font-bold text-gray-900">মোট পরিমাণ:</span>
                    <span className="text-3xl font-bold text-orange-500">{cart.total} টাকা</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Link
                      href="/checkout"
                      className="w-full block text-center bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg"
                    >
                      চেকআউটে যান
                    </Link>

                    <Link
                      href="/categories"
                      className="w-full block text-center border-2 border-orange-500 text-orange-500 py-3 rounded-lg hover:bg-orange-50 transition font-semibold"
                    >
                      কেনাকাটা চালিয়ে যান
                    </Link>

                    <button
                      onClick={clearCart}
                      className="w-full bg-red-100 text-red-600 py-3 rounded-lg hover:bg-red-200 transition font-semibold"
                    >
                      কার্ট সাফ করুন
                    </button>
                  </div>

                  {/* Info */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">নোট:</span> সমস্ত দাম প্রদর্শিত হয় টাকায়। ডেলিভারি চার্জ প্রযোজ্য হতে পারে।
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
