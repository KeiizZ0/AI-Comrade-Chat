import type { Metadata } from "next";
import { Geist, Geist_Mono, Kaushan_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400", // Kaushan Script hanya memiliki weight 400
  variable: "--font-kaushan", // Kita akan menggunakan variabel ini di CSS
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Comrade",
  description: "Converse With Your AI Friends",
  icons: {
    // Path ini mengarah ke file di dalam folder `public`
    icon: "/CatLogo.png", 
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
        className={`${geistSans.variable} ${geistMono.variable} ${kaushan.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
