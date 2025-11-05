"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  // ✅ লগইন চেক
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else window.location.href = "/login";
    });
    return () => unsub();
  }, []);

  // 🛍️ প্রোডাক্ট লোড
  useEffect(() => {
    const loadProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    loadProducts();
  }, []);

  if (!user) return null;

  return (
    <div>
      <h1>👑 Welcome, {user.email}</h1>
      <button
        onClick={() => signOut(auth)}
        style={{ background: "red", color: "white", padding: "5px 10px", borderRadius: "5px" }}
      >
        Logout
      </button>

      <h2 style={{ marginTop: "20px" }}>📦 Total Products: {products.length}</h2>
    </div>
  );
}
