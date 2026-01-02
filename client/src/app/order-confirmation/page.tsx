"use client";
import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id') || 'ORD-' + Math.floor(Math.random() * 100000);

    return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
            <FaCheckCircle size={80} color="#556b2f" style={{ marginBottom: '1.5rem' }} />
            <h1 style={{ color: '#556b2f', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Thank you for your purchase.</p>

            <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#666' }}>Order ID:</span>
                    <span style={{ fontWeight: 'bold' }}>{orderId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#666' }}>Estimated Delivery:</span>
                    <span style={{ fontWeight: 'bold' }}>3-5 Business Days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Payment Status:</span>
                    <span style={{ fontWeight: 'bold', color: 'green' }}>Paid / Confirm on Delivery</span>
                </div>
            </div>

            <Link href="/shop" style={{
                background: '#556b2f',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold'
            }}>
                Continue Shopping
            </Link>
        </div>
    );
}

export default function OrderConfirmation() {
    return (
        <main>
            <Navbar />
            <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
                <OrderConfirmationContent />
            </Suspense>
            <Footer />
        </main>
    );
}
