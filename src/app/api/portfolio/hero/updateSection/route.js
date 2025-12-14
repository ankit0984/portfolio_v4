import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata.js";
import { checkAdminPrivilege } from "@/utils/isAdmin.js";
import HeroSchema from "@/models/portfolio/hero.model.js";

export async function PATCH(request) {
    try {
        await connectionDb();

        const { searchParams } = new URL(request.url);
        const heroId = searchParams.get("heroId");

        // token exists?
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { success: false, error: "Invalid token or Unauthorized User" },
                { status: 401 }
            );
        }

        // decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }

        // NOTE: only keep this if *only admins* should create hero profiles
        const adminCheck = await checkAdminPrivilege(request);
        if (!adminCheck.isAdmin) {
            const status = adminCheck.status || 403;
            const error = adminCheck.error || "Access Denied: Admins Only";
            return NextResponse.json({ success: false, error }, { status });
        }

        if (!heroId) {
            return NextResponse.json(
                { success: false, error: "heroId query parameter is required" },
                { status: 400 }
            );
        }

        // Get update fields from body
        const updates = await request.json();

        // Prevent updating critical fields
        delete updates.userid;
        delete updates.heroId;
        delete updates._id;

        // Validate flipText array if present
        if (updates.flipText && !Array.isArray(updates.flipText)) {
            return NextResponse.json(
                { success: false, error: "flipText must be an array" },
                { status: 400 }
            );
        }

        // Validate socialLinks if provided
        if (updates.socialLinks && !Array.isArray(updates.socialLinks)) {
            return NextResponse.json(
                { success: false, error: "socialLinks must be an array" },
                { status: 400 }
            );
        }

        // Update hero
        const updatedHero = await HeroSchema.findOneAndUpdate(
            { heroId },
            { $set: updates },
            { new: true, runValidators: true } // return updated + validate schema
        ).lean();

        if (!updatedHero) {
            return NextResponse.json(
                { success: false, error: "Hero not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Hero updated", data: updatedHero },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
