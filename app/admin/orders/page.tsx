"use client"

import React from "react"

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📦 Order Management</h1>
      <ul className="space-y-2 text-lg">
        <li>🧾 নতুন অর্ডার দেখা</li>
        <li>🚚 Order status change করা</li>
        <li>💳 Payment status দেখা</li>
        <li>📜 অর্ডার ডিটেইল দেখা</li>
      </ul>
    </div>
  )
}
