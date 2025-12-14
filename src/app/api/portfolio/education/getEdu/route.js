import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import EducationSchema from "@/models/portfolio/education.model";
import {ApiError} from "@/utils/apiError";

export async function GET(request) {
    try {
        await connectionDb()
        const {searchParams}=new URL(request.url);
        const userid=searchParams.get("userid");
        const fetchedData = await EducationSchema.find({userid});
        return NextResponse.json({success:true, data:fetchedData}, {status:200});
    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}