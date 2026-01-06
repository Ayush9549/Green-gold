"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Admin.module.css';
import { useBlogs } from '@/context/BlogContext';

export default function AdminBlogsPage() {
    const { blogs, deleteBlog } = useBlogs();

    const handleDelete = (id: string | number) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            deleteBlog(id);
        }
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Manage Blogs</h1>
                <Link href="/admin/blogs/new" style={{
                    background: '#eebb2d', color: 'white', border: 'none', padding: '0.6rem 1.2rem',
                    borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none'
                }}>
                    Add New Blog
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                    No blogs found. Add your first post!
                                </td>
                            </tr>
                        ) : (
                            blogs.map(blog => (
                                <tr key={blog.id}>
                                    <td>#{blog.id}</td>
                                    <td>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '44px', overflow: 'hidden', border: '1px solid #eee', position: 'relative' }}>
                                            <Image
                                                src={blog.image || 'https://via.placeholder.com/50'}
                                                alt={blog.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: '500', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {blog.title}
                                    </td>
                                    <td>{blog.category}</td>
                                    <td>{blog.date}</td>
                                    <td>{blog.author}</td>
                                    <td>
                                        <Link
                                            href={`/admin/blogs/${blog.id}/edit`}
                                            style={{ marginRight: '0.5rem', color: '#3498db', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'none' }}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            style={{ color: '#e74c3c', cursor: 'pointer', background: 'none', border: 'none' }}
                                        >
                                            Delete
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
