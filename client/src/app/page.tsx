"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import styles from './Home.module.css';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaShippingFast, FaUser, FaFlask, FaCheckCircle, FaCertificate } from 'react-icons/fa';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "product.organic.title",
    price: 24.99,
    rating: 5,
    category: "category.premium",
    image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "product.cold.title",
    price: 18.50,
    rating: 4,
    category: "category.classic",
    image: "https://images.unsplash.com/photo-1542542526-2df73eb0e869?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "product.garlic.title",
    price: 29.99,
    rating: 5,
    category: "category.infused",
    image: "https://images.unsplash.com/photo-1504918731362-e1f44ac1349b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "product.skin.title",
    price: 15.00,
    rating: 5,
    category: "category.beauty",
    image: "https://images.unsplash.com/photo-1620917670397-a333b79d88c1?auto=format&fit=crop&w=500&q=80"
  }
];

export default function Home() {
  const { t } = useLanguage();
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "Green Gold Olive Oil",
                "url": "https://green-gold.vercel.app",
                "logo": "https://green-gold.vercel.app/logo.png",
                "description": "Premium Cold Pressed Olive Oil (Olive Oil) provider.",
                "sameAs": [
                  "https://facebook.com/greengold",
                  "https://instagram.com/greengold",
                  "https://twitter.com/greengold"
                ]
              },
              {
                "@type": "WebSite",
                "name": "Green Gold Olive Oil",
                "url": "https://green-gold.vercel.app",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://green-gold.vercel.app/shop?search={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          }),
        }}
      />
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
          <Image
            src="/hero-image.png"
            alt="Olive Oil Background"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.5)' }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ paddingLeft: '10rem' }}
          >
            <h1 className={styles.heroTitle}>{t('home.hero.title')}</h1>
            <p className={styles.heroSubtitle}>
              {t('home.hero.subtitle')}
            </p>

            <a href="/shop" className="btn btn-primary">{t('hero.cta')}</a>
          </motion.div>
        </div>
      </section>

      {/* Features Section (USP) */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.why')}</h2>
          <div className={styles.featureGrid}>
            {[
              { icon: <FaLeaf />, title: "feature.pure.title", desc: "feature.pure.desc" },
              { icon: <FaLeaf />, title: "feature.cold.title", desc: "feature.cold.desc" }, // Need icon for Cold Pressed, using Leaf for now or Flask
              { icon: <FaFlask />, title: "feature.chem.title", desc: "feature.chem.desc" },
              { icon: <FaCheckCircle />, title: "feature.lab.title", desc: "feature.lab.desc" }
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
                <h3 className={styles.featureTitle}>{t(feature.title)}</h3>
                <p>{t(feature.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className={styles.productsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.featured')}</h2>
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
              <Image
                src="/green-gold-about-us.png"
                alt="About Green Gold"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className={styles.aboutContent}>
              <h2>{t('home.about.title')}</h2>
              <p>
                {t('about.text')}
              </p>
              <a href="/about" className="btn btn-primary">{t('about.cta')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>{t('home.testimonials')}</h2>
          <div className={styles.testimonialGrid}>
            {[1, 2, 3].map((_, i) => (
              <div key={i} className={styles.testimonialCard}>
                <p className={styles.testimonialQuote}>
                  &quot;{t('testimonial.quote')}&quot;
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
          <h2 className={styles.sectionTitle} style={{ color: '#333', marginBottom: '3rem' }}>{t('home.cert.title')}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <FaCertificate size={50} color="#556b2f" />
              <h3 style={{ marginTop: '1rem' }}>{t('cert.fssai')}</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaLeaf size={50} color="#556b2f" />
              <h3 style={{ marginTop: '1rem' }}>{t('cert.organic')}</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaCheckCircle size={50} color="#556b2f" />
              <h3 style={{ marginTop: '1rem' }}>{t('cert.iso')}</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
