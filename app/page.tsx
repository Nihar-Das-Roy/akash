"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import ProductCard from "@/components/product-card"
import { divisionsData, productsData } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  const featuredProducts = productsData.slice(0, 8)
  const topRatedProducts = productsData.sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-orange-500 to-orange-600 text-white py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Captain Shop</h1>
            <p className="text-xl mb-8">বাংলাদেশের সর্বত্র বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/categories"
                className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                কেনাকাটা শুরু করুন
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-orange-500 transition"
              >
                আমাদের সাথে যোগাযোগ করুন
              </Link>
              <Link
                href="/admin"
                className="bg-black/30 border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition"
              >
                🛠 Admin Panel
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divisions Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">আপনার পছন্দের ক্যাটাগরি নির্বাচন করুন</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisionsData.map((division) => (
              <motion.div
                key={division.slug}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer border-2 border-orange-200"
              >
                <Link href={`/division/${division.slug}`} className="block text-center">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">{division.name}</h3>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
                    দেখুন
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">জনপ্রিয় পণ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">সর্বোচ্চ রেটেড পণ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">আজই যোগ দিন এবং সেরা অফার পান</h2>
          <p className="text-lg mb-8"></p>
          <div className="flex gap-4 justify-center flex-wrap">
            
           
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
