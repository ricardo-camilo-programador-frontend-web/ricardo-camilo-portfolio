import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ricardo Camilo | Frontend Engineer",
  description: "Professional portfolio of Ricardo Camilo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="container mx-auto px-4 pb-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
