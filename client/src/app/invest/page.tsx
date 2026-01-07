"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaShieldAlt, FaSeedling, FaHandHoldingUsd, FaTimes,
    FaCertificate, FaGlobe, FaArrowRight, FaQuestionCircle,
    FaLock, FaChartLine, FaEnvelope
} from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Invest.module.css';
import { toast } from 'react-hot-toast';

const InvestPage = () => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inquiryData, setInquiryData] = useState({ name: '', email: '', hectares: '1' });

    const benefits = [
        {
            icon: <FaShieldAlt />,
            title: "invest.limited.title",
            desc: "invest.limited.desc"
        },
        {
            icon: <FaHandHoldingUsd />,
            title: "invest.buyback.title",
            desc: "invest.buyback.desc"
        },
        {
            icon: <FaSeedling />,
            title: "invest.harvest.title",
            desc: "invest.harvest.desc"
        }
    ];

    const faqs = [
        {
            q: "invest.faq1_q",
            a: "invest.faq1_a"
        },
        {
            q: "invest.faq2_q",
            a: "invest.faq2_a"
        },
        {
            q: "invest.faq3_q",
            a: "invest.faq3_a"
        }
    ];

    const handleInquiry = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(t("invest.success"));
        setIsModalOpen(false);
    };

    const downloadProspectus = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: t("invest.prospectus_loading"),
                success: t("invest.prospectus") + ' success!', // Simple feedback
                error: 'Failed to generate prospectus.',
            }
        );
    };

    return (
        <main className={styles.main}>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={styles.badge}>{t('invest.exclusive_opp')}</span>
                        <h1 className={styles.title}>{t('invest.title')}</h1>
                        <p className={styles.subtitle}>{t('invest.subtitle')}</p>
                        <div className={styles.heroButtons}>
                            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-lg">
                                {t('invest.cta')} <FaArrowRight style={{ marginLeft: '10px' }} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Badges */}
            <div className={styles.trustSection}>
                <div className="container">
                    <div className={styles.trustGrid}>
                        <div className={styles.trustItem}><FaCertificate className={styles.trustIcon} /> {t('cert.fssai')}</div>
                        <div className={styles.trustItem}><FaLock className={styles.trustIcon} /> {t('cert.iso')}</div>
                        <div className={styles.trustItem}><FaGlobe className={styles.trustIcon} /> {t('invest.standards')}</div>
                        <div className={styles.trustItem}><FaChartLine className={styles.trustIcon} /> {t('invest.buyback.title')}</div>
                    </div>
                </div>
            </div>

            {/* Main Benefits */}
            <section className={styles.benefits}>
                <div className="container">
                    <div className={styles.grid}>
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className={styles.card}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.icon}>{benefit.icon}</div>
                                <h3>{t(benefit.title)}</h3>
                                <p>{t(benefit.desc)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step-by-Step */}
            <section className={styles.howItWorks}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2>{t('invest.path_title')}</h2>
                        <p>{t('invest.path_desc')}</p>
                    </div>

                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>01</div>
                            <h4>{t('invest.step1_title')}</h4>
                            <p>{t('invest.step1_desc')}</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>02</div>
                            <h4>{t('invest.step2_title')}</h4>
                            <p>{t('invest.step2_desc')}</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>03</div>
                            <h4>{t('invest.step3_title')}</h4>
                            <p>{t('invest.step3_desc')}</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>04</div>
                            <h4>{t('invest.step4_title')}</h4>
                            <p>{t('invest.step4_desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.faqSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2>{t('invest.faq_title')}</h2>
                        <p>{t('invest.faq_subtitle')}</p>
                    </div>
                    <div className={styles.faqGrid}>
                        {faqs.map((faq, i) => (
                            <div key={i} className={styles.faqCard}>
                                <h4>{t(faq.q)} <FaQuestionCircle /></h4>
                                <p>{t(faq.a)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={styles.ctaBanner}>
                <div className="container">
                    <div className={styles.ctaBox}>
                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>{t('invest.cta_title')}</h2>
                        <p style={{ marginBottom: '1rem' }}>{t('invest.cta_desc')}</p>
                        <div className={styles.ctaButtons}>
                            <button onClick={downloadProspectus} className="btn" style={{ background: 'white', color: 'var(--color-primary-dark)', marginRight: '1rem' }}>
                                <FaShieldAlt style={{ marginRight: '8px' }} /> {t('invest.prospectus')}
                            </button>
                            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ border: '2px solid white' }}>
                                <FaEnvelope style={{ marginRight: '8px' }} /> {t('invest.expert')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                        >
                            <FaTimes className={styles.closeModal} onClick={() => setIsModalOpen(false)} />
                            <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>{t('invest.inquiry_title')}</h2>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>{t('invest.inquiry_subtitle')}</p>
                            <form onSubmit={handleInquiry}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>{t('invest.name')}</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={inquiryData.name}
                                        onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>{t('invest.email')}</label>
                                    <input
                                        type="email"
                                        required
                                        className="form-control"
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={inquiryData.email}
                                        onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>{t('invest.hectares')}</label>
                                    <select
                                        className="form-control"
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={inquiryData.hectares}
                                        onChange={(e) => setInquiryData({ ...inquiryData, hectares: e.target.value })}
                                    >
                                        <option value="1">{t('invest.1_hectare')}</option>
                                        <option value="2">{t('invest.2_hectares')}</option>
                                        <option value="5">{t('invest.5_hectares')}</option>
                                        <option value="10">{t('invest.10_hectares')}</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t('invest.submit')}</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
};

export default InvestPage;
