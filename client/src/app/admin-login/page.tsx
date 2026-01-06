"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaLeaf } from 'react-icons/fa';

export default function AdminLogin() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Admin Validation Hardcoded
        if (formData.email === 'greengold123@gmail.com' && formData.password === 'Greengold@123') {
            const mockAdmin = {
                name: "Admin User",
                email: formData.email,
            };
            login(mockAdmin);
            router.push('/admin');
        } else {
            setError("Invalid admin credentials");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a2215 0%, #2e3b23 100%)',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                width: '100%',
                maxWidth: '420px',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <FaLeaf size={32} color="#556b2f" />
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: "'Playfair Display', serif", color: '#2e3b23' }}>
                        Green<span style={{ color: '#e6c15c', fontStyle: 'italic' }}>Gold</span> Admin
                    </span>
                </div>

                <h2 style={{ marginBottom: '0.5rem', color: '#333' }}>Welcome Back</h2>
                <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>Please enter your details to sign in.</p>

                {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: '#4b5563' }}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="admin@greengold.com"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: '#4b5563' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        padding: '0.875rem',
                        background: '#e6c15c',
                        color: '#2e3b23',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.1s'
                    }}>
                        Sign In to Dashboard
                    </button>
                </form>

                <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#888' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#6b7280' }}>← Back to Website</Link>
                </div>
            </div>
        </div>
    );
}
