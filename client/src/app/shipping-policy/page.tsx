"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../Policy.module.css';

export default function ShippingPolicy() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.policyContainer}`}>
                <h1 className={styles.title}>Shipping Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: January 1, 2026</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Processing Time</h2>
                    <div className={styles.content}>
                        <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                        <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Shipping Rates & Delivery Estimates</h2>
                    <div className={styles.content}>
                        <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                        <ul>
                            <li><strong>Standard Shipping (5-7 business days):</strong> Free for orders over $50, otherwise $5.99.</li>
                            <li><strong>Expedited Shipping (2-3 business days):</strong> $12.99.</li>
                            <li><strong>Overnight Delivery:</strong> $24.99 (Orders must be placed before 2 PM EST).</li>
                        </ul>
                        <p>Delivery delays can occasionally occur.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Shipment Confirmation & Order Tracking</h2>
                    <div className={styles.content}>
                        <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. International Shipping</h2>
                    <div className={styles.content}>
                        <p>We absolutely ship worldwide! Jaitun Oil is a global brand. Shipping rates for international orders vary by country and will be calculated at checkout.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
