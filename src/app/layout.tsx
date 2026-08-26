import type { Metadata, Viewport } from "next";
import { Allura, Gloock, Pinyon_Script, Source_Serif_4 } from "next/font/google";
import { coupleFullNames, wedding } from "@/lib/wedding";
import "./globals.css";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
});

const script = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

const hero = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
});

const source = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source",
});

const title = `Invitación de boda · ${coupleFullNames()}`;
const description = `${coupleFullNames()} · ${wedding.datetime.displayDate} · ${wedding.venue.name}`;

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    apple: "/favicon.svg?v=2",
  },
  openGraph: {
    title,
    description,
    locale: "es_SV",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fce8ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${gloock.variable} ${script.variable} ${hero.variable} ${source.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
