import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";
import UserSchema from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Add validation schema at the top
const loginSchema = z
	.object({
		username: z.string().min(1).max(50).optional(),
		email: z.string().email().max(100).optional(),
		password: z.string().min(1).max(100),
	})
	.refine((data) => data.username || data.email, {
		message: "Either username or email is required",
	});


export async function POST(request) {
	try {
		await connectionDb();

		const reqBody = await request.json();
		// Validate input
		let { username, email, password } = loginSchema.parse(reqBody);

		const existingUser = await UserSchema.findOne({
			$or: [{ email }, { username }],
		});
		// check existing user
		if (!existingUser) {
			return NextResponse.json(
				{
					message: "user does not exist",
				},
				{ status: 400 }
			);
		}
		// check verified user
		if (!existingUser.isverified) {
			return NextResponse.json(
				{
					message: "Please verify your email before logging in",
					isVerified: false,
				},
				{ status: 403 }
			);
		}
        if (!existingUser.twoFactorEnabled){
            return NextResponse.json(
                {
                    message: "Only MFA user allowed, Please verify your email and activate mfs before logging in.",
                    isVerified: false,
                },
                { status: 403 }
            );
        }

		const validPassword = await bcrypt.compare(password, existingUser.password);
		if (!validPassword) {
			return NextResponse.json(
				{
					message: "wrong password!",
				},
				{ status: 400 }
			);
		}

		const tokenData = {
			id: existingUser._id,
			isAdmin: existingUser.isAdmin,
            // isMfaValid: existingUser.twoFactorEnabled,
		};
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
			expiresIn: "1d",
		});
		const response = NextResponse.json({
			message: "Logged In Successfully",
			success: true,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
		});

		return response;
	} catch (jwtError) {
		console.error("JWT signing failed:", jwtError);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 500 }
		);
	}
}
