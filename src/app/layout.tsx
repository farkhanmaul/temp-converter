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
      { url: '/temp-converter/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/temp-converter/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/temp-converter/favicon.ico',
    apple: [
      { url: '/temp-converter/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/temp-converter/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/temp-converter/favicon.svg" />
        <link rel="shortcut icon" href="/temp-converter/favicon.ico" />
        <link rel="apple-touch-icon" href="/temp-converter/favicon.svg" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
