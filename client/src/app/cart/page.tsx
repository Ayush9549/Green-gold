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
import { useRouter } from 'next/navigation';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    // Use 'cart' from context instead of local state 'cartItems'
    const cartItems = cart;

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + shipping;

    return (
        <main>
            <Navbar />

            <div className={`container ${styles.cartContainer}`}>
                <h1 className={styles.pageTitle}>Your Shopping Cart</h1>

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
                                            <h3>{item.title}</h3>
                                            <span className={styles.productCategory}>{item.category}</span>
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

                            <div style={{ margin: '1rem 0', display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                                <button style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    Apply
                                </button>
                            </div>

                            <div className={styles.summaryTotal}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button
                                className={styles.checkoutBtn}
                                disabled={user?.email === 'greengold123@gmail.com'}
                                style={{
                                    opacity: user?.email === 'greengold123@gmail.com' ? 0.5 : 1,
                                    cursor: user?.email === 'greengold123@gmail.com' ? 'not-allowed' : 'pointer'
                                }}
                                onClick={() => {
                                    if (user?.email === 'greengold123@gmail.com') return;

                                    if (!isAuthenticated) {
                                        alert("Please login to continue.");
                                        router.push('/login');
                                    } else if (!user?.address?.street) { // Basic check if address exists
                                        router.push('/checkout/address');
                                    } else {
                                        router.push('/checkout/payment');
                                    }
                                }}
                            >
                                {user?.email === 'greengold123@gmail.com' ? "Admin Checkout Restricted" : <>Proceed to Checkout <FaArrowRight /></>}
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
