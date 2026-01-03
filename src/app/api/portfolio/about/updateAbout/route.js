import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata.js";
import { checkAdminPrivilege } from "@/utils/isAdmin.js";
import AboutSchema from "@/models/portfolio/about.model";
import {ApiError} from "@/utils/apiError";

export async function PATCH(request) {
    try {
        await connectionDb();

        const { searchParams } = new URL(request.url);
        const aboutId = searchParams.get("aboutId");

        // token exists?
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { success: false, error: "Invalid token or Unauthorized User" },
                { status: 401 }
            );
        }

        // decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }

        // NOTE: only keep this if *only admins* should create hero profiles
        const adminCheck = await checkAdminPrivilege(request);
        if (!adminCheck.isAdmin) {
            const status = adminCheck.status || 403;
            const error = adminCheck.error || "Access Denied: Admins Only";
            return NextResponse.json({ success: false, error }, { status });
        }

        if (!aboutId) {
            return NextResponse.json(
                { success: false, error: "aboutId query parameter is required" },
                { status: 400 }
            );
        }

        // Get update fields from body
        const updates = await request.json();

        // Prevent updating critical fields
        delete updates.userid;
        delete updates.aboutId;
        delete updates._id;

        // Update hero
        const updatedAbout = await AboutSchema.findOneAndUpdate(
            { aboutId },
            { $set: updates },
            { new: true, runValidators: true } // return updated + validate schema
        ).lean();

        if (!updatedAbout) {
            return NextResponse.json(
                { success: false, error: "About data not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "About data updated", data: updatedAbout },
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
