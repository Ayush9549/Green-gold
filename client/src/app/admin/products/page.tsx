"use client";
import React from 'react';
import Link from 'next/link';
import styles from '../Admin.module.css';
import { useProducts } from '@/context/ProductContext'; // Import hook
import { useLanguage } from '@/context/LanguageContext';

export default function ProductsPage() {
    const { t } = useLanguage();
    const { products, deleteProduct } = useProducts(); // Use context

    const handleDelete = (id: string | number) => {
        if (window.confirm(t('admin.products.delete_confirm'))) {
            deleteProduct(id);
        }
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('admin.products.title')}</h1>
                <Link href="/admin/products/new" style={{
                    background: '#eebb2d', color: 'white', border: 'none', padding: '0.6rem 1.2rem',
                    borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none'
                }}>
                    {t('admin.products.add')}
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t('admin.products.id')}</th>
                            <th>{t('admin.add_product.image')}</th>
                            <th>{t('admin.products.name')}</th>
                            <th>{t('admin.products.category')}</th>
                            <th>{t('admin.products.price')}</th>
                            <th>{t('admin.products.stock')}</th>
                            <th>{t('admin.products.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>#{product.id}</td>
                                <td>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #eee' }}>
                                        <img
                                            src={product.image || 'https://via.placeholder.com/50'}
                                            alt={product.name || product.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </td>
                                <td>{product.name || product.title}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.stock || 50}</td>
                                <td>
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        style={{ marginRight: '0.5rem', color: '#3498db', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'none' }}
                                    >
                                        {t('admin.products.edit')}
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        style={{ color: '#e74c3c', cursor: 'pointer', background: 'none', border: 'none' }}
                                    >
                                        {t('admin.products.delete')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
