import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";

export async function POST() {
	try {
		await connectionDb();
		
		const response = NextResponse.json({
			message: "logout successfully!",
			success: true,
		});
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
			sameSite: "strict",
		});
		return response;
	} catch (error) {
		return NextResponse.json({ error: "Logout failed" }, { status: 500 });
	}

}

