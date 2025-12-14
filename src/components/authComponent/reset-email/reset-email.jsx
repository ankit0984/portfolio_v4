"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

function isValidEmail(value) {
	// Simple RFC 5322-inspired, user-friendly check
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function PasswordResetForm() {
	const [formData, setFormData] = React.useState({
		email: "",
	});
	const [error, setError] = React.useState(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [isSent, setIsSent] = React.useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (!isValidEmail(formData.email)) {
			setError("Please enter a valid email address.");
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await axios.post("/api/auth/resetemail", {
				email: formData.email,
			});
			if (res.data.success) {
				setIsSent(true);
			}
		} catch (err) {
			setError(
				err.response?.data?.message ||
					"Password reset email failed. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	if (isSent) {
		return (
			<div
				className="rounded-lg border border-border/80 bg-card p-4 text-sm"
				role="status"
				aria-live="polite"
			>
				<div className="mb-2 flex items-center gap-2">
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="h-5 w-5 text-primary"
						focusable="false"
					>
						<path
							d="M9 12.75l2 2 4-4.5"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<circle
							cx="12"
							cy="12"
							r="9"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.2"
							opacity="0.3"
						/>
					</svg>
					<span className="font-medium">Check your inbox</span>
				</div>
				<p className="text-muted-foreground">
					If an account exists for{" "}
					<span className="font-medium text-foreground">{formData.email}</span>, 
					we&apos;ve sent a password reset link. It may take a minute to arrive.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} noValidate className="space-y-4">
			{error && (
				<div className="bg-red-50 text-red-600 text-sm p-3 rounded">
					{error}
				</div>
			)}
			<div className="space-y-2">
				<Label htmlFor="email">Email address</Label>
				<Input
					id="email"
					type="email"
					inputMode="email"
					autoComplete="email"
					placeholder="you@example.com"
					value={formData.email}
					onChange={handleChange}
					onBlur={() => {
						if (formData.email && !isValidEmail(formData.email))
							setError("Please enter a valid email address.");
					}}
					aria-describedby="email-help email-error"
					aria-invalid={Boolean(error) || undefined}
					className="transition-shadow focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-ring/40"
				/>
				<p id="email-help" className="text-xs text-muted-foreground">
					We&apos;ll email you a secure link to reset your password.
				</p>
				{error ? (
					<p
						id="email-error"
						className="text-xs font-medium text-destructive"
						role="alert"
						aria-live="polite"
					>
						{error}
					</p>
				) : (
					<span id="email-error" className="sr-only"></span>
				)}
			</div>

			<div className="pt-2">
				<Button
					type="submit"
					disabled={isSubmitting || !formData.email}
					className="w-full select-none transition-all duration-200 disabled:opacity-60 hover:shadow-sm active:scale-[.99]"
				>
					{isSubmitting ? (
						<span className="inline-flex items-center gap-2">
							<svg
								className="h-4 w-4 animate-spin"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
								/>
							</svg>
							Sending…
						</span>
					) : (
						"Send Reset Link"
					)}
				</Button>
			</div>
		</form>
	);
}
