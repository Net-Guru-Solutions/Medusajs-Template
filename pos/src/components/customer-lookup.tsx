import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Customer } from "@/types"

interface CustomerLookupProps {
    onSelectCustomer: (customer: Customer | null) => void;
}

export function CustomerLookup({ onSelectCustomer }: CustomerLookupProps) {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {
        // This is where you'd typically make an API call to search for customers
        // For now, we'll just simulate finding a customer
        if (searchQuery.toLowerCase() === 'john doe') {
            onSelectCustomer({
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                militaryId: 'M12345'
            })
        } else {
            alert('Customer not found')
        }
    }

    return (
        <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-2">Customer Lookup</h2>
            <div className="flex gap-2">
                <Input
                    type="text"
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>
        </div>
    )
}

