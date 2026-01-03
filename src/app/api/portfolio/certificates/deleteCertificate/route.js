import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata";
import { checkAdminPrivilege } from "@/utils/isAdmin";
import CertificateSchema from "@/models/portfolio/certificate.model";
import {ApiError} from "@/utils/apiError";


export async function DELETE(request) {
    try {
        await connectionDb()
        // 🔹 token exists?
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { success: false, error: "Invalid token or Unauthorized User" },
                { status: 401 }
            );
        }

        // 🔹 decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }

        // 🔹 only admins
        const adminCheck = await checkAdminPrivilege(request);
        if (!adminCheck.isAdmin) {
            const status = adminCheck.status || 403;
            const error = adminCheck.error || "Access Denied: Admins Only";
            return NextResponse.json({ success: false, error }, { status });
        }

        const reqBody = await request.json();
        const {certificationId} = reqBody

        const existingCredentialId = await CertificateSchema.findOne({certificationId});
        if (!existingCredentialId) {
            return NextResponse.json({ success: false, error: `Credential does not exist ${certificationId}` }, {status:401});
        }
        const deleteCertificate = await CertificateSchema.findOneAndDelete({ certificationId });
        return NextResponse.json({ success: true, data:deleteCertificate, message: `Successfully deleted certificate ${certificationId}` }, {status:201});
    }
    catch(error){
        if (error instanceof ApiError){
            return NextResponse.json(error.toJSON(),{status:error.statusCode || 401})
        }
        const fallbackError = ApiError.from(request,501,error.message || "internal server error")
        return NextResponse.json( fallbackError.toJSON(),{status:501});
    }
}