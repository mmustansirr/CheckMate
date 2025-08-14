import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/contexts/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusIndicator } from "@/components/features/StatusIndicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CheckMate - AI-Powered Fact Checker",
  description: "Fight misinformation with AI-powered fact-checking. Get instant, reliable results for news headlines using advanced machine learning.",
  keywords: ["fact-checking", "AI", "fake news", "misinformation", "news verification"],
  authors: [{ name: "CheckMate Team" }],
  openGraph: {
    title: "CheckMate - AI-Powered Fact Checker",
    description: "Fight misinformation with AI-powered fact-checking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <StatusIndicator />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
