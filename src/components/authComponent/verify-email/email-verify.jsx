'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function EmailVerificationCard() {
	return (
		<Card className='w-full max-w-md text-center border-border bg-card shadow-lg'>
			<CardHeader className='space-y-4'>
				<DotLottieReact src='Email-verification.lottie' loop autoplay height={130} width={130} className="mx-auto"/>
				<CardTitle className='text-3xl font-bold text-foreground text-balance'>
					Verify Your Email Address
				</CardTitle>
				<CardDescription className='text-muted-foreground text-pretty'>
					We've sent a verification email to your inbox. Please check your email
					and click the link to activate your account.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<p className='text-sm text-muted-foreground'>
					Didn't receive the email? Check your spam folder or click the button
					below to resend.
				</p>
				<Button className='w-full bg-primary text-primary-foreground hover:bg-primary/90'>
					Resend Verification Email
				</Button>
			</CardContent>
		</Card>
	);
}
