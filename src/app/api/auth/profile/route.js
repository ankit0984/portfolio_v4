import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";
import UserSchema from "@/models/user.model";
import { JwtTokenData } from "@/utils/tokendata";


export async function GET(request) {
	try {
		await connectionDb();
		const isAuthenticated = request.cookies.get("token")?.value;

		if (!isAuthenticated) {
			return NextResponse.json(
				{ success: false, error: "Invalid token or Unauthorized User" },
				{ status: 401 }
			);
		}
		const { id: userId } = JwtTokenData(request);

		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "userid not found" },
				{ status: 401 }
			);
		}

		const user = await UserSchema.findOne({ _id: userId }).select(
			"-password -isverified -__v"
		);

		return NextResponse.json({
			message: "user found",
			success: true,
			data: user,
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: "Unable to retrieve profile",
				success: false,
			},
			{ status: 500 }
		);
	}
}
