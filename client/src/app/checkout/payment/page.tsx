"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
    const { user, isAuthenticated } = useAuth();
    const { cart, clearCart } = useCart();
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState('upi');

    useEffect(() => {
        if (!isAuthenticated) router.push('/login');
    }, [isAuthenticated, router]);

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handlePayment = () => {
        // Simulate processing
        setTimeout(() => {
            clearCart();
            router.push('/order-confirmation?id=ORD-' + Date.now());
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

                    <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', textAlign: 'center' }}>Total: ${totalAmount.toFixed(2)}</h2>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Payment Method</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    checked={paymentMethod === 'upi'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>UPI (Google Pay, PhonePe, Paytm)</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>Debit / Credit Card</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>Cash on Delivery (COD)</span>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        style={{
                            width: '100%',
                            background: '#556b2f',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            border: 'none',
                            marginTop: '1rem'
                        }}
                    >
                        Place Order
                    </button>

                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#999', textAlign: 'center' }}>
                        Secure payments by Razorpay / Stripe
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
