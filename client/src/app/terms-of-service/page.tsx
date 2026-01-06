"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../Policy.module.css';

export default function TermsOfService() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.policyContainer}`}>
                <h1 className={styles.title}>Terms of Service</h1>
                <p className={styles.lastUpdated}>Last Updated: January 1, 2026</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
                    <div className={styles.content}>
                        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Use License</h2>
                    <div className={styles.content}>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Olive Oil&apos;s website for personal, non-commercial transitory viewing only.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Product Descriptions</h2>
                    <div className={styles.content}>
                        <p>We do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Governing Law</h2>
                    <div className={styles.content}>
                        <p>Any claim relating to Olive Oil&apos;s website shall be governed by the laws of the State of New York without regard to its conflict of law provisions.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Contact Information</h2>
                    <div className={styles.content}>
                        <p>Questions about the Terms of Service should be sent to us at legal@jaitunoil.com.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
