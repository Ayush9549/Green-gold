"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import styles from '../Product.module.css';
import { FaStar, FaMinus, FaPlus, FaCheckCircle, FaTruck, FaShieldAlt, FaLeaf, FaBoxOpen } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

// Extended Mock Data
const PRODUCTS_DB: Record<string, any> = {
    "1": {
        id: 1,
        title: "Organic Extra Virgin Olive Oil",
        price: 24.99,
        oldPrice: 32.00,
        rating: 5,
        category: "Premium",
        description: "Our hallmark Organic Extra Virgin Olive Oil is cold-pressed within hours of harvest to preserve its distinct grassy aroma and peppery finish. Sourced from the finest organic groves, this oil is perfect for drizzling over salads, dipping bread, or finishing roasted vegetables.",
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80",
        features: ["Cold Pressed Extraction", "100% Certified Organic", "Single Origin (Spain)", "High Polyphenol Content"],
        ingredients: "100% Organic Extra Virgin Olive Oil.",
        nutrition: {
            calories: "120 per tbsp",
            fat: "14g",
            protein: "0g",
            carbs: "0g"
        }
    },
    "2": {
        id: 2,
        title: "Cold Pressed Jaitun Oil",
        price: 18.50,
        rating: 4,
        category: "Classic",
        description: "A versatile kitchen staple, our Classic Cold Pressed Jaitun Oil offers a smooth, balanced flavor profile suitable for everyday cooking. Whether you're sautéing, grilling, or baking, this oil delivers consistent quality and health benefits.",
        image: "https://images.unsplash.com/photo-1542542526-2df73eb0e869?auto=format&fit=crop&w=500&q=80",
        features: ["Versatile Cooking Oil", "Rich Smooth Flavor", "Heart Healthy Fats", "All-Natural Process"],
        ingredients: "100% Cold Pressed Olive Oil.",
        nutrition: {
            calories: "119 per tbsp",
            fat: "13.5g",
            protein: "0g",
            carbs: "0g"
        }
    },
    "3": {
        id: 3,
        title: "Infused Garlic Olive Oil",
        price: 29.99,
        rating: 5,
        category: "Infused",
        description: "Elevate your culinary creations with our Garlic Infused Olive Oil. We steep fresh, organic garlic cloves in our premium olive oil for weeks to achieve a robust and authentic garlic flavor without the hassle of chopping.",
        image: "https://images.unsplash.com/photo-1504918731362-e1f44ac1349b?auto=format&fit=crop&w=500&q=80",
        features: ["Real Garlic Infusion", "No Artificial Flavors", "Perfect for Marinades", "Gourmet Quality"],
        ingredients: "Extra Virgin Olive Oil, Organic Garlic.",
        nutrition: {
            calories: "120 per tbsp",
            fat: "14g",
            protein: "0g",
            carbs: "0g"
        }
    },
    "4": {
        id: 4,
        title: "Skin Care Olive Oil",
        price: 15.00,
        rating: 5,
        category: "Beauty",
        description: "Discover the ancient beauty secret of olive oil. Specially filtered for cosmetic use, this oil is rich in Vitamin E and antioxidants to moisturize skin, strengthen nails, and add shine to hair. Non-comedogenic and ultra-hydrating.",
        image: "https://images.unsplash.com/photo-1620917670397-a333b79d88c1?auto=format&fit=crop&w=500&q=80",
        features: ["Cosmetic Grade", "Rich in Vitamin E", "Deep Moisturization", "Multi-purpose Beauty Oil"],
        ingredients: "100% Pure Filtered Olive Oil.",
        nutrition: {
            usage: "Apply 2-3 drops to face or hair.",
            benefits: "Hydration, Anti-aging, Glow"
        }
    },
    "5": {
        id: 5,
        title: "Truffle Infused Oil",
        price: 35.00,
        rating: 5,
        category: "Infused",
        description: "A bottle of pure indulgence. We infuse our finest Extra Virgin Olive Oil with white truffles to create an earthy, aromatic finish that transforms simple dishes like pasta, risotto, and popcorn into gourmet experiences.",
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80",
        features: ["Real White Truffle", "Intense Aroma", "Luxury Garnish", "Artisanal Production"],
        ingredients: "Extra Virgin Olive Oil, White Truffle Aroma, Dried Truffle.",
        nutrition: {
            calories: "120 per tbsp",
            fat: "14g",
            protein: "0g",
            carbs: "0g"
        }
    },
    "6": {
        id: 6,
        title: "Hair Care Elixir",
        price: 22.00,
        rating: 4,
        category: "Beauty",
        description: "Revitalize dry and damaged hair with our Jaitun Hair Care Elixir. Blended with rosemary and peppermint oils, this treatment stimulates the scalp, promotes growth, and leaves hair silky smooth without weighing it down.",
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=500&q=80",
        features: ["Promotes Hair Growth", "Scalp Stimulation", "Lightweight Formula", "Paraben Free"],
        ingredients: "Olive Oil, Rosemary Oil, Peppermint Oil, Vitamin E.",
        nutrition: {
            usage: "Massage into scalp before washing.",
            benefits: "Strength, Shine, Growth"
        }
    },
    "default": {
        id: 0,
        title: "Premium Olive Oil Product",
        price: 29.99,
        rating: 5,
        category: "Special",
        description: "Experience the luxury of our premium selected olive oils. Harvested with care and processed to perfection to bring you the gold standard of nature.",
        image: "https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?auto=format&fit=crop&w=500&q=80",
        features: ["Premium Quality", "Artisanal Crafted", "Small Batch Production", "Ideal for Gifting"],
        ingredients: "100% Natural Olive Oil.",
        nutrition: {
            calories: "120 per tbsp",
            fat: "14g",
            protein: "0g",
            carbs: "0g"
        }
    }
};

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
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const { getProductById } = useProducts();
    const foundProduct = getProductById(id || "1");

    // Fallback if product not found (or while loading)
    const product = foundProduct || {
        id: 0,
        title: "Product Not Found",
        price: 0,
        rating: 0,
        category: "Unknown",
        description: "The requested product does not exist.",
        image: "https://via.placeholder.com/500",
        features: [],
        ingredients: "N/A",
        nutrition: {}
    };

    // Context
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('desc');
    const [currentImage, setCurrentImage] = useState(product?.image || '');
    const [selectedSize, setSelectedSize] = useState('');

    // Sync currentImage and Size when product loads/changes
    React.useEffect(() => {
        if (product) {
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
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQty = () => {
        if (quantity < 10) setQuantity(quantity + 1);
    };

    return (
        <main>
            <Navbar />

            <div className={styles.productContainer}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    Home / Shop / {product.category} / <b>{product.title}</b>
                </div>

                {/* Main Product Grid */}
                <div className={styles.productGrid}>
                    {/* Left: Image */}
                    <div className={styles.imageSection}>
                        <div className={styles.mainImageWrapper}>
                            <img
                                src={currentImage || product.image}
                                alt={product.title}
                                className={styles.mainImage}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                            {/* Main Image Thumbnail */}
                            <div
                                onClick={() => setCurrentImage(product.image)}
                                style={{
                                    width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                                    border: currentImage === product.image ? '2px solid #556b2f' : '1px solid #ddd'
                                }}>
                                <img
                                    src={product.image}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Gallery Thumbnails */}
                            {(product.gallery || []).map((imgUrl, i) => (
                                <div key={i}
                                    onClick={() => setCurrentImage(imgUrl)}
                                    style={{
                                        width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                                        border: currentImage === imgUrl ? '2px solid #556b2f' : '1px solid #ddd'
                                    }}>
                                    <img
                                        src={imgUrl}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className={styles.detailsSection}>
                        <span className={styles.category}>{product.category} Collection</span>
                        <h1 className={styles.title}>{product.title}</h1>

                        <div className={styles.rating}>
                            <div style={{ display: 'flex' }}>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} color={i < (product.rating || 0) ? "#eebb2d" : "#e4e5e9"} size={20} />
                                ))}
                            </div>
                            <span className={styles.reviewCount}>Based on 124 reviews</span>
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
                                <span>100% Vegan</span>
                            </div>
                            <div className={styles.featureItem}>
                                <FaBoxOpen className={styles.featureIcon} />
                                <span>Eco Packaging</span>
                            </div>
                        </div>

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Select Size:</h3>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                border: selectedSize === size ? '2px solid #556b2f' : '1px solid #ccc',
                                                borderRadius: '4px',
                                                background: selectedSize === size ? '#f0f5e9' : 'white',
                                                cursor: 'pointer',
                                                color: '#333'
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
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
                                Add to Cart - ${(product.price * quantity).toFixed(2)}
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#666' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaTruck /> Free global shipping</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaShieldAlt /> 2 Year Warranty</div>
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
                            Description
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'nutrition' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('nutrition')}
                        >
                            Nutrition Facts
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'shipping' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('shipping')}
                        >
                            Shipping & Returns
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'desc' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3>Product Description</h3>
                                <p>{product.description}</p>
                                <br />
                                <p><strong>Ingredients:</strong> {product.ingredients}</p>
                            </motion.div>
                        )}
                        {activeTab === 'nutrition' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3>Nutritional Information</h3>
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
                                <h3>Shipping Information</h3>
                                <p>We ship worldwide. Orders processed within 24 hours.</p>
                                <ul>
                                    <li>Standard Shipping: 5-7 business days</li>
                                    <li>Express Shipping: 2-3 business days</li>
                                </ul>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className={styles.relatedSection}>
                    <h2 className={styles.sectionTitle}>You May Also Like</h2>
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
