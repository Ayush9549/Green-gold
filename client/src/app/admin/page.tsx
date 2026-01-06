"use client";
import React from 'react';
import styles from './Admin.module.css';
import { FaShoppingBag, FaUsers, FaDollarSign, FaBox } from 'react-icons/fa';
import { useProducts } from '@/context/ProductContext';
import { useOrders } from '@/context/OrderContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminDashboard() {
    const { t } = useLanguage();
    const { products } = useProducts();
    const { orders } = useOrders();

    // Calculate dynamic stats
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;

    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrdersCount = orders.length;
    // Simple unique customer count based on email/ID
    const uniqueCustomers = new Set(orders.map(o => o.userId)).size;

    return (
        <div>
            {/* <div className={styles.header}>
                <h1 className={styles.title}>Dashboard Overview</h1>
            </div> */}

            {/* Metrics Cards */}
            <div className={styles.cardGrid}>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>{t('admin.sales')}</span>
                        <FaDollarSign color="#2ecc71" size={20} />
                    </div>
                    <span className={styles.cardValue}>${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>{t('admin.orders')}</span>
                        <FaShoppingBag color="#3498db" size={20} />
                    </div>
                    <span className={styles.cardValue}>{totalOrdersCount}</span>
                </div>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>{t('admin.products')}</span>
                        <FaBox color="#f39c12" size={20} />
                    </div>
                    <span className={styles.cardValue}>{totalProducts}</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{lowStockProducts} {t('admin.low_stock')}</span>
                </div>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>{t('admin.customers')}</span>
                        <FaUsers color="#9b59b6" size={20} />
                    </div>
                    <span className={styles.cardValue}>{uniqueCustomers}</span>
                </div>
            </div>

            {/* Recent Orders Table */}
            <h2 style={{ marginBottom: '1rem', color: '#444' }}>{t('admin.recent_orders')}</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t('admin.order_id')}</th>
                            <th>{t('admin.customer')}</th>
                            <th>{t('admin.date')}</th>
                            <th>{t('admin.status')}</th>
                            <th>{t('admin.total')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>{t('admin.no_orders')}</td>
                            </tr>
                        ) : (
                            orders.slice(0, 5).map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[order.status.toLowerCase()] || ''}`}
                                            style={{
                                                background: order.status === 'Processing' ? '#e2e3e5' : undefined,
                                                color: order.status === 'Processing' ? '#383d41' : undefined,
                                                border: order.status === 'Processing' ? '1px solid #d6d8db' : undefined
                                            }}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>${order.total.toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
