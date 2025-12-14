import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";
import { sendEmail } from "@/utils/mailer";
import UserSchema from "@/models/user.model";
import { z } from "zod";

const resetEmailSchema = z.object({
	email: z.string().email().max(100),
});


export async function POST(request) {
	try {
		await connectionDb();
		const body = await request.json();
		const { email } = resetEmailSchema.parse(body);
		const user = await UserSchema.findOne({ email });

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		await sendEmail({
			email,
			emailType: "RESET",
			userId: user._id,
		});

		return NextResponse.json(
			{ message: "Reset email sent", success: true },
			{ status: 200 }
		);
	} catch (emailError) {
		console.error("Email sending failed:", emailError);
		return NextResponse.json(
			{ message: "Failed to send reset email" },
			{ status: 500 }
		);
	}

}
