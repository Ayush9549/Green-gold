"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../Admin.module.css';
import { useProducts } from '@/context/ProductContext';

export default function AddProductPage() {
    const router = useRouter();
    const { addProduct } = useProducts();
    const [imageType, setImageType] = useState<'url' | 'file'>('url');
    const [previewUrl, setPreviewUrl] = useState<string>('');

    // Gallery State
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);

    const [product, setProduct] = useState({
        name: '',
        category: 'Premium',
        price: '',
        stock: '',
        description: '',
        image: '' // Stores URL text
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });

        // If updating URL text field, update preview immediately
        if (e.target.name === 'image' && imageType === 'url') {
            setPreviewUrl(e.target.value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            // Create a preview URL for the selected file
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setGalleryFiles(files);
            const urls = files.map(file => URL.createObjectURL(file));
            setGalleryPreviewUrls(urls);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalImage = product.image;

        if (imageType === 'file') {
            if (!imageFile) {
                alert("Please select an image file.");
                return;
            }
            // Convert file to Base64 to store in local storage (mock backend)
            try {
                finalImage = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(imageFile);
                });
            } catch (err) {
                console.error("Error reading file:", err);
                alert("Failed to read image file.");
                return;
            }
        } else {
            if (!product.image) {
                alert("Please enter an image URL.");
                return;
            }
        }

        // Process Gallery Images
        let galleryImages: string[] = [];
        if (galleryFiles.length > 0) {
            try {
                const promises = galleryFiles.map(file => new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                }));
                galleryImages = await Promise.all(promises);
            } catch (err) {
                console.error("Error reading gallery files:", err);
            }
        }

        // Create proper product object with safe parsing
        const newProduct = {
            id: Date.now().toString(),
            title: product.name,
            name: product.name,
            category: product.category,
            price: parseFloat(product.price) || 0,
            stock: parseInt(product.stock) || 0,
            description: product.description,
            image: finalImage,
            gallery: galleryImages, // Add gallery
            rating: 5,
            features: [],
            ingredients: "100% Organic"
        };

        addProduct(newProduct);
        alert("Product Added Successfully!");

        // Small delay to ensure state update propagates before navigation
        setTimeout(() => {
            router.push('/admin/products');
        }, 100);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Add New Product</h1>
            </div>

            <div className={styles.card} style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Product Name</label>
                        <input
                            type="text" name="name" value={product.name} onChange={handleChange} required
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            placeholder="e.g. Organic Basil Oil"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: '#444' }}>Category</label>
                            <select
                                name="category" value={product.category} onChange={handleChange}
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            >
                                <option value="Premium">Premium</option>
                                <option value="Classic">Classic</option>
                                <option value="Infused">Infused</option>
                                <option value="Beauty">Beauty</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: '#444' }}>Price ($)</label>
                            <input
                                type="number" name="price" value={product.price} onChange={handleChange} required min="0" step="0.01"
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: '#444' }}>Stock Quantity</label>
                            <input
                                type="number" name="stock" value={product.stock} onChange={handleChange} required min="0"
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Image Selection Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Product Image</label>

                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="radio"
                                    checked={imageType === 'url'}
                                    onChange={() => setImageType('url')}
                                    style={{ accentColor: '#eebb2d' }}
                                />
                                Image URL
                            </label>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="radio"
                                    checked={imageType === 'file'}
                                    onChange={() => setImageType('file')}
                                    style={{ accentColor: '#eebb2d' }}
                                />
                                Upload File
                            </label>
                        </div>

                        {imageType === 'url' ? (
                            <input
                                key="url-input"
                                type="text" name="image" value={product.image || ''} onChange={handleChange}
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                placeholder="https://example.com/image.jpg"
                            />
                        ) : (
                            <input
                                key="file-input"
                                type="file" accept="image/*" onChange={handleFileChange}
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
                            />
                        )}

                        {/* Image Preview */}
                        {previewUrl && (
                            <div style={{ marginTop: '1rem', width: '100px', height: '100px', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    {/* Gallery Images Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Gallery Images (Optional)</label>
                        <input
                            type="file" multiple accept="image/*" onChange={handleGalleryChange}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
                        />
                        {/* Gallery Previews */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                            {galleryPreviewUrls.map((url, idx) => (
                                <div key={idx} style={{ width: '80px', height: '80px', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                                    <img src={url} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Description</label>
                        <textarea
                            name="description" value={product.description} onChange={handleChange} required rows={4}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
                            placeholder="Product description..."
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            style={{ padding: '0.8rem 1.5rem', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{ padding: '0.8rem 1.5rem', background: '#eebb2d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
