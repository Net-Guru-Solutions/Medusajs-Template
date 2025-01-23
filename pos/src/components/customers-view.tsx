"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, CreditCard, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Customer } from "../types";
import { useState } from "react";
import { toast } from "sonner";

interface CustomersViewProps {
  customers: Customer[]
}

export default function CustomersView({ customers }: CustomersViewProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredCustomers.map((customer) => (
            <Card
              key={customer.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${selectedCustomer === customer.id ? "ring-2 ring-primary" : ""
                }`}
              onClick={() => {
                setSelectedCustomer(customer.id)
                toast(`Selected customer: ${customer.name}`)
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{customer.name}</h3>
                    <p className="text-muted-foreground">{customer.email}</p>
                    <p className="text-muted-foreground">{customer.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Loyalty Points</p>
                    <p className="text-primary">{customer.loyaltyPoints} pts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedCustomer ? (
            <div className="space-y-4">
              {customers
                .find((c) => c.id === selectedCustomer)
                ?.purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{purchase.date}</p>
                      <div className="flex items-center">
                        {purchase.paymentMethod === "card" ? (
                          <CreditCard className="h-4 w-4 mr-1" />
                        ) : (
                          <DollarSign className="h-4 w-4 mr-1" />
                        )}
                        <span>${purchase.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {item.quantity}x {item.product.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center">Select a customer to view purchase history</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

