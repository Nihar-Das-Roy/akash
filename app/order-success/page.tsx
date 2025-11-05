"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"
import { CheckCircle, Copy, Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface OrderData {
  id: string
  date: string
  customer: {
    fullName: string
    phone: string
    email: string
    address: string
    city: string
    postalCode: string
  }
  total: number
  paymentMethod: string
  status: string
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder")
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder))
    }
  }, [])

  const copyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            {/* Success Message */}
            <div className="bg-gradient-to-b from-green-50 to-green-100 p-12 rounded-lg shadow-lg text-center mb-8 border-2 border-green-200">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }}>
                <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
              </motion.div>

              <h1 className="text-4xl font-bold text-green-900 mb-3">অর্ডার সফল!</h1>
              <p className="text-green-700 text-lg mb-4">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে</p>

              {order && (
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <p className="text-gray-600 text-sm mb-2">আপনার অর্ডার আইডি</p>
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-2xl font-bold text-blue-900">{order.id}</span>
                    <button
                      onClick={copyOrderId}
                      className="p-2 text-orange-500 hover:bg-orange-50 rounded transition"
                      title="কপি করুন"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                  {copied && <p className="text-green-600 text-sm mt-2">কপি করা হয়েছে!</p>}
                </div>
              )}
            </div>

            {/* Order Details */}
            {order && (
              <>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">অর্ডারের বিবরণ</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">গ্রাহকের নাম</p>
                      <p className="text-gray-900 font-semibold">{order.customer.fullName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">ফোন নম্বর</p>
                      <p className="text-gray-900 font-semibold">{order.customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">ইমেইল</p>
                      <p className="text-gray-900 font-semibold">{order.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">পেমেন্ট পদ্ধতি</p>
                      <p className="text-gray-900 font-semibold capitalize">
                        {order.paymentMethod === "cod" ? "ক্যাশ অন ডেলিভারি" : order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-gray-600 text-sm mb-2">ডেলিভারি ঠিকানা</p>
                    <p className="text-gray-900 font-semibold">{order.customer.address}</p>
                    <p className="text-gray-700">
                      {order.customer.city}, {order.customer.postalCode}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg shadow-md border-2 border-orange-200 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">মোট পরিমাণ:</span>
                    <span className="text-4xl font-bold text-orange-600">{order.total} টাকা</span>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 mb-8">
                  <h3 className="font-bold text-blue-900 mb-4">পরবর্তী পদক্ষেপ</h3>
                  <ol className="space-y-3 text-blue-700 text-sm">
                    <li className="flex gap-3">
                      <span className="font-bold flex-shrink-0">1.</span>
                      <span>আমরা আপনার অর্ডার নিশ্চিত করতে শীঘ্রই যোগাযোগ করব</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold flex-shrink-0">2.</span>
                      <span>পণ্য প্রস্তুত করা হবে এবং পাঠানো হবে</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold flex-shrink-0">3.</span>
                      <span>আপনি ট্র্যাকিং তথ্য পাবেন</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold flex-shrink-0">4.</span>
                      <span>পণ্য ডেলিভারি হবে এবং পেমেন্ট গ্রহণ করা হবে</span>
                    </li>
                  </ol>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <a
                    href="https://wa.me/01334762288?text=আমার%20অর্ডার%20নম্বর%20হল%20ORD-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp এ যোগাযোগ করুন
                  </a>
                  <a
                    href="tel:01334762288"
                    className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    সরাসরি কল করুন
                  </a>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                href="/categories"
                className="flex-1 text-center bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition font-bold"
              >
                আরও কেনাকাটা করুন
              </Link>
              <Link
                href="/"
                className="flex-1 text-center border-2 border-blue-900 text-blue-900 py-4 rounded-lg hover:bg-blue-50 transition font-bold"
              >
                হোমে ফিরুন
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
