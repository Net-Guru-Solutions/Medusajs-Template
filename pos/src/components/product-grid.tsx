import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"
import Image from "next/image"

interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loading: boolean;
}

export function ProductGrid({ products, onAddToCart, searchQuery, setSearchQuery, loading }: ProductGridProps) {
    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading products...</div>
    }

    return (
        <div>
            <Input
                type="text"
                placeholder="Search products or scan barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <Card key={product.id}>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image src={product.image || "/placeholder.svg"} alt={product.name} width={200} height={200} className="w-full h-48 object-cover mb-2" />
                            <p>£{product.price.toFixed(2)}</p>
                            <p className={`text-sm ${product.stockLevel > 10 ? 'text-green-600' : 'text-red-600'}`}>
                                In stock: {product.stockLevel}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => onAddToCart(product)} className="w-full">Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

