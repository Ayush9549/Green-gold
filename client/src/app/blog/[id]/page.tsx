"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCalendar, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import styles from './BlogDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

// Mock blog data - In real app, fetch from API
const BLOG_POSTS: Record<string, any> = {
    "1": {
        id: 1,
        title: "5 Easy Salad Dressings with Olive Oil",
        category: "Recipes",
        date: "Oct 12, 2023",
        author: "Chef Maria",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
        excerpt: "Elevate your salads with these simple, healthy, and delicious homemade dressings.",
        content: `
            <h2>Transform Your Salads with Homemade Dressings</h2>
            <p>Salad dressings are the secret to turning a simple bowl of greens into a culinary masterpiece. With olive oil as your base, you can create restaurant-quality dressings in minutes.</p>
            
            <h3>1. Classic Vinaigrette</h3>
            <p>The foundation of all dressings. Mix 3 parts olive oil with 1 part vinegar (balsamic, red wine, or apple cider), add a teaspoon of Dijon mustard, salt, and pepper. Shake well and enjoy!</p>
            
            <h3>2. Lemon Herb Dressing</h3>
            <p>Perfect for Mediterranean salads. Combine olive oil, fresh lemon juice, minced garlic, chopped fresh herbs (basil, oregano, parsley), salt, and pepper. This bright dressing pairs beautifully with tomatoes and cucumbers.</p>
            
            <h3>3. Honey Mustard Dressing</h3>
            <p>A crowd-pleaser! Whisk together olive oil, Dijon mustard, honey, apple cider vinegar, and a pinch of salt. The sweetness of honey balances the tanginess perfectly.</p>
            
            <h3>4. Asian-Inspired Sesame Dressing</h3>
            <p>Mix olive oil with sesame oil, soy sauce, rice vinegar, grated ginger, and a touch of honey. Sprinkle with sesame seeds for an authentic touch.</p>
            
            <h3>5. Creamy Avocado Dressing</h3>
            <p>Blend ripe avocado, olive oil, lime juice, Greek yogurt, cilantro, and garlic until smooth. This creamy, nutrient-rich dressing is perfect for taco salads.</p>
            
            <h2>Pro Tips</h2>
            <ul>
                <li>Always use high-quality extra virgin olive oil for the best flavor</li>
                <li>Store dressings in glass jars in the refrigerator for up to a week</li>
                <li>Let refrigerated dressings come to room temperature before serving</li>
                <li>Taste and adjust seasonings before serving</li>
            </ul>
        `
    },
    "2": {
        id: 2,
        title: "Can You Fry with Extra Virgin Olive Oil?",
        category: "Cooking Tips",
        date: "Oct 25, 2023",
        author: "Dr. Nutrition",
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=1200&q=80",
        excerpt: "Debunking the myths around smoke points and cooking with premium olive oil.",
        content: `
            <h2>The Great Olive Oil Debate</h2>
            <p>For years, there's been confusion about whether extra virgin olive oil (EVOO) is suitable for frying. Let's settle this once and for all with science-backed facts.</p>
            
            <h3>Understanding Smoke Points</h3>
            <p>The smoke point of extra virgin olive oil ranges from 350°F to 410°F (175°C to 210°C), depending on quality. This is well above the typical frying temperature of 350°F (175°C).</p>
            
            <h3>The Science Says Yes!</h3>
            <p>Recent studies have shown that EVOO is actually one of the most stable cooking oils. Its high content of monounsaturated fats and antioxidants makes it resistant to oxidation, even at high temperatures.</p>
            
            <h3>Benefits of Frying with EVOO</h3>
            <ul>
                <li><strong>Healthier:</strong> Retains beneficial polyphenols and antioxidants</li>
                <li><strong>Better Flavor:</strong> Adds a subtle, pleasant taste to foods</li>
                <li><strong>More Stable:</strong> Less likely to form harmful compounds than seed oils</li>
                <li><strong>Nutrient Absorption:</strong> Helps absorb fat-soluble vitamins from vegetables</li>
            </ul>
            
            <h3>Best Practices</h3>
            <p>When frying with EVOO:</p>
            <ul>
                <li>Use medium-high heat, not maximum heat</li>
                <li>Don't reuse oil multiple times</li>
                <li>Choose high-quality EVOO with a higher smoke point</li>
                <li>Monitor the temperature to avoid smoking</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Yes, you absolutely can fry with extra virgin olive oil! Not only is it safe, but it's also one of the healthiest options available. Don't let outdated myths stop you from enjoying the benefits of this liquid gold.</p>
        `
    },
    "3": {
        id: 3,
        title: "The Ultimate Guide to Mediterranean Diet",
        category: "Health",
        date: "Nov 03, 2023",
        author: "Wellness Team",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
        excerpt: "How to incorporate liquid gold into your daily diet for maximum health benefits.",
        content: `
            <h2>What is the Mediterranean Diet?</h2>
            <p>The Mediterranean diet isn't just a diet—it's a lifestyle. Based on the traditional eating patterns of countries bordering the Mediterranean Sea, it emphasizes whole foods, healthy fats, and social eating.</p>
            
            <h3>Core Principles</h3>
            <ul>
                <li><strong>Olive Oil as Primary Fat:</strong> Use EVOO for cooking, dressing, and dipping</li>
                <li><strong>Plant-Based Focus:</strong> Abundant vegetables, fruits, whole grains, legumes, and nuts</li>
                <li><strong>Moderate Fish and Poultry:</strong> At least twice a week</li>
                <li><strong>Limited Red Meat:</strong> Only a few times per month</li>
                <li><strong>Dairy in Moderation:</strong> Mainly cheese and yogurt</li>
                <li><strong>Wine in Moderation:</strong> Optional, with meals</li>
            </ul>
            
            <h3>Health Benefits</h3>
            <p>Research has shown the Mediterranean diet can:</p>
            <ul>
                <li>Reduce risk of heart disease by up to 30%</li>
                <li>Lower blood pressure and cholesterol</li>
                <li>Improve brain health and reduce dementia risk</li>
                <li>Aid in weight management</li>
                <li>Reduce inflammation throughout the body</li>
                <li>Lower risk of type 2 diabetes</li>
            </ul>
            
            <h3>Sample Daily Menu</h3>
            <p><strong>Breakfast:</strong> Greek yogurt with honey, walnuts, and fresh berries</p>
            <p><strong>Lunch:</strong> Mediterranean salad with chickpeas, tomatoes, cucumbers, feta, and olive oil dressing</p>
            <p><strong>Snack:</strong> Hummus with vegetable sticks</p>
            <p><strong>Dinner:</strong> Grilled fish with roasted vegetables drizzled with olive oil, served with quinoa</p>
            
            <h3>Getting Started</h3>
            <p>Transitioning to a Mediterranean diet is easy:</p>
            <ol>
                <li>Replace butter with olive oil</li>
                <li>Eat fish twice a week</li>
                <li>Add a salad to every meal</li>
                <li>Snack on nuts instead of chips</li>
                <li>Use herbs and spices instead of salt</li>
                <li>Choose whole grains over refined</li>
            </ol>
            
            <h2>The Role of Olive Oil</h2>
            <p>Olive oil is the cornerstone of the Mediterranean diet. Its monounsaturated fats, antioxidants, and anti-inflammatory properties make it a superfood. Aim for 2-4 tablespoons daily for optimal health benefits.</p>
        `
    }
};

