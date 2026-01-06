"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';

export default function MyOrdersPage() {
    const { user } = useAuth();
    const { orders } = useOrders();

    // Filter orders for current user
    const myOrders = orders.filter(
        (o) => o?.userId === user?.email || o?.customerName === user?.name || o?.id.includes(user?.email?.split('@')[0] || '')
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Since we use mock users/orders logic mostly, filtering logic might be fuzzy. 
    // In production, `userId` should match exactly.

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Completed': return <FaCheckCircle color="green" />;
            case 'Shipped': return <FaTruck color="#3498db" />;
            case 'Processing': return <FaBox color="#f39c12" />;
            case 'Cancelled': return <FaTimesCircle color="red" />;
            default: return <FaClock color="#95a5a6" />;
        }
    };

    return (
        <main>
            <Navbar />
            <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#2e3b23', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FaBox /> My Orders
                </h1>

                {myOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f9f9f9', borderRadius: '12px' }}>
                        <h2 style={{ color: '#555', marginBottom: '1rem' }}>No orders found</h2>
                        <p style={{ color: '#888', marginBottom: '2rem' }}>Looks like you haven&apos;t placed any orders yet.</p>
                        <Link href="/shop" style={{ background: '#556b2f', color: 'white', padding: '0.8rem 2rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {myOrders.map(order => (
                            <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                {/* Order Header */}
                                <div style={{ background: '#f8f9fa', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '2rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order Placed</div>
                                            <div style={{ fontWeight: '500' }}>{order.date}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</div>
                                            <div style={{ fontWeight: '500' }}>${order.total.toFixed(2)}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ship To</div>
                                            <div style={{ fontWeight: '500' }}>{order.customerName}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.9rem', color: '#555' }}>Order # {order.id}</div>
                                        <Link href={`/orders/${order.id}`} style={{ fontSize: '0.9rem', color: '#556b2f', textDecoration: 'underline' }}>
                                            View Order Details
                                        </Link>
                                    </div>
                                </div>

                                {/* Order Items Body */}
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333' }}>
                                            {getStatusIcon(order.status)} {order.status}
                                        </h3>
                                        {order.status !== 'Cancelled' && (
                                            <Link
                                                href={`/tracking/${order.id}`}
                                                style={{
                                                    background: '#3498db', color: 'white', padding: '0.5rem 1.2rem',
                                                    borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem',
                                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                                }}
                                            >
                                                <FaMapMarkerAlt /> Track Package
                                            </Link>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <div style={{ width: '80px', height: '80px', background: '#f1f1f1', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <Link href={`/product/${item.id || ''}`} style={{ fontWeight: 'bold', color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>
                                                        {item.title}
                                                    </Link>
                                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.category}</p>
                                                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                                                        <span style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>${(item.price * 1.2).toFixed(2)}</span>
                                                        <span style={{ fontWeight: 'bold', color: '#b12704' }}>${item.price.toFixed(2)}</span>
                                                        <span style={{ fontSize: '0.9rem', color: '#333' }}>x {item.quantity || 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
