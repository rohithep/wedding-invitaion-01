import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { invitation } from "@/data/invitation";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3EBDA",
};

export const metadata: Metadata = {
  metadataBase: new URL(invitation.meta.siteUrl),
  title: invitation.meta.title,
  description: invitation.meta.description,
  openGraph: {
    type: "website",
    title: invitation.meta.title,
    description: invitation.meta.description,
    images: [
      {
        url: invitation.meta.ogImage,
        width: 1200,
        height: 630,
        alt: "Lubaiba & Raees — Our Nikkah, December 26",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: invitation.meta.title,
    description: invitation.meta.description,
    images: [invitation.meta.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorant.variable} ${amiri.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
