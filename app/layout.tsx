'use client';

import './globals.css';
import {Providers} from './lib/context/providers';
import {NavigationShell} from './components/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="">
        <Providers>
          <NavigationShell>{children}</NavigationShell>
        </Providers>
      </body>
    </html>
  );
}
