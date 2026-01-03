import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata.js";
import CertificateSchema from "@/models/portfolio/certificate.model";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {ApiError} from "@/utils/apiError";

export async function PATCH(request) {
    try {
        await connectionDb();
        await EnsureAdmin(request);
        const { searchParams } = new URL(request.url);
        const certificationId = searchParams.get("certificationId");

        // decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }

        if (!certificationId) {
            return NextResponse.json(
                { success: false, error: "certificationId query parameter is required" },
                { status: 400 }
            );
        }

        // Get update fields from body
        const updates = await request.json();

        // Prevent updating critical fields
        delete updates.userid;
        delete updates.certificationId;
        delete updates._id;

        // Update hero
        const updatedCertificate = await CertificateSchema.findOneAndUpdate(
            { certificationId },
            { $set: updates },
            { new: true, runValidators: true } // return updated + validate schema
        ).lean();

        if (!updatedCertificate) {
            return NextResponse.json(
                { success: false, error: "Certification data not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Certification data updated", data: updatedCertificate },
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
