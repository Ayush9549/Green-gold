"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Address {
    id?: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface User {
    name: string;
    email: string;
    address?: Address;
    savedAddresses?: Address[];
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    updateAddress: (address: Address) => void;
    addSavedAddress: (address: Address) => void;
    removeSavedAddress: (id: string) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load user from local storage on mount (persistence)
    useEffect(() => {
        const savedUser = localStorage.getItem('jaitun_user');
        if (savedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(savedUser));
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('jaitun_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jaitun_user');
        router.push('/login');
    };

    const updateAddress = (address: Address) => {
        if (user) {
            const updatedUser = { ...user, address };
            setUser(updatedUser);
            localStorage.setItem('jaitun_user', JSON.stringify(updatedUser));
        }
    };

    const addSavedAddress = (address: Address) => {
        if (user) {
            const newAddr = { ...address, id: Date.now().toString() };
            const updatedAddresses = [...(user.savedAddresses || []), newAddr];
            const updatedUser = { ...user, savedAddresses: updatedAddresses, address: newAddr };
            setUser(updatedUser);
            localStorage.setItem('jaitun_user', JSON.stringify(updatedUser));
        }
    };

    const removeSavedAddress = (id: string) => {
        if (user) {
            const updatedAddresses = user.savedAddresses?.filter(a => a.id !== id) || [];
            const updatedUser = { ...user, savedAddresses: updatedAddresses };
            setUser(updatedUser);
            localStorage.setItem('jaitun_user', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateAddress, addSavedAddress, removeSavedAddress, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
