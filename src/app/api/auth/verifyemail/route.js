import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";
import { z } from "zod";
import UserSchema from "@/models/user.model";

const verifyEmailSchema = z.object({
	token: z.string().min(1).max(200),
});


export async function POST(request) {
	try {
		await connectionDb();

		const reqBody = await request.json();
		const { token } = verifyEmailSchema.parse(reqBody);

		const verifyuser = await UserSchema.findOne({
			verifytoken: token,
			verifytokenexpiry: { $gt: Date.now() },
		});
		if (!verifyuser) {
			return NextResponse.json(
				{
					error: "Invalid token.",
				},
				{ status: 400 }
			);
		}
		verifyuser.isverified = true;
		verifyuser.verifytoken = undefined;
		verifyuser.verifytokenexpiry = undefined;
		await verifyuser.save();
		return NextResponse.json(
			{
				message: "Email Verified Successfully",
				success: true,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Token verification failed", message: error.message },
			{ status: 500 }
		);
	}
}
