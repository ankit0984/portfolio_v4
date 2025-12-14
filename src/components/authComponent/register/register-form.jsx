"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function RegisterForm({ className, ...props }) {
	const router = useRouter();
	const [formData, setFormData] = React.useState({
		email: "",
		username: "",
		full_name: "",
		password: "",
	});
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await axios.post("/api/auth/register", {
				email: formData.email,
				username: formData.username,
				full_name: formData.full_name,
				password: formData.password,
			});

			if (res.data.success) {
				router.push("/verify-email"); // Redirect to profile page after successful login
			}
		} catch (error) {
			setError(
				error.response?.data?.message || "Signup failed. Please try again."
			);
			router.refresh();
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>SignUp to your account</h1>
				<p className='text-muted-foreground text-sm text-balance'>
					Enter your details below to SignUp to your account
				</p>
			</div>
			{error && (
				<div className='bg-red-50 text-red-600 text-sm p-3 rounded'>
					{error}
				</div>
			)}
			<div className='grid gap-6'>
				<div className='grid gap-3'>
					<Label htmlFor='email'>Email</Label>
					<Input
						id='email'
						type='email'
						placeholder='m@example.com'
						required
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						type='username'
						placeholder='example@04'
						required
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='full_name'>Full Name</Label>
					<Input
						id='full_name'
						type='text'
						placeholder='antonio'
						required
						value={formData.full_name}
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						type='password'
						required
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<Button type='submit' className='w-full' disabled={loading}>
					{loading ? "Signing up..." : "Signup"}
				</Button>
			</div>
			<div className='text-center text-sm'>
				Have an account?{" "}
				<a href='/login' className='underline underline-offset-4'>
					Login
				</a>
			</div>
		</form>
	);
}
