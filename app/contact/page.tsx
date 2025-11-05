"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-orange-500 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">যোগাযোগ করুন</h1>
          <p className="text-xl">আমাদের সাথে সংযুক্ত থাকুন এবং আপনার মতামত শেয়ার করুন</p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">আমাদের যোগাযোগ তথ্য</h2>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <Phone size={24} className="text-orange-500 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">ফোন</h3>
                  <a href="tel:01334762288" className="text-blue-600 hover:text-blue-800">
                    +৮৮ ০১৩৩৪৭৬২২৮৮
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <Mail size={24} className="text-orange-500 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">ইমেইল</h3>
                  <a href="mailto:masbsl.com@gmail.com" className="text-blue-600 hover:text-blue-800">
                    masbsl.com@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-orange-500 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">ঠিকানা</h3>
                  <p className="text-gray-700">
                    বাগেরহাট
                    <br />
                    খুলনা, বাংলাদেশ
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">সোশ্যাল মিডিয়া</h3>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/01334762288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href="https://m.me/captainshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-md space-y-4"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">বার্তা পাঠান</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">নাম</label>
              <input
                type="text"
                placeholder="আপনার নাম"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ইমেইল</label>
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">বিষয়</label>
              <input
                type="text"
                placeholder="বিষয়"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">বার্তা</label>
              <textarea
                placeholder="আপনার বার্তা লিখুন..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-bold"
            >
              বার্তা পাঠান
            </button>
          </motion.form>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
