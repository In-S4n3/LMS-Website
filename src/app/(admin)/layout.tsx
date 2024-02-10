import { Ubuntu } from 'next/font/google';

import { ToastProvider } from '@/src/components/providers/toaster-provider';

import { DashboardShell } from './dashboard/components/DashboardShell';

const roboto = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={roboto.className}>
      <DashboardShell>
        <ToastProvider />
        {children}
      </DashboardShell>
    </section>
  );
}
