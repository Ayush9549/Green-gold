"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './About.module.css';
import { motion } from 'framer-motion';
import { FaTree, FaHandHoldingHeart, FaGlobeAmericas, FaAward } from 'react-icons/fa';

export default function About() {
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
                        <h1 className={styles.heroTitle}>Cultivating Traditions</h1>
                        <p className={styles.heroSubtitle}>
                            Since 1985, Jaitun Oil has been dedicated to producing the world's finest
                            organic olive oil, preserving ancient methods while embracing modern sustainability.
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
                            <h2>Rooted in Nature</h2>
                            <p>
                                It all started in the sun-drenched hills of Andalusia, Spain. Our founders, the Garcia family,
                                believed that true quality comes from a deep respect for the land. For generations, we have
                                tended to our olive groves without the use of harsh chemicals or pesticides.
                            </p>
                            <p>
                                Every bottle of Jaitun Oil tells a story of patience and passion. We harvest our olives
                                at the peak of ripeness and cold-press them within hours to capture the vibrant flavors
                                and potent antioxidants that nature intended.
                            </p>
                            <p>
                                Today, we are proud to share this liquid gold with families around the world, bringing
                                a touch of Mediterranean health and luxury to your kitchen.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className={styles.statsSection}>
                    <div className={`container ${styles.statsGrid}`}>
                        <div className={styles.statItem}>
                            <h3>35+</h3>
                            <p>Years Experience</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>500+</h3>
                            <p>Acres of Groves</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>10k+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>100%</h3>
                            <p>Organic Certified</p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className={styles.valuesSection}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#3f4f2e' }}>Our Core Values</h2>
                        </div>
                        <div className={styles.valuesGrid}>
                            {[
                                { icon: <FaTree />, title: "Sustainability", desc: "We practice regenerative agriculture to ensure our land thrives for future generations." },
                                { icon: <FaHandHoldingHeart />, title: "Integrity", desc: "Transparency is key. We guarantee unmatched purity from tree to bottle." },
                                { icon: <FaGlobeAmericas />, title: "Community", desc: "We support fair trade and empower local farmers in every region we operate." },
                                { icon: <FaAward />, title: "Excellence", desc: "Award-winning quality recognized by top chefs and health experts worldwide." }
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
                                    <h3 className={styles.valueTitle}>{value.title}</h3>
                                    <p className={styles.valueDesc}>{value.desc}</p>
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
