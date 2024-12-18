import type { Metadata } from "next";
import localFont from "next/font/local";
import ".././app/styles/globals.css";
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientProvider from "./ClientProvider";
import { AuthProvider } from "./components/context/AuthContext";
import { Toaster } from "react-hot-toast";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProvider>
          <AuthProvider>
            <Toaster position="top-right" />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow overflow-auto">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
