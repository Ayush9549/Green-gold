"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../Policy.module.css';

export default function PrivacyPolicy() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.policyContainer}`}>
                <h1 className={styles.title}>Privacy Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: January 1, 2026</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Overview</h2>
                    <div className={styles.content}>
                        <p>Olive Oil ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us. This policy describes how we collect, use, and share your information.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Information We Collect</h2>
                    <div className={styles.content}>
                        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter. This may include:</p>
                        <ul>
                            <li>Name and contact information (email, phone number).</li>
                            <li>Billing and shipping addresses.</li>
                            <li>Payment information (processed securely by third-party providers like PayPal).</li>
                        </ul>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
                    <div className={styles.content}>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Process and fulfill your orders.</li>
                            <li>Communicate with you about your order status.</li>
                            <li>Send you marketing emails (if opted in).</li>
                            <li>Improve our website and customer service.</li>
                        </ul>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Security</h2>
                    <div className={styles.content}>
                        <p>We implement a variety of security measures to maintain the safety of your personal information. Your payment information is encrypted and transmitted securely via SSL technology.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
