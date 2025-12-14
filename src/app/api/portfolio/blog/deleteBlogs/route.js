import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import {JwtTokenData} from "@/utils/tokendata";
import BlogSchema from "@/models/portfolio/blogs.model";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {ApiError} from "@/utils/apiError";

export async function DELETE(request){
    try {
        await connectionDb()
        // 🔹 decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }
        await EnsureAdmin(request)
        const reqBody = await request.json();
        const {blogId,title}= reqBody

        const existingBlog = await BlogSchema.findOne({$or:[{blogId},{title}]});
        if (!existingBlog) {
            if (!userId) {
                // include structured details in the errors array
                throw ApiError.from(
                    request,
                    401,
                    `Blog data not found: ${blogId}`,
                    [{ code: "Blog data missing in database", reason: `Blog data has been deleted ${blogId}`}]
                );
            }

            // return NextResponse.json({success: false, error: "Blog data not found",data:`${blogId}`},{status:401})
        }
        const deletedBlog = await BlogSchema.findOneAndDelete({$or:[{blogId},{title}]});
        return NextResponse.json({success: true, message: "Blog data deleted successfully",data:deletedBlog.title},{status:200})

    }    catch(error){
        if (error instanceof ApiError){
            return NextResponse.json(error.toJSON(),{status:error.statusCode || 401})
        }
        const fallbackError = ApiError.from(request,501,error.message || "internal server error")
        return NextResponse.json( fallbackError.toJSON(),{status:501});
    }
}