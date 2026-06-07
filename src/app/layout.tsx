import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claudia & Simone — Il Nostro Matrimonio | 31 Maggio 2026",
  description: "Siete invitati al matrimonio di Claudia & Simone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={cn(
        "h-full antialiased",
        lato.variable,
        cormorant.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-full flex flex-col font-[var(--font-sans)]">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
