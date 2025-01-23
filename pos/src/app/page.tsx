"use client"

import { products as initialProducts, customers } from "@/lib/data/mock";
import CustomersView from "@/components/customers-view";
import InventoryView from "@/components/inventory-view";
import { SiteHeader } from "@/components/navigation";
import type { CartItem, Product } from "../types";
import POSView from "@/components/pos-view";
import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState<"pos" | "customers" | "inventory">("pos")
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const addToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === productId)
      if (existingItem) {
        return prev.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === productId ? { ...product, stock: newStock } : product)),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "pos" && <POSView cart={cart} addToCart={addToCart} setCart={setCart} products={products} />}
        {activeTab === "customers" && <CustomersView customers={customers} />}
        {activeTab === "inventory" && <InventoryView products={products} updateProductStock={updateProductStock} />}
      </main>
    </div>
  )
}

