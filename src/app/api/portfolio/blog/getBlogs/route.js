import { connectionDb } from "@/db/config";
import { NextResponse } from "next/server";
import BlogSchema from "@/models/portfolio/blogs.model";
import {ApiError} from "@/utils/apiError";

export async function GET(request) {
    try {
        await connectionDb();
        const blogs = await BlogSchema.find({}, { _id: 0, userid: 0 }).lean();

        // if no blogs found
        if (!blogs || blogs.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No blog data found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Blog data fetched successfully",
                data: blogs,
            },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}
