"use client";
import React from 'react';
import styles from './Admin.module.css';
import { FaShoppingBag, FaUsers, FaDollarSign, FaBox } from 'react-icons/fa';
import { useProducts } from '@/context/ProductContext';

export default function AdminDashboard() {
    const { products } = useProducts();

    // Calculate dynamic stats
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;
    // Mock sales/order logic for now as we don't have OrderContext yet
    // But we can estimate 'potential' value or just keep static for Sales/Orders
    // Let's keep Sales/Orders static but make Products dynamic

    return (
        <div>
            {/* <div className={styles.header}>
                <h1 className={styles.title}>Dashboard Overview</h1>
            </div> */}

            {/* Metrics Cards */}
            <div className={styles.cardGrid}>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>Total Sales</span>
                        <FaDollarSign color="#2ecc71" size={20} />
                    </div>
                    <span className={styles.cardValue}>$12,450</span>
                </div>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>Total Orders</span>
                        <FaShoppingBag color="#3498db" size={20} />
                    </div>
                    <span className={styles.cardValue}>148</span>
                </div>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>Total Products</span>
                        <FaBox color="#f39c12" size={20} />
                    </div>
                    <span className={styles.cardValue}>{totalProducts}</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{lowStockProducts} Low Stock</span>
                </div>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.cardLabel}>Customers</span>
                        <FaUsers color="#9b59b6" size={20} />
                    </div>
                    <span className={styles.cardValue}>85</span>
                </div>
            </div>

            {/* Recent Orders Table */}
            <h2 style={{ marginBottom: '1rem', color: '#444' }}>Recent Orders</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-001</td>
                            <td>John Doe</td>
                            <td>Jan 1, 2026</td>
                            <td><span className={`${styles.status} ${styles.completed}`}>Completed</span></td>
                            <td>$54.99</td>
                        </tr>
                        <tr>
                            <td>#ORD-002</td>
                            <td>Jane Smith</td>
                            <td>Jan 1, 2026</td>
                            <td><span className={`${styles.status} ${styles.pending}`}>Pending</span></td>
                            <td>$29.99</td>
                        </tr>
                        <tr>
                            <td>#ORD-003</td>
                            <td>Mike Jhonson</td>
                            <td>Dec 31, 2025</td>
                            <td><span className={`${styles.status} ${styles.shipped}`}>Shipped</span></td>
                            <td>$112.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
