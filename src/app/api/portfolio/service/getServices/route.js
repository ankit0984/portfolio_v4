import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import {ApiError} from "@/utils/apiError";
import ServiceSchema from "@/models/portfolio/service.model";

export async function GET(request){
    try {
        await connectionDb()
        const {searchParams}=new URL(request.url);
        const userid = searchParams.get("userid");
        const fetchServices = await ServiceSchema.find({userid:userid});
        return NextResponse.json({success:true, message:"service data found", data:fetchServices},{status:200});

    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }
        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}