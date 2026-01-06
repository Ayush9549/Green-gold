"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCalendar, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import styles from './BlogDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';



import { useBlogs, BlogPost } from '@/context/BlogContext';

export default function BlogDetail() {
    const { t } = useLanguage();
    const params = useParams();
    const { getBlogById, blogs } = useBlogs();
    const id = (Array.isArray(params.id) ? params.id[0] : params.id) || "";

    const post = getBlogById(id) || {
        id: "0",
        title: "Blog Post Not Found",
        category: "Unknown",
        date: "",
        author: "Unknown",
        image: "https://via.placeholder.com/1200x600",
        excerpt: "The requested blog post does not exist.",
        content: "<p>Sorry, this blog post could not be found.</p>"
    };

    const BLOG_POSTS_LIST = blogs;

    return (
        <main>
            <Navbar />

            <article className={styles.blogDetail}>
                {/* Hero Image */}
                <div className={styles.heroImage}>
                    <img src={post.image} alt={post.title} />
                    <div className={styles.heroOverlay}>
                        <div className="container">
                            <Link href="/blog" className={styles.backLink}>
                                <FaArrowLeft /> {t('blog.back')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container">
                    <div className={styles.contentWrapper}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            <div className={styles.meta}>
                                <span className={styles.category}>
                                    <FaTag /> {t(post.category)}
                                </span>
                                <span className={styles.date}>
                                    <FaCalendar /> {post.date}
                                </span>
                                <span className={styles.author}>
                                    <FaUser /> {post.author}
                                </span>
                            </div>

                            <h1 className={styles.title}>{t(post.title)}</h1>

                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Share Section */}
                            <div className={styles.shareSection}>
                                <h3>{t('blog.share')}</h3>
                                <div className={styles.shareButtons}>
                                    <button className={styles.shareBtn}>Facebook</button>
                                    <button className={styles.shareBtn}>Twitter</button>
                                    <button className={styles.shareBtn}>LinkedIn</button>
                                    <button className={styles.shareBtn}>Email</button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarCard}>
                                <h3>{t('blog.recent')}</h3>
                                <ul className={styles.recentPosts}>
                                    {BLOG_POSTS_LIST.filter(p => p.id.toString() !== post.id.toString()).slice(0, 3).map((p: BlogPost) => (
                                        <li key={p.id}>
                                            <Link href={`/blog/${p.id}`}>
                                                <img src={p.image} alt={p.title} />
                                                <div>
                                                    <h4>{t(p.title)}</h4>
                                                    <span>{p.date}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.sidebarCard}>
                                <h3>{t('blog.categories')}</h3>
                                <ul className={styles.categories}>
                                    <li><Link href="/blog?category=recipes">{t('blog.category.recipes')}</Link></li>
                                    <li><Link href="/blog?category=cooking">{t('blog.category.cooking')}</Link></li>
                                    <li><Link href="/blog?category=health">{t('blog.category.health')}</Link></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
