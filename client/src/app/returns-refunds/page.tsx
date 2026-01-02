"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../Policy.module.css';

export default function ReturnsRefunds() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.policyContainer}`}>
                <h1 className={styles.title}>Returns & Refunds</h1>
                <p className={styles.lastUpdated}>Last Updated: January 1, 2026</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Return Policy</h2>
                    <div className={styles.content}>
                        <p>We want you to love your Jaitun Oil purchase. If you are not completely satisfied, we accept returns within 30 days of purchase.</p>
                        <p>To be eligible for a return, your item must be:</p>
                        <ul>
                            <li>Unused and in the same condition that you received it.</li>
                            <li>In the original packaging.</li>
                            <li>Accompanied by a receipt or proof of purchase.</li>
                        </ul>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Refunds</h2>
                    <div className={styles.content}>
                        <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                        <p>If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-10 business days.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Exchanges</h2>
                    <div className={styles.content}>
                        <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at support@jaitunoil.com.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Shipping Returns</h2>
                    <div className={styles.content}>
                        <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
