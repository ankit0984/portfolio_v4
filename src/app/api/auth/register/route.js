import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";
import { sendEmail } from "@/utils/mailer";
import UserSchema from "@/models/user.model";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/utils/zod/registerSchema";


export async function POST(request, res) {
	try {
		await connectionDb();
		const reqBody = await request.json();
		// console.log(reqBody);

		const parsed = registerSchema.safeParse(reqBody);
		if (!parsed.success) {
			// const errorMessage = parsed.error.issues.map((i) => i.message).join("; ");
			const error = parsed.error.issues[0]?.message; // If you only want the first error then use
			return NextResponse.json(
				{
					message: "Validation failed",
					errors: error,
				},
				{ status: 400 }
			);
		}

		const { username, email, password, full_name } = parsed.data;

		const existingUser = await UserSchema.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return NextResponse.json(
				{
					message:
						"User already exists. Please try with another email and username.",
				},
				{ status: 409 }
			);
		}

		const salt = bcrypt.genSaltSync(10);
		const passhash = bcrypt.hashSync(password, salt);

		const authUser = new UserSchema({
			full_name,
			username,
			email,
			password: passhash,
		});
		const user = await authUser.save();
		const userResponse = await UserSchema.findById(user._id).select("-password");

		try {
			await sendEmail({ email, emailType: "VERIFY", userId: user._id });
			console.log("Verification email sent to:", email);
		} catch (emailError) {
			console.error("Email sending failed:", emailError);
			// Continue with registration success even if email fails
		}

		return NextResponse.json(
			{
				message: "User registered successfully",
				success: true,
				data: userResponse,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json({ error: "Registration failed" }, { status: 500 });
	}
}
