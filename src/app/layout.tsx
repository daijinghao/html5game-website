import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HTML5Games - 在线小游戏平台",
  description: "HTML5Games 是一个免费的在线小游戏平台，提供多种类型的休闲游戏。",
  other: {
    'next-router-prefetch': 'true',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-16 animate-fadeIn">
          {children}
        </main>
      </body>
    </html>
  );
}
