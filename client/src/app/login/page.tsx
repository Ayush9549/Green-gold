"use client";
import React, { useState, Suspense, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

function LoginForm() {
    const { t } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/';
    const { login, isAuthenticated, user, isLoading } = useAuth();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent Admin login on public page
        if (formData.email === 'greengold123@gmail.com') {
            router.push('/admin-login');
            return;
        }

        // Simulate login - In real app, validate with backend
        const mockUser = {
            name: "Test User",
            email: formData.email,
            // address: undefined // Intentionally undefined to test address flow
        };

        login(mockUser);
        // Redirect immediately after login for non-admin users
        router.push(redirectPath);
    };

    return (
        <div className={styles.authCard}>
            <h1 className={styles.title}>{t('login.title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">{t('login.email')}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('login.placeholder.email')}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="password">{t('login.password')}</label>
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
                <button type="submit" className={styles.submitBtn}>{t('login.submit')}</button>
            </form>
            <div className={styles.links}>
                <p>{t('login.no_account')} <Link href="/register" className={styles.link}>{t('login.create')}</Link></p>
            </div>
        </div>
    );
}


export default function Login() {
    const { t } = useLanguage();
    return (
        <main>
            <Navbar />
            <div className={styles.authContainer}>
                <Suspense fallback={<div style={{ color: 'white' }}>{t('common.loading')}</div>}>
                    <LoginForm />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}
