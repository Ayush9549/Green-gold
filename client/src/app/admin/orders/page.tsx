"use client";
import React from 'react';
import Link from 'next/link';
import styles from '../Admin.module.css';
import { useOrders } from '@/context/OrderContext';
import { useLanguage } from '@/context/LanguageContext';

export default function OrdersPage() {
    const { t } = useLanguage();
    const { orders } = useOrders();

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('admin.orders.title')}</h1>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t('admin.order_id')}</th>
                            <th>{t('admin.customer')}</th>
                            <th>{t('admin.order_view.items')}</th>
                            <th>{t('admin.date')}</th>
                            <th>{t('admin.status')}</th>
                            <th>{t('admin.total')}</th>
                            <th>{t('admin.orders.payment')}</th>
                            <th>{t('admin.products.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                    {t('admin.orders.no_orders')}
                                </td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {order.items.length > 0 && (
                                                <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #eee' }}>
                                                    <img
                                                        src={order.items[0].image || 'https://via.placeholder.com/40'}
                                                        alt={order.items[0].title}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                    {order.items.length > 1 && (
                                                        <div style={{
                                                            position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.6)',
                                                            color: 'white', fontSize: '10px', padding: '1px 3px', borderTopLeftRadius: '4px'
                                                        }}>
                                                            +{order.items.length - 1}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </td>
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
                                    <td style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}>{order.paymentMethod}</td>
                                    <td>
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            style={{
                                                color: '#3498db',
                                                fontWeight: 'bold',
                                                textDecoration: 'none',
                                                background: '#ebf5fb',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                display: 'inline-block'
                                            }}
                                        >
                                            {t('admin.orders.view')}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
