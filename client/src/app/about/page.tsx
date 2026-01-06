"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './About.module.css';
import { motion } from 'framer-motion';
import { FaTree, FaHandHoldingHeart, FaGlobeAmericas, FaAward } from 'react-icons/fa';

import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { t } = useLanguage();
    return (
        <main>
            <Navbar />

            <div className={styles.aboutContainer}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className={styles.heroTitle}>{t('about.hero.title')}</h1>
                        <p className={styles.heroSubtitle}>
                            {t('about.hero.subtitle')}
                        </p>
                    </motion.div>
                </section>

                {/* Our Story Section */}
                <section className={`container ${styles.storySection}`}>
                    <div className={styles.storyGrid}>
                        <motion.div
                            className={styles.storyImage}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1565553642973-6a7aa615dfea?auto=format&fit=crop&w=1000&q=80"
                                alt="Olive Grove"
                            />
                        </motion.div>
                        <motion.div
                            className={styles.storyContent}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2>{t('about.story.title')}</h2>
                            <p>
                                {t('about.story.p1')}
                            </p>
                            <p>
                                {t('about.story.p2')}
                            </p>
                            <p>
                                {t('about.story.p3')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className={styles.statsSection}>
                    <div className={`container ${styles.statsGrid}`}>
                        <div className={styles.statItem}>
                            <h3>35+</h3>
                            <p>{t('about.stat.exp')}</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>500+</h3>
                            <p>{t('about.stat.acres')}</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>10k+</h3>
                            <p>{t('about.stat.cust')}</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>100%</h3>
                            <p>{t('about.stat.cert')}</p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className={styles.valuesSection}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#3f4f2e' }}>{t('about.values.title')}</h2>
                        </div>
                        <div className={styles.valuesGrid}>
                            {[
                                { icon: <FaTree />, title: "value.sus.title", desc: "value.sus.desc" },
                                { icon: <FaHandHoldingHeart />, title: "value.int.title", desc: "value.int.desc" },
                                { icon: <FaGlobeAmericas />, title: "value.com.title", desc: "value.com.desc" },
                                { icon: <FaAward />, title: "value.exc.title", desc: "value.exc.desc" }
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.valueCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className={styles.valueIcon}>{value.icon}</div>
                                    <h3 className={styles.valueTitle}>{t(value.title)}</h3>
                                    <p className={styles.valueDesc}>{t(value.desc)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
