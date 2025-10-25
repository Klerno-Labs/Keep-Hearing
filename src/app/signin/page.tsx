
export default function SignInPage() {
	return (
		<main className="min-h-screen py-20 flex flex-col items-center bg-[var(--brand-bg)]">
			<section className="rounded-2xl bg-white shadow-xl p-12 flex flex-col items-center transition-all duration-300 w-full max-w-lg">
				<h1 className="text-4xl font-extrabold mb-8 text-center" style={{ color: '#1a73e8', letterSpacing: '-0.03em' }}>
					Sign In
				</h1>
				<form className="space-y-6 w-full">
					<input type="email" name="email" placeholder="Email" className="w-full border rounded-xl px-4 py-3 text-lg" required />
					<input type="password" name="password" placeholder="Password" className="w-full border rounded-xl px-4 py-3 text-lg" required />
					<button type="submit" className="w-full px-8 py-3 rounded-xl bg-[#1a73e8] text-white font-semibold shadow-lg hover:bg-[#0052cc] transition">Sign In</button>
				</form>
				<div className="mt-6 text-gray-500 text-base text-center">
					<a href="#" className="text-[var(--brand-primary)] hover:underline">Forgot password?</a>
				</div>
			</section>
			<div className="mt-20 flex flex-col items-center">
				<img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Sign in" className="rounded-2xl shadow-xl w-80 h-52 object-cover mb-8" />
				<p className="text-gray-500 text-lg">Secure access for nonprofit team and supporters.</p>
			</div>
		</main>
	);
}


