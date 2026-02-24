import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-gotham",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-adelphi",
});

export const metadata: Metadata = {
  title: "Romé Pastelería Keto",
  description: "Pastelería Keto elegante y artesanal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
