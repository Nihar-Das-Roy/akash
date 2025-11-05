"use client"

import React from "react"

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👥 Customer Management</h1>
      <ul className="space-y-2 text-lg">
        <li>সব কাস্টমারের লিস্ট দেখা</li>
        <li>কাস্টমারের অর্ডার হিস্ট্রি দেখা</li>
        <li>ইউজার ban/suspend করা</li>
      </ul>
    </div>
  )
}
