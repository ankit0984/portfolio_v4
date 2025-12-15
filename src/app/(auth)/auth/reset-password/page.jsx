import ResetPasswordPage from "@/components/authComponent/resetpassword/reset-password";
import React from "react";

export default function page() {
	return(
	<div className='flex min-h-screen items-center justify-center bg-gradient-to-l from-stone-500 via-neutral-400 to-gray-500 px-4 py-8 sm:px-6 lg:px-8'>
		<ResetPasswordPage />
	</div>);
}
