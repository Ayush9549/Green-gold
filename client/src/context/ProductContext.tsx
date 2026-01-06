"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define Product Type
export interface Product {
    id: number | string;
    title: string; // Ensuring consistency with existing code (title vs name)
    name?: string; // Optional alias if some components use 'name'
    category: string;
    price: number;
    stock?: number;
    description?: string;
    image: string;
    gallery?: string[]; // Array of image URLs/Base64 strings
    rating?: number;
    features?: string[];
    ingredients?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nutrition?: any;
    oldPrice?: number;
    sizes?: string[];
}

// Initial Mock Data (moved from Shop/Admin pages)
const INITIAL_PRODUCTS: Product[] = [
    {
        id: "1",
        title: "Organic Extra Virgin Olive Oil",
        name: "Organic Extra Virgin Olive Oil",
        price: 24.99,
        rating: 5,
        category: "Premium",
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80",
        stock: 45,
        description: "Our hallmark Organic Extra Virgin Olive Oil is cold-pressed within hours of harvest.",
        features: ["Cold Pressed Extraction", "100% Certified Organic"],
        ingredients: "100% Organic Extra Virgin Olive Oil.",
        sizes: ["250ml", "500ml", "1L"]
    },
    {
        id: "2",
        title: "Cold Pressed Jaitun Oil",
        name: "Cold Pressed Jaitun Oil",
        price: 18.50,
        rating: 4,
        category: "Classic",
        image: "https://images.unsplash.com/photo-1542542526-2df73eb0e869?auto=format&fit=crop&w=500&q=80",
        stock: 120,
        description: "A versatile kitchen staple suitable for everyday cooking.",
        features: ["Versatile Cooking Oil", "Rich Smooth Flavor"],
        ingredients: "100% Cold Pressed Olive Oil.",
        sizes: ["500ml", "1L", "5L"]
    },
    {
        id: "3",
        title: "Infused Garlic Olive Oil",
        name: "Infused Garlic Olive Oil",
        price: 29.99,
        rating: 5,
        category: "Infused",
        image: "https://images.unsplash.com/photo-1504918731362-e1f44ac1349b?auto=format&fit=crop&w=500&q=80",
        stock: 30,
        description: "Elevate your culinary creations with our Garlic Infused Olive Oil.",
        features: ["Real Garlic Infusion", "Gourmet Quality"],
        ingredients: "Extra Virgin Olive Oil, Organic Garlic.",
        sizes: ["250ml", "500ml"]
    },
    {
        id: "4",
        title: "Skin Care Olive Oil",
        name: "Skin Care Olive Oil",
        price: 15.00,
        rating: 5,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1620917670397-a333b79d88c1?auto=format&fit=crop&w=500&q=80",
        stock: 50,
        description: "Specially filtered for cosmetic use, rich in Vitamin E.",
        features: ["Cosmetic Grade", "Deep Moisturization"],
        ingredients: "100% Pure Filtered Olive Oil.",
        sizes: ["100ml", "250ml"]
    },
    {
        id: "5",
        title: "Truffle Infused Oil",
        name: "Truffle Infused Oil",
        price: 35.00,
        rating: 5,
        category: "Infused",
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80",
        stock: 15,
        description: "We infuse our finest Extra Virgin Olive Oil with white truffles.",
        features: ["Real White Truffle", "Luxury Garnish"],
        ingredients: "Extra Virgin Olive Oil, White Truffle Aroma.",
        sizes: ["100ml", "250ml"]
    },
    {
        id: "6",
        title: "Hair Care Elixir",
        name: "Hair Care Elixir",
        price: 22.00,
        rating: 4,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=500&q=80",
        stock: 25,
        description: "Revitalize dry and damaged hair with our Jaitun Hair Care Elixir.",
        features: ["Promotes Hair Growth", "Scalp Stimulation"],
        ingredients: "Olive Oil, Rosemary Oil, Peppermint Oil.",
        sizes: ["100ml", "200ml"]
    }
];

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string | number, updatedData: Partial<Product>) => void;
    deleteProduct: (id: string | number) => void;
    getProductById: (id: string | number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Load from local storage or use initial data
        const savedProducts = localStorage.getItem('jaitun_products');
        if (savedProducts) {
            // eslint-disable-next-line
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(INITIAL_PRODUCTS);
        }
    }, []);

    useEffect(() => {
        // Persist to local storage whenever products change
        if (products.length > 0) {
            localStorage.setItem('jaitun_products', JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (newProduct: Product) => {
        // Generate a random ID if not provided (simulating DB)
        const productWithId = { ...newProduct, id: newProduct.id || Date.now().toString() };
        setProducts(prev => [...prev, productWithId]);
    };

    const deleteProduct = (id: string | number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const getProductById = (id: string | number) => {
        return products.find(p => p.id.toString() === id.toString());
    };

    const updateProduct = (id: string | number, updatedData: Partial<Product>) => {
        setProducts(prev => prev.map(p =>
            p.id.toString() === id.toString() ? { ...p, ...updatedData } : p
        ));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
