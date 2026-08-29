import type { Metadata, Viewport } from "next";
import { Allura, Gloock, Pinyon_Script, Playfair_Display, Source_Serif_4 } from "next/font/google";
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

const monogram = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-seal",
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
    icon: [{ url: "/favicon.svg?v=6", type: "image/svg+xml" }],
    apple: "/favicon.svg?v=6",
  },
  openGraph: {
    title,
    description,
    locale: "es_SV",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#575E4B",
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
      className={`${gloock.variable} ${script.variable} ${hero.variable} ${monogram.variable} ${source.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
