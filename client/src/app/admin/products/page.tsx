"use client";
import React from 'react';
import Link from 'next/link';
import styles from '../Admin.module.css';
import { useProducts } from '@/context/ProductContext'; // Import hook

export default function ProductsPage() {
    const { products, deleteProduct } = useProducts(); // Use context

    const handleDelete = (id: string | number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Product Management</h1>
                <Link href="/admin/products/new" style={{
                    background: '#eebb2d', color: 'white', border: 'none', padding: '0.6rem 1.2rem',
                    borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none'
                }}>
                    + Add New Product
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>#{product.id}</td>
                                <td>{product.name || product.title}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.stock || 50}</td>
                                <td>
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        style={{ marginRight: '0.5rem', color: '#3498db', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'none' }}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        style={{ color: '#e74c3c', cursor: 'pointer', background: 'none', border: 'none' }}
                                    >
                                        Delete
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
