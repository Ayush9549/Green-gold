"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaBox, FaShoppingBag, FaTicketAlt, FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import styles from './Admin.module.css';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const ADMIN_EMAIL = 'greengold123@gmail.com';

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/admin-login');
            } else if (user?.email !== ADMIN_EMAIL) {
                // Not authorized as admin, redirect to admin login to allow switching
                router.push('/admin-login');
                // Optional: You could show a toast or alert here
            }
        }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
        return (
            <div className={styles.adminContainer} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading Admin Panel...</p>
            </div>
        );
    }

    if (!isAuthenticated || user?.email !== ADMIN_EMAIL) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '1rem' }}>
                    <div className={styles.brand} style={{ flexGrow: 1 }}>Green Gold Admin</div>
                    <button
                        className={styles.sidebarToggle}
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ color: 'white', marginTop: '-0.5rem' }}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Language Selector */}
                <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'white'
                    }}>
                        <FaGlobe />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            <option value="en" style={{ background: '#2c3e1f', color: 'white' }}>English</option>
                            <option value="hi" style={{ background: '#2c3e1f', color: 'white' }}>हिंदी</option>
                            <option value="it" style={{ background: '#2c3e1f', color: 'white' }}>Italiano</option>
                            <option value="es" style={{ background: '#2c3e1f', color: 'white' }}>Español</option>
                            <option value="fr" style={{ background: '#2c3e1f', color: 'white' }}>Français</option>
                            <option value="de" style={{ background: '#2c3e1f', color: 'white' }}>Deutsch</option>
                            <option value="pt" style={{ background: '#2c3e1f', color: 'white' }}>Português</option>
                            <option value="zh" style={{ background: '#2c3e1f', color: 'white' }}>中文</option>
                            <option value="ja" style={{ background: '#2c3e1f', color: 'white' }}>日本語</option>
                        </select>
                    </div>
                </div>

                <ul className={styles.navItems}>
                    <li>
                        <Link
                            href="/admin"
                            className={`${styles.navLink} ${pathname === '/admin' ? styles.active : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            {t('admin.nav.dashboard')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/products"
                            className={`${styles.navLink} ${pathname?.startsWith('/admin/products') ? styles.active : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <FaBox /> {t('admin.nav.products')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/orders"
                            className={`${styles.navLink} ${pathname?.startsWith('/admin/orders') ? styles.active : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <FaShoppingBag /> {t('admin.nav.orders')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/coupons"
                            className={`${styles.navLink} ${pathname?.startsWith('/admin/coupons') ? styles.active : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <FaTicketAlt /> {t('admin.nav.coupons')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className={styles.navLink}>
                            {t('admin.nav.back_to_store')}
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={logout}
                            className={styles.navLink}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                width: '100%',
                                textAlign: 'left',
                                fontSize: 'inherit',
                                fontFamily: 'inherit',
                                cursor: 'pointer',
                                color: 'inherit'
                            }}
                        >
                            {t('admin.nav.logout')}
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <button
                    className={styles.sidebarToggle}
                    onClick={() => setIsSidebarOpen(true)}
                    style={{ marginBottom: '1rem' }}
                >
                    <FaBars />
                </button>
                {children}
            </main>
        </div>
    );
}
