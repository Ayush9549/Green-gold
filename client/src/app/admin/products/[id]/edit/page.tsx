"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../Admin.module.css'; // Path adjusted for nested route
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/context/ProductContext';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const { getProductById, updateProduct } = useProducts();
    const productId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [loading, setLoading] = useState(true);
    const [imageType, setImageType] = useState<'url' | 'file'>('url');
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Gallery State
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);
    const [existingGallery, setExistingGallery] = useState<string[]>([]);


    const [product, setProduct] = useState<Partial<Product>>({
        title: '',
        category: 'Premium',
        price: 0,
        stock: 0,
        description: '',
        image: '',
        gallery: []
    });

    useEffect(() => {
        if (productId) {
            const foundProduct = getProductById(productId);
            if (foundProduct) {
                setProduct(foundProduct);
                setPreviewUrl(foundProduct.image);
                // Detect if existing image is value or url, defaulting to url for now
                setImageType('url');

                // Load gallery
                if (foundProduct.gallery) {
                    setExistingGallery(foundProduct.gallery);
                    setGalleryPreviewUrls(foundProduct.gallery);
                }
            } else {
                alert("Product not found");
                router.push('/admin/products');
            }
            setLoading(false);
        }
    }, [productId, getProductById, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        // Handle name/title alias mapping if needed, or just update state
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));

        if (name === 'image' && imageType === 'url') {
            setPreviewUrl(value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setGalleryFiles(files);
            // Combine existing gallery with new previews for display
            const newUrls = files.map(file => URL.createObjectURL(file));
            setGalleryPreviewUrls([...existingGallery, ...newUrls]);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalImage = product.image;

        if (imageType === 'file' && imageFile) {
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
        } else if (imageType === 'url' && !product.image) {
            alert("Please enter an image URL.");
            return;
        }

        // Process Gallery Images
        let newGalleryImages: string[] = [];
        if (galleryFiles.length > 0) {
            try {
                const promises = galleryFiles.map(file => new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                }));
                newGalleryImages = await Promise.all(promises);
            } catch (err) {
                console.error("Error reading gallery files:", err);
            }
        }

        // Combine existing (if any) + new gallery images. 
        const finalGallery = [...existingGallery, ...newGalleryImages];

        // Prepare update object
        const updatedData: Partial<Product> = {
            title: product.title || product.name, // Ensure title is preserved
            name: product.title || product.name,
            category: product.category,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
            stock: typeof product.stock === 'string' ? parseInt(product.stock) : product.stock,
            description: product.description,
            image: finalImage,
            gallery: finalGallery
        };

        if (productId) {
            updateProduct(productId, updatedData);
            alert("Product Updated Successfully!");
            setTimeout(() => {
                router.push('/admin/products');
            }, 100);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Edit Product</h1>
            </div>

            <div className={styles.card} style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#444' }}>Product Name</label>
                        <input
                            type="text"
                            name="title" // Use title internally to match Product interface
                            value={product.title || product.name || ''}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
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
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 600, color: '#444' }}>Stock Quantity</label>
                            <input
                                type="number" name="stock" value={product.stock} onChange={handleChange} required min="0"
                                style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
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
                        <label style={{ fontWeight: 600, color: '#444' }}>Gallery Images</label>
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
                            name="description" value={product.description || ''} onChange={handleChange} required rows={4}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
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
                            style={{ padding: '0.8rem 1.5rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
