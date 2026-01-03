import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config.js";
import HeroSchema from "@/models/portfolio/hero.model.js";
import {ApiError} from "@/utils/apiError"; // renamed for clarity

export async function GET(request) {
    try {
        await connectionDb();

        // Read heroId from query string
        const { searchParams } = new URL(request.url);
        const heroId = searchParams.get("heroId");

        if (!heroId) {
            return NextResponse.json(
                { success: false, error: "heroId query parameter is required" },
                { status: 400 }
            );
        }

        // Find by heroId and return only public fields
        const heroData = await HeroSchema.findOne(
            { heroId },
            {
                _id: 0, // hide MongoDB _id if you prefer
                userid:0,

            }
        ).lean();

        if (!heroData) {
            return NextResponse.json(
                { success: false, error: "Hero profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: heroData }, { status: 200 });
    } catch(error){
        if (error instanceof ApiError){
            return NextResponse.json(error.toJSON(),{status:error.statusCode || 401})
        }
        const fallbackError = ApiError.from(request,501,error.message || "internal server error")
        return NextResponse.json( fallbackError.toJSON(),{status:501});
    }
}
