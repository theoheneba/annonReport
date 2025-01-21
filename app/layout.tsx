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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  themeColor: "#0D1117",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0D1117] min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

