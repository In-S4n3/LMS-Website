export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      {children}
    </div>
  );
}
