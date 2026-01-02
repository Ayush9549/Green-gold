"use client";
import React from 'react';
import { FaStar, FaPlus } from 'react-icons/fa';
import styles from './ProductCard.module.css';
import Image from 'next/image';

interface ProductCardProps {
    id: number | string;
    title: string;
    price: number;
    rating?: number;
    image: string;
    category: string;
}

import { useCart } from '@/context/CartContext';

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, rating, image, category }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ id, title, price, image, category, quantity: 1 });
        // alert(`Added ${title} to cart successfully!`); // Removed per user request
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <a href={`/product/${id}`} style={{ display: 'block', height: '100%', width: '100%' }}>
                    <img
                        src={image}
                        alt={title}
                        className={styles.image}
                    />
                </a>
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < (rating || 0) ? "#eebb2d" : "#e4e5e9"} />
                    ))}
                </div>
                <div className={styles.footer}>
                    <span className={styles.price}>${price.toFixed(2)}</span>
                    <button
                        className={styles.addBtn}
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
