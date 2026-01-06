"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Benefits.module.css';
import { FaHeart, FaWeight, FaSpa, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function BenefitsPage() {
    const { t } = useLanguage();
    const benefits = [
        {
            icon: <FaHeart size={40} color="#556b2f" />,
            title: "benefits.heart.title",
            desc: "benefits.heart.desc",
            img: "https://images.unsplash.com/photo-1599423300746-b62507ac97f5?auto=format&fit=crop&w=500&q=80"
        },
        {
            icon: <FaWeight size={40} color="#556b2f" />,
            title: "benefits.weight.title",
            desc: "benefits.weight.desc",
            img: "https://images.unsplash.com/photo-1576402187880-3b00e7a1e0f5?auto=format&fit=crop&w=500&q=80"
        },
        {
            icon: <FaSpa size={40} color="#556b2f" />,
            title: "benefits.skin.title",
            desc: "benefits.skin.desc",
            img: "https://images.unsplash.com/photo-1556228720-1957be91923b?auto=format&fit=crop&w=500&q=80"
        },
        {
            icon: <FaShieldAlt size={40} color="#556b2f" />,
            title: "benefits.anti.title",
            desc: "benefits.anti.desc",
            img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80"
        }
    ];

    return (
        <main>
            <Navbar />

            <header className={styles.pageHeader}>
                <div className="container">
                    <h1 className={styles.title}>{t('benefits.title')}</h1>
                    <p>{t('benefits.subtitle')}</p>
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
                            <h2>{t(b.title)}</h2>
                            <p>{t(b.desc)}</p>
                        </div>
                    </motion.div>
                ))}

                <section className={styles.scienceSection}>
                    <h2 className={styles.scienceTitle}>{t('benefits.science.title')}</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: '#f0f0f0' }}>
                        {t('benefits.science.text')}
                    </p>
                </section>
            </div>

            <Footer />
        </main>
    );
}
