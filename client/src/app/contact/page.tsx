"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Contact.module.css';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(t('contact.success'));
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <main>
            <Navbar />

            <div className={styles.contactContainer}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className={styles.heroTitle}>{t('contact.hero.title')}</h1>
                            <p className={styles.heroSubtitle}>
                                {t('contact.hero.subtitle')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className={styles.contentWrapper}>
                    <div className={`container ${styles.grid}`}>

                        {/* Contact Info Side */}
                        <motion.div
                            className={styles.infoSection}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className={styles.infoCard}>
                                <div className={styles.iconWrapper}><FaPhoneAlt /></div>
                                <div className={styles.infoContent}>
                                    <h3>{t('contact.call.title')}</h3>
                                    <p>+1 (555) 123-4567</p>
                                    <p>{t('contact.call.hours')}</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.iconWrapper}><FaEnvelope /></div>
                                <div className={styles.infoContent}>
                                    <h3>{t('contact.email.title')}</h3>
                                    <p>hello@jaitunoil.com</p>
                                    <p>support@jaitunoil.com</p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.iconWrapper}><FaMapMarkerAlt /></div>
                                <div className={styles.infoContent}>
                                    <h3>{t('contact.visit.title')}</h3>
                                    <p>123 Olive Grove Lane,</p>
                                    <p>Andalusia, Spain 41001</p>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>{t('contact.follow')}</h3>
                                <div className={styles.socialLinks}>
                                    <div className={styles.socialIcon}><FaFacebookF /></div>
                                    <div className={styles.socialIcon}><FaInstagram /></div>
                                    <div className={styles.socialIcon}><FaTwitter /></div>
                                    <div className={styles.socialIcon}><FaLinkedinIn /></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form Side */}
                        <motion.div
                            className={styles.formCard}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className={styles.formTitle}>{t('contact.form.title')}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="name">{t('contact.form.name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={styles.input}
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('contact.form.placeholder.name')}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="email">{t('contact.form.email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={styles.input}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('contact.form.placeholder.email')}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="subject">{t('contact.form.subject')}</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className={styles.input}
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('contact.form.placeholder.subject')}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="message">{t('contact.form.message')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={styles.textarea}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('contact.form.placeholder.message')}
                                    ></textarea>
                                </div>
                                <button type="submit" className={styles.submitBtn}>{t('contact.form.submit')}</button>
                            </form>
                        </motion.div>

                    </div>

                    {/* Map Placeholder */}
                    <div className="container">
                        <div className={styles.mapSection}>
                            {/* In a real app, embed Google Maps iframe here */}
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
                                alt="Map Location"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                            />
                            <div className={styles.mapOverlay}>
                                {t('contact.map.coming')}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
