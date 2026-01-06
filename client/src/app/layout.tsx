import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { CouponProvider } from "@/context/CouponContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { BlogProvider } from "@/context/BlogContext";

export const metadata: Metadata = {
  title: {
    default: "Green Gold | Premium Olive Oil & Organic Olive Oil",
    template: "%s | Green Gold Olive Oil",
  },
  description: "Discover the purest Cold Pressed Olive Oil (Olive Oil). 100% Organic, Extra Virgin, and perfect for cooking, skin care, and hair growth. Order certified organic olive oil online today.",
  keywords: ["Olive Oil", "Olive Oil", "Organic Olive Oil", "Extra Virgin Olive Oil", "Cold Pressed Oil", "Hair Care Oil", "Skin Care Oil", "Best Olive Oil", "Green Gold"],
  openGraph: {
    title: "Green Gold | Premium Olive Oil & Organic Olive Oil",
    description: "Experience the finest organic Olive Oil. Cold-pressed, unadulterated, and perfect for a healthy lifestyle.",
    url: "https://green-gold.vercel.app", // Assuming Vercel deployment or placeholder
    siteName: "Green Gold",
    images: [
      {
        url: "/og-image.jpg", // We should ideally create this or point to hero image
        width: 1200,
        height: 630,
        alt: "Green Gold Premium Olive Oil",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Gold | Premium Olive Oil",
    description: "100% Organic, Cold Pressed Olive Oil for your holistic wellness.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { OrderProvider } from "@/context/OrderContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <LanguageProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <CouponProvider>
                    <BlogProvider>
                      {children}
                    </BlogProvider>
                  </CouponProvider>
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
