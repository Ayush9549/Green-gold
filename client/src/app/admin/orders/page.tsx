"use client";
import React from 'react';
import styles from '../Admin.module.css';

const MOCK_ORDERS = [
    { id: "ORD-001", customer: "John Doe", date: "Jan 1, 2026", status: "Completed", total: 54.99 },
    { id: "ORD-002", customer: "Jane Smith", date: "Jan 1, 2026", status: "Pending", total: 29.99 },
    { id: "ORD-003", customer: "Mike Johnson", date: "Dec 31, 2025", status: "Shipped", total: 112.50 },
    { id: "ORD-004", customer: "Alice Brown", date: "Dec 30, 2025", status: "Processing", total: 15.00 },
];

export default function OrdersPage() {
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Order Management</h1>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_ORDERS.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.date}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[order.status.toLowerCase()] || ''}`} style={{
                                        background: order.status === 'Processing' ? '#e2e3e5' : undefined,
                                        color: order.status === 'Processing' ? '#383d41' : undefined
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>
                                    <button style={{ color: '#3498db', cursor: 'pointer', background: 'none', border: 'none' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
