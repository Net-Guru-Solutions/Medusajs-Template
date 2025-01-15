"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Product, CartItem, Customer } from '@/types'
import { POSHeader } from '@/components/layout/pos-header'
import { ProductGrid } from '@/components/product-grid'
import { CustomerLookup } from '@/components/customer-lookup'
import { Cart } from '@/components/cart'
import { Checkout } from '@/components/checkout'

// Mock data (to be replaced with API calls)
const mockProducts: Product[] = [
  { id: "1", name: "Combat Boots", price: 89.99, barcode: "123456", stockLevel: 50, image: "/images/combat-boots.jpg" },
  { id: "2", name: "Tactical Vest", price: 129.99, barcode: "234567", stockLevel: 30, image: "/images/tactical-vest.jpg" },
  { id: "3", name: "Military Backpack", price: 79.99, barcode: "345678", stockLevel: 40, image: "/images/military-backpack.jpg" },
  { id: "4", name: "Combat Knife", price: 49.99, barcode: "456789", stockLevel: 20, image: "/images/combat-knife.jpg" },
  { id: "5", name: "Tactical Flashlight", price: 34.99, barcode: "567890", stockLevel: 60, image: "/images/tactical-flashlight.jpg" },
]

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      // Simulate API call
      setTimeout(() => {
        setProducts(mockProducts)
        setLoading(false)
      }, 1000)
    }
  }, [user, router])

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0))
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode.includes(searchQuery)
  )

  if (!user) {
    return null // or a loading indicator
  }

  return (
    <div className="flex flex-col h-screen">
      <POSHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 overflow-auto">
          <ProductGrid
            products={filteredProducts} 
            onAddToCart={addToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
          />
        </div>
        <div className="w-1/3 border-l flex flex-col">
          <CustomerLookup onSelectCustomer={setCustomer} />
          <Cart
            items={cart} 
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            customer={customer}
          />
          <Checkout cart={cart} customer={customer} employee={user} />
        </div>
      </div>
    </div>
  )
}

