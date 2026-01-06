"use client";
import React, { useState } from 'react';
import styles from '../Admin.module.css';
import { useCoupons } from '@/context/CouponContext';
import { FaTrash, FaPlus, FaTag } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function CouponsPage() {
    const { t } = useLanguage();
    const { coupons, addCoupon, deleteCoupon, toggleCouponStatus } = useCoupons();
    const [showForm, setShowForm] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        type: 'percentage',
        value: 0,
        expirationDate: '',
        isActive: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCoupon({
            ...newCoupon,
            type: newCoupon.type as 'percentage' | 'fixed',
            value: Number(newCoupon.value) // Ensure number
        });
        setNewCoupon({ code: '', type: 'percentage', value: 0, expirationDate: '', isActive: true });
        setShowForm(false);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('admin.coupons.title')}</h1>
                <button
                    className={styles.primaryBtn}
                    onClick={() => setShowForm(!showForm)}
                    style={{ background: '#556b2f', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <FaPlus /> {t('admin.coupons.add')}
                </button>
            </div>

            {/* Add Coupon Form */}
            {showForm && (
                <div className={styles.card} style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>{t('admin.coupons.form_title')}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('admin.coupons.code')}</label>
                            <input
                                type="text"
                                required
                                value={newCoupon.code}
                                onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                placeholder={t('admin.coupons.code_placeholder')}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('admin.coupons.expiration')}</label>
                            <input
                                type="date"
                                required
                                value={newCoupon.expirationDate}
                                onChange={e => setNewCoupon({ ...newCoupon, expirationDate: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('admin.coupons.discount_type')}</label>
                            <select
                                value={newCoupon.type}
                                onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="percentage">{t('admin.coupons.type_percentage')}</option>
                                <option value="fixed">{t('admin.coupons.type_fixed')}</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('admin.coupons.discount_value')}</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={newCoupon.value}
                                onChange={e => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <button type="submit" style={{ background: '#2e3b23', color: '#e6c15c', padding: '0.8rem 2rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                {t('admin.coupons.create')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Coupons List */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t('admin.coupons.code')}</th>
                            <th>{t('admin.coupons.discount')}</th>
                            <th>{t('admin.coupons.expires')}</th>
                            <th>{t('admin.status')}</th>
                            <th>{t('admin.products.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>{t('admin.coupons.no_coupons')}</td>
                            </tr>
                        ) : (
                            coupons.map(coupon => (
                                <tr key={coupon.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                            <FaTag color="#556b2f" /> {coupon.code}
                                        </div>
                                    </td>
                                    <td>
                                        {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                                    </td>
                                    <td>{coupon.expirationDate}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleCouponStatus(coupon.id)}
                                            style={{
                                                background: coupon.isActive ? '#d1e7dd' : '#f8d7da',
                                                color: coupon.isActive ? '#0f5132' : '#842029',
                                                border: '1px solid',
                                                borderColor: coupon.isActive ? '#badbcc' : '#f5c2c7',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            {coupon.isActive ? t('admin.coupons.active') : t('admin.coupons.inactive')}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => deleteCoupon(coupon.id)}
                                            style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer' }}
                                            title={t('admin.coupons.delete_title')}
                                        >
                                            <FaTrash />
                                        </button>
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
