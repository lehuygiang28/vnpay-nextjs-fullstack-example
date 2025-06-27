import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B82F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "VNPay Next.js Demo | Tích hợp Cổng Thanh toán VNPay",
    template: "%s | VNPay Next.js Demo",
  },
  description:
    "Demo tích hợp cổng thanh toán VNPay với Next.js 15. Bao gồm Server Actions, xử lý IPN, hai tùy chọn thanh toán và giao diện responsive hiện đại. Hoàn hảo cho ứng dụng thương mại điện tử Việt Nam.",
  keywords: [
    "vnpay",
    "vnpayjs",
    "vnpay.vn",
    "payment",
    "vn-payment",
    "vn-payments",
    "nextjs",
    "cổng thanh toán",
    "thanh toán việt nam",
    "thương mại điện tử",
    "server actions",
    "ipn handler",
    "react",
    "typescript",
    "tailwindcss",
    "fullstack",
    "demo",
    "tích hợp",
    "thanh toán online",
    "ngân hàng việt nam",
    "fintech",
    "xử lý thanh toán",
    "sandbox",
    "nextjs-15",
  ],
  authors: [{ name: "lehuygiang28", url: "https://github.com/lehuygiang28" }],
  creator: "lehuygiang28",
  publisher: "lehuygiang28",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://vnpay-nextjs-fullstack-example.vercel.app",
    siteName: "VNPay Next.js Demo - Tích hợp Cổng Thanh toán",
    title: "VNPay Next.js Demo | Tích hợp Cổng Thanh toán VNPay",
    description:
      "Demo tích hợp cổng thanh toán VNPay với Next.js 15. Bao gồm Server Actions, xử lý IPN, hai tùy chọn thanh toán và giao diện responsive hiện đại.",
  },
  twitter: {
    card: "summary",
    creator: "@lehuygiang28",
    title: "VNPay Next.js Demo | Tích hợp Cổng Thanh toán VNPay",
    description:
      "Demo tích hợp cổng thanh toán VNPay với Next.js 15. Bao gồm Server Actions, xử lý IPN và giao diện responsive hiện đại.",
  },
  category: "technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vnpay-nextjs-fullstack-example.vercel.app"),
  alternates: {
    canonical: "/",
  },

  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "msapplication-TileColor": "#3B82F6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "VNPay Next.js Demo - Tích hợp Cổng Thanh toán",
              description: "Demo tích hợp cổng thanh toán VNPay với Next.js 15",
              url: "https://vnpay-nextjs-fullstack-example.vercel.app",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              inLanguage: "vi-VN",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "VND",
              },
              creator: {
                "@type": "Person",
                name: "lehuygiang28",
                email: "lehuygiang28@gmail.com",
              },
              featureList: [
                "Tích hợp VNPay Payment Gateway",
                "Next.js 15 Server Actions",
                "Xử lý IPN Handler",
                "Giao diện Responsive",
                "Hỗ trợ TypeScript",
                "Styling với Tailwind CSS",
              ],
              audience: {
                "@type": "Audience",
                audienceType: "Developers",
                geographicArea: {
                  "@type": "Country",
                  name: "Vietnam",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <a href="#main-content" className="skip-to-main">
          Chuyển đến nội dung chính
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
