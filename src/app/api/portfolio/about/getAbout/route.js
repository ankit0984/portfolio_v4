import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import AboutSchema from "@/models/portfolio/about.model";

export async function GET() {
    try {
        await connectionDb();
        const aboutData = await AboutSchema.findOne(
            {},
            { _id: 0, userid: 0 }
        ).lean();

        if (!aboutData || aboutData.length === 0) {
            return NextResponse.json(
                { success: false, error: "about section data not available." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "about section data",
                data: aboutData,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("GET /portfolio/about/getAbout error:", err);
        return NextResponse.json(
            { success: false, error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
