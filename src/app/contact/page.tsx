export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-[var(--brand-bg)]">
      <section className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--brand-primary)]">Get Involved</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Interested in volunteering or partnering? Email us or fill out the form below.</p>
        <form className="space-y-4 w-full max-w-lg mx-auto">
          <input type="text" name="name" placeholder="Your Name" className="w-full border rounded-xl px-4 py-3 text-lg" required />
          <input type="email" name="email" placeholder="Your Email" className="w-full border rounded-xl px-4 py-3 text-lg" required />
          <textarea name="message" placeholder="How would you like to help?" className="w-full border rounded-xl px-4 py-3 text-lg" rows={3} required></textarea>
          <button type="submit" className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold shadow-lg hover:bg-[var(--brand-primary)] transition">Contact Us</button>
        </form>
        <div className="mt-4 text-base text-gray-500 text-center">Or email: <a href="mailto:info@keephearing.org" className="text-[var(--brand-primary)] hover:underline">info@keephearing.org</a></div>
      </section>
    </main>
  );
}
