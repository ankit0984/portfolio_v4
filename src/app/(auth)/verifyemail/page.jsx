import { Suspense } from "react";
import VerifyEmailPage from "@/components/authComponent/verifyemail/verifyemail";

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyEmailPage />
		</Suspense>
	);
}
