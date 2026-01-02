"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Benefits.module.css';
import { FaHeart, FaWeight, FaSpa, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BenefitsPage() {
    const benefits = [
        {
            icon: <FaHeart size={40} color="#556b2f" />,
            title: "Heart Health",
            desc: "Olive oil is rich in monounsaturated fats, which help lower bad cholesterol (LDL) and maintain healthy blood pressure levels. It's a cornerstone of the heart-healthy Mediterranean diet.",
            img: "https://images.unsplash.com/photo-1599423300746-b62507ac97f5?auto=format&fit=crop&w=500&q=80"
        },
        {
            icon: <FaWeight size={40} color="#556b2f" />,
            title: "Weight Management",
            desc: "Despite being a fat, olive oil can aid in weight loss. The healthy fats increase satiety, helping you feel full longer and reducing the urge to snack on unhealthy foods.",
            img: "https://images.unsplash.com/photo-1576402187880-3b00e7a1e0f5?auto=format&fit=crop&w=500&q=80"
        },
        {
            icon: <FaSpa size={40} color="#556b2f" />,
            title: "Skin & Hair Care",
            desc: "Rich in Vitamin E and antioxidants, olive oil nourishes the skin, combats aging signs, and strengthens hair from root to tip. It's a natural moisturizer and protector.",
            img: "https://images.unsplash.com/photo-1556228720-1957be91923b?auto=format&fit=crop&w=500&q=80"
        },
        {
            icon: <FaShieldAlt size={40} color="#556b2f" />,
            title: "Anti-Inflammatory",
            desc: "Contains oleocanthal, a compound with potent anti-inflammatory properties similar to ibuprofen. It helps reduce inflammation in the body and supports overall immunity.",
            img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80"
        }
    ];

    return (
        <main>
            <Navbar />

            <header className={styles.pageHeader}>
                <div className="container">
                    <h1 className={styles.title}>The Golden Elixir of Health</h1>
                    <p>Discover the science-backed benefits of Jaitun Oil</p>
                </div>
            </header>

            <div className={`container ${styles.section}`}>
                {benefits.map((b, index) => (
                    <motion.div
                        key={index}
                        className={styles.benefitCard}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ flex: 1 }}>
                            <img
                                src={b.img}
                                alt={b.title}
                                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </div>
                        <div className={styles.benefitContent} style={{ flex: 1 }}>
                            <div style={{ marginBottom: '1rem' }}>{b.icon}</div>
                            <h2>{b.title}</h2>
                            <p>{b.desc}</p>
                        </div>
                    </motion.div>
                ))}

                <section className={styles.scienceSection}>
                    <h2 className={styles.scienceTitle}>Backed by Science</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: '#f0f0f0' }}>
                        Jaitun Oil consists mainly of oleic acid (up to 83%), with smaller amounts of other fatty acids including linoleic acid (up to 21%) and palmitic acid (up to 20%).
                        Studies showed that replacing saturated fats with unsaturated fats like those found in olive oil reduces the risk of cardiovascular events.
                    </p>
                </section>
            </div>

            <Footer />
        </main>
    );
}
