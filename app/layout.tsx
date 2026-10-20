import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ToastContainer from "@/components/ui/ToastContainer";

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
  metadataBase: new URL("https://zento-piert.hu"),

  title: {
    default: "Zento-Piért Kft. | Papírtermékek és csomagolóanyagok",
    template: "%s | Zento-Piért Kft.",
  },
  description:
    "Papírtermékek gyártása és forgalmazása több mint 30 év tapasztalatával. Papíráruk, csomagolóanyagok és háztartási termékek Abaújszántóról, országos kiszolgálással.",
  keywords: [
    "Zento-Piért",
    "Zento-Piért Kft.",
    "papírtermék",
    "papírtermék gyártás",
    "papíráru",
    "csomagolóanyag",
    "háztartási termékek",
    "Abaújszántó",
  ],
  authors: [{ name: "Zento-Piért Kft." }],
  creator: "Zento-Piért Kft.",
  publisher: "Zento-Piért Kft.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "Zento-Piért Kft.",
    title: "Zento-Piért Kft. | Papírtermékek és csomagolóanyagok",
    description:
      "Papírtermékek gyártása és forgalmazása több mint 30 év tapasztalatával, országos kiszolgálással.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
