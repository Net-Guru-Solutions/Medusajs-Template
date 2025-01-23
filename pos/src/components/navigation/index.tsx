import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import React from 'react';
import { ModeToggle } from '../layout/mode-toggle';


interface NavigationProps {
    activeTab: "pos" | "customers" | "inventory"
    setActiveTab: (tab: "pos" | "customers" | "inventory") => void
}

export function SiteHeader({ activeTab, setActiveTab }: NavigationProps) {
    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <ShoppingCart className="h-8 w-8" />
                            <span className="ml-2 text-xl font-bold">ModernPOS</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Button
                                onClick={() => setActiveTab("pos")}
                                variant="ghost"
                                className={`${activeTab === "pos" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                                    }`}
                            >
                                Point of Sale
                            </Button>
                            <Button
                                onClick={() => setActiveTab("customers")}
                                variant="ghost"
                                className={`${activeTab === "customers" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                                    }`}
                            >
                                Customers
                            </Button>
                            <Button
                                onClick={() => setActiveTab("inventory")}
                                variant="ghost"
                                className={`${activeTab === "inventory" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                                    }`}
                            >
                                Inventory
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export function SiteFooter() {
    return (
        <div>SiteFooter</div>
    )
}

