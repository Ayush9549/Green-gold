"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrders, Order } from '@/context/OrderContext';
import styles from '../../Admin.module.css';
import { FaArrowLeft, FaCreditCard, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderDetailsPage() {
    const { t } = useLanguage();
    const params = useParams();
    const router = useRouter();
    const { orders, updateOrderStatus } = useOrders();
    const id = params.id as string;

    const order = orders.find(o => o.id === id);

    if (!order) {
        return <div style={{ padding: '2rem' }}>{t('admin.order_view.not_found')}</div>;
    }

    return (
        <div>
            <button
                onClick={() => router.back()}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#666',
                    marginBottom: '1rem',
                    fontSize: '1rem'
                }}
            >
                <FaArrowLeft /> {t('admin.order_view.back')}
            </button>

            <div className={styles.header}>
                <div>
                    <h1 className={styles.title} style={{ fontSize: '1.8rem' }}>{t('admin.order_view.order')} #{order.id}</h1>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>{t('admin.order_view.placed')} {order.date}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        style={{
                            padding: '0.6rem',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            background: 'white'
                        }}
                    >
                        <option value="Pending">{t('admin.order_view.pending')}</option>
                        <option value="Processing">{t('admin.order_view.processing')}</option>
                        <option value="Shipped">{t('admin.order_view.shipped')}</option>
                        <option value="Completed">{t('admin.order_view.completed')}</option>
                        <option value="Cancelled">{t('admin.order_view.cancelled')}</option>
                    </select>
                </div>
            </div>

            <div className={styles.orderViewGrid}>
                {/* Left Column: Items */}
                <div className={styles.tableContainer}>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>{t('admin.order_view.items')}</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>{t('admin.order_view.product')}</th>
                                <th>{t('admin.products.price')}</th>
                                <th>{t('admin.order_view.quantity')}</th>
                                <th>{t('admin.total')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '50px', height: '50px', background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden' }}>
                                            <img
                                                src={item.image || 'https://via.placeholder.com/50'}
                                                alt={item.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '500' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#888' }}>{item.category}</div>
                                        </div>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity || 1}</td>
                                    <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: '300px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>{t('admin.order_view.subtotal')}</span>
                                <span>${(order.total > 50 ? order.total : order.total - 10).toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>{t('admin.order_view.shipping')}</span>
                                <span>${order.total > 50 ? '0.00' : '10.00'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem', borderTop: '2px solid #eee', paddingTop: '0.5rem' }}>
                                <span>{t('admin.total')}</span>
                                <span style={{ color: '#2e3b23' }}>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Customer */}
                    <div className={styles.card} style={{ borderTop: 'none', padding: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#444' }}>
                            <FaUser size={16} /> {t('admin.order_view.customer_details')}
                        </h3>
                        <p style={{ fontWeight: 'bold' }}>{order.customerName}</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>{order.userId}</p>
                    </div>

                    {/* Shipping Address */}
                    <div className={styles.card} style={{ borderTop: 'none', padding: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#444' }}>
                            <FaMapMarkerAlt size={16} /> {t('admin.order_view.shipping_address')}
                        </h3>
                        {order.shippingAddress.street ? (
                            <div style={{ color: '#666', fontSize: '0.95rem' }}>
                                <p>{order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                            </div>
                        ) : (
                            <p style={{ color: '#999', fontStyle: 'italic' }}>{t('admin.order_view.no_address')}</p>
                        )}
                    </div>

                    {/* Payment Info */}
                    <div className={styles.card} style={{ borderTop: 'none', padding: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#444' }}>
                            <FaCreditCard size={16} /> {t('admin.order_view.payment_info')}
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#555' }}>
                                {order.paymentMethod}
                            </span>
                            <span className={`${styles.status} ${styles.completed} `} style={{ fontSize: '0.8rem' }}>{t('admin.order_view.paid')}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
