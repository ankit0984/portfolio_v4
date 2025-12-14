import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata.js";
import { checkAdminPrivilege } from "@/utils/isAdmin.js";
import AboutSchema from "@/models/portfolio/about.model";


export async function POST(request){
    try {
        await connectionDb()
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
    catch (error) {
        console.error("POST /about error:", error);

        if (error?.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            return NextResponse.json(
                { success: false, error: "Validation error", details: messages },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}