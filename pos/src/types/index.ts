export interface Product {
    id: string
    name: string
    price: number
    sku: string
    stock: number
    image: string
    category: string
    barcode?: string
  }
  
  export interface CartItem {
    product: Product
    quantity: number
  }
  
  export interface PurchaseHistoryItem {
    id: string
    date: string
    total: number
    items: CartItem[]
    paymentMethod: "cash" | "card"
  }
  
  export interface Customer {
    id: string
    name: string
    email: string
    phone: string
    loyaltyPoints: number
    purchaseHistory: PurchaseHistoryItem[]
  }
  
  