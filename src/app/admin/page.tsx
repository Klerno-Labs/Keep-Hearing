export default function AdminPage() {
  return (
    <main className="min-h-screen py-20 flex flex-col items-center bg-[var(--brand-bg)]">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-[var(--brand-primary)]" style={{ letterSpacing: '-0.03em' }}>
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-5xl">
        <section className="rounded-2xl bg-white shadow-xl p-12 flex flex-col items-center transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-center text-[var(--brand-primary)]">User Management</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">View, edit, and manage users.</p>
          <button className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold shadow-lg hover:bg-[var(--brand-primary)] transition">Manage Users</button>
        </section>
        <section className="rounded-2xl bg-white shadow-xl p-12 flex flex-col items-center transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-center text-[var(--brand-primary)]">Content Updates</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">Update homepage, news, and impact stories.</p>
          <button className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold shadow-lg hover:bg-[var(--brand-primary)] transition">Edit Content</button>
        </section>
      </div>
      <div className="mt-20 flex flex-col items-center">
        <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" alt="Admin workspace" className="rounded-2xl shadow-xl w-96 h-60 object-cover mb-8" />
        <p className="text-gray-500 text-lg">Premium admin experience for nonprofit management.</p>
      </div>
    </main>
  );
}
