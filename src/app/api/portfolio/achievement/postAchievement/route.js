import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import {JwtTokenData} from "@/utils/tokendata";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import AchievementSchema from "@/models/portfolio/achievement.model";
import {ApiError} from "@/utils/apiError";

export async function POST(request){
    try {
        await connectionDb()
        await EnsureAdmin(request)
        const {id:userId} = JwtTokenData(request)
        const reqBody = await request.json()
        const {title,type,issuer,date,description, image, url, featured} = reqBody

        const achievementData = new AchievementSchema({
            userid:userId,
            title,
            type,
            issuer,
            date,
            description,
            image,
            featured,
            url
        })
        const savedData= await achievementData.save()
        return NextResponse.json({success:true, message:"data saved", data:savedData})

//todo: add logic to avoid duplicacy
    } catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}