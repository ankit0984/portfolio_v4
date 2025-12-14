import {NextResponse} from "next/server";
import {JwtTokenData} from "@/utils/tokendata";
import {connectionDb} from "@/db/config";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import EducationSchema from "@/models/portfolio/education.model";
import {ApiError} from "@/utils/apiError";

export async function DELETE(request){
    try {
        await connectionDb()
        await EnsureAdmin(request)
     const {searchParams}=new URL(request.url);
     const userid=searchParams.get("userid");
     const reqBody = await request.json()
        const {degree, fieldOfStudy}= reqBody;

     const fetchedDeleteData = await EducationSchema.findOneAndDelete({
         userid,
         $or: [
                { fieldOfStudy },
                { degree }
            ]
        });

     return NextResponse.json({success:true, message:"Deleted successfully.", data:fetchedDeleteData}, {status:200});



    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }
        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}