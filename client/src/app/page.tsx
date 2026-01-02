"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import styles from './Home.module.css';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaShippingFast, FaUser, FaFlask, FaCheckCircle, FaCertificate } from 'react-icons/fa';
import Image from 'next/image';

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "Organic Extra Virgin Olive Oil",
    price: 24.99,
    rating: 5,
    category: "Premium",
    image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Cold Pressed Jaitun Oil",
    price: 18.50,
    rating: 4,
    category: "Classic",
    image: "https://images.unsplash.com/photo-1542542526-2df73eb0e869?auto=format&fit=crop&w=500&q=80"
  },
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

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero} style={{ backgroundColor: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
          <img
            src="/hero-image.png"
            alt="Jaitun Oil Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>Pure Gold from Nature</h1>
            <p className={styles.heroSubtitle}>
              Experience the richness of premium, cold-pressed Green Gold (Olive Oil).
              Sourced globally, delivered locally.
            </p>

            <a href="/shop" className="btn btn-primary">Shop Now</a>
          </motion.div>
        </div>
      </section>

      {/* Features Section (USP) */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Choose Green Gold?</h2>
          <div className={styles.featureGrid}>
            {[
              { icon: <FaLeaf />, title: "100% Pure", desc: "Virgin & organic, directly from the farm." },
              { icon: <FaLeaf />, title: "Cold Pressed", desc: "Retains all natural nutrients and flavor." }, // Need icon for Cold Pressed, using Leaf for now or Flask
              { icon: <FaFlask />, title: "No Chemicals", desc: "Zero additives, preservatives, or artificial colors." },
              { icon: <FaCheckCircle />, title: "Lab Tested", desc: "Certified for quality and purity." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className={styles.productsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Collections</h2>
          <div className={styles.featureGrid}>
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About / Story Section */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <img
                src="/green-gold-about-us.png"
                alt="About Green Gold"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className={styles.aboutContent}>
              <h2>The Essence of Purity</h2>
              <p>
                Our journey began with a simple mission: to bring the authentic taste and health benefits
                of Mediterranean olive oil to your table. Every bottle of Green Gold is a promise of quality,
                harvested from ancient groves and cold-pressed to preserve its natural goodness.
              </p>
              <a href="/about" className="btn btn-primary">Read Our Story</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>What Our Customers Say</h2>
          <div className={styles.testimonialGrid}>
            {[1, 2, 3].map((_, i) => (
              <div key={i} className={styles.testimonialCard}>
                <p className={styles.testimonialQuote}>
                  "Absolutely the best olive oil I've ever tasted. The flavor is rich and authentic.
                  I use it for everything from cooking to salads!"
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}><FaUser /></div>
                  <div className={styles.authorInfo}>
                    <h4>Sarah Johnson</h4>
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section style={{ padding: '4rem 0', background: '#f9f9f9', textAlign: 'center' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#333', marginBottom: '3rem' }}>Certified for Excellence</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <FaCertificate size={50} color="#556b2f" />
              <h3 style={{ marginTop: '1rem' }}>FSSAI Certified</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaLeaf size={50} color="#556b2f" />
              <h3 style={{ marginTop: '1rem' }}>100% Organic</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaCheckCircle size={50} color="#556b2f" />
              <h3 style={{ marginTop: '1rem' }}>ISO 9001:2015</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
