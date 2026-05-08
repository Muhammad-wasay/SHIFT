import type { Metadata } from "next";
import { Outfit, Syncopate } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
});

export const metadata: Metadata = {
  title: "SHIFT | Cognitive Load Management",
  description: "Seamlessly reduce the burden of managing information across multiple digital sources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${outfit.variable} ${syncopate.variable} antialiased selection:bg-white/10 bg-[#050505] text-white min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
