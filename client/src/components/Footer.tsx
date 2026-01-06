"use client";
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>

                {/* Brand Section */}
                <div className={styles.brandCol}>
                    <Link href="/" className={styles.footerLogo}>
                        Green<span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Gold</span>
                    </Link>
                    <p className={styles.footerDesc}>
                        {t('footer.desc')}
                    </p>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialIcon} aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Twitter"><FaTwitter /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className={styles.footerTitle}>{t('footer.quick')}</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/">{t('nav.home')}</Link></li>
                        <li><Link href="/shop">{t('hero.cta')}</Link></li>
                        <li><Link href="/about">{t('nav.about')}</Link></li>
                        <li><Link href="/contact">{t('nav.contact')}</Link></li>
                        <li><Link href="/faq">FAQs</Link></li>
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h3 className={styles.footerTitle}>{t('footer.customer')}</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/shipping-policy">{t('footer.shipping')}</Link></li>
                        <li><Link href="/returns-refunds">{t('footer.returns')}</Link></li>
                        <li><Link href="/privacy-policy">{t('footer.privacy')}</Link></li>
                        <li><Link href="/terms-of-service">{t('footer.terms')}</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className={styles.footerTitle}>{t('footer.stay')}</h3>
                    <p style={{ marginBottom: '1rem', opacity: 0.8 }}>{t('footer.sub')}</p>
                    <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email..." className={styles.newsletterInput} />
                        <button type="submit" className={styles.newsletterBtn}>{t('footer.join')}</button>
                    </form>
                </div>
            </div>

            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Green Gold. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
