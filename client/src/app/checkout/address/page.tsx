"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../Auth.module.css'; // Reuse Auth styles
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AddressPage() {
    const { user, updateAddress } = useAuth();
    const router = useRouter();

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
        updateAddress(address);
        // Navigate to payment after saving address
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
            </div>
            <Footer />
        </main>
    );
}
