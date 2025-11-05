"use client"

import { MessageCircle, Phone } from "lucide-react"

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/01334762288?text=আমি%20Captain%20Shop%20থেকে%20তথ্য%20চাই।"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
        title="WhatsApp এ যোগাযোগ করুন"
      >
        <MessageCircle size={24} />
      </a>

      {/* Messenger Button */}
      <a
        href="https://m.me/captainshop"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
        title="Messenger এ চ্যাট করুন"
      >
        <MessageCircle size={24} />
      </a>

      {/* Call Button */}
      <a
        href="tel:01334762288"
        className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center justify-center"
        title="সরাসরি কল করুন"
      >
        <Phone size={24} />
      </a>
    </div>
  )
}
