import EmailVerificationCard from "@/components/authComponent/verify-email/email-verify";
import { GridBeams } from "@/components/ui/grid-beams";

export default function VerifyEmailPage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-stone-500 via-neutral-400 to-gray-500 p-4'>
			<EmailVerificationCard />
		</main>
	);
}