export default function BlogDetail() {
    const { t } = useLanguage();
    const params = useParams();
    const id = (Array.isArray(params.id) ? params.id[0] : params.id) || "";

    const post = BLOG_POSTS[id] || {
        id: 0,
        title: "Blog Post Not Found",
        category: "Unknown",
        date: "",
        author: "Unknown",
        image: "https://via.placeholder.com/1200x600",
        excerpt: "The requested blog post does not exist.",
        content: "<p>Sorry, this blog post could not be found.</p>"
    };

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
                                    <FaTag /> {t(`blog.category.${post.category.toLowerCase().replace(' ', '')}`)}
                                </span>
                                <span className={styles.date}>
                                    <FaCalendar /> {post.date}
                                </span>
                                <span className={styles.author}>
                                    <FaUser /> {post.author}
                                </span>
                            </div>

                            <h1 className={styles.title}>{t(`blog.post${post.id}.title`)}</h1>

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
                                    {Object.values(BLOG_POSTS).filter(p => p.id !== post.id).slice(0, 3).map((p: any) => (
                                        <li key={p.id}>
                                            <Link href={`/blog/${p.id}`}>
                                                <img src={p.image} alt={p.title} />
                                                <div>
                                                    <h4>{t(`blog.post${p.id}.title`)}</h4>
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
