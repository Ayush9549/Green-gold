"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CheckoutItem } from './CartContext';

export type OrderItem = CheckoutItem;

export interface Order {
    id: string;
    userId: string; // email as ID for now
    customerName: string;
    items: OrderItem[];
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Completed' | 'Cancelled';
    date: string;
    paymentMethod: string;
    shippingAddress: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;
    getOrdersByUser: (email: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    // Load orders from local storage on mount
    useEffect(() => {
        const savedOrders = localStorage.getItem('jaitun_orders');
        if (savedOrders) {
            try {
                // eslint-disable-next-line
                setOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        }
    }, []);

    // Save orders to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('jaitun_orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (newOrder: Order) => {
        setOrders((prev) => [newOrder, ...prev]);
    };

    const updateOrderStatus = (id: string, status: Order['status']) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, status } : order
            )
        );
    };

    const getOrdersByUser = (email: string) => {
        return orders.filter(order => order.userId === email);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrdersByUser }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};
