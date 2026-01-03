import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import AboutSchema from "@/models/portfolio/about.model";

export async function GET() {
    try {
        await connectionDb();
        const aboutData = await AboutSchema.findOne(
            {},
            { _id: 0, userid: 0 }
        ).lean();

        if (!aboutData || aboutData.length === 0) {
            return NextResponse.json(
                { success: false, error: "about section data not available." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "about section data",
                data: aboutData,
            },
            { status: 200 }
        );
    } catch(error){
        if (error instanceof ApiError){
            return NextResponse.json(error.toJSON(),{status:error.statusCode || 401})
        }
        const fallbackError = ApiError.from(request,501,error.message || "internal server error")
        return NextResponse.json( fallbackError.toJSON(),{status:501});
    }
}
