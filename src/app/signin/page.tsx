"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function SignInForm() {
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
		try {
			const result: any = await signIn("credentials", {
				email,
				password,
				redirect: true,
				callbackUrl: "/admin",
				csrfToken
			}, {
				headers: { 'x-csrf-token': csrfToken }
			});
			console.log("signIn result:", result);
			if (result?.error) {
				setError(result.error);
			}
		} catch (err) {
			console.error("SignIn error:", err);
			setError("Sign-in failed. See console for details.");
		}
		setLoading(false);
	};

	useEffect(() => {
		const errorParam = searchParams.get("error");
		if (errorParam === "CredentialsSignin") {
			setError("Invalid email or password");
		} else if (errorParam === "unauthorized") {
			setError("Please sign in to access this page");
		} else if (errorParam === "forbidden") {
			setError("You do not have permission to access this page");
		}
	}, [searchParams]);

	useEffect(() => {
		// Fetch CSRF token from API
		fetch("/api/csrf-token")
			.then(res => res.json())
			.then(data => setCsrfToken(data.csrfToken))
			.catch(() => setCsrfToken(""));
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<div className="flex justify-center mb-6">
						<img
							src="/images/logo.png"
							alt="Keep Hearing Logo"
							className="h-32 w-32 object-contain"
						/>
					</div>
					<h2 className="text-3xl font-bold text-brand-primary">
						Admin Sign In
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Access the Keep Hearing admin dashboard
					</p>
				</div>

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
							{error}
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
								placeholder="admin@example.com"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
								placeholder="Enter your password"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-blue-900 bg-brand-primary hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Signing in..." : "Sign in"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default function SignInPage() {
	return (
		<Suspense fallback={
			<div className="min-h-screen flex items-center justify-center bg-blue-50">
				<div className="text-center">
					<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		}>
			<SignInForm />
		</Suspense>
	);
}
