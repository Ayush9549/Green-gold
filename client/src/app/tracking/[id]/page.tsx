"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useRouter } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { FaCheck, FaTruck, FaBox, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function TrackingPage() {
    const { t } = useLanguage();
    const params = useParams();
    const router = useRouter();
    const { orders } = useOrders();
    const { isAuthenticated, isLoading } = useAuth();
    const [progress, setProgress] = useState(0);

    const orderId = params.id as string;
    const order = orders.find(o => o.id === orderId);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        if (order) {
            let newProgress = 0;
            switch (order.status) {
                case 'Pending': newProgress = 10; break;
                case 'Processing': newProgress = 40; break;
                case 'Shipped': newProgress = 70; break;
                case 'Completed': newProgress = 100; break;
                case 'Cancelled': newProgress = 0; break;
                default: newProgress = 0;
            }
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProgress(newProgress);
        }
    }, [order]);

    if (!isLoading && !isAuthenticated) {
        return null;
    }

    if (!order) {
        return (
            <main>
                <Navbar />
                <div style={{ textAlign: 'center', padding: '5rem', minHeight: '60vh' }}>
                    <h2>{t('tracking.not_found')}</h2>
                    <p>{t('tracking.not_found_desc')} {orderId}</p>
                </div>
                <Footer />
            </main>
        );
    }

    const steps = [
        { label: t('tracking.step.placed'), icon: FaBox, time: order.date },
        { label: t('tracking.step.processing'), icon: FaBox, time: t('tracking.time.in_progress') },
        { label: t('tracking.step.shipped'), icon: FaTruck, time: t('tracking.time.estimated_2days') },
        { label: t('tracking.step.delivered'), icon: FaHome, time: t('tracking.time.estimated_5days') }
    ];

    const currentStepIndex =
        order.status === 'Completed' ? 4 :
            order.status === 'Shipped' ? 2 :
                order.status === 'Processing' ? 1 : 0;

    return (
        <main>
            <Navbar />
            <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem', minHeight: '60vh' }}>
                <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FaMapMarkerAlt color="#556b2f" /> {t('tracking.title')} #{order.id}
                </h1>

                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    padding: '3rem 2rem',
                    position: 'relative'
                }}>
                    {/* Progress Bar Line */}
                    <div style={{
                        position: 'absolute',
                        top: '5rem',
                        left: '10%',
                        width: '80%',
                        height: '4px',
                        background: '#eee',
                        zIndex: 1
                    }}>
                        <div style={{
                            width: `${progress}% `,
                            height: '100%',
                            background: '#556b2f',
                            transition: 'width 1s ease'
                        }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                        {steps.map((step, idx) => {
                            const isCompleted = idx <= currentStepIndex;
                            const isCurrent = idx === currentStepIndex;

                            return (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '20%' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: isCompleted ? '#556b2f' : 'white',
                                        border: isCompleted ? 'none' : '2px solid #ddd',
                                        color: isCompleted ? 'white' : '#ccc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        boxShadow: isCurrent ? '0 0 0 5px rgba(85, 107, 47, 0.2)' : 'none',
                                        transition: 'all 0.3s'
                                    }}>
                                        {isCompleted ? <FaCheck size={16} /> : <step.icon size={16} />}
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 'bold', color: isCompleted ? '#333' : '#999' }}>{step.label}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                            {isCompleted && idx === 0 ? step.time : (isCurrent && step.time) || ''}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: '4rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px' }}>
                        <h3>{t('tracking.details')}</h3>
                        <p style={{ marginTop: '0.5rem', color: '#555' }}>
                            {t('tracking.package_status')} <strong>{order.status}</strong>.
                            {order.status === 'Shipped' && ` ${t('tracking.shipped_msg')} `}
                            {order.status === 'Processing' && ` ${t('tracking.processing_msg')} `}
                        </p>
                        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <small style={{ color: '#888', textTransform: 'uppercase' }}>{t('tracking.id')}</small>
                                <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>TRK-{order.id.split('-')[1]}</div>
                            </div>
                            <div>
                                <small style={{ color: '#888', textTransform: 'uppercase' }}>{t('tracking.carrier')}</small>
                                <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>FedEx Express</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
