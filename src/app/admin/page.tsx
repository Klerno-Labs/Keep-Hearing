"use client";

import React, { useState, useEffect } from "react";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

type Donation = {
	id: number;
	name: string;
	amount: number;
	date: string;
};

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string | null;
};

type AnalyticsData = {
	userCount: number;
	activeUserCount: number;
	deletedUserCount: number;
	donationCount: number;
	totalAmount: number;
	averageDonation: number;
	recurringDonationCount: number;
	recurringPercentage: number;
	thisMonth: {
		total: number;
		count: number;
	};
	lastMonth: {
		total: number;
		count: number;
	};
	monthOverMonthGrowth: number;
	byProvider: Array<{
		provider: string;
		count: number;
		total: number;
	}>;
	recentDonorCount: number;
	topDonors: Array<{
		name: string;
		email: string;
		total: number;
		count: number;
	}>;
};

type AuditLog = {
	id: number;
	action: string;
	user: string;
	date: string;
};

type ContactSubmission = {
	id: string;
	name: string;
	email: string;
	subject: string | null;
	message: string;
	status: string;
	createdAt: string;
	updatedAt: string;
};

function LiveDonations() {
	const [total, setTotal] = useState<number | null>(null);
	const [donations, setDonations] = useState<Donation[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchDonations = React.useCallback(() => {
		setLoading(true);
		// Use combined endpoint to reduce API calls
		fetch("/api/admin/dashboard")
			.then(res => res.json())
			.then(data => {
				setTotal(data.total);
				setDonations(Array.isArray(data.donations) ? data.donations : []);
			})
			.catch(() => {
				setTotal(null);
				setDonations([]);
			})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchDonations();
	}, [fetchDonations]);

	// Auto-refresh with smart visibility detection
	useAutoRefresh(fetchDonations, 30000);
	return (
		<div>
			<div className="flex items-center gap-4 mb-6">
				<span className="text-4xl font-bold text-[var(--brand-primary)]">
					{loading ? "..." : total !== null && total !== undefined ? `$${total.toLocaleString()}` : "-"}
				</span>
				<span className="text-lg text-[var(--brand-muted)]">Total Donations</span>
			</div>
			<h3 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">Recent Donations</h3>
			<table className="min-w-full border rounded-xl shadow-lg mb-4">
				<thead className="bg-[var(--brand-primary)] text-[var(--brand-card)]">
					<tr>
						<th className="px-4 py-2 text-left">Name</th>
						<th className="px-4 py-2 text-left">Amount</th>
						<th className="px-4 py-2 text-left">Date</th>
					</tr>
				</thead>
				<tbody>
					{donations.length === 0 ? (
						<tr><td colSpan={3} className="px-4 py-4 text-center text-gray-400">No donations found.</td></tr>
					) : (
						donations.map((d) => (
							<tr key={d.id} className="bg-white">
								<td className="px-4 py-2">{d.name}</td>
								<td className="px-4 py-2">${d.amount.toLocaleString()}</td>
								<td className="px-4 py-2">{d.date}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

function UserManagement() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [editing, setEditing] = useState<string | null>(null);
	const [newUser, setNewUser] = useState<Partial<User> & { password?: string }>({ id: "", name: "", email: "", role: "STAFF", password: "" });
	const [error, setError] = useState<string>("");
	const [showDeleted, setShowDeleted] = useState<boolean>(false);
	const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

	// Function to fetch users
	const fetchUsers = React.useCallback(() => {
		setLoading(true);
		const url = showDeleted ? "/api/users?show_deleted=true" : "/api/users";
		fetch(url)
			.then(res => res.json())
			.then(data => setUsers(data.users || []))
			.catch(err => setError("Failed to load users"))
			.finally(() => setLoading(false));
	}, [showDeleted]);

	// Initial load
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	// Auto-refresh with smart visibility detection (only if autoRefresh is enabled)
	useEffect(() => {
		if (!autoRefresh) return;

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				fetchUsers();
			}
		};

		const interval = setInterval(() => {
			if (document.visibilityState === 'visible') {
				fetchUsers();
			}
		}, 30000);

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			clearInterval(interval);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [autoRefresh, fetchUsers]);
	function handleEditUser(id: string) {
		setEditing(id);
		const user = users.find(u => u.id === id);
		if (user) setNewUser({ ...user, password: "" });
		setError("");
	}

	function handleCancelEdit() {
		setEditing(null);
		setNewUser({ id: "", name: "", email: "", role: "STAFF", password: "" });
		setError("");
	}
	async function handleAddOrSaveUser(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (editing) {
				// Update user - only send password if it's not empty
				const updateData: any = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
				if (newUser.password && newUser.password.trim() !== "") {
					updateData.password = newUser.password;
				}

				const res = await fetch("/api/users", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updateData)
				});

				const data = await res.json();
				if (!res.ok) {
					setError(data.error || "Failed to update user");
					setLoading(false);
					return;
				}

				setUsers(users.map(u => u.id === editing ? data.user : u));
			} else {
				// Create new user
				if (!newUser.password || newUser.password.trim() === "") {
					setError("Password is required for new users");
					setLoading(false);
					return;
				}

				const res = await fetch("/api/users", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newUser)
				});

				const data = await res.json();
				if (!res.ok) {
					setError(data.error || "Failed to create user");
					setLoading(false);
					return;
				}

				setUsers([...users, data.user]);
			}
			handleCancelEdit();
		} catch (err) {
			setError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	async function handleDeleteUser(id: string) {
		if (!confirm("Are you sure you want to delete this user? This can be undone from the trash.")) return;

		setLoading(true);
		setError("");

		try {
			const res = await fetch("/api/users", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id })
			});

			const data = await res.json();
			if (!res.ok) {
				setError(data.error || "Failed to delete user");
				setLoading(false);
				return;
			}

			// Refresh users list
			fetchUsers();
		} catch (err) {
			setError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	async function handleRestoreUser(id: string) {
		if (!confirm("Restore this user?")) return;

		setLoading(true);
		setError("");

		try {
			const res = await fetch("/api/users", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id })
			});

			const data = await res.json();
			if (!res.ok) {
				setError(data.error || "Failed to restore user");
				setLoading(false);
				return;
			}

			// Refresh users list
			fetchUsers();
		} catch (err) {
			setError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	const filteredUsers = users.filter(u =>
		(u.name || '').toLowerCase().includes(search.toLowerCase()) ||
		(u.email || '').toLowerCase().includes(search.toLowerCase())
	);
	return (
		<div className="bg-white rounded-2xl shadow-xl p-8 border border-[var(--brand-primary)]/10">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-[var(--brand-primary)]">User Management</h2>
				<div className="flex gap-4 items-center">
					<label className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={autoRefresh}
							onChange={(e) => setAutoRefresh(e.target.checked)}
							className="rounded"
						/>
						Auto-refresh (30s)
					</label>
					<label className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={showDeleted}
							onChange={(e) => setShowDeleted(e.target.checked)}
							className="rounded"
						/>
						Show Deleted
					</label>
					<button
						onClick={fetchUsers}
						disabled={loading}
						className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50"
					>
						🔄 Refresh
					</button>
				</div>
			</div>
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
				<input
					type="text"
					className="border rounded-lg px-4 py-2 w-full md:w-1/3"
					placeholder="Search users by name or email..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<form className="flex gap-2" onSubmit={handleAddOrSaveUser}>
					<input
						type="text"
						className="border rounded-lg px-2 py-1"
						placeholder="Name"
						value={newUser.name}
						onChange={e => setNewUser({ ...newUser, name: e.target.value })}
						disabled={loading}
						required
					/>
					<input
						type="email"
						className="border rounded-lg px-2 py-1"
						placeholder="Email"
						value={newUser.email}
						onChange={e => setNewUser({ ...newUser, email: e.target.value })}
						disabled={loading}
						required
					/>
					<input
						type="password"
						className="border rounded-lg px-2 py-1"
						placeholder={editing ? "New Password (optional)" : "Password"}
						value={newUser.password || ""}
						onChange={e => setNewUser({ ...newUser, password: e.target.value })}
						required={!editing}
						disabled={loading}
					/>
					<select
						className="border rounded-lg px-2 py-1"
						value={newUser.role}
						onChange={e => setNewUser({ ...newUser, role: e.target.value })}
						required
						disabled={loading}
					>
						<option value="STAFF">Staff</option>
						<option value="ADMIN">Admin</option>
						<option value="SUPERADMIN">Super Admin</option>
					</select>
					<button type="submit" className="bg-[var(--brand-primary)] text-white rounded-lg px-4 py-1 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
						{editing ? (loading ? "Saving..." : "Save") : (loading ? "Adding..." : "Add")}
					</button>
					{editing && (
						<button type="button" className="bg-gray-300 text-gray-700 rounded-lg px-4 py-1 font-semibold" onClick={handleCancelEdit} disabled={loading}>
							Cancel
						</button>
					)}
				</form>
			</div>
			<table className="min-w-full border rounded-xl shadow-lg">
				<thead className="bg-[var(--brand-primary)] text-[var(--brand-card)]">
					<tr>
						<th className="px-4 py-2 text-left">Name</th>
						<th className="px-4 py-2 text-left">Email</th>
						<th className="px-4 py-2 text-left">Role</th>
						<th className="px-4 py-2 text-left">Created</th>
						<th className="px-4 py-2 text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr><td colSpan={5} className="px-4 py-4 text-center text-gray-400">Loading...</td></tr>
					) : filteredUsers.length === 0 ? (
						<tr><td colSpan={5} className="px-4 py-4 text-center text-gray-400">No users found.</td></tr>
					) : (
						filteredUsers.map(user => (
							<tr key={user.id} className={`border-b hover:bg-gray-50 ${user.deletedAt ? 'bg-red-50' : 'bg-white'}`}>
								<td className="px-4 py-2">
									{user.name}
									{user.deletedAt && (
										<span className="ml-2 text-xs text-red-600 font-semibold">[DELETED]</span>
									)}
								</td>
								<td className="px-4 py-2">{user.email}</td>
								<td className="px-4 py-2">
									<span className={`px-2 py-1 rounded text-xs font-semibold ${
										user.role === 'SUPERADMIN' ? 'bg-purple-100 text-purple-800' :
										user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
										'bg-gray-100 text-gray-800'
									}`}>
										{user.role}
									</span>
								</td>
								<td className="px-4 py-2 text-sm text-gray-600">
									{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
								</td>
								<td className="px-4 py-2 flex gap-2">
									{user.deletedAt ? (
										<button
											className="bg-green-500 text-blue-900 rounded px-3 py-1 text-sm hover:opacity-80 transition-opacity"
											onClick={() => handleRestoreUser(user.id)}
											disabled={loading}
										>
											Restore
										</button>
									) : (
										<>
											<button
												className="bg-[var(--brand-primary)] text-white rounded px-3 py-1 text-sm hover:opacity-80 transition-opacity"
												onClick={() => handleEditUser(user.id)}
												disabled={loading}
											>
												Edit
											</button>
											<button
												className="bg-red-500 text-white rounded px-3 py-1 text-sm hover:opacity-80 transition-opacity"
												onClick={() => handleDeleteUser(user.id)}
												disabled={loading}
											>
												Delete
											</button>
										</>
									)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

function AnalyticsLive() {
	const [data, setData] = useState<AnalyticsData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchAnalytics = React.useCallback(() => {
		setLoading(true);
		fetch("/api/analytics")
			.then(res => res.json())
			.then(setData)
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchAnalytics();
	}, [fetchAnalytics]);

	// Auto-refresh with smart visibility detection
	useAutoRefresh(fetchAnalytics, 30000);

	if (loading) {
		return (
			<div className="bg-white rounded-2xl shadow-xl p-8 border border-[var(--brand-primary)]/10">
				<div className="text-center text-gray-400">Loading analytics...</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="bg-white rounded-2xl shadow-xl p-8 border border-[var(--brand-primary)]/10">
				<div className="text-center text-gray-400">No analytics data available</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-white rounded-2xl shadow-xl p-6 border border-[var(--brand-primary)]/10">
				<h3 className="text-2xl font-bold text-[var(--brand-primary)]">Nonprofit Analytics Dashboard</h3>
				<p className="text-gray-600 text-sm mt-1">Comprehensive insights for your organization</p>
			</div>

			{/* Key Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* Total Raised */}
				<div className="bg-green-50 rounded-xl shadow-lg p-6 border border-green-200">
					<div className="text-green-600 text-sm font-semibold uppercase tracking-wide">Total Raised</div>
					<div className="text-3xl font-bold text-green-900 mt-2">${data.totalAmount.toLocaleString()}</div>
					<div className="text-green-700 text-xs mt-1">{data.donationCount} donations</div>
				</div>

				{/* Average Donation */}
				<div className="bg-blue-50 rounded-xl shadow-lg p-6 border border-blue-200">
					<div className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Avg Donation</div>
					<div className="text-3xl font-bold text-blue-900 mt-2">${data.averageDonation.toFixed(2)}</div>
					<div className="text-blue-700 text-xs mt-1">per donor</div>
				</div>

				{/* Active Users */}
				<div className="bg-purple-50 rounded-xl shadow-lg p-6 border border-purple-200">
					<div className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Active Users</div>
					<div className="text-3xl font-bold text-purple-900 mt-2">{data.activeUserCount}</div>
					<div className="text-purple-700 text-xs mt-1">of {data.userCount} total</div>
				</div>

				{/* Recent Donors */}
				<div className="bg-orange-50 rounded-xl shadow-lg p-6 border border-orange-200">
					<div className="text-orange-600 text-sm font-semibold uppercase tracking-wide">Recent Donors</div>
					<div className="text-3xl font-bold text-orange-900 mt-2">{data.recentDonorCount}</div>
					<div className="text-orange-700 text-xs mt-1">last 30 days</div>
				</div>
			</div>

			{/* Month Comparison */}
			<div className="bg-white rounded-2xl shadow-xl p-6 border border-[var(--brand-primary)]/10">
				<h4 className="text-xl font-bold text-[var(--brand-primary)] mb-4">Monthly Performance</h4>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* This Month */}
					<div className="bg-gray-50 rounded-lg p-4">
						<div className="text-gray-600 text-sm font-semibold">This Month</div>
						<div className="text-2xl font-bold text-gray-900 mt-1">${data.thisMonth.total.toLocaleString()}</div>
						<div className="text-gray-600 text-xs mt-1">{data.thisMonth.count} donations</div>
					</div>

					{/* Last Month */}
					<div className="bg-gray-50 rounded-lg p-4">
						<div className="text-gray-600 text-sm font-semibold">Last Month</div>
						<div className="text-2xl font-bold text-gray-900 mt-1">${data.lastMonth.total.toLocaleString()}</div>
						<div className="text-gray-600 text-xs mt-1">{data.lastMonth.count} donations</div>
					</div>

					{/* Growth */}
					<div className="bg-gray-50 rounded-lg p-4">
						<div className="text-gray-600 text-sm font-semibold">Growth</div>
						<div className={`text-2xl font-bold mt-1 ${data.monthOverMonthGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
							{data.monthOverMonthGrowth >= 0 ? '+' : ''}{data.monthOverMonthGrowth.toFixed(1)}%
						</div>
						<div className="text-gray-600 text-xs mt-1">month-over-month</div>
					</div>
				</div>
			</div>

			{/* Recurring Donations */}
			<div className="bg-white rounded-2xl shadow-xl p-6 border border-[var(--brand-primary)]/10">
				<h4 className="text-xl font-bold text-[var(--brand-primary)] mb-4">Recurring Donations</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<div className="text-gray-600 text-sm">Total Recurring Donations</div>
						<div className="text-3xl font-bold text-gray-900 mt-2">{data.recurringDonationCount}</div>
					</div>
					<div>
						<div className="text-gray-600 text-sm">Recurring Percentage</div>
						<div className="text-3xl font-bold text-gray-900 mt-2">{data.recurringPercentage?.toFixed(1) ?? '0'}%</div>
						<div className="w-full bg-gray-200 rounded-full h-2 mt-3">
							<div
								className="bg-[var(--brand-primary)] h-2 rounded-full transition-all duration-500"
								style={{ width: `${Math.min(data.recurringPercentage ?? 0, 100)}%` }}
							></div>
						</div>
					</div>
				</div>
			</div>

			{/* Payment Providers */}
			<div className="bg-white rounded-2xl shadow-xl p-6 border border-[var(--brand-primary)]/10">
				<h4 className="text-xl font-bold text-[var(--brand-primary)] mb-4">Payment Providers</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{data.byProvider.map(provider => (
						<div key={provider.provider} className="bg-gray-50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<div className="text-lg font-bold text-gray-900">{provider.provider}</div>
								<div className="text-sm text-gray-600">{provider.count} donations</div>
							</div>
							<div className="text-2xl font-bold text-[var(--brand-primary)]">
								${provider.total.toLocaleString()}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Top Donors */}
			<div className="bg-white rounded-2xl shadow-xl p-6 border border-[var(--brand-primary)]/10">
				<h4 className="text-xl font-bold text-[var(--brand-primary)] mb-4">Top 5 Donors</h4>
				{data.topDonors.length === 0 ? (
					<div className="text-gray-400 text-center py-4">No donor data available</div>
				) : (
					<div className="space-y-3">
						{data.topDonors.map((donor, index) => (
							<div key={donor.email} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
								<div className="flex items-center gap-4">
									<div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold">
										{index + 1}
									</div>
									<div>
										<div className="font-semibold text-gray-900">{donor.name}</div>
										<div className="text-sm text-gray-600">{donor.email}</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-xl font-bold text-[var(--brand-primary)]">
										${donor.total.toLocaleString()}
									</div>
									<div className="text-xs text-gray-600">{donor.count} donations</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function AuditLogLive() {
	const [logs, setLogs] = useState<AuditLog[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchAuditLogs = React.useCallback(() => {
		setLoading(true);
		fetch("/api/audit")
			.then(res => res.json())
			.then(data => setLogs(data.logs || []))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchAuditLogs();
	}, [fetchAuditLogs]);

	// Auto-refresh with smart visibility detection
	useAutoRefresh(fetchAuditLogs, 30000);
	return (
		<div className="bg-white rounded-2xl shadow-xl p-8 border border-[var(--brand-primary)]/10">
			<h3 className="text-xl font-bold mb-4 text-[var(--brand-primary)]">Audit Log</h3>
			{loading ? <div>Loading...</div> : logs.length === 0 ? (
				<div className="text-gray-400">No audit log entries found.</div>
			) : (
				<ul className="space-y-2">
					{logs.map(log => (
						<li key={log.id} className="bg-gray-50 rounded p-2">
							<span className="font-semibold">{log.action}</span> by {log.user} on {log.date}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function ContactSubmissions() {
	const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [filter, setFilter] = useState<string>("all");
	const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
	const [error, setError] = useState<string>("");

	const fetchSubmissions = React.useCallback(() => {
		setLoading(true);
		const url = filter !== "all" ? `/api/admin/contact-submissions?status=${filter}` : "/api/admin/contact-submissions";
		fetch(url)
			.then(res => res.json())
			.then(data => setSubmissions(data.submissions || []))
			.catch(() => setError("Failed to load contact submissions"))
			.finally(() => setLoading(false));
	}, [filter]);

	useEffect(() => {
		fetchSubmissions();
	}, [fetchSubmissions]);

	// Auto-refresh with smart visibility detection
	useAutoRefresh(fetchSubmissions, 30000);

	async function handleUpdateStatus(id: string, status: string) {
		setError("");
		try {
			const res = await fetch("/api/admin/contact-submissions", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, status }),
			});

			if (!res.ok) {
				const data = await res.json();
				setError(data.error || "Failed to update status");
				return;
			}

			// Update local state
			setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s));
			if (selectedSubmission?.id === id) {
				setSelectedSubmission({ ...selectedSubmission, status });
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
		}
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "new": return "bg-blue-100 text-blue-800";
			case "read": return "bg-green-100 text-green-800";
			case "archived": return "bg-gray-100 text-gray-800";
			default: return "bg-gray-100 text-gray-800";
		}
	};

	const filteredSubmissions = filter === "all"
		? submissions
		: submissions.filter(s => s.status === filter);

	return (
		<div className="bg-white rounded-2xl shadow-xl p-8 border border-[var(--brand-primary)]/10">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-[var(--brand-primary)]">Contact Submissions</h2>
				<div className="flex gap-4 items-center">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="border rounded-lg px-4 py-2"
					>
						<option value="all">All Submissions</option>
						<option value="new">New</option>
						<option value="read">Read</option>
						<option value="archived">Archived</option>
					</select>
					<button
						onClick={fetchSubmissions}
						disabled={loading}
						className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50"
					>
						🔄 Refresh
					</button>
				</div>
			</div>

			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Submissions List */}
				<div className="space-y-3 max-h-[600px] overflow-y-auto">
					{loading ? (
						<div className="text-center text-gray-400 py-8">Loading...</div>
					) : filteredSubmissions.length === 0 ? (
						<div className="text-center text-gray-400 py-8">No submissions found.</div>
					) : (
						filteredSubmissions.map(submission => (
							<div
								key={submission.id}
								className={`p-4 border rounded-lg cursor-pointer transition-all ${
									selectedSubmission?.id === submission.id
										? "border-[var(--brand-primary)] bg-blue-50"
										: "border-gray-200 hover:border-[var(--brand-primary)] hover:bg-gray-50"
								}`}
								onClick={() => setSelectedSubmission(submission)}
							>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h4 className="font-bold text-gray-900">{submission.name}</h4>
										<p className="text-sm text-gray-600">{submission.email}</p>
									</div>
									<span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(submission.status)}`}>
										{submission.status.toUpperCase()}
									</span>
								</div>
								<p className="text-sm text-gray-700 font-medium mb-1">
									{submission.subject || "No subject"}
								</p>
								<p className="text-xs text-gray-500 line-clamp-2">{submission.message}</p>
								<p className="text-xs text-gray-400 mt-2">
									{new Date(submission.createdAt).toLocaleString()}
								</p>
							</div>
						))
					)}
				</div>

				{/* Submission Detail */}
				<div className="border rounded-lg p-6 bg-gray-50 sticky top-4">
					{selectedSubmission ? (
						<div>
							<div className="flex justify-between items-start mb-4">
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-1">{selectedSubmission.name}</h3>
									<a href={`mailto:${selectedSubmission.email}`} className="text-[var(--brand-primary)] hover:underline">
										{selectedSubmission.email}
									</a>
								</div>
								<span className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(selectedSubmission.status)}`}>
									{selectedSubmission.status.toUpperCase()}
								</span>
							</div>

							<div className="mb-4">
								<h4 className="text-sm font-semibold text-gray-600 mb-1">Subject:</h4>
								<p className="text-gray-900">{selectedSubmission.subject || "No subject"}</p>
							</div>

							<div className="mb-4">
								<h4 className="text-sm font-semibold text-gray-600 mb-1">Message:</h4>
								<div className="bg-white p-4 rounded border border-gray-200 whitespace-pre-wrap">
									{selectedSubmission.message}
								</div>
							</div>

							<div className="mb-4 text-xs text-gray-500">
								<p>Received: {new Date(selectedSubmission.createdAt).toLocaleString()}</p>
								<p>Updated: {new Date(selectedSubmission.updatedAt).toLocaleString()}</p>
							</div>

							<div className="flex gap-2 pt-4 border-t">
								{selectedSubmission.status === "new" && (
									<button
										onClick={() => handleUpdateStatus(selectedSubmission.id, "read")}
										className="flex-1 bg-green-500 text-white rounded px-4 py-2 font-semibold hover:opacity-80 transition-opacity"
									>
										Mark as Read
									</button>
								)}
								{selectedSubmission.status !== "archived" && (
									<button
										onClick={() => handleUpdateStatus(selectedSubmission.id, "archived")}
										className="flex-1 bg-gray-500 text-white rounded px-4 py-2 font-semibold hover:opacity-80 transition-opacity"
									>
										Archive
									</button>
								)}
								{selectedSubmission.status === "archived" && (
									<button
										onClick={() => handleUpdateStatus(selectedSubmission.id, "new")}
										className="flex-1 bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:opacity-80 transition-opacity"
									>
										Restore to New
									</button>
								)}
								<a
									href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject || "Your message"}`}
									className="flex-1 bg-[var(--brand-primary)] text-white rounded px-4 py-2 font-semibold hover:opacity-80 transition-opacity text-center"
								>
									Reply via Email
								</a>
							</div>
						</div>
					) : (
						<div className="text-center text-gray-400 py-8">
							Select a submission to view details
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default function AdminDashboard() {
	const [tab, setTab] = useState<string>("users");
	return (
		<main className="min-h-screen bg-[var(--brand-bg)] pt-8">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex gap-2 mb-8 overflow-x-auto">
					<button
						className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors duration-150 whitespace-nowrap ${tab === "users" ? "bg-[var(--brand-primary)] text-white" : "bg-white text-[var(--brand-primary)]"}`}
						onClick={() => setTab("users")}
					>Users</button>
					<button
						className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors duration-150 whitespace-nowrap ${tab === "donations" ? "bg-[var(--brand-primary)] text-white" : "bg-white text-[var(--brand-primary)]"}`}
						onClick={() => setTab("donations")}
					>Donations</button>
					<button
						className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors duration-150 whitespace-nowrap ${tab === "analytics" ? "bg-[var(--brand-primary)] text-white" : "bg-white text-[var(--brand-primary)]"}`}
						onClick={() => setTab("analytics")}
					>Analytics</button>
					<button
						className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors duration-150 whitespace-nowrap ${tab === "contact" ? "bg-[var(--brand-primary)] text-white" : "bg-white text-[var(--brand-primary)]"}`}
						onClick={() => setTab("contact")}
					>Contact</button>
					<button
						className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors duration-150 whitespace-nowrap ${tab === "audit" ? "bg-[var(--brand-primary)] text-white" : "bg-white text-[var(--brand-primary)]"}`}
						onClick={() => setTab("audit")}
					>Audit</button>
				</div>
				<section className="mt-2">
					{tab === "users" && <UserManagement />}
					{tab === "donations" && <LiveDonations />}
					{tab === "analytics" && <AnalyticsLive />}
					{tab === "contact" && <ContactSubmissions />}
					{tab === "audit" && <AuditLogLive />}
				</section>
			</div>
		</main>
	);
}
