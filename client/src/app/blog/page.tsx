"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';


import { useBlogs } from '@/context/BlogContext';


export default function BlogPage() {
    const { t } = useLanguage();
    const { blogs } = useBlogs();
    const BLOG_POSTS = blogs;
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#556b2f' }}>{t('blog.title')}</h1>
                <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#666' }}>{t('blog.subtitle')}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {BLOG_POSTS.map(post => (
                        <div key={post.id} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '1.5rem' }}>
                                <span style={{
                                    background: '#f0f0f0',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem',
                                    color: '#555'
                                }}>
                                    {t(post.category)}
                                </span>
                                <h3 style={{ margin: '1rem 0 0.5rem', fontSize: '1.25rem' }}>{t(post.title)}</h3>
                                <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1rem' }}>{post.date}</div>
                                <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{t(post.excerpt)}</p>
                                <Link href={`/blog/${post.id}`} style={{ color: '#556b2f', fontWeight: 'bold', textDecoration: 'none' }}>
                                    {t('blog.readmore')} &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
