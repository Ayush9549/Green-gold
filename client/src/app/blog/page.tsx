"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const BLOG_POSTS = [
    {
        id: 1,
        title: "5 Easy Salad Dressings with Olive Oil",
        category: "Recipes",
        date: "Oct 12, 2023",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80",
        excerpt: "Elevate your salads with these simple, healthy, and delicious homemade dressings."
    },
    {
        id: 2,
        title: "Can You Fry with Extra Virgin Olive Oil?",
        category: "Cooking Tips",
        date: "Oct 25, 2023",
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80",
        excerpt: "Debunking the myths around smoke points and cooking with premium olive oil."
    },
    {
        id: 3,
        title: "The Ultimate Guide to Mediterranean Diet",
        category: "Health",
        date: "Nov 03, 2023",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=500&q=80",
        excerpt: "How to incorporate liquid gold into your daily diet for maximum health benefits."
    }
];

export default function BlogPage() {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#556b2f' }}>Jaitun Blog & Recipes</h1>
                <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#666' }}>Tips, tricks, and tales from the world of healthy living.</p>

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
                                    {post.category}
                                </span>
                                <h3 style={{ margin: '1rem 0 0.5rem', fontSize: '1.25rem' }}>{post.title}</h3>
                                <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1rem' }}>{post.date}</div>
                                <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                                <Link href={`/blog/${post.id}`} style={{ color: '#556b2f', fontWeight: 'bold', textDecoration: 'none' }}>
                                    Read More &rarr;
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
