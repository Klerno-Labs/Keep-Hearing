export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-rows-[64px_1fr]">
      <header className="border-b px-6 flex items-center justify-between">
        <div className="font-semibold">KeepHearing • Admin</div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
