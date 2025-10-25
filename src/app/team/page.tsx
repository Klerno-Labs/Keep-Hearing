export default function TeamPage() {
  return (
    <main className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-[var(--brand-bg)]">
      <section className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--brand-primary)]">Our Team</h1>
        <ul className="space-y-4">
          <li className="text-lg text-gray-700">Chris Hatfield – Founder & Director</li>
          <li className="text-lg text-gray-700">Dr. Jane Audi – Research Lead</li>
          <li className="text-lg text-gray-700">Alex Sound – Community Manager</li>
          <li className="text-lg text-gray-700">Sam Lee – Operations</li>
        </ul>
      </section>
    </main>
  );
}
