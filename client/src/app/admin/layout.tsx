"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Admin.module.css';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const ADMIN_EMAIL = 'greengold123@gmail.com';

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (user?.email !== ADMIN_EMAIL) {
                // Not authorized as admin
                router.push('/');
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
            <aside className={styles.sidebar}>
                <div className={styles.brand}>Green Gold Admin</div>
                <ul className={styles.navItems}>
                    <li>
                        <Link
                            href="/admin"
                            className={`${styles.navLink} ${pathname === '/admin' ? styles.active : ''}`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/products"
                            className={`${styles.navLink} ${pathname.includes('/products') ? styles.active : ''}`}
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/orders"
                            className={`${styles.navLink} ${pathname.includes('/orders') ? styles.active : ''}`}
                        >
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className={styles.navLink}>
                            Back to Store
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
                            Logout
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
