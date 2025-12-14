"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const router = useRouter()

    const getPasswordStrength = (p) => {
        let strength = 0;

        // length check
        if (p.length > 7) strength++;
        if (/[A-Z]/.test(p) && /[a-z]/.test(p)) strength++;
        if (/[0-9]/.test(p)) strength++;
        if (/[^A-Za-z0-9]/.test(p)) strength++;

        return strength;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(getPasswordStrength(newPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        // Validate password requirements first
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        try {
            // Get token from URL query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            
            if (!token) {
                setError("Password reset token is missing. Please use the link from your email.");
                return;
            }
    
            const response = await axios.post("/api/auth/resetpassword", {
                token,
                newPassword: password  // Changed from 'password' to 'newPassword' to match API expectations
            });
    
            setSuccess(response.data.message || "Your password has been reset successfully!");
            setPassword("");
            setConfirmPassword("");
            setPasswordStrength(0);
			router.push("/login")
        } catch (error) {
            setError(
                error.response?.data?.error || error.response?.data?.message || "Password reset failed. Please try again."
            );
        }
    };

    const strengthColors = [
        "bg-red-500", // 0 = Weak
        "bg-orange-500", // 1 = Fair
        "bg-yellow-500", // 2 = Medium
        "bg-blue-500", // 3 = Strong
        "bg-green-500", // 4 = Very Strong
    ];

    const strengthLabels = ["Weak", "Fair", "Medium", "Strong", "Very Strong"];

    return (
			<div >
				{" "}
				{/* Added vertical padding and responsive padding */}
				<Card className='w-full max-w-md'>
					<CardHeader className='space-y-1 text-center'>
						<div className='flex justify-center mb-4'>
							{" "}
							{/* Added subtle branding */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='h-8 w-8 text-primary'
							>
								<rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
								<path d='M7 11V7a5 5 0 0 1 10 0v4' />
							</svg>
						</div>
						<CardTitle className='text-3xl font-bold text-balance'>
							Reset Your Password
						</CardTitle>{" "}
						{/* Increased title size */}
						<CardDescription className='text-pretty text-muted-foreground'>
							Enter your new password below to reset your account password.{" "}
						</CardDescription>
					</CardHeader>
					<CardContent className='grid gap-6'>
						{" "}
						{/* Increased gap between form elements */}
						{error && (
							<p className='text-red-500 text-sm text-center'>{error}</p>
						)}{" "}
						{/* Error message display */}
						{success && (
							<p className='text-green-500 text-sm text-center'>{success}</p>
						)}{" "}
						{/* Success message display */}
						<form onSubmit={handleSubmit} className='grid gap-4'>
							{" "}
							{/* Wrapped content in a form */}
							<div className='grid gap-2'>
								<Label htmlFor='password'>New Password</Label>
								<div className='relative'>
									{" "}
									<Input
										id='password'
										type={showPassword ? "text" : "password"} // Toggle password visibility
										placeholder='••••••••'
										required
										value={password}
										onChange={handlePasswordChange}
										className='pr-10' // Added padding to the right for the icon
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground'
									>
										{" "}
										{showPassword ? (
											<EyeOffIcon className='h-5 w-5' />
										) : (
											<EyeIcon className='h-5 w-5' />
										)}
									</button>
								</div>
								<div className='h-2 w-full rounded-full bg-muted'>
									{" "}
									{/* Password strength indicator */}
									<div
										className={`h-full rounded-full transition-all duration-300 ${strengthColors[passwordStrength]}`}
										style={{ width: `${(passwordStrength / 4) * 100}%` }}
									/>
								</div>
								<p className='text-sm text-muted-foreground dark:text-amber-100'>
									Password strength:{" "}
									<span className={`font-medium ${passwordStrength}`}>
										{strengthLabels[passwordStrength]}
									</span>
								</p>
								<p className='text-sm text-muted-foreground'>
									Must be at least 8 characters, include uppercase and lowercase
									letters, a number, and a symbol.
								</p>{" "}
								{/* Helper text */}
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='confirm-password'>Confirm New Password</Label>
								<div className='relative'>
									{" "}
									<Input
										id='confirm-password'
										type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
										placeholder='••••••••'
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className='pr-10' // Added padding to the right for the icon
									/>
									<button
										type='button'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className='absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground'
									>
										{" "}
										{showConfirmPassword ? (
											<EyeOffIcon className='h-5 w-5' />
										) : (
											<EyeIcon className='h-5 w-5' />
										)}
									</button>
								</div>
								<p className='text-sm text-muted-foreground'>
									Re-enter your new password to confirm.
								</p>{" "}
								{/* Helper text */}
							</div>
							<Button type='submit' className='w-full mt-2'>
								{" "}
								{/* Added margin top */}
								Reset Password
							</Button>
						</form>
					</CardContent>
					<CardFooter className='flex justify-center text-sm text-muted-foreground'>
						{" "}
						{/* Added footer for subtle branding */}
						<p>&copy; 2025 Your Company. All rights reserved.</p>
					</CardFooter>
				</Card>
			</div>
		);
}
