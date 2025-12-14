import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";
import { JwtTokenData } from "@/utils/tokendata.js";
import HeroSchema from "@/models/portfolio/hero.model.js";
import EnsureAdmin from "@/utils/admin/ensureAdmin"; // renamed for clarity

const ALLOWED_PLATFORMS = ["github", "youtube", "medium", "leetcode"];

export async function POST(request) {
    try {
        await connectionDb();
        await EnsureAdmin(request);

        // decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }

        const reqBody = await request.json();
        const { fullName, email, location, flipText, bio, socialLinks, imageUrl } =
        reqBody ?? {};

        // Basic required fields validation
        if (!fullName || !email || !location || !bio || !imageUrl) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Ensure flipText is an array of strings
        const flipTextArray = Array.isArray(flipText)
            ? flipText.map((s) => String(s))
            : typeof flipText === "string"
                ? [flipText]
                : [];

        if (!flipTextArray.length) {
            return NextResponse.json(
                { success: false, error: "flipText must be a non-empty array" },
                { status: 400 }
            );
        }

        // Validate socialLinks shape (optional - empty allowed)
        const socialLinksArray = Array.isArray(socialLinks) ? socialLinks : [];
        for (const item of socialLinksArray) {
            if (!item || !item.platform || !item.url) {
                return NextResponse.json(
                    { success: false, error: "Each socialLink must have platform and url" },
                    { status: 400 }
                );
            }
            if (!ALLOWED_PLATFORMS.includes(item.platform)) {
                return NextResponse.json(
                    { success: false, error: `Invalid platform: ${item.platform}` },
                    { status: 400 }
                );
            }
        }

        // Create new hero
        const heroProfile = new HeroSchema({
            userid: userId,
            fullName,
            email,
            location,
            flipText: flipTextArray,
            socialLinks: socialLinksArray,
            imageUrl,
            bio,
        });

        const heroData = await heroProfile.save();

        return NextResponse.json(
            {
                success: true,
                message: "Hero profile created",
                data: heroData,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /hero error:", error);

        // Mongoose validation errors -> return meaningful message
        if (error?.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            return NextResponse.json(
                { success: false, error: "Validation error", details: messages },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: "error occurred during POST request" },
            { status: 500 }
        );
    }
}
