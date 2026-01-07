"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import styles from '../Product.module.css';
import { FaStar, FaMinus, FaPlus, FaCheckCircle, FaTruck, FaShieldAlt, FaLeaf, FaBoxOpen } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';



const RELATED_PRODUCTS = [
    {
        id: 3,
        title: "Infused Garlic Olive Oil",
        price: 29.99,
        rating: 5,
        category: "Infused",
        image: "https://images.unsplash.com/photo-1504918731362-e1f44ac1349b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Skin Care Olive Oil",
        price: 15.00,
        rating: 5,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1620917670397-a333b79d88c1?auto=format&fit=crop&w=500&q=80"
    }
];

import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';


export default function ProductDetails() {
    const { t } = useLanguage();
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const { getProductById } = useProducts();
    const foundProduct = getProductById(id || "1");

    // Fallback if product not found (or while loading)
    const product = useMemo(() => foundProduct || {
        id: 0,
        title: t('product.not_found'),
        price: 0,
        rating: 0,
        category: "Unknown",
        description: t('product.not_found.desc'),
        image: "https://via.placeholder.com/500",
        features: [],
        ingredients: "N/A",
        nutrition: {}
    }, [foundProduct, t]);

    // Context
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('desc');
    const [currentImage, setCurrentImage] = useState(product?.image || '');
    const [selectedSize, setSelectedSize] = useState('');

    // Sync currentImage and Size when product loads/changes
    useEffect(() => {
        if (product) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentImage(product.image);
            if (product.sizes && product.sizes.length > 0) {
                setSelectedSize(product.sizes[0]);
            }
        }
    }, [product]);

    // ... (qty handlers remain unchanged)

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity,
            size: selectedSize
        });
        // Alert removed for smoother experience
    };

    // ... (JSX remains largely same, just updating the button onClick)

    const decreaseQty = () => {
        const min = selectedSize.toLowerCase().includes('custom') ? 15 : 1;
        if (quantity > min) setQuantity(quantity - 1);
        else if (selectedSize.toLowerCase().includes('custom') && quantity < 15) setQuantity(15);
    };

    const increaseQty = () => {
        const max = selectedSize.toLowerCase().includes('custom') ? 1000 : 10;
        if (quantity < max) setQuantity(quantity + 1);
    };

    return (
        <main>
            <Navbar />

            <div className={styles.productContainer}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    {t('product.breadcrumb.home')} / {t('product.breadcrumb.shop')} / {product.category} / <b>{product.title}</b>
                </div>

                {/* Main Product Grid */}
                <div className={styles.productGrid}>
                    {/* Left: Image */}
                    <div className={styles.imageSection}>
                        <div className={styles.mainImageWrapper} style={{ position: 'relative', height: '500px' }}>
                            <Image
                                src={currentImage || product.image}
                                alt={product.title}
                                className={styles.mainImage}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                            {/* Main Image Thumbnail */}
                            <div
                                onClick={() => setCurrentImage(product.image)}
                                style={{
                                    width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                                    border: currentImage === product.image ? '2px solid #556b2f' : '1px solid #ddd',
                                    position: 'relative'
                                }}>
                                <Image
                                    src={product.image}
                                    alt={`${product.title} main`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Gallery Thumbnails */}
                            {(product.gallery || []).map((imgUrl, i) => (
                                <div key={i}
                                    onClick={() => setCurrentImage(imgUrl)}
                                    style={{
                                        width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                                        border: currentImage === imgUrl ? '2px solid #556b2f' : '1px solid #ddd',
                                        position: 'relative'
                                    }}>
                                    <Image
                                        src={imgUrl}
                                        alt={`${product.title} gallery ${i + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className={styles.detailsSection}>
                        <span className={styles.category}>{product.category} {t('product.collection')}</span>
                        <h1 className={styles.title}>{product.title}</h1>

                        <div className={styles.rating}>
                            <div style={{ display: 'flex' }}>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} color={i < (product.rating || 0) ? "#eebb2d" : "#e4e5e9"} size={20} />
                                ))}
                            </div>
                            <span className={styles.reviewCount}>{t('product.reviews')}</span>
                        </div>

                        <div className={styles.price}>
                            ${product.price.toFixed(2)}
                            {product.oldPrice && <span className={styles.oldPrice}>${product.oldPrice.toFixed(2)}</span>}
                        </div>

                        <p className={styles.description}>
                            {product.description}
                        </p>

                        <div className={styles.features}>
                            {(product.features || []).slice(0, 4).map((feat: string, i: number) => (
                                <div key={i} className={styles.featureItem}>
                                    <FaCheckCircle className={styles.featureIcon} />
                                    <span>{feat}</span>
                                </div>
                            ))}
                            <div className={styles.featureItem}>
                                <FaLeaf className={styles.featureIcon} />
                                <span>{t('product.vegan')}</span>
                            </div>
                            <div className={styles.featureItem}>
                                <FaBoxOpen className={styles.featureIcon} />
                                <span>{t('product.eco_packaging')}</span>
                            </div>
                        </div>

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{t('product.select_size')}</h3>
                                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {product.sizes.map((size: string) => {
                                        const isCustom = size.toLowerCase().includes('custom');
                                        const isSelected = selectedSize === size;

                                        if (isCustom && isSelected) {
                                            const isError = quantity > 0 && quantity < 15;
                                            return (
                                                <div
                                                    key={size}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        background: '#f0f5e9',
                                                        padding: '0.4rem 0.8rem',
                                                        borderRadius: '4px',
                                                        border: isError ? '2px solid #e74c3c' : '2px solid #556b2f',
                                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                                        transition: 'border-color 0.3s ease'
                                                    }}
                                                >
                                                    <input
                                                        type="number"
                                                        value={quantity === 0 ? '' : quantity}
                                                        min="15"
                                                        autoFocus
                                                        style={{
                                                            width: '70px',
                                                            border: 'none',
                                                            background: 'transparent',
                                                            fontSize: '1rem',
                                                            fontWeight: 600,
                                                            outline: 'none',
                                                            color: isError ? '#e74c3c' : '#333'
                                                        }}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (e.target.value === '') {
                                                                setQuantity(0);
                                                            } else if (!isNaN(val)) {
                                                                setQuantity(val);
                                                            }
                                                        }}
                                                        onBlur={() => {
                                                            if (quantity < 15) setQuantity(15);
                                                        }}
                                                    />
                                                    <span style={{ fontSize: '0.9rem', color: isError ? '#e74c3c' : '#556b2f', fontWeight: 600 }}>Ltrs.</span>
                                                </div>
                                            );
                                        }

                                        return (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedSize(size);
                                                    if (isCustom) {
                                                        setQuantity(15);
                                                    } else {
                                                        setQuantity(1);
                                                    }
                                                }}
                                                style={{
                                                    padding: '0.6rem 1.2rem',
                                                    border: isSelected ? '2px solid #556b2f' : '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    background: isSelected ? '#f0f5e9' : 'white',
                                                    cursor: 'pointer',
                                                    color: '#333',
                                                    fontWeight: isSelected ? 600 : 400,
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                {t(size)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className={styles.actions}>
                            <div className={styles.quantityControl}>
                                <button className={styles.qtyBtn} onClick={decreaseQty}><FaMinus size={12} /></button>
                                <span className={styles.qtyDisplay}>{quantity}</span>
                                <button className={styles.qtyBtn} onClick={increaseQty}><FaPlus size={12} /></button>
                            </div>
                            <button
                                className={styles.addToCartBtn}
                                onClick={handleAddToCart}
                            >
                                {t('product.add_to_cart')} - ${(product.price * quantity).toFixed(2)}
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#666' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaTruck /> {t('product.free_shipping')}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaShieldAlt /> {t('product.warranty')}</div>
                        </div>

                    </div>
                </div>

                {/* Info Tabs */}
                <div className={styles.infoSection}>
                    <div className={styles.tabsHeader}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'desc' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('desc')}
                        >
                            {t('product.tab.description')}
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'nutrition' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('nutrition')}
                        >
                            {t('product.tab.nutrition')}
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'shipping' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('shipping')}
                        >
                            {t('product.tab.shipping')}
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'desc' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3>{t('product.desc.title')}</h3>
                                <p>{product.description}</p>
                                <br />
                                <p><strong>{t('product.desc.ingredients')}</strong> {product.ingredients}</p>
                            </motion.div>
                        )}
                        {activeTab === 'nutrition' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3>{t('product.nutrition.title')}</h3>
                                <ul>
                                    {Object.entries(product.nutrition || {}).map(([key, val]) => (
                                        <li key={key} style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                                            <strong>{key}:</strong> {val as string}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                        {activeTab === 'shipping' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3>{t('product.shipping.title')}</h3>
                                <p>{t('product.shipping.text')}</p>
                                <ul>
                                    <li>{t('product.shipping.standard')}</li>
                                    <li>{t('product.shipping.express')}</li>
                                </ul>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className={styles.relatedSection}>
                    <h2 className={styles.sectionTitle}>{t('product.related')}</h2>
                    <div className={styles.productGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 2fr))', gap: '2rem' }}>
                        {RELATED_PRODUCTS.map(p => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
