"use client";
import React, { useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import styles from './Shop.module.css';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

import { useProducts } from '@/context/ProductContext';

// Remove ALL_PRODUCTS constant
const CATEGORIES = ["All", "Best Sellers", "Premium", "Classic", "Infused", "Beauty"];
const SIZES = ["All", "100ml", "250ml", "500ml", "1L", "5L"];

function ShopContent() {
    const { products } = useProducts(); // Use context
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSize, setSelectedSize] = useState("All");
    const [maxPrice, setMaxPrice] = useState(100);
    const [sortOption, setSortOption] = useState("popularity");

    const filteredProducts = products.filter(p => {
        // Category Filter
        let matchesCategory = true;
        if (selectedCategory === "Best Sellers") {
            matchesCategory = (p.rating || 0) >= 4.5;
        } else if (selectedCategory !== "All") {
            matchesCategory = p.category === selectedCategory;
        }

        // Price Filter
        const matchesPrice = p.price <= maxPrice;

        // Size Filter
        const matchesSize = selectedSize === "All" || (p.sizes && p.sizes.includes(selectedSize));

        // Search Filter
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesPrice && matchesSize && matchesSearch;
    }).sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "popularity") return (b.rating || 0) - (a.rating || 0);
        return 0;
    });

    return (
        <>
            <div className={styles.pageHeader}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Our Collection</h1>
                    <p className={styles.breadcrumb}>Home / Shop</p>
                </div>
            </div>

            <div className={styles.shopContainer}>
                {/* Sidebar Filters */}
                <aside className={styles.filterSidebar}>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Categories</h3>
                        <ul className={styles.categoryList}>
                            {CATEGORIES.map(cat => (
                                <li
                                    key={cat}
                                    className={`${styles.categoryItem} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    <span>{cat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Price Range</h3>
                        <input
                            type="range"
                            className={styles.priceRange}
                            min="0"
                            max="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Price: $0 - ${maxPrice}</p>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Size</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {SIZES.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    style={{
                                        padding: '5px 10px',
                                        fontSize: '0.8rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '20px',
                                        background: selectedSize === size ? '#556b2f' : 'white',
                                        color: selectedSize === size ? 'white' : '#333',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <section style={{ flex: 1 }}>
                    {/* Toolbar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                        <span>Showing {filteredProducts.length} results</span>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                            <option value="popularity">Sort by Popularity</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>

                    <div className={styles.productsGrid}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard {...product} />
                                </motion.div>
                            ))
                        ) : (
                            <div className={styles.noProducts}>
                                <h3>No products found in this category.</h3>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

export default function Shop() {
    return (
        <main>
            <Navbar />
            <Suspense fallback={<div className="container" style={{ padding: '2rem' }}>Loading Shop...</div>}>
                <ShopContent />
            </Suspense>
            <Footer />
        </main>
    );
}
