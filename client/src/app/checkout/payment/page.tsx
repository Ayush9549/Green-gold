"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentPage() {
    const { user, isAuthenticated } = useAuth();
    const { cart, clearCart } = useCart();
    const { addOrder } = useOrders();
    const router = useRouter();

    const [paymentMethod] = useState('paypal');

    useEffect(() => {
        if (!isAuthenticated) router.push('/login');
    }, [isAuthenticated, router]);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const totalAmount = subtotal + shipping;

    const handlePayment = () => {
        const orderId = 'ORD-' + Date.now();

        // Create proper order object
        const newOrder = {
            id: orderId,
            userId: user?.email || 'guest',
            customerName: user?.name || 'Guest',
            items: [...cart], // Clone cart items
            total: totalAmount,
            status: 'Pending' as const, // Force type literal
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            paymentMethod,
            shippingAddress: user?.address || {}
        };

        // Simulate processing
        setTimeout(() => {
            addOrder(newOrder);
            clearCart();
            router.push('/order-confirmation?id=' + orderId);
        }, 1500);
    };

    if (!user) return null;

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '60vh', padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                <div style={{
                    maxWidth: '500px', width: '90%', background: 'white', padding: '2rem',
                    borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#556b2f', marginBottom: '1.5rem', textAlign: 'center' }}>Checkout</h1>

                    <div style={{ marginBottom: '2rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#555' }}>Delivery Address</h3>
                        <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                            <p>{user.address?.street}, {user.address?.city}</p>
                            <p>{user.address?.state}, {user.address?.zip}</p>
                        </div>
                    </div>

                    <h2 style={{ marginBottom: '2rem', fontSize: '1.25rem', textAlign: 'center' }}>Total: ${totalAmount.toFixed(2)}</h2>

                    <div style={{ marginTop: '1rem', width: '100%' }}>
                        <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
                            <PayPalButtons
                                style={{ layout: "vertical", shape: "pill" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: totalAmount.toFixed(2),
                                                    currency_code: "USD"
                                                },
                                            },
                                        ],
                                        intent: "CAPTURE"
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    if (actions.order) {
                                        await actions.order.capture();
                                        handlePayment();
                                    }
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>

                    <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#999', textAlign: 'center' }}>
                        Payments are processed securely via PayPal.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
