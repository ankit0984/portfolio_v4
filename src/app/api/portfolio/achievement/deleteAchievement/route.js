import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import AchievementSchema from "@/models/portfolio/achievement.model";
import {ApiError} from "@/utils/apiError";

export async function DELETE(request) {
    try {
        await connectionDb()
        await EnsureAdmin(request)
        const reqBody = await request.json()
        const {searchParams}= new URL(request.url);
        const userid=searchParams.get("userid");

        const {title, achievementId}= reqBody

        const fetchDeleteItem = await AchievementSchema.findOneAndDelete({
            userid:userid,
            $or: [
                {title},
                {achievementId}

            ]
        })
        if (!fetchDeleteItem) {
            return NextResponse.json({success:false,error:`data not found in db of user: ${userid}`},{status: 404});
        }
        return NextResponse.json({success:true,message:"Data deleted", data:fetchDeleteItem});

    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}