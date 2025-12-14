import { NextResponse } from "next/server";
import UserSchema from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectionDb } from "@/db/config.js";
import { z } from "zod";

connectionDb();

const resetPasswordSchema = z.object({
	token: z.string().min(1, "Token is required"),
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(100, "Password is too long")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export async function POST(request) {
	try {
		const body = await request.json();

		// ✅ Validate with Zod
		const { token, newPassword } = resetPasswordSchema.parse(body);
		// Verify JWT
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const userId = decoded.userId;

		// Find user with matching token
		const user = await UserSchema.findOne({
			_id: userId,
			forgotpasswordtokenexpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 400 }
			);
		}

		const existingPassword = await bcrypt.compare(newPassword, user.password);

		if (existingPassword) {
			return NextResponse.json(
				{ message: "New password cannot be the same as the old password" },
				{ status: 400 }
			);
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update user
		user.password = hashedPassword;
		user.forgotpasswordtoken = undefined;
		user.forgotpasswordtokenexpiry = undefined;
		await user.save();

		return NextResponse.json(
			{ message: "Password reset successful" },
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: error.issues[0].message },
				{ status: 400 }
			);
		}
		
		// Log the actual error for debugging
		console.error('Password reset error:', error);
		
		// Return generic error message to prevent information disclosure
		return NextResponse.json(
			{ error: "An error occurred while resetting password" }, 
			{ status: 500 }
		);
	}

}
