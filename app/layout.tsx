import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Ghana Report - Secure Anonymous Reporting",
    template: "%s | Ghana Report",
  },
  description: "A secure platform for reporting workplace misconduct, fraud, and ethical concerns in Ghana.",
  keywords: ["Ghana", "anonymous reporting", "whistleblowing", "workplace misconduct", "fraud reporting"],
  authors: [{ name: "Ghana Report Team" }],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://www.ghanareport.com",
    siteName: "Ghana Report",
    images: [
      {
        url: "https://www.ghanareport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ghana Report - Secure Anonymous Reporting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GhanaReport",
    creator: "@GhanaReport",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.ghanareport.com" />
      </head>
      <body className="bg-[#0D1117]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main>{children}</main>
          <footer>{/* Add footer content here */}</footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

