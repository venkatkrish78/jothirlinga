import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { languages, fallbackLng } from './i18n/settings'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jyotirlinga Pilgrim Guide',
  description: 'Comprehensive guide for pilgrims visiting the 12 Jyotirlinga temples in India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the headers
  const headersList = headers();
  const url = headersList.get('x-url') || '';
  
  // Check if the URL starts with a language code
  const hasLangInPath = languages.some(lang => url.startsWith(`/${lang}`));
  
  // If not, redirect to the default language
  if (!hasLangInPath && url !== '') {
    redirect(`/${fallbackLng}${url}`);
  }
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}