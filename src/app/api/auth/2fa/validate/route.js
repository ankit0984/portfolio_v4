import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import UserSchema from "@/models/user.model";
import { connectionDb } from "@/db/config.js";
import { JwtTokenData } from "@/utils/tokendata";

export async function POST(request) {
    try {
        await connectionDb();

        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { token } = await request.json(); // 6-digit from app

        const user = await UserSchema.findById(userId);
        if (!user || !user.twoFactorSecret) {
            return NextResponse.json(
                { success: false, error: "2FA not initialized" },
                { status: 400 }
            );
        }

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret, // must be base32
            encoding: "base32",
            token,
            step: 30,  // 30-second window (matches most apps)
            window: 1, // allow slight drift
        });

        if (!verified) {
            return NextResponse.json(
                { success: false, error: "Invalid 2FA code" },
                { status: 400 }
            );
        }

        user.twoFactorEnabled = true;
        await user.save();

        return NextResponse.json(
            { success: true, message: "2FA enabled successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: "Failed to confirm 2FA" },
            { status: 500 }
        );
    }
}
