"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Cart.module.css';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useCoupons } from '@/context/CouponContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { validateCoupon } = useCoupons();
    const { t } = useLanguage();
    const router = useRouter();

    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');

    // Use 'cart' from context instead of local state 'cartItems'
    const cartItems = cart;

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;

    let discount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percentage') {
            discount = (subtotal * appliedCoupon.value) / 100;
        } else {
            discount = appliedCoupon.value;
        }
    }

    const total = Math.max(0, subtotal + shipping - discount);

    const handleApplyCoupon = () => {
        setCouponError('');
        setCouponSuccess('');
        if (!couponInput.trim()) return;

        const valid = validateCoupon(couponInput);
        if (valid) {
            setAppliedCoupon(valid);
            setCouponSuccess(`Coupon ${valid.code} applied!`);
        } else {
            setAppliedCoupon(null);
            setCouponError('Invalid or expired coupon code');
        }
    };

    return (
        <main>
            <Navbar />

            <div className={`container ${styles.cartContainer}`}>
                <h1 className={styles.pageTitle}>{t('cart.title')}</h1>

                {cartItems.length > 0 ? (
                    <div className={styles.cartGrid}>
                        {/* Cart Items List */}
                        <div className={styles.cartItems}>
                            <div className={styles.cartHeader}>
                                <span>Product</span>
                                <span>Price</span>
                                <span>Quantity</span>
                                <span>Total</span>
                                <span></span>
                            </div>

                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className={styles.cartItem}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className={styles.productInfo}>
                                        <img src={item.image} alt={item.title} className={styles.productImage} />
                                        <div className={styles.productDetails}>
                                            <h3>{t(item.title)}</h3>
                                            <span className={styles.productCategory}>{t(item.category)}</span>
                                        </div>
                                    </div>

                                    <div className={styles.price}>${item.price.toFixed(2)}</div>

                                    <div className={styles.quantityControl}>
                                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                                            <FaMinus size={10} />
                                        </button>
                                        <span className={styles.qtyDisplay}>{item.quantity}</span>
                                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <FaPlus size={10} />
                                        </button>
                                    </div>

                                    <div className={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</div>

                                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                                        <FaTrash />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className={styles.summaryCard}>
                            <h2 className={styles.summaryTitle}>Order Summary</h2>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span style={{ color: 'green' }}>Free</span> : `$${shipping.toFixed(2)}`}</span>
                            </div>

                            {/* Discount Row */}
                            {appliedCoupon && (
                                <div className={styles.summaryRow}>
                                    <span style={{ color: '#556b2f', fontWeight: 'bold' }}>Discount ({appliedCoupon.code})</span>
                                    <span style={{ color: '#556b2f', fontWeight: 'bold' }}>-${discount.toFixed(2)}</span>
                                </div>
                            )}

                            <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: 0 }}>{couponError}</p>}
                                {couponSuccess && <p style={{ color: '#556b2f', fontSize: '0.85rem', margin: 0 }}>{couponSuccess}</p>}
                            </div>

                            <div className={styles.summaryTotal}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button
                                className={styles.checkoutBtn}
                                onClick={() => {
                                    if (!isAuthenticated || user?.email === 'greengold123@gmail.com') {
                                        router.push('/login?redirect=/checkout/address');
                                    } else {
                                        router.push('/checkout/address');
                                    }
                                }}
                            >
                                {t('cart.checkout')} <FaArrowRight />
                            </button>

                            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                                <p>Secure Checkout powered by PayPal</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        className={styles.emptyCart}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FaShoppingBag size={50} color="#ccc" style={{ marginBottom: '1rem' }} />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't found your perfect oil yet.</p>
                        <Link href="/shop" className={styles.continueBtn}>
                            Start Shopping
                        </Link>
                    </motion.div>
                )}
            </div>

            <Footer />
        </main>
    );
}
