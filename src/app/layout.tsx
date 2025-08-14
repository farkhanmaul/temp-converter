import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FarkhanTherm | Instant & Accurate Temperature Conversions",
  description: "🌡️ Convert temperatures instantly between Celsius, Fahrenheit, Kelvin & Réaumur. Professional tool with interactive slider, range tables & dark mode. Built by @farkhanmaul with Claude AI.",
  keywords: "temperature converter, celsius fahrenheit, kelvin converter, temperature calculator, réaumur, thermometer tool, instant conversion, professional converter",
  authors: [{ name: "Farkhan Maul", url: "https://github.com/farkhanmaul" }],
  creator: "Farkhan Maul",
  openGraph: {
    title: "FarkhanTherm - Instant & Accurate Temperature Converter",
    description: "🌡️ Professional temperature converter with 4 scales, interactive features & beautiful design",
    type: "website",
    siteName: "FarkhanTherm",
  },
  twitter: {
    card: "summary_large_image",
    title: "FarkhanTherm",
    description: "🌡️ Convert temperatures instantly & accurately",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
