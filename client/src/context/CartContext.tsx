"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define Types
export interface CartItem {
    id: number | string;
    title: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
    size?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CheckoutItem) => void;
    removeFromCart: (id: number | string) => void;
    updateQuantity: (id: number | string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
}

// Helper type for adding items (quantity might be optional or default to 1)
export type CheckoutItem = Omit<CartItem, 'quantity'> & { quantity?: number };

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('jaitun_cart');
        if (savedCart) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('jaitun_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem: CheckoutItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === newItem.id);
            const qtyToAdd = newItem.quantity || 1;

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + qtyToAdd }
                        : item
                );
            } else {
                return [...prevCart, { ...newItem, quantity: qtyToAdd }];
            }
        });
        // Optional: Visual feedback could trigger here (e.g. toast) via a separate state or event
    };

    const removeFromCart = (id: number | string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number | string, quantity: number) => {
        if (quantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
