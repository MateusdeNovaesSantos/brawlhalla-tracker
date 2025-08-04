// React/next Imports
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

// Ui Imports
import { Inter } from 'next/font/google';
import './globals.css';

// Components Imports
import { Sidebar } from './(components)/sidebar'
import { MobileSidebar } from './(components)/mobile-sidebar'
import { ThemeProvider } from './(components)/theme-provider'
import { ThemeToggle } from './(components)/theme-toggle'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Brawlhalla Tracker",
  description: "A personal brawlhalla legend manager and farm tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sidebar fixa para Desktop */}
          <Sidebar />

          <main className="md:pl-64">
            <header className="flex items-center justify-between md:justify-end p-4 border-b">
              {/* Botão de menu para mobile */}
              <MobileSidebar />
              
              {/* Botão de tema */}
              <ThemeToggle />
            </header>
            <div className="p-4 sm:p-8">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
