import type { Metadata } from "next";
import { Geist_Mono, Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invito di Matrimonio",
  description: "Siete invitati al nostro matrimonio",
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
        playfair.variable,
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
