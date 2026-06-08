import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eternal Crimson — Un Año en la Eternidad",
  description: "Para Aranza. Un año en la eternidad contigo.",
  openGraph: {
    title: "Eternal Crimson — Un Año en la Eternidad",
    description: "Para Aranza. Un año en la eternidad contigo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="icon" href="/AniversarioPart2/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
