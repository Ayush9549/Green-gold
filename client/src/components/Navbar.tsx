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
    const [isSearchOpen, setIsSearchOpen] = useState(false);
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
                <div className={styles.navLeft}>
                    <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <Link href="/" className={styles.logo} onClick={closeMenu}>
                        <FaLeaf className={styles.logoIcon} />
                        <span>Green<span className={styles.goldText}>Gold</span></span>
                    </Link>
                </div>

                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                    <li className={styles.mobileOnly}>
                        <div className={styles.mobileSearch}>
                            <input
                                type="text"
                                placeholder={t('nav.search') || "Search..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                            <FaSearch />
                        </div>
                    </li>
                    <li><Link href="/" className={pathname === '/' ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.home')}</Link></li>
                    <li><Link href="/shop" className={pathname?.startsWith('/shop') ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.products')}</Link></li>
                    <li><Link href="/about" className={pathname === '/about' ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.about')}</Link></li>
                    <li><Link href="/benefits" className={pathname === '/benefits' ? styles.activeLink : ''} onClick={closeMenu}>Benefits</Link></li>
                    <li><Link href="/blog" className={pathname === '/blog' ? styles.activeLink : ''} onClick={closeMenu}>Blog</Link></li>
                    <li><Link href="/invest" className={pathname === '/invest' ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.invest')}</Link></li>
                    <li><Link href="/contact" className={pathname === '/contact' ? styles.activeLink : ''} onClick={closeMenu}>{t('nav.contact')}</Link></li>

                    <li className={styles.mobileOnly}>
                        <div className={styles.mobileLang}>
                            <FaGlobe />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as Language)}
                            >
                                <option value="en">English</option>
                                <option value="hi">हिंदी</option>
                                <option value="it">Italiano</option>
                            </select>
                        </div>
                    </li>
                </ul>

                <div className={styles.navRight}>
                    {/* Desktop Search */}
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder={t('nav.search') || "Search..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <FaSearch className={styles.searchIcon} />
                    </div>

                    {/* Mobile Search Toggle */}
                    <button className={styles.mobileSearchToggle} onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <FaSearch />
                    </button>

                    {/* Desktop Language Switcher */}
                    <div className={styles.langSwitcher}>
                        <FaGlobe />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                        >
                            <option value="en">EN</option>
                            <option value="hi">HI</option>
                            <option value="it">IT</option>
                        </select>
                    </div>

                    <div className={styles.iconActions}>
                        {user && user.email !== 'greengold123@gmail.com' && (
                            <Link href="/orders" className={styles.iconBtn} aria-label="My Orders">
                                <FaBox />
                                <span className={styles.iconText}>Orders</span>
                            </Link>
                        )}

                        {!user || user.email === 'greengold123@gmail.com' ? (
                            <Link href="/login" className={styles.iconBtn} aria-label="Login">
                                <FaUser />
                                <span className={styles.iconText}>Login</span>
                            </Link>
                        ) : (
                            <div className={styles.userProfile}>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{user.name?.split(' ')[0]}</span>
                                    <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                                </div>
                                <div className={styles.userAvatar}>
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
            </div>

            {/* Mobile Search Bar Expandable */}
            <div className={`${styles.mobileSearchOverlay} ${isSearchOpen ? styles.show : ''}`}>
                <input
                    type="text"
                    placeholder={t('nav.search') || "Search..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                            setIsSearchOpen(false);
                        }
                    }}
                    autoFocus={isSearchOpen}
                />
                <button onClick={() => setIsSearchOpen(false)}><FaTimes /></button>
            </div>
        </nav>
    );
};

export default Navbar;
