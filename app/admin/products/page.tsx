"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"

interface Product {
  id?: string
  title: string
  description: string
  category: string
  price: number | string
  stock: number | string
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  })

  // 🔹 Product Load Function
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"))
    const productData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[]
    setProducts(productData)
  }

  // 🔹 Load on Page Open
  useEffect(() => {
    fetchProducts()
  }, [])

  // 🔹 Add New Product
  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price) {
      alert("Title এবং Price দিতে হবে!")
      return
    }

    await addDoc(collection(db, "products"), {
      ...newProduct,
      price: parseFloat(newProduct.price as string),
      stock: parseInt(newProduct.stock as string) || 0,
      createdAt: new Date(),
    })

    alert("✅ নতুন প্রোডাক্ট যুক্ত হয়েছে!")

    setNewProduct({
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    })

    fetchProducts()
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛍️ Product Management Panel</h1>

      {/* 🔸 Add Product Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-3">➕ নতুন প্রোডাক্ট যোগ করুন</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border p-2 rounded col-span-2"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border p-2 rounded col-span-2"
            rows={3}
          />
        </div>
        <button
          onClick={addProduct}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
        >
          ✅ প্রোডাক্ট যোগ করুন
        </button>
      </div>

      {/* 🔸 Product List */}
      <h2 className="font-semibold mb-3">📦 সব প্রোডাক্ট ({products.length})</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">কোনো প্রোডাক্ট পাওয়া যায়নি 😔</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-gray-600 text-sm">💰 {p.price}৳</p>
              <p className="text-gray-600 text-sm">স্টক: {p.stock}</p>
              <p className="text-gray-500 text-sm mb-2">ক্যাটেগরি: {p.category}</p>
              {p.description && (
                <p className="text-gray-700 text-sm line-clamp-3">{p.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

