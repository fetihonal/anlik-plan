import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anlık Plan | Hayatın en güzel planları anlık çıkar",
  description:
    "Anlık Plan; eğlenceli aktiviteler, quiz geceleri, temalı partiler, fake düğünler ve daha fazlasıyla yeni insanlarla tanışabileceğin sosyal bir topluluk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased font-sans bg-light text-dark`}>
        {children}
      </body>
    </html>
  );
}
