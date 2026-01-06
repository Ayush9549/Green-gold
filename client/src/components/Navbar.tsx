"use client";
import React, { useState } from 'react';
import Link from 'next/link';

import { FaShoppingCart, FaUser, FaGlobe, FaLeaf, FaSearch, FaBox, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';
import { useRouter, usePathname } from 'next/navigation';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, Language } from '@/context/LanguageContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <Link href="/" className={styles.logo} onClick={closeMenu}>
                        <FaLeaf size={24} color="#556b2f" />
                        Green<span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Gold</span>
                    </Link>
                </div>

                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
                    <li><Link href="/" className={pathname === '/' ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.home')}</Link></li>
                    <li><Link href="/shop" className={pathname?.startsWith('/shop') ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.products')}</Link></li>
                    <li><Link href="/about" className={pathname === '/about' ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.about')}</Link></li>
                    <li><Link href="/benefits" className={pathname === '/benefits' ? styles.activeLink : ''} onClick={closeMenu}>Benefits</Link></li>
                    <li><Link href="/blog" className={pathname === '/blog' ? styles.activeLink : ''} onClick={closeMenu}>Blog</Link></li>
                    <li><Link href="/contact" className={pathname === '/contact' ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.contact')}</Link></li>
                </ul>

                <div className={styles.navIcons} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                    {/* Language Switcher */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FaGlobe color="#556b2f" style={{ marginRight: '5px' }} />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            style={{ border: 'none', background: 'transparent', fontWeight: 'bold', color: '#556b2f', cursor: 'pointer', outline: 'none', fontSize: '0.9rem' }}
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="it">Italiano</option>
                            <option value="pt">Português</option>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                            <option value="ru">Русский</option>
                            <option value="ar">العربية</option>
                        </select>
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative' }}> {/* Responsive note: visible on desktop usually */}
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                padding: '0.5rem 1rem 0.5rem 2.2rem',
                                borderRadius: '20px',
                                border: '1px solid #e0e0e0',
                                outline: 'none',
                                fontSize: '0.9rem',
                                width: '200px',
                                background: '#f9f9f9'
                            }}
                        />
                        <FaSearch style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#888',
                            fontSize: '0.9rem'
                        }} />
                    </div>

                    {/* Orders Icon for Logged In Users */}
                    {user && user.email !== 'greengold123@gmail.com' && (
                        <Link href="/orders" className={styles.iconBtn} aria-label="My Orders" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#556b2f' }}>
                            <FaBox size={18} />
                            <span style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>Orders</span>
                        </Link>
                    )}

                    {/* User Profile / Login Logic */}
                    {!user || user.email === 'greengold123@gmail.com' ? (
                        <Link href="/login" className={styles.iconBtn} aria-label="Login">
                            <FaUser />
                            <span style={{ fontSize: '0.9rem', marginLeft: '5px' }}>Login</span>
                        </Link>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                                    {user.name?.split(' ')[0]}
                                </span>
                                <button
                                    onClick={logout}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: '#e74c3c', fontSize: '0.7rem', textDecoration: 'underline'
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                            <div style={{
                                width: '35px', height: '35px', borderRadius: '50%',
                                background: 'var(--color-gold)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold'
                            }}>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}

                    <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
                        <FaShoppingCart />
                        <span className={styles.cartCount}>{cartCount}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
