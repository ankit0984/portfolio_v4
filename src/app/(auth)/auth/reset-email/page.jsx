// import ResetEmail from '@/components/reset-email';
// import React from 'react'

// export default function page() {
//   return (
// 		<div className='flex min-h-screen items-center justify-center bg-gradient-to-l from-stone-500 via-neutral-400 to-gray-500'>
// 			<ResetEmail />
// 		</div>
// 	);
// }
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PasswordResetForm from "@/components/authComponent/reset-email/reset-email";

export default function ForgotPasswordPage() {
	return (
		<main className='min-h-dvh bg-gradient-to-l from-stone-500 via-neutral-400 to-gray-500'>
			<section className='mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 py-12'>
				<Card className='w-full border-border/80 shadow-sm'>
					<CardHeader className='space-y-2'>
						<CardTitle className={cn("text-pretty text-xl")}>
							Forgot Your Password?
						</CardTitle>
						<p className='text-sm text-muted-foreground'>
							Enter your email address and we&apos;ll send you a link to reset
							your password.
						</p>
					</CardHeader>
					<CardContent>
						<PasswordResetForm />
					</CardContent>
				</Card>

				<p className='mt-6 text-center text-xs text-muted-foreground'>
					For your security, we never disclose whether an email is registered.
				</p>
			</section>
		</main>
	);
}
