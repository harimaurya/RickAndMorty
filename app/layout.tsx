import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/layout/SiteFooter";
import UserContextProvider from "@/store/UserContext";
import { getUserFromCookies } from "@/lib/session/session";
import { DEFAULT_SEO, TITLE_TEMPLATE } from "@/constants/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: DEFAULT_SEO.title,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_SEO.description.default,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description.default,
    siteName: DEFAULT_SEO.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description.default,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = (await getUserFromCookies()) || {
    username: "",
    jobTitle: "",
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContextProvider value={user}>
          <div className="site flex min-h-screen flex-col items-center justify-center">
            {children}
            <SiteFooter />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
