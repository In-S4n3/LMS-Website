import '@mantine/core/styles.css';
import '@/styles/tailwind.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { type Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: '%s - Studio',
    default: 'Studio - Award winning developer studio based in Denmark',
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="h-full">
        <body className="h-full">
          <MantineProvider>
            <ColorSchemeScript />
            {children}{' '}
          </MantineProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
