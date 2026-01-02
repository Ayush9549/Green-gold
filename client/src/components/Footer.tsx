"use client";
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaLeaf } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>

                {/* Brand Section */}
                <div className={styles.brandCol}>
                    <Link href="/" className={styles.footerLogo}>
                        Green<span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Gold</span>
                    </Link>
                    <p className={styles.footerDesc}>
                        Bringing the purest, cold-pressed olive oil from organic farms directly to your kitchen. Experience the gold standard of health.
                    </p>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialIcon} aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Twitter"><FaTwitter /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className={styles.footerTitle}>Quick Links</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/shop">Shop Now</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact Support</Link></li>
                        <li><Link href="/faq">FAQs</Link></li>
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h3 className={styles.footerTitle}>Customer Care</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/shipping-policy">Shipping Policy</Link></li>
                        <li><Link href="/returns-refunds">Returns & Refunds</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link href="/terms-of-service">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className={styles.footerTitle}>Stay Updated</h3>
                    <p style={{ marginBottom: '1rem', opacity: 0.8 }}>Subscribe for exclusive offers and health tips.</p>
                    <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email..." className={styles.newsletterInput} />
                        <button type="submit" className={styles.newsletterBtn}>Join</button>
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
