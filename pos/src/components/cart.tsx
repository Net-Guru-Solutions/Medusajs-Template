import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartItem, Customer } from "@/types"

interface CartProps {
    items: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
    customer: Customer | null;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, customer }: CartProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const militaryDiscount = customer?.militaryId ? 0.1 : 0
    const total = subtotal * (1 - militaryDiscount)

    return (
        <div className="p-4 flex-1 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {customer && (
                <div className="mb-4">
                    <p>Customer: {customer.name}</p>
                    {customer.militaryId && <p className="text-green-600">Military Discount Applied</p>}
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                                    min="1"
                                    className="w-16"
                                />
                            </TableCell>
                            <TableCell>£{(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell>
                                <Button onClick={() => onRemoveItem(item.id)} variant="destructive" size="sm">Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="text-right mt-4">
                <p>Subtotal: £{subtotal.toFixed(2)}</p>
                {militaryDiscount > 0 && (
                    <p className="text-green-600">Military Discount: -£{(subtotal * militaryDiscount).toFixed(2)}</p>
                )}
                <p className="font-bold">Total: £{total.toFixed(2)}</p>
            </div>
        </div>
    )
}

