"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../Admin.module.css';
import { useBlogs } from '@/context/BlogContext';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const { getBlogById, updateBlog } = useBlogs();

    const [blog, setBlog] = useState({
        title: '',
        category: 'Recipes',
        author: '',
        excerpt: '',
        content: '',
        image: ''
    });

    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const foundBlog = getBlogById(id);
        if (foundBlog) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setBlog({
                title: foundBlog.title,
                category: foundBlog.category,
                author: foundBlog.author,
                excerpt: foundBlog.excerpt,
                content: foundBlog.content,
                image: foundBlog.image
            });
            setImagePreview(foundBlog.image);
            setIsLoading(false);
        } else if (!isLoading) {
            router.push('/admin/blogs');
        }
    }, [id, getBlogById, isLoading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBlog(prev => ({ ...prev, [name]: value }));

        if (name === 'image') {
            setImagePreview(value);
        }
    };

    const handleContentChange = (value: string) => {
        setBlog(prev => ({ ...prev, content: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setBlog(prev => ({ ...prev, image: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBlog(id, blog);
        alert('Blog post updated successfully!');
        router.push('/admin/blogs');
    };

    // Quill modules
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    if (isLoading) return <div style={{ padding: '2rem' }}>Loading blog data...</div>;

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Edit Blog: {blog.title}</h1>
            </div>

            <div className={styles.card} style={{ maxWidth: '900px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Blog Title</label>
                        <input
                            type="text" name="title" value={blog.title} onChange={handleChange} required
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: '#444' }}>Category</label>
                            <select
                                name="category" value={blog.category} onChange={handleChange}
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            >
                                <option value="Recipes">Recipes</option>
                                <option value="Cooking Tips">Cooking Tips</option>
                                <option value="Health">Health</option>
                                <option value="Lifestyle">Lifestyle</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: '#444' }}>Author Name</label>
                            <input
                                type="text" name="author" value={blog.author} onChange={handleChange} required
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Featured Image (URL or Upload)</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text" name="image" value={blog.image.startsWith('data:') ? '' : blog.image}
                                onChange={handleChange}
                                style={{ flex: 1, padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                placeholder="Paste image URL..."
                            />
                            <input
                                type="file" accept="image/*" onChange={handleFileChange}
                                style={{ width: '250px', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
                            />
                        </div>
                        {imagePreview && (
                            <div style={{ marginTop: '1rem', width: '200px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Short Excerpt</label>
                        <textarea
                            name="excerpt" value={blog.excerpt} onChange={handleChange} required rows={2}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Post Content</label>
                        <div style={{ background: 'white', borderRadius: '4px' }}>
                            <ReactQuill
                                theme="snow"
                                value={blog.content}
                                onChange={handleContentChange}
                                modules={modules}
                                style={{ height: '300px', marginBottom: '3rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            style={{ flex: 1, padding: '1rem', background: '#f5f5f5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{ flex: 2, padding: '1rem', background: '#eebb2d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Update Blog Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
