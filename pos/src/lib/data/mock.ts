import { Product, Customer } from '@/types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Organic Coffee Beans',
        price: 14.99,
        sku: 'COF001',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300',
        category: 'Beverages'
    },
    {
        id: '2',
        name: 'Artisan Sourdough Bread',
        price: 6.99,
        sku: 'BRD001',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300',
        category: 'Bakery'
    },
    {
        id: '3',
        name: 'Fresh Avocados',
        price: 2.49,
        sku: 'PRD001',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300',
        category: 'Produce'
    },
    {
        id: '4',
        name: 'Organic Milk',
        price: 4.99,
        sku: 'DRY001',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300',
        category: 'Dairy'
    },
    {
        id: '5',
        name: 'Fresh Eggs',
        price: 5.99,
        sku: 'DRY002',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300',
        category: 'Dairy'
    }
];

export const customers: Customer[] = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        loyaltyPoints: 150,
        purchaseHistory: [
            {
                id: '1',
                date: '2024-03-20',
                total: 45.97,
                items: [
                    { product: products[0], quantity: 2 },
                    { product: products[1], quantity: 1 }
                ],
                paymentMethod: 'card'
            }
        ]
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '(555) 987-6543',
        loyaltyPoints: 280,
        purchaseHistory: [
            {
                id: '2',
                date: '2024-03-19',
                total: 32.45,
                items: [
                    { product: products[2], quantity: 3 },
                    { product: products[3], quantity: 2 }
                ],
                paymentMethod: 'cash'
            }
        ]
    },
    {
        id: '3',
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '(555) 456-7890',
        loyaltyPoints: 95,
        purchaseHistory: [
            {
                id: '3',
                date: '2024-03-18',
                total: 27.96,
                items: [
                    { product: products[1], quantity: 4 }
                ],
                paymentMethod: 'card'
            }
        ]
    }
];