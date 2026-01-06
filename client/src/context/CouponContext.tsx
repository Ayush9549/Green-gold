"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Coupon {
    id: string;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    expirationDate: string; // YYYY-MM-DD
    isActive: boolean;
}

interface CouponContextType {
    coupons: Coupon[];
    addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
    deleteCoupon: (id: string) => void;
    toggleCouponStatus: (id: string) => void;
    validateCoupon: (code: string) => Coupon | null;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    // Load from local storage
    useEffect(() => {
        const savedCoupons = localStorage.getItem('jaitun_coupons');
        if (savedCoupons) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCoupons(JSON.parse(savedCoupons));
        } else {
            // Default sample coupon
            setCoupons([
                { id: '1', code: 'WELCOME10', type: 'percentage', value: 10, expirationDate: '2030-12-31', isActive: true }
            ]);
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        if (coupons.length > 0) {
            localStorage.setItem('jaitun_coupons', JSON.stringify(coupons));
        }
    }, [coupons]);

    const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
        const newCoupon = { ...couponData, id: Date.now().toString() };
        setCoupons([...coupons, newCoupon]);
    };

    const deleteCoupon = (id: string) => {
        setCoupons(coupons.filter(c => c.id !== id));
    };

    const toggleCouponStatus = (id: string) => {
        setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    };

    const validateCoupon = (code: string): Coupon | null => {
        const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
        if (!coupon) return null;

        const today = new Date();
        const expDate = new Date(coupon.expirationDate);
        if (today > expDate) return null; // Expired

        return coupon;
    };

    return (
        <CouponContext.Provider value={{ coupons, addCoupon, deleteCoupon, toggleCouponStatus, validateCoupon }}>
            {children}
        </CouponContext.Provider>
    );
};

export const useCoupons = () => {
    const context = useContext(CouponContext);
    if (!context) {
        throw new Error('useCoupons must be used within a CouponProvider');
    }
    return context;
};
