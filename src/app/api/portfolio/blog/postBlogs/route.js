import {connectionDb} from "@/db/config";
import {NextResponse} from "next/server";
import BlogSchema from "@/models/portfolio/blogs.model";
import {JwtTokenData} from "@/utils/tokendata";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {ApiError} from "@/utils/apiError";


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
        const {title,category,excerpt, tags,publishedTime,readTime,featuredImage}=reqBody
        // 1. Define required fields
        const requiredFields = {
            title,
            category,
            excerpt,
            tags,
            publishedTime,
            readTime,
        };

        // 2. Gather missing fields
        const missingFields = Object.entries(requiredFields)
            .filter(([key, value]) =>
                value === undefined ||
                value === null ||
                value === "" ||
                (Array.isArray(value) && value.length === 0)
            )
            .map(([key]) => key);

        // 3. If any missing, return ApiError with clear details
        if (missingFields.length > 0) {
            const fieldError = ApiError.from(
                request,
                400,
                "Validation error: required fields missing",
                missingFields.map(f => ({
                    code: "FIELD_REQUIRED",
                    field: f,
                    message: `${f} is required`,
                }))
            );

            return NextResponse.json(fieldError.toJSON(), { status: 400 });
        }
        const existingData = await BlogSchema.findOne({title})
        if (existingData) {
            return NextResponse.json({success: false, error: "Blog already exists"},{status:409})
        }

        const blogData = new BlogSchema({
            userid:userId,
            title,
            category,
            excerpt,
            tags,
            publishedTime,
            readTime,
            featuredImage,
        })
        const savedBlogData = await blogData.save()
        return NextResponse.json({success: true, message: "Blog saved successfully", data:savedBlogData}, {status:200})

    }
    catch(error){
        if (error instanceof ApiError){
            return NextResponse.json(error.toJSON(),{status:error.statusCode || 401})
        }
        const fallbackError = ApiError.from(request,501,error.message || "internal server error")
        return NextResponse.json( fallbackError.toJSON(),{status:501});
    }
}