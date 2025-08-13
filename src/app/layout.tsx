import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
