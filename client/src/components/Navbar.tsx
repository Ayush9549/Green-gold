"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaUser, FaGlobe, FaLeaf, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import styles from './Navbar.module.css';
import { useRouter, usePathname } from 'next/navigation';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <FaLeaf size={24} color="#556b2f" />
                    Green<span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Gold</span>
                </Link>

                <ul className={styles.navLinks}>
                    <li><Link href="/" className={pathname === '/' ? styles.activeLink : ''}>Home</Link></li>
                    <li><Link href="/shop" className={pathname?.startsWith('/shop') ? styles.activeLink : ''}>Products</Link></li>
                    <li><Link href="/about" className={pathname === '/about' ? styles.activeLink : ''}>About</Link></li>
                    <li><Link href="/benefits" className={pathname === '/benefits' ? styles.activeLink : ''}>Benefits</Link></li>
                    <li><Link href="/blog" className={pathname === '/blog' ? styles.activeLink : ''}>Blog</Link></li>
                    <li><Link href="/contact" className={pathname === '/contact' ? styles.activeLink : ''}>Contact</Link></li>
                </ul>

                <div className={styles.navIcons} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

                    {/* User Profile / Login Logic */}
                    {!user ? (
                        <Link href="/login" className={styles.iconBtn} aria-label="Login">
                            <FaUser />
                            <span style={{ fontSize: '0.9rem', marginLeft: '5px' }}>Login</span>
                        </Link>
                    ) : user.email !== 'greengold123@gmail.com' ? (
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
                    ) : null}

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
