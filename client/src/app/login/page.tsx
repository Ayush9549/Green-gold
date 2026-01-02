"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login - In real app, validate with backend
        const mockUser = {
            name: "Test User",
            email: formData.email,
            // address: undefined // Intentionally undefined to test address flow
        };

        login(mockUser);
        alert("Logged in successfully!");

        // Return to home or previous page
        router.push('/');
    };

    return (
        <main>
            <Navbar />
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Sign In</button>
                    </form>
                    <div className={styles.links}>
                        <p>Don't have an account? <Link href="/register" className={styles.link}>Create one</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
