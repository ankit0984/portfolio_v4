// /api/auth/2fa/setup/route.js
import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import UserSchema from "@/models/user.model";
import { connectionDb } from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata";

export async function POST(request) {
    try {
        await connectionDb();

        // user must already be logged in (have token)
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await UserSchema.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        // generate a new secret
        const secret = speakeasy.generateSecret({
            length: 20,
            name: "MyPortfolioApp",
            issuer: "MyPortfolioApp",
        });

        // save base32 secret in DB
        user.twoFactorSecret = secret.base32;
        user.twoFactorEnabled = false; // will be true after user confirms
        await user.save();

        // optional: generate QR for Google Authenticator
        const qrDataUrl = await QRCode.toDataURL(secret.otpauth_url);

        return NextResponse.json(
            {
                success: true,
                qr: qrDataUrl, // show this in frontend img tag
                secret: secret.base32, // optional: show text backup
            },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: "Failed to setup 2FA" },
            { status: 500 }
        );
    }
}
