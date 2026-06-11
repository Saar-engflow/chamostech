import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/webfonts/poppins-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/webfonts/poppins-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/webfonts/poppins-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/webfonts/poppins-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-chewie", // Keeping the variable name for CSS compatibility
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chamos Tech | Custom Software Solutions",
    template: "%s | Chamos Tech",
  },
  description: "We Build Solutions. You Build The Future. Professional software development firm building custom systems for businesses in Lusaka, Zambia.",
  keywords: ["custom software", "web development", "mobile apps", "business automation", "Zambia", "Lusaka", "software development"],
  authors: [{ name: "Chamos Tech" }],
  creator: "Chamos Tech",
  publisher: "Chamos Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_ZM",
    url: "https://chamostech.com",
    siteName: "Chamos Tech",
    title: "Chamos Tech | Custom Software Solutions",
    description: "We Build Solutions. You Build The Future. Professional software development firm building custom systems for businesses.",
    images: [
      {
        url: "/chamos-tech-logo.jpeg",
        width: 800,
        height: 600,
        alt: "Chamos Tech Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chamos Tech | Custom Software Solutions",
    description: "We Build Solutions. You Build The Future. Professional software development firm building custom systems for businesses.",
    images: ["/chamos-tech-logo.jpeg"],
    creator: "@chamostech",
  },
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
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: "/chamos-tech-logo.jpeg",
    shortcut: "/chamos-tech-logo.jpeg",
    apple: "/chamos-tech-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareDevelopmentCompany",
    name: "Chamos Tech",
    description: "We Build Solutions. You Build The Future. Professional software development firm building custom systems for businesses.",
    url: "https://chamostech.com",
    logo: "https://chamostech.com/chamos-tech-logo.jpeg",
    telephone: "+260766562299",
    email: "chamosdistributionltd@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lusaka",
      addressRegion: "Lusaka Province",
      addressCountry: "ZM",
    },
    sameAs: [
      "https://wa.me/260766562299",
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Zambia",
    },
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
