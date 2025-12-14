import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import {JwtTokenData} from "@/utils/tokendata";
import {checkAdminPrivilege} from "@/utils/isAdmin";
import BlogSchema from "@/models/portfolio/blogs.model";
import EnsureAdmin from "@/utils/admin/ensureAdmin";

export async function POST(request) {
    try {
        await connectionDb();
        await EnsureAdmin(request);
        const reqBody = await request.json();

        // User ID
        const {id: userId} = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                {success: false, error: "Unauthorized: User ID missing"},
                {status: 401}
            );
        }


        const items = Array.isArray(reqBody) ? reqBody : [reqBody];

        // Extract titles for duplicate check
        // Extract titles sent by client
        const titles = items.map((item) => item.title);

// Check DB for duplicates
        const existingBlogs = await BlogSchema.find(
            {title: {$in: titles}},
            {title: 1, _id: 0}
        );

// Extract only titles
        const existingTitles = existingBlogs.map((b) => b.title);

// If ANY duplicate exists → stop and return only titles
        if (existingTitles.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Some blogs already exist",
                    existing: existingTitles
                },
                {status: 409}
            );
        }


        // Prepare documents
        const docsToInsert = items.map((item) => ({
            userid: userId,
            title: item.title,
            category: item.category,
            excerpt: item.excerpt,
            tags: item.tags,
            publishedTime: item.publishedTime,
            readTime: item.readTime,
            featuredImage: item.featuredImage,
        }));

        const savedDocs = await BlogSchema.insertMany(docsToInsert);

        return NextResponse.json(
            {
                success: true,
                message: "Blog(s) uploaded successfully",
                data: savedDocs,
            },
            {status: 201}
        );
    } catch (error) {
        console.error("POST /blog/bulkUpload error:", error);

        // Duplicate key error (slug, blogId)
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Duplicate key error",
                    keyValue: error.keyValue,
                },
                {status: 409}
            );
        }

        // Validation error (missing required fields)
        if (error.name === "ValidationError") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation error",
                    details: Object.values(error.errors).map((e) => e.message),
                },
                {status: 400}
            );
        }

        // Unknown error
        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error",
            },
            {status: 500}
        );
    }
}
