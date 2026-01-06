"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BlogPost {
    id: string | number;
    title: string;
    category: string;
    date: string;
    author: string;
    image: string;
    excerpt: string;
    content: string;
}

const INITIAL_BLOGS: BlogPost[] = [
    {
        id: "1",
        title: "blog.post1.title",
        category: "blog.category.recipes",
        date: "Oct 12, 2023",
        author: "Chef Maria",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
        excerpt: "blog.post1.excerpt",
        content: `
            <h2>Transform Your Salads with Homemade Dressings</h2>
            <p>Salad dressings are the secret to turning a simple bowl of greens into a culinary masterpiece. With olive oil as your base, you can create restaurant-quality dressings in minutes.</p>
            
            <h3>1. Classic Vinaigrette</h3>
            <p>The foundation of all dressings. Mix 3 parts olive oil with 1 part vinegar (balsamic, red wine, or apple cider), add a teaspoon of Dijon mustard, salt, and pepper. Shake well and enjoy!</p>
            
            <h3>2. Lemon Herb Dressing</h3>
            <p>Perfect for Mediterranean salads. Combine olive oil, fresh lemon juice, minced garlic, chopped fresh herbs (basil, oregano, parsley), salt, and pepper. This bright dressing pairs beautifully with tomatoes and cucumbers.</p>
        `
    },
    {
        id: "2",
        title: "blog.post2.title",
        category: "blog.category.cooking",
        date: "Oct 25, 2023",
        author: "Dr. Nutrition",
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259d366?auto=format&fit=crop&w=1200&q=80",
        excerpt: "blog.post2.excerpt",
        content: `
            <h2>The Great Olive Oil Debate</h2>
            <p>For years, there's been confusion about whether extra virgin olive oil (EVOO) is suitable for frying. Let's settle this once and for all with science-backed facts.</p>
            
            <h3>Understanding Smoke Points</h3>
            <p>The smoke point of extra virgin olive oil ranges from 350°F to 410°F (175°C to 210°C), depending on quality. This is well above the typical frying temperature of 350°F (175°C).</p>
        `
    },
    {
        id: "3",
        title: "blog.post3.title",
        category: "blog.category.health",
        date: "Nov 03, 2023",
        author: "Wellness Team",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
        excerpt: "blog.post3.excerpt",
        content: `
            <h2>What is the Mediterranean Diet?</h2>
            <p>The Mediterranean diet isn't just a diet—it's a lifestyle. Based on the traditional eating patterns of countries bordering the Mediterranean Sea, it emphasizes whole foods, healthy fats, and social eating.</p>
            
            <h3>Core Principles</h3>
            <ul>
                <li><strong>Olive Oil as Primary Fat:</strong> Use EVOO for cooking, dressing, and dipping</li>
                <li><strong>Plant-Based Focus:</strong> Abundant vegetables, fruits, whole grains, legumes, and nuts</li>
            </ul>
        `
    }
];

interface BlogContextType {
    blogs: BlogPost[];
    addBlog: (blog: BlogPost) => void;
    updateBlog: (id: string | number, updatedData: Partial<BlogPost>) => void;
    deleteBlog: (id: string | number) => void;
    getBlogById: (id: string | number) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        const savedBlogs = localStorage.getItem('jaitun_blogs');
        if (savedBlogs) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setBlogs(JSON.parse(savedBlogs));
            } catch (e) {
                console.error("Failed to parse blogs", e);
                setBlogs(INITIAL_BLOGS);
            }
        } else {
            setBlogs(INITIAL_BLOGS);
        }
    }, []);

    useEffect(() => {
        if (blogs.length > 0) {
            localStorage.setItem('jaitun_blogs', JSON.stringify(blogs));
        }
    }, [blogs]);

    const addBlog = (newBlog: BlogPost) => {
        setBlogs(prev => [newBlog, ...prev]);
    };

    const updateBlog = (id: string | number, updatedData: Partial<BlogPost>) => {
        setBlogs(prev => prev.map(blog =>
            blog.id.toString() === id.toString() ? { ...blog, ...updatedData } : blog
        ));
    };

    const deleteBlog = (id: string | number) => {
        setBlogs(prev => prev.filter(blog => blog.id.toString() !== id.toString()));
    };

    const getBlogById = (id: string | number) => {
        return blogs.find(blog => blog.id.toString() === id.toString());
    };

    return (
        <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, getBlogById }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogs = () => {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error('useBlogs must be used within a BlogProvider');
    }
    return context;
};
