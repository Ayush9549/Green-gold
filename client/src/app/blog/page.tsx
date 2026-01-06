"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';


export default function BlogPage() {
    const { t } = useLanguage();
    const BLOG_POSTS = [
        {
            id: 1,
            title: "blog.post1.title",
            category: "blog.category.recipes",
            date: "Oct 12, 2023",
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80",
            excerpt: "blog.post1.excerpt"
        },
        {
            id: 2,
            title: "blog.post2.title",
            category: "blog.category.cooking",
            date: "Oct 25, 2023",
            image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80",
            excerpt: "blog.post2.excerpt"
        },
        {
            id: 3,
            title: "blog.post3.title",
            category: "blog.category.health",
            date: "Nov 03, 2023",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=500&q=80",
            excerpt: "blog.post3.excerpt"
        }
    ];
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
