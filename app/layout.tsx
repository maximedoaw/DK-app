import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/NavBar/Footer";
import AuthModal from "@/components/Modal/AuthModal/AuthModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DK Football",
  description: "C'est une application de management pour les equipes de football",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
    <body className="bg-gradient-to-br from-gray-800 via-blue-700 to-purple-900 w-screen h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <AuthModal />
      <Footer />
    </body>
</html>

  );
}