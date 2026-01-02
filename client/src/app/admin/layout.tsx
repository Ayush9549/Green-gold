"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.brand}>Jaitun Admin</div>
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
                </ul>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
