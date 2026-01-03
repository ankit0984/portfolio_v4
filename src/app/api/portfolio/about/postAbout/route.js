import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata.js";
import { checkAdminPrivilege } from "@/utils/isAdmin.js";
import AboutSchema from "@/models/portfolio/about.model";
import {ApiError} from "@/utils/apiError";
import EnsureAdmin from "@/utils/admin/ensureAdmin";


export async function POST(request){
    try {
        await connectionDb()
        // decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            const message = `user not found with id "${userId}"`;
            throw ApiError.from(
                request,
                404,
                message,
                [ "User token missing or invalid" ]
            );
        }

        await EnsureAdmin(request);

        const reqBody = await request.json();
        const {title, description} = reqBody;
        if (!title || !description) {
            return NextResponse.json({ success: false, error: "Invalid name or description" });
        }

        const aboutData = new AboutSchema({
            userid:userId,
            title,
            description,
        })
        const savedData = await  aboutData.save()
        return NextResponse.json({success:true,message:"data saved",data: savedData}, {status:200});
    }
    catch(error){
        if (error instanceof ApiError){
            return NextResponse.json(error.toJSON(),{status:error.statusCode || 401})
        }
        const fallbackError = ApiError.from(request,501,error.message || "internal server error")
        return NextResponse.json( fallbackError.toJSON(),{status:501});
    }
}