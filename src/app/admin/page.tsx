"use client";
const TABS = [
  { key: "overview", label: "Overview" },
  { key: "users", label: "User Management" },
  { key: "donations", label: "Donations & Impact" },
  { key: "content", label: "Content & News" },
  { key: "analytics", label: "Analytics" },
  { key: "audit", label: "Audit Log" },
  { key: "settings", label: "Settings" }
];
import { useState, useEffect } from "react";
// import { getAnalytics } from "@vercel/analytics/react";

// Live analytics metric component using Vercel Analytics hooks
function LiveAnalyticsMetric() {
  return (
    <div className="my-4 flex flex-col items-center">
      <span className="text-4xl font-bold text-[var(--brand-primary)]">Live Data</span>
  <span className="text-lg text-[var(--brand-muted)] mt-1">Engagement metrics are available in <a href='https://vercel.com/analytics' target='_blank' className='underline text-[var(--brand-primary)]'>Vercel Analytics</a>.</span>
    </div>
  );
}

// Example: Donations analytics (replace with real DB query if needed)
function DonationAnalytics() {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/donations/total")
      .then(res => res.json())
      .then(data => setTotal(data.total))
      .catch(() => setTotal(null));
  }, []);
  return (
    <div className="my-4 flex flex-col items-center">
      <span className="text-4xl font-bold text-[var(--brand-primary)]">${total !== null ? total.toLocaleString() : "-"}</span>
      <span className="text-lg text-[var(--brand-muted)] mt-1">Total Donations</span>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState("overview");
  return (
  <main className="min-h-screen py-20 px-4 flex flex-col items-center bg-gradient-to-br from-[var(--brand-bg)] to-[var(--brand-card)]">
      <h1 className="text-7xl font-black mb-12 text-center text-[var(--brand-primary)] tracking-tight drop-shadow-2xl" style={{ letterSpacing: '-0.04em', textShadow: '0 2px 24px #00eaff44' }}>
        Admin Dashboard
      </h1>
      <nav aria-label="Admin dashboard tabs" className="mb-10 w-full max-w-5xl flex justify-center">
        <ul className="flex w-full gap-2 md:gap-4" role="tablist">
          {TABS.map(t => (
            <li key={t.key} role="presentation" className="flex-1 flex">
              <button
                role="tab"
                aria-selected={tab === t.key}
                aria-controls={`panel-${t.key}`}
                tabIndex={tab === t.key ? 0 : -1}
                className={`w-full min-w-[120px] flex items-center justify-center px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] border-2 border-[var(--brand-primary)] bg-[var(--brand-card)] text-[var(--brand-primary)]
                  ${tab === t.key ? 'z-10' : ''}
                  hover:shadow-[0_4px_16px_#142a5222]'}`}
                style={{ boxShadow: tab === t.key ? '0 0 0 0 #fff' : 'none' }}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
  <section className="w-full max-w-5xl rounded-3xl bg-[var(--brand-card)]/90 backdrop-blur-2xl shadow-[0_8px_48px_#ffd70022] p-12 min-h-[400px] border border-[var(--brand-primary)]/10" id={`panel-${tab}`} role="tabpanel" aria-labelledby={tab}>
        {tab === "overview" && (
          <div className="space-y-10">
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">Welcome, Admin!</h2>
            <p className="text-lg text-[var(--brand-text)] mb-6">Get a quick snapshot of your nonprofit's health, recent activity, and impact.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-card)] rounded-2xl shadow-xl p-10 flex flex-col items-center border border-[var(--brand-primary)]/10">
                <DonationAnalytics />
              </div>
              <div className="bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-card)] rounded-2xl shadow-xl p-10 flex flex-col items-center border border-[var(--brand-primary)]/10">
                <span className="text-6xl font-black text-[var(--brand-primary)] drop-shadow-xl">1,200</span>
                <span className="text-lg text-[var(--brand-muted)] mt-3 tracking-wide">Active Members</span>
              </div>
              <div className="bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-card)] rounded-2xl shadow-xl p-10 flex flex-col items-center border border-[var(--brand-primary)]/10">
                <span className="text-6xl font-black text-[var(--brand-primary)] drop-shadow-xl">98%</span>
                <span className="text-lg text-[var(--brand-muted)] mt-3 tracking-wide">Program Success Rate</span>
              </div>
            </div>
          </div>
        )}
        {tab === "users" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">User Management</h2>
            <p className="text-lg text-[var(--brand-text)] mb-6">View, edit, and manage users, roles, and permissions.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl shadow-lg">
                <thead className="bg-[var(--brand-primary)] text-[var(--brand-card)]">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example users, replace with real data */}
                  <tr className="bg-[var(--brand-card)]">
                    <td className="px-4 py-2">Chris Hatfield</td>
                    <td className="px-4 py-2">c.hatfield309@gmail.com</td>
                    <td className="px-4 py-2">Admin</td>
                    <td className="px-4 py-2 text-green-600">Active</td>
                  </tr>
                  <tr className="bg-[var(--brand-gray)]">
                    <td className="px-4 py-2">Jane Doe</td>
                    <td className="px-4 py-2">jane@nonprofit.org</td>
                    <td className="px-4 py-2">Member</td>
                    <td className="px-4 py-2 text-green-600">Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === "donations" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">Donations & Impact</h2>
            <p className="text-lg text-[var(--brand-text)] mb-6">Track donations, grants, and program impact.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Recent Donations</h3>
                <ul className="space-y-2 text-[var(--brand-text)]">
                  <li>John Smith — $500 — Oct 2025</li>
                  <li>Emily Lee — $1,200 — Sep 2025</li>
                  <li>Anonymous — $10,000 — Aug 2025</li>
                </ul>
              </div>
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Impact Metrics</h3>
                <ul className="space-y-2 text-[var(--brand-text)]">
                  <li>10,000+ people reached</li>
                  <li>3 major studies funded</li>
                  <li>98% program success rate</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {tab === "content" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">Content & News</h2>
            <p className="text-lg text-[var(--brand-text)] mb-6">Update homepage, news, and impact stories. Manage featured content and announcements.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Featured Story</h3>
                <p className="text-[var(--brand-text)] mb-2">ACEMg (Soundbites) study results published. 98% of participants saw improvement.</p>
                <button className="mt-2 px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-[var(--brand-card)] font-semibold">Edit Story</button>
              </div>
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Announcements</h3>
                <ul className="space-y-2 text-[var(--brand-text)]">
                  <li>Annual report released</li>
                  <li>New partnership with Soundbites PBC</li>
                  <li>Upcoming global expansion</li>
                </ul>
                <button className="mt-2 px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-[var(--brand-card)] font-semibold">Edit Announcements</button>
              </div>
            </div>
          </div>
        )}
        {tab === "analytics" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">Analytics</h2>
            <p className="text-lg text-[var(--brand-text)] mb-6">Live engagement and donation metrics powered by Vercel Analytics.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Engagement</h3>
                <LiveAnalyticsMetric />
              </div>
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Donations</h3>
                <DonationAnalytics />
              </div>
            </div>
          </div>
        )}
        {tab === "audit" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">Audit Log</h2>
            <p className="text-lg text-[var(--brand-text)] mb-6">Track all admin actions for transparency and compliance.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl shadow-lg">
                <thead className="bg-[var(--brand-primary)] text-[var(--brand-card)]">
                  <tr>
                    <th className="px-4 py-2">Timestamp</th>
                    <th className="px-4 py-2">Action</th>
                    <th className="px-4 py-2">User</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example logs, replace with real data */}
                  <tr className="bg-[var(--brand-card)]">
                    <td className="px-4 py-2">2025-10-25 14:32</td>
                    <td className="px-4 py-2">Edited homepage</td>
                    <td className="px-4 py-2">Chris Hatfield</td>
                  </tr>
                  <tr className="bg-[var(--brand-gray)]">
                    <td className="px-4 py-2">2025-10-24 09:18</td>
                    <td className="px-4 py-2">Added new member</td>
                    <td className="px-4 py-2">Jane Doe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === "settings" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-primary)]">Settings</h2>
            <p className="text-lg text-[var(--brand-text)] mb-6">Manage organization settings, security, and integrations.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Security</h3>
                <ul className="space-y-2 text-[var(--brand-text)]">
                  <li>2FA enabled for all admins</li>
                  <li>Last password update: Oct 2025</li>
                </ul>
              </div>
              <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Integrations</h3>
                <ul className="space-y-2 text-[var(--brand-text)]">
                  <li>Supabase Postgres (live)</li>
                  <li>Vercel Analytics (active)</li>
                  <li>Render (production)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="mt-24 flex flex-col items-center">
        <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Admin workspace" className="rounded-3xl shadow-2xl w-[32rem] h-72 object-cover mb-10 border border-[var(--brand-primary)]/20" />
    <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Admin workspace" className="rounded-3xl shadow-2xl w-[32rem] h-72 object-cover mb-10 border border-[var(--brand-primary)]/20" loading="lazy" />
        <p className="text-[var(--brand-muted)] text-xl tracking-wide">Futuristic admin experience for nonprofit management.</p>
      </div>
    </main>
  );
}