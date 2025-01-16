import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CartItem, Customer, Employee } from "@/types"

interface CheckoutProps {
    cart: CartItem[];
    customer: Customer | null;
    employee: Employee;
}

export function Checkout({ cart, customer, employee }: CheckoutProps) {
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [cashReceived, setCashReceived] = useState('')

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const militaryDiscount = customer?.militaryId ? 0.1 : 0
    const total = subtotal * (1 - militaryDiscount)

    const change = paymentMethod === 'cash' ? Math.max(parseFloat(cashReceived) - total, 0) : 0

    const handleCheckout = () => {
        const order = {
            items: cart,
            total,
            customer,
            employee,
            militaryDiscount: Boolean(customer?.militaryId),
            paymentMethod,
            cashReceived: paymentMethod === 'cash' ? parseFloat(cashReceived) : undefined,
            change: paymentMethod === 'cash' ? change : undefined,
        }
        console.log('Processing order:', order)
        // Here you would typically send this order to your backend
        alert(`Order processed! Total: £${total.toFixed(2)}`)
    }

    return (
        <div className="p-4 border-t">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="mb-4">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Card</Label>
                    </div>
                </RadioGroup>
            </div>
            {paymentMethod === 'cash' && (
                <div className="mb-4">
                    <Label htmlFor="cashReceived">Cash Received</Label>
                    <Input
                        id="cashReceived"
                        type="number"
                        min={total}
                        step="0.01"
                        value={cashReceived}
                        onChange={(e) => setCashReceived(e.target.value)}
                    />
                    {parseFloat(cashReceived) >= total && (
                        <p className="text-green-600 mt-2">Change: £{change.toFixed(2)}</p>
                    )}
                </div>
            )}
            <Button onClick={handleCheckout} className="w-full" disabled={cart.length === 0 || (paymentMethod === 'cash' && parseFloat(cashReceived) < total)}>
                Complete Sale
            </Button>
        </div>
    )
}

