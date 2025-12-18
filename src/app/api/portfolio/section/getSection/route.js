import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import {JwtTokenData} from "@/utils/tokendata";
import {ApiError} from "@/utils/apiError";
import SectionsSchema from "@/models/portfolio/sections.model";
import EnsureAdmin from "@/utils/admin/ensureAdmin";

export async function GET(request){
    try {

        await connectionDb()
        await EnsureAdmin(request)
        const {id:userId}=JwtTokenData(request)
        if (!userId){
            const fallback=ApiError.from(request,404,"unauthorized user", "unauthorized user have no access for this route");
            return NextResponse.json(fallback.toJSON(),{status:404})
        }
        const fetchedSection = await SectionsSchema.find()
        return NextResponse.json({status:200, data:fetchedSection})

    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }
        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}