import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import ExperienceSchema from "@/models/portfolio/experience.model";
import {ApiError} from "@/utils/apiError";

export async function GET(request){
    try {
        await connectionDb()
        const {searchParams} = new URL(request.url);
        const categoryId = searchParams.get("categoryId");

        const expData = await ExperienceSchema.find({categoryId}).lean();
        if (!expData || expData.length === 0) {
            const fallbackError = ApiError.from(request,404, "No categoryId data found",[`data not found associated with categoryId: ${categoryId}`])
            return NextResponse.json(fallbackError.toJSON(),{status:404})
        }
        return NextResponse.json({status: 200, data: expData});

    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }
        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }

}