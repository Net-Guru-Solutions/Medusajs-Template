export interface Product {
    id: string;
    name: string;
    price: number;
    barcode: string;
    stockLevel: number;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    militaryId?: string;
}

export interface Employee {
    id: string;
    name: string;
    role: 'cashier' | 'manager' | 'admin' | 'developer';
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    customer?: Customer;
    employee: Employee;
    militaryDiscount: boolean;
    paymentMethod: 'cash' | 'card';
    cashReceived?: number;
    change?: number;
}

