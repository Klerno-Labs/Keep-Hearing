
export default function Home() {
  return (
  <div className="space-y-20 bg-[var(--brand-bg)] min-h-screen">
  <section className="w-full py-20 flex flex-col items-center justify-center bg-[var(--brand-card)]/80 backdrop-blur-xl rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-[var(--brand-primary)]/30">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center text-[var(--brand-primary)]" style={{ letterSpacing: '-0.03em' }}>
          Bringing hearing preventive care to the world.
        </h1>
  <p className="mt-3 text-2xl text-[var(--brand-text)] text-center max-w-2xl">
          There are no drugs that prevent hearing loss. ACEMg (Soundbites) is clinically proven to preserve or improve hearing in a 2 year real-world evidence/real-world data (RWE/RWD) study. ACEMg is safe for all ages and available as the Soundbites supplement.
        </p>
      </section>

  <div className="flex flex-col md:flex-row gap-16 items-start justify-center">
  <div className="flex-1 space-y-12">
          <section className="rounded-2xl bg-[var(--brand-card)] shadow-lg p-10 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">OTIS Public Health Study</h2>
            <p className="text-lg text-[var(--brand-text)] mb-4">
              The Keep Hearing initiative is the sponsor of the Otology Intervention Study of ACEMg (the OTIS Study) in partnership with Soundbites PBC. The 24-week OTIS study is conducted at home, assessing Soundbites’ impact on hearing sensitivity, tinnitus (ringing in the ears) and sound intolerance (hyperacusis). The study is planned to expand worldwide and go on for years.
            </p>
            <a href="#" className="text-[var(--brand-primary)] font-semibold hover:underline text-lg">Learn More</a>
          </section>
          <section className="rounded-2xl bg-[var(--brand-card)] shadow-lg p-10 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">Hearing Biology Education</h2>
            <p className="text-lg text-[var(--brand-text)] mb-4">
              One of our main goals is to help people learn about the biological origins of hearing loss, its cellular biochemistry, and how the origins of hearing loss can be blocked. Learn everything there is to know about Sensorineural Hearing Loss (SNHL) and ACEMg (Soundbites) in the 5-session videos.
            </p>
            <a href="#" className="text-[var(--brand-primary)] font-semibold hover:underline text-lg">Watch now</a>
          </section>
        </div>
        <div className="flex flex-col items-center gap-10">
          {/* OTIS Study Badge */}
          <div className="w-56 h-56 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[var(--brand-primary)] text-[var(--brand-card)] flex flex-col items-center justify-center shadow-xl border-4 border-[var(--brand-card)] text-center p-6" style={{ fontFamily: 'Inter, Arial, sans-serif', boxShadow: '0 8px 32px rgba(26,115,232,0.15)' }}>
              <div className="font-bold text-2xl mb-2">OTIS Study</div>
              <div className="font-semibold text-lg">ACEMg® formula</div>
              <div className="text-sm mt-3">Keep Hearing Initiative<br />Soundbites Public Health Research</div>
            </div>
          </div>
          {/* Premium classroom image */}
          <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80" alt="Classroom education" className="rounded-2xl shadow-xl w-80 h-52 object-cover" />
            <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80" alt="Classroom education" className="rounded-2xl shadow-xl w-80 h-52 object-cover" loading="lazy" />
        </div>
      </div>

      {/* Donate Section */}
  <section className="rounded-2xl bg-[var(--brand-card)]/80 backdrop-blur-xl shadow-2xl p-12 mt-20 flex flex-col items-center transition-all duration-500 hover:shadow-[var(--brand-primary)]/30">
  <h2 className="text-4xl font-bold mb-4 text-center text-[var(--brand-primary)]">Support Our Mission</h2>
  <p className="text-lg text-[var(--brand-text)] mb-8 text-center max-w-xl">Your donation helps us expand hearing preventive care and education worldwide. 100% of donations go to nonprofit programs.</p>
        <div className="flex gap-6 mb-4">
          <form action="/api/donate-stripe" method="POST">
  <button type="submit" className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-card)] font-semibold shadow-lg hover:shadow-[var(--brand-primary)]/40 transition hover:scale-105">Donate with Stripe</button>
          </form>
          <form action="/api/donate-paypal" method="POST">
          <button type="submit" className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-card)] font-semibold shadow-lg hover:shadow-[var(--brand-primary)]/40 transition hover:scale-105">Donate with PayPal</button>
          </form>
        </div>
      </section>

      {/* About/Impact Section */}
    <section className="rounded-2xl bg-[var(--brand-card)]/80 backdrop-blur-xl shadow-2xl p-12 mt-20 flex flex-col items-center transition-all duration-500 hover:shadow-[var(--brand-accent)]/30">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-[var(--brand-accent)]">About Us & Impact</h2>
        <p className="text-lg text-[var(--brand-text)] text-center mb-8">Keep Hearing Initiative is a registered nonprofit dedicated to hearing health, education, and fair access. Since 2022, we've reached over 10,000 people and funded 3 major studies. Read our annual report for more details.</p>
        <a href="#" className="text-lg font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-accent)] underline">View Annual Report</a>
      </section>

      {/* Volunteer/Contact Info */}
  <section className="rounded-2xl bg-[var(--brand-card)]/80 backdrop-blur-xl shadow-2xl p-12 mt-20 flex flex-col items-center transition-all duration-500 hover:shadow-[var(--brand-accent)]/30">
  <h2 className="text-4xl font-bold mb-4 text-center text-[var(--brand-primary)]">Get Involved</h2>
  <p className="text-lg text-[var(--brand-text)] mb-6 text-center max-w-xl">Interested in volunteering or partnering? Email us or fill out the form below.</p>
        <form className="space-y-4 w-full max-w-lg">
          <input type="text" name="name" placeholder="Your Name" className="w-full border rounded-xl px-4 py-3 text-lg" required />
          <input type="email" name="email" placeholder="Your Email" className="w-full border rounded-xl px-4 py-3 text-lg" required />
          <textarea name="message" placeholder="How would you like to help?" className="w-full border rounded-xl px-4 py-3 text-lg" rows={3} required></textarea>
          <button type="submit" className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-card)] font-semibold shadow-lg hover:bg-[var(--brand-accent)] transition">Contact Us</button>
        </form>
  <div className="mt-4 text-base text-[var(--brand-muted)]">Or email: <a href="mailto:info@keephearing.org" className="text-[var(--brand-primary)] hover:underline">info@keephearing.org</a></div>
      </section>

      {/* Board/Team Section */}
  <section className="rounded-2xl bg-[var(--brand-card)]/80 backdrop-blur-xl shadow-2xl p-12 mt-20 flex flex-col items-center transition-all duration-500 hover:shadow-[var(--brand-accent)]/30">
  <h2 className="text-4xl font-bold mb-4 text-center text-[var(--brand-primary)]">Our Team</h2>
  <ul className="list-none flex flex-col gap-4 text-lg text-[var(--brand-text)]">
          <li><span className="font-semibold">Jane Doe</span>, Founder & Director</li>
          <li><span className="font-semibold">John Smith</span>, Board Chair</li>
          <li><span className="font-semibold">Dr. Emily Lee</span>, Research Lead</li>
          <li><span className="font-semibold">Sarah Kim</span>, Education Coordinator</li>
        </ul>
      </section>

      {/* Legal/Transparency Section */}
  <section className="rounded-2xl bg-[var(--brand-card)]/80 backdrop-blur-xl shadow-2xl p-12 mt-20 flex flex-col items-center transition-all duration-500 hover:shadow-[var(--brand-accent)]/30">
  <h2 className="text-4xl font-bold mb-4 text-center text-[var(--brand-primary)]">Transparency & Legal</h2>
  <ul className="list-none flex flex-col gap-2 text-lg text-[var(--brand-text)] mb-4">
          <li>Registered 501(c)(3) nonprofit</li>
          <li><a href="#privacy" className="text-[var(--brand-primary)] hover:underline">Privacy Policy</a></li>
          <li><a href="#terms" className="text-[var(--brand-primary)] hover:underline">Terms of Use</a></li>
        </ul>
  <p className="text-base text-[var(--brand-muted)]">All financials and reports are available upon request.</p>
      </section>

      {/* Newsletter Signup */}
  <section className="rounded-2xl bg-[var(--brand-card)] shadow-lg p-12 mt-20 flex flex-col items-center transition-all duration-300">
  <h2 className="text-4xl font-bold mb-4 text-center text-[var(--brand-primary)]">Stay Updated</h2>
        <form className="flex gap-4 max-w-lg w-full">
          <input type="email" name="newsletter" placeholder="Your Email" className="w-full border rounded-xl px-4 py-3 text-lg" required />
  <button type="submit" className="px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-card)] font-semibold shadow-lg hover:shadow-[var(--brand-accent)]/40 transition hover:scale-105">Subscribe</button>
        </form>
      </section>

      {/* Social Media Links */}
      <section className="flex gap-10 items-center justify-center mt-20">
  <a href="https://twitter.com/keephearing" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-3xl transition"><svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161c-.543.929-.855 2.01-.855 3.17 0 2.188 1.115 4.118 2.813 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/></svg></a>
  <a href="https://facebook.com/keephearing" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-3xl transition"><svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.104C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"/></svg></a>
  <a href="mailto:info@keephearing.org" aria-label="Email" className="text-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-3xl transition"><svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14.13c0 .553.447 1 1 1h21.98c.553 0 1-.447 1-1v-14.13l-11.99 7.065zm11.99-9.065c0-.553-.447-1-1-1h-21.98c-.553 0-1 .447-1 1v.217l12 7.08 11.98-7.08v-.217z"/></svg></a>
      </section>
    </div>
  );
}
import React from "react";
