import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
// import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "./lib/next-auth/provider";
import { Suspense } from "react";
import LoadingSpinner from "./loading";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight:["400"]});

export const metadata: Metadata = {
  title: "Book commerce",
  description: "Book commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.className} antialiased`}
      >
        <NextAuthProvider>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
