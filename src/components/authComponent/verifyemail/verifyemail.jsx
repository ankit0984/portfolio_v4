"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token"); // decoded automatically
	const router = useRouter();

	const [status, setStatus] = useState("idle"); // idle | loading | success | error
	const [message, setMessage] = useState("");

	const handleVerify = async () => {
		if (!token) {
			alert("Invalid verification link.");
			return;
		}

		setStatus("loading");

		try {
			const res = await fetch("/api/auth/verifyemail", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token }),
			});

			const data = await res.json();

			if (!res.ok) {
				setStatus("error");
				setMessage(data.error || "Verification failed.");
				alert(data.error || "Verification failed.");
			} else {
				setStatus("success");
				setMessage(data.message || "Email verified successfully!");
				alert("✅ Email verified successfully!");
				router.push("/login"); // redirect after success
			}
		} catch (err) {
			setStatus("error");
			setMessage("Something went wrong.");
			alert("Something went wrong. Please try again.");
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50'>
			<div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center'>
				{status === "idle" && (
					<div className='flex flex-col items-center gap-4'>
						<h2 className='text-xl font-semibold'>Verify Your Email</h2>
						<p className='text-gray-500 text-sm'>
							Click the button below to verify your email address.
						</p>
						<button
							onClick={handleVerify}
							className='mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition'
						>
							Verify Email
						</button>
					</div>
				)}

				{status === "loading" && (
					<div className='flex flex-col items-center gap-4'>
						<Loader2 className='h-10 w-10 animate-spin text-indigo-600' />
						<h2 className='text-xl font-semibold'>Verifying...</h2>
						<p className='text-gray-500 text-sm'>Please wait a moment</p>
					</div>
				)}

				{status === "success" && (
					<div className='flex flex-col items-center gap-4'>
						<CheckCircle2 className='h-12 w-12 text-green-500' />
						<h2 className='text-xl font-semibold'>{message}</h2>
					</div>
				)}

				{status === "error" && (
					<div className='flex flex-col items-center gap-4'>
						<XCircle className='h-12 w-12 text-red-500' />
						<h2 className='text-xl font-semibold'>Verification Failed</h2>
						<p className='text-gray-500 text-sm'>{message}</p>
						<button
							onClick={handleVerify}
							className='mt-4 rounded-xl bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-600 transition'
						>
							Retry
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
