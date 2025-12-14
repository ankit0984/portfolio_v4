import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {JwtTokenData} from "@/utils/tokendata";
import EducationSchema from "@/models/portfolio/education.model";
import {ApiError} from "@/utils/apiError";

export async function POST(request){
    try {
        await connectionDb()
        await EnsureAdmin(request)
        const {id:userId}=JwtTokenData(request)
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }
        const reqBody = await request.json()
        const {institution,degree,fieldOfStudy,start_date, end_date, current,gpa,achievement, description } = reqBody
        const existingData = await EducationSchema.findOne({degree})
        if (existingData) {
            const fallbackError = ApiError.from(request,409, "duplicate data",[`data already exist ${existingData.degree}`])
            return NextResponse.json(fallbackError.toJSON(),{status:409})
        }
        const educationData = new EducationSchema({
            userid:userId,
            institution,
            degree,
            fieldOfStudy,
            start_date,
            end_date,
            current,
            gpa,achievement,
            description,
        })
        const savedData = await educationData.save()
        return NextResponse.json({success: true, data: savedData}, {status:200})


    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}
