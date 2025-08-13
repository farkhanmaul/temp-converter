import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Temperature Converter by Farkhan Maul | Celsius Fahrenheit Kelvin",
  description: "Professional temperature converter tool by Farkhan Maul. Convert between Celsius, Fahrenheit, and Kelvin with real-time calculations. Modern, responsive design with glassmorphism effects.",
  keywords: "temperature converter, celsius to fahrenheit, kelvin converter, temperature calculator, Farkhan Maul, thermometer tool",
  authors: [{ name: "Farkhan Maul" }],
  creator: "Farkhan Maul",
  openGraph: {
    title: "Temperature Converter by Farkhan Maul",
    description: "Convert between Celsius, Fahrenheit, and Kelvin with this modern, responsive temperature converter tool.",
    type: "website",
    url: "https://farkhanmaul.github.io/temp-converter",
    siteName: "Temperature Converter",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
