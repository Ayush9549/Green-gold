"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

export default function Register() {
    const router = useRouter();
    const { login: authLogin } = useAuth(); // Assuming useAuth has login to set user state

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showOtpModal, setShowOtpModal] = useState(false);

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            // 1. Check Email
            const emailRes = await fetch('http://localhost:5000/api/v1/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            const emailData = await emailRes.json();

            if (!emailData.success) {
                toast.error(emailData.message);
                setLoading(false);
                return;
            }

            // 2. Send OTP
            const otpRes = await fetch('http://localhost:5000/api/v1/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            const otpData = await otpRes.json();

            if (otpData.success) {
                toast.success(`OTP Sent to ${formData.email}`);
                setShowOtpModal(true);
            } else {
                toast.error(otpData.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            // 3. Register with OTP
            const res = await fetch('http://localhost:5000/api/v1/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    otp: otp
                })
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Registration Successful!");
                // Auto Login
                localStorage.setItem('token', data.token);
                authLogin(data.user);
                router.push('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Toaster position="top-center" />
            <Navbar />
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h1 className={styles.title}>Create Account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className={styles.formGroup} style={{ position: 'relative' }}>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute', right: '10px', top: '38px',
                                    background: 'none', border: 'none', cursor: 'pointer', color: '#666'
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className={styles.formGroup} style={{ position: 'relative' }}>
                            <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={styles.input}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute', right: '10px', top: '38px',
                                    background: 'none', border: 'none', cursor: 'pointer', color: '#666'
                                }}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? "Processing..." : "Sign Up"}
                        </button>
                    </form>
                    <div className={styles.links}>
                        <p>Already have an account? <Link href="/login" className={styles.link}>Sign in</Link></p>
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Verify Email</h2>
                        <p style={{ marginBottom: '1.5rem', color: '#666' }}>Enter the 6-digit code sent to {formData.email}</p>

                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            maxLength={6}
                            style={{
                                width: '100%', padding: '1rem', fontSize: '1.2rem',
                                textAlign: 'center', letterSpacing: '5px',
                                border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1.5rem'
                            }}
                        />

                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            style={{
                                width: '100%', padding: '1rem', background: 'var(--color-primary)',
                                color: 'white', border: 'none', borderRadius: '50px',
                                fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
                            }}
                        >
                            {loading ? "Verifying..." : "Verify & Login"}
                        </button>

                        <button
                            onClick={() => setShowOtpModal(false)}
                            style={{
                                marginTop: '1rem', background: 'transparent', border: 'none',
                                color: '#999', cursor: 'pointer', textDecoration: 'underline'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
