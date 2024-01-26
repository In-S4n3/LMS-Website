import { RootLayout } from '@/components/RootLayout';

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full bg-neutral-950 text-base antialiased">
      <div className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </div>
    </section>
  );
}
