"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import { motion } from "framer-motion"
import { Truck, CreditCard, RotateCcw, Phone } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      title: "দ্রুত ডেলিভারি",
      description: "সারা বাংলাদেশে দ্রুততম ডেলিভারি সেবা প্রদান করি আমরা।",
    },
    {
      icon: CreditCard,
      title: "একাধিক পেমেন্ট অপশন",
      description: "ক্যাশ অন ডেলিভারি, SSLCommerz এবং AamarPay সাপোর্ট করি।",
    },
    {
      icon: RotateCcw,
      title: "৭ দিনের রিটার্ন পলিসি",
      description: "কোনো প্রশ্ন ছাড়াই ৭ দিনের মধ্যে পণ্য ফেরত দিতে পারবেন।",
    },
    {
      icon: Phone,
      title: "২৪/৭ কাস্টমার সাপোর্ট",
      description: "যেকোনো সমস্যার জন্য সবসময় আমাদের সাথে যোগাযোগ করতে পারেন।",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-orange-500 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">আমাদের সেবা</h1>
          <p className="text-xl">Captain Shop এর বিশেষ সেবাগুলি জেনে নিন</p>
        </div>
      </section>

      {/* Services */}
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-lg shadow-md border-2 border-orange-100 hover:border-orange-500 transition"
                >
                  <Icon size={48} className="text-orange-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
