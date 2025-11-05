"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle } from "lucide-react"

interface CheckoutFormProps {
  total: number
  paymentMethod: "cod" | "ssl" | "aamar"
  onSubmit: (data: CheckoutData) => void
  isSubmitting: boolean
}

export interface CheckoutData {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  paymentMethod: string
}

export default function CheckoutForm({ total, paymentMethod, onSubmit, isSubmitting }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.fullName.trim()) newErrors.fullName = "সম্পূর্ণ নাম আবশ্যক"
    if (!formData.phone || !/^01\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "বৈধ বাংলাদেশ ফোন নম্বর প্রয়োজন (01XXXXXXXXX)"
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "বৈধ ইমেইল প্রয়োজন"
    }
    if (!formData.address.trim()) newErrors.address = "ঠিকানা আবশ্যক"
    if (!formData.city.trim()) newErrors.city = "শহর/জেলা আবশ্যক"
    if (!formData.postalCode.trim()) newErrors.postalCode = "পোস্টাল কোড আবশ্যক"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (submitted && !isSubmitting) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border-2 border-green-200 p-8 rounded-lg text-center"
      >
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">অর্ডার সফলভাবে প্রেরণ হয়েছে!</h3>
        <p className="text-green-700 mb-4">আপনার অর্ডার নম্বর: ORD-{Date.now()}</p>
        <p className="text-green-600">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">ব্যক্তিগত তথ্য</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">সম্পূর্ণ নাম</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="আপনার সম্পূর্ণ নাম"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ফোন নম্বর</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ইমেইল</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="আপনার ইমেইল"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.email}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">ডেলিভারি ঠিকানা</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ঠিকানা</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="আপনার সম্পূর্ণ ঠিকানা (রাস্তা, বাড়ি নম্বর ইত্যাদি)"
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.address}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">শহর/জেলা</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="আপনার শহর বা জেলা"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.city}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">পোস্টাল কোড</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="পোস্টাল কোড"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.postalCode}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method Info */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <h4 className="font-bold text-blue-900 mb-2">
          {paymentMethod === "cod" && "ক্যাশ অন ডেলিভারি"}
          {paymentMethod === "ssl" && "SSLCommerz দিয়ে পেমেন্ট"}
          {paymentMethod === "aamar" && "AamarPay দিয়ে পেমেন্ট"}
        </h4>
        <p className="text-sm text-blue-700">
          {paymentMethod === "cod" && "পণ্য ডেলিভারি হওয়ার সময় টাকা দিতে পারবেন।"}
          {paymentMethod === "ssl" && "আপনি নিরাপদে অনলাইনে পেমেন্ট করতে পারবেন।"}
          {paymentMethod === "aamar" && "AamarPay এর মাধ্যমে নিরাপদ পেমেন্ট।"}
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-semibold">মোট পরিমাণ:</span>
          <span className="text-3xl font-bold text-orange-600">{total} টাকা</span>
        </div>
        <p className="text-sm text-orange-700">ডেলিভারি চার্জ: বিনামূল্যে | ট্যাক্স: অন্তর্ভুক্ত</p>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 rounded-lg hover:from-blue-800 hover:to-blue-700 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "প্রক্রিয়াকরণ করা হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
      </motion.button>

      {/* Terms */}
      <p className="text-sm text-gray-600 text-center">
        আমাদের কাছ থেকে অর্ডার করে আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন।
      </p>
    </form>
  )
}
