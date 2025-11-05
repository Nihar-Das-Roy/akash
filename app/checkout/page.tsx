"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import CheckoutForm, { type CheckoutData } from "@/components/checkout-form"
import { useCart } from "@/hooks/use-cart"
import { productsData } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"
import { Truck, Clock, Lock } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cart, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "ssl" | "aamar">("cod")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItems = cart.items
    .map((item) => {
      const product = productsData.find((p) => p.id === item.productId)
      return { ...item, product }
    })
    .filter((item) => item.product)

  const handleCheckout = async (formData: CheckoutData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store order data
    const orderData = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: formData,
      items: cartItems,
      total: cart.total,
      paymentMethod: formData.paymentMethod,
      status: "pending",
    }

    localStorage.setItem("lastOrder", JSON.stringify(orderData))
    clearCart()
    setIsSubmitting(false)

    // Redirect to success page
    setTimeout(() => {
      router.push("/order-success")
    }, 2000)
  }

  if (!mounted) {
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

  if (cartItems.length === 0 && !localStorage.getItem("lastOrder")) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">আপনার কার্ট খালি</p>
            <Link href="/categories" className="text-blue-900 hover:text-orange-500">
              কেনাকাটা করতে ফিরে যান
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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
          <Link href="/cart" className="text-blue-900 hover:text-orange-500">
            কার্ট
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">চেকআউট</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">অর্ডার সম্পন্ন করুন</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              {/* Payment Method Selection */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">পেমেন্ট পদ্ধতি নির্বাচন করুন</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "cod", label: "ক্যাশ অন ডেলিভারি", icon: "💵" },
                    { id: "ssl", label: "SSLCommerz", icon: "🔒" },
                    { id: "aamar", label: "AamarPay", icon: "💳" },
                  ].map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-4 rounded-lg border-2 transition text-center cursor-pointer ${
                        paymentMethod === method.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 bg-white hover:border-orange-300"
                      }`}
                    >
                      <span className="text-3xl mb-2 block">{method.icon}</span>
                      <p className="font-semibold text-gray-900">{method.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <CheckoutForm
                total={cart.total}
                paymentMethod={paymentMethod}
                onSubmit={handleCheckout}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">অর্ডার সারাংশ</h2>

                {/* Items */}
                <div className="space-y-3 pb-4 border-b max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{item.product?.name}</p>
                        <p className="text-gray-600">পরিমাণ: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">{item.price * item.quantity} টাকা</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pb-4 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>সাবটোটাল:</span>
                    <span className="font-semibold">{cart.total} টাকা</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>ডেলিভারি:</span>
                    <span className="font-semibold text-green-600">বিনামূল্যে</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>ট্যাক্স:</span>
                    <span className="font-semibold">০ টাকা</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                  <span className="font-bold text-gray-900">মোট:</span>
                  <span className="text-2xl font-bold text-orange-600">{cart.total} টাকা</span>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Truck size={20} className="text-orange-500 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">দ্রুত ডেলিভারি</p>
                      <p className="text-gray-600">সারা দেশে</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={20} className="text-orange-500 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">দ্রুত প্রক্রিয়াকরণ</p>
                      <p className="text-gray-600">২-৪ ঘন্টার মধ্যে</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Lock size={20} className="text-orange-500 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">নিরাপদ পেমেন্ট</p>
                      <p className="text-gray-600">এনক্রিপ্টেড লেনদেন</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
