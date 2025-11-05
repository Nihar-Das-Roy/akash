"use client"

import React from "react"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h1>
      <ul className="space-y-2 text-lg">
        <li>✅ মোট অর্ডার সংখ্যা</li>
        <li>💰 মোট বিক্রি (Revenue)</li>
        <li>👥 মোট ইউজার/কাস্টমার সংখ্যা</li>
        <li>📦 মোট প্রোডাক্ট সংখ্যা</li>
        <li>📈 Sales Chart (Daily/Weekly/Monthly)</li>
      </ul>
    </div>
  )
}



