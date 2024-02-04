import { ToastProvider } from '@/src/components/providers/toaster-provider';

import { DashboardShell } from './dashboard/components/DashboardShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      <ToastProvider />
      {children}
    </DashboardShell>
  );
}
