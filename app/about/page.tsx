"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-orange-500 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">আমাদের সম্পর্কে</h1>
          <p className="text-xl">Captain Shop - বাংলাদেশের বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম</p>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">আমরা কারা?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Captain Shop হল বাংলাদেশের একটি প্রগতিশীল অনলাইন ই-কমার্স প্ল্যাটফর্ম যা সারা দেশে গুণমানসম্পন্ন পণ্য এবং দ্রুত ডেলিভারি সেবা
              প্রদান করে।
            </p>
            <p className="text-gray-700 leading-relaxed">
              আমরা বিশ্বাস করি যে প্রতিটি গ্রাহক সর্বোত্তম মানের পণ্য এবং সেবা পাওয়ার যোগ্য। আমাদের লক্ষ্য হল অনলাইন শপিংকে সহজ, নিরাপদ এবং
              আনন্দদায়ক করা।
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের মিশন</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              আমাদের মিশন হল বাংলাদেশের প্রতিটি কোণে বিশ্বমানের পণ্য এবং সেবা পৌঁছে দেওয়া। আমরা স্থানীয় ব্যবসায়ী এবং আন্তর্জাতিক ব্র্যান্ডের
              সাথে কাজ করি যাতে আমরা আমাদের গ্রাহকদের সেরা পছন্দ দিতে পারি।
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "দ্রুত ডেলিভারি", description: "সারা বাংলাদেশে ২-৪ দিনের মধ্যে ডেলিভারি" },
              { title: "সেরা দাম", description: "প্রতিযোগিতামূলক মূল্যে উচ্চমানের পণ্য" },
              { title: "নিরাপদ পেমেন্ট", description: "100% এনক্রিপ্টেড এবং সুরক্ষিত লেনদেন" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-lg shadow-md border-2 border-orange-100"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  )
}
