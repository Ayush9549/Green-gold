"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Faq.module.css';
import { FaChevronDown } from 'react-icons/fa';

const FAQS = [
    {
        question: "Is your olive oil really 100% organic?",
        answer: "Yes! Our Original Extra Virgin Olive Oil is certified organic. We adhere to strict farming practices without the use of synthetic pesticides or fertilizers, ensuring the purest product for your table."
    },
    {
        question: "Where does your olive oil come from?",
        answer: "Our olives are harvested from our family-owned groves in the Andalusia region of Spain, known worldwide for producing some of the highest quality olives due to its ideal climate and soil conditions."
    },
    {
        question: "What is 'Cold Pressed' and why does it matter?",
        answer: "Cold pressing means extracting the oil at temperatures below 80°F (27°C). This preserves the delicate flavors, aromas, and most importantly, the nutritional value (polyphenols and vitamins) that heat processing destroys."
    },
    {
        question: "Can I use Jaitun Oil for cooking?",
        answer: "Absolutely. Our Regular Cold Pressed Oil has a higher smoke point suitable for sautéing and baking. Our Extra Virgin Oil is best used for low-heat cooking, dressings, and finishing to maintain its flavor profile."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. Shipping rates and times vary depending on the destination. You can see specific shipping costs at checkout."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, please contact our support team, and we will arrange a return or exchange."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.faqContainer}`}>
                <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>

                <div className={styles.faqList}>
                    {FAQS.map((faq, index) => (
                        <div key={index} className={styles.faqItem}>
                            <button
                                className={styles.question}
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <FaChevronDown className={`${styles.icon} ${activeIndex === index ? styles.rotate : ''}`} />
                            </button>
                            <div className={`${styles.answer} ${activeIndex === index ? styles.active : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
