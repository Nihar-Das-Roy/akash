"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import ProductCard from "@/components/product-card"
import { divisionsData, productsData } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function DivisionPage({ params }: PageProps) {
  const resolvedParams = params
  const [slug, setSlug] = useState<string | null>(null)

  const getSlug = async () => {
    const p = await resolvedParams
    setSlug(p.slug)
  }

  if (!slug) {
    getSlug()
  }

  const division = divisionsData.find((d) => d.slug === slug)
  const divisionProducts = productsData.filter((p) => p.division === division?.name)

  if (!division) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">বিভাগ খুঁজে পাওয়া যায়নি</p>
            <Link href="/categories" className="text-blue-900 hover:text-orange-500">
              ক্যাটাগরিতে ফিরে যান
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

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-orange-500 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">{division.name}</h1>
          <p className="text-lg opacity-90">
            {division.districts.length} টি জেলা সহ {divisionProducts.length} টি পণ্য
          </p>
        </div>
      </div>

      {/* Districts */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6"></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {division.districts.map((district, index) => (
              <motion.div
                key={district}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:border-orange-500 border-2 border-gray-200 transition cursor-pointer"
              >
                <p className="font-semibold text-gray-900 text-center">{district}</p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  {productsData.filter((p) => p.district === district).length} পণ্য
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-4 flex-1">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">পণ্য</h2>
          {divisionProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {divisionProducts.map((product) => (
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
          ) : (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <p className="text-gray-600 text-lg">এই বিভাগে কোনো পণ্য নেই</p>
            </div>
          )}
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
