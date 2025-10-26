

"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [csrfToken, setCsrfToken] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		await signIn("credentials", {
			email,
			password,
			redirect: true,
			callbackUrl: "/admin",
			csrfToken
		}, {
			headers: { 'x-csrf-token': csrfToken }
		});
		setLoading(false);
	};

	useEffect(() => {
		const errorParam = searchParams.get("error");
		if (errorParam === "CredentialsSignin") {
			setError("Invalid email or password");
		}
	}, [searchParams]);

	useEffect(() => {
		// Fetch CSRF token from API
		fetch("/api/csrf-token")
			.then(res => res.json())
			.then(data => setCsrfToken(data.token));
	}, []);

	return (
		<main className="min-h-screen py-20 flex flex-col items-center bg-[var(--brand-bg)]">
			<section className="rounded-2xl bg-[var(--brand-card)] shadow-xl p-12 flex flex-col items-center transition-all duration-300 w-full max-w-lg">
				<h1 className="text-4xl font-extrabold mb-8 text-center" style={{ color: '#1a73e8', letterSpacing: '-0.03em' }}>
					Sign In
				</h1>
				<form className="space-y-6 w-full" onSubmit={handleSubmit}>
					<input type="hidden" name="csrfToken" value={csrfToken} />
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="w-full border rounded-xl px-4 py-3 text-lg"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
						disabled={loading}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full border rounded-xl px-4 py-3 text-lg"
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
						disabled={loading}
					/>
					<button
						type="submit"
						className="w-full px-8 py-3 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-card)] font-semibold shadow-lg hover:bg-[var(--brand-accent-soft)] transition"
						disabled={loading}
					>
						{loading ? "Signing In..." : "Sign In"}
					</button>
				</form>
				{error && <div className="mt-4 text-red-500 text-center">{error}</div>}
			<div className="mt-6 text-[var(--brand-muted)] text-base text-center">
					<a href="#" className="text-[var(--brand-primary)] hover:underline">Forgot password?</a>
				</div>
			</section>
			<div className="mt-20 flex flex-col items-center">
				<img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Sign in" className="rounded-2xl shadow-xl w-80 h-52 object-cover mb-8" />
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Sign in" className="rounded-2xl shadow-xl w-80 h-52 object-cover mb-8" loading="lazy" />
			<p className="text-[var(--brand-muted)] text-lg">Secure access for nonprofit team and supporters.</p>
			</div>
		</main>
	);
}


