"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../Auth.module.css'; // Reuse Auth styles
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AddressPage() {
    const { user, updateAddress, addSavedAddress, removeSavedAddress, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || user?.email === 'greengold123@gmail.com')) {
            router.push('/login?redirect=/checkout/address');
        }
    }, [isLoading, isAuthenticated, user, router]);

    const [address, setAddress] = useState({
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zip: user?.address?.zip || '',
        country: user?.address?.country || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addSavedAddress(address); // Save and set as active
        router.push('/checkout/payment');
    };

    return (
        <main>
            <Navbar />
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h1 className={styles.title}>Shipping Address</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Street Address</label>
                            <input
                                name="street" value={address.street} onChange={handleChange}
                                className={styles.input} required placeholder="123 Olive Way"
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>City</label>
                                <input
                                    name="city" value={address.city} onChange={handleChange}
                                    className={styles.input} required placeholder="New York"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>State</label>
                                <input
                                    name="state" value={address.state} onChange={handleChange}
                                    className={styles.input} required placeholder="NY"
                                />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>ZIP Code</label>
                                <input
                                    name="zip" value={address.zip} onChange={handleChange}
                                    className={styles.input} required placeholder="10001"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Country</label>
                                <input
                                    name="country" value={address.country} onChange={handleChange}
                                    className={styles.input} required placeholder="USA"
                                />
                            </div>
                        </div>
                        <button type="submit" className={styles.submitBtn}>Save & Continue to Payment</button>
                    </form>
                </div>

                {/* Saved Addresses List */}
                {user?.savedAddresses && user.savedAddresses.length > 0 && (
                    <div className={styles.authCard} style={{ marginTop: '2rem' }}>
                        <h2 className={styles.title} style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Saved Addresses</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {user.savedAddresses.map((addr, idx) => (
                                <div key={addr.id || idx} style={{
                                    padding: '1.2rem',
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: '#fcfcfc'
                                }}>
                                    <div style={{ flex: 1, paddingRight: '1rem' }}>
                                        <p style={{ fontWeight: '600', marginBottom: '0.2rem', color: '#333' }}>{addr.street}</p>
                                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                                            {addr.city}, {addr.state} {addr.zip}, {addr.country}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}>
                                        <button
                                            onClick={() => { updateAddress(addr); router.push('/checkout/payment'); }}
                                            style={{
                                                background: '#556b2f', color: 'white', border: 'none',
                                                padding: '0.5rem', borderRadius: '4px', cursor: 'pointer',
                                                fontSize: '0.85rem', fontWeight: '500'
                                            }}
                                        >
                                            Deliver Here
                                        </button>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => setAddress(addr)}
                                                style={{
                                                    background: '#ffffff', color: '#555', border: '1px solid #ddd',
                                                    padding: '0.4rem', borderRadius: '4px', cursor: 'pointer',
                                                    fontSize: '0.8rem', flex: 1
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => addr.id && removeSavedAddress(addr.id)}
                                                style={{
                                                    background: '#fee2e2', color: '#dc2626', border: 'none',
                                                    padding: '0.4rem', borderRadius: '4px', cursor: 'pointer',
                                                    fontSize: '0.8rem', flex: 1
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
