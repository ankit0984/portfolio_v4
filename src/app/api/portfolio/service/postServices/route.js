import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import {JwtTokenData} from "@/utils/tokendata";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {ApiError} from "@/utils/apiError";
import ServiceSchema from "@/models/portfolio/service.model";

export async function POST(request) {
    try {
        await connectionDb()
        await EnsureAdmin(request)
        const {id: userId} = JwtTokenData(request)
        const reqBody = await request.json()
        //todo: implement imagekit function for storing icons as image
        const {title,icon,shortDescription,fullDescription,features, technologies,deliverable,pricing, timeline, featured } = reqBody

        const uploadData = new ServiceSchema({
            userid:userId,
            title,
            icon,
            shortDescription,
            fullDescription,
            features,
            technologies,
            deliverable,
            pricing,
            timeline,
            featured
        })

        const savedData = await uploadData.save()
        return NextResponse.json({success:true,message:"successfully saved data", data:savedData},{status:201})

    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }
        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }

}