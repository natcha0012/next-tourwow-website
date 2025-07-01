import type { Metadata } from "next";
import { Kanit, Sarabun } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import SubHeader from "@/components/SubHeader/SubHeader";
import FooterBar from "@/components/FooterBar/FooterBar";

const kanit = Kanit({
  weight: ["300", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-kanit",
});

const sarabun = Sarabun({
  weight: ["200"],
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "Tourwow",
  description: "โปรแกรมทัวร์ แพ็กเกจทัวร์ ท่องเที่ยวในประเทศ และต่างประเทศ",
  keywords: ["ทัวร์", "แพ็กเกจ", "เที่ยวในประเทศ", "เที่ยวต่างประเทศ"],
  openGraph: {
    title: "Tourwow",
    description: "โปรแกรมทัวร์ แพ็กเกจทัวร์ ท่องเที่ยวในประเทศ และต่างประเทศ",
    type: "website",
    url: "https://next-tourwow-website.vercel.app/",
    images: [
      {
        url: "https://next-tourwow-website.vercel.app/logo.svg",
        width: 1200,
        height: 630,
        alt: "TourWow - โปรแกรมทัวร์คุณภาพ",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} ${sarabun.variable} antialiased`}>
        <Header></Header>
        <SubHeader></SubHeader>
        {children}
        <FooterBar></FooterBar>
      </body>
    </html>
  );
}
