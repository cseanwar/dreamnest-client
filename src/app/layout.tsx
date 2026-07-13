import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body-dmsans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamNest — Find Your Perfect Home",
  description:
    "Explore premium properties for sale or rent. DreamNest helps you find, list, and manage your ideal property with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${playfairDisplay.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-body">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
