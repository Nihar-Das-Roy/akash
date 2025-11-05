"use client"

import Link from "next/link"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-orange-500">⛵</span> Captain Shop
            </h3>
            <p className="text-gray-300 text-sm">সারা বাংলাদেশে সেরা পণ্য এবং দ্রুত ডেলিভারি সেবা।</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-orange-500">
                  হোম
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-orange-500">
                  ক্যাটাগরি
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500">
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">যোগাযোগ করুন</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-orange-500" />
                <a href="tel:01334762288" className="hover:text-orange-500">
                  ০১৩৩৪৭৬২২৮৮
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-orange-500" />
                <a href="mailto:masbsl.com@gmail.com" className="hover:text-orange-500">
                  masbsl.com@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-500" />
                <span>বাগেরহাট, খুলনা</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold mb-4">যোগাযোগ করুন</h4>
            <div className="flex gap-4">
              <a
                href="https://wa.me/01334762288"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-3 rounded-lg hover:bg-green-600 transition"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://m.me/captainshop"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Captain Shop. সকল অধিকার সংরক্ষিত।</p>
          <div className="flex gap-6 text-gray-400 text-sm mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-orange-500">
              গোপনীয়তা নীতি
            </Link>
            <Link href="/terms" className="hover:text-orange-500">
              শর্তাবলী
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
