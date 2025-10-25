export default function DonatePage() {
  return (
    <main className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-[var(--brand-bg)]">
      <section className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--brand-primary)]">Support Our Mission</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">Your donation helps us expand hearing preventive care and education worldwide. 100% of donations go to nonprofit programs.</p>
        <div className="flex gap-6 mb-4 justify-center">
          <form action="/api/donate-stripe" method="POST">
            <button type="submit" className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold shadow-lg hover:shadow-[var(--brand-primary)]/40 transition hover:scale-105">Donate with Stripe</button>
          </form>
          <form action="/api/donate-paypal" method="POST">
            <button type="submit" className="px-8 py-3 rounded-xl bg-[#003087] text-white font-semibold shadow-lg hover:shadow-[#003087]/40 transition hover:scale-105">Donate with PayPal</button>
          </form>
        </div>
      </section>
    </main>
  );
}
