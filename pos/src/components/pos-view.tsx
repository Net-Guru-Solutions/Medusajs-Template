"use client"

import { Search, CreditCard, DollarSign, X, Printer, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CartItem, Product } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface POSViewProps {
  cart: CartItem[]
  addToCart: (productId: string) => void
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  products: Product[]
}

export default function POSView({ cart, addToCart, setCart, products }: POSViewProps) {
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "split">("cash")
  const [cashAmount, setCashAmount] = useState<string>("")
  const [cardAmount, setCardAmount] = useState<string>("")
  const [showReceipt, setShowReceipt] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm)),
  )

  const handlePayment = () => {
    if (paymentMethod === "split") {
      const total = Number(cashAmount) + Number(cardAmount)
      if (Math.abs(total - cartTotal) > 0.01) {
        toast.error("Total payment amount must equal cart total")
        return
      }
    }
    setShowReceipt(true)
    toast.success("Payment processed successfully")
  }

  const handleCompleteSale = () => {
    setCart([])
    setShowPayment(false)
    setShowReceipt(false)
    setCashAmount("")
    setCardAmount("")
    toast.success("Sale completed successfully")
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  if (showReceipt) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Receipt</CardTitle>
          <p className="text-center text-muted-foreground">Thank you for your purchase!</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            {paymentMethod === "split" ? (
              <>
                <div className="flex justify-between text-sm mt-2">
                  <span>Cash Payment</span>
                  <span>${cashAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Card Payment</span>
                  <span>${cardAmount}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-sm mt-2">
                <span>Payment Method</span>
                <span className="capitalize">{paymentMethod}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleCompleteSale} className="flex-1">
              New Sale
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showPayment) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Payment</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowPayment(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-lg font-medium mb-2">Total Amount</p>
              <p className="text-3xl font-bold">${cartTotal.toFixed(2)}</p>
            </div>

            <div>
              <p className="font-medium mb-3">Payment Method</p>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => setPaymentMethod("cash")}
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  className="flex flex-col items-center p-4"
                >
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span>Cash</span>
                </Button>
                <Button
                  onClick={() => setPaymentMethod("card")}
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className="flex flex-col items-center p-4"
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span>Card</span>
                </Button>
                <Button
                  onClick={() => setPaymentMethod("split")}
                  variant={paymentMethod === "split" ? "default" : "outline"}
                  className="flex flex-col items-center p-4"
                >
                  <Receipt className="h-6 w-6 mb-2" />
                  <span>Split</span>
                </Button>
              </div>
            </div>

            {paymentMethod === "cash" && (
              <div>
                <label className="block font-medium mb-2">Cash Amount</label>
                <Input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  placeholder="Enter cash amount"
                />
                {Number(cashAmount) > cartTotal && (
                  <p className="mt-2 text-muted-foreground">Change: ${(Number(cashAmount) - cartTotal).toFixed(2)}</p>
                )}
              </div>
            )}

            {paymentMethod === "split" && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Cash Amount</label>
                  <Input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="Enter cash amount"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Card Amount</label>
                  <Input
                    type="number"
                    value={cardAmount}
                    onChange={(e) => setCardAmount(e.target.value)}
                    placeholder="Enter card amount"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Remaining: ${(cartTotal - Number(cashAmount) - Number(cardAmount)).toFixed(2)}
                </p>
              </div>
            )}

            <Button onClick={handlePayment} className="w-full">
              Complete Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, SKU, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => addToCart(product.id)}
            >
              <CardContent className="p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{item.product.name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      -
                    </Button>
                    <span className="w-12 h-8 flex items-center justify-center border-t border-b">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      +
                    </Button>
                    <p className="ml-4 text-muted-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4" onClick={() => setShowPayment(true)} disabled={cart.length === 0}>
              Proceed to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

