import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata";
import { checkAdminPrivilege } from "@/utils/isAdmin";
import CertificateSchema from "@/models/portfolio/certificate.model";
import {ApiError} from "@/utils/apiError";
export async function POST(request) {
    try {
        await connectionDb();

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

        // 🔹 Normalize to array
        const items = Array.isArray(reqBody) ? reqBody : [reqBody];

        // 🔹 Collect all credentialIds from payload
        const credentialIds = items
            .map((item) => item.credentialId)
            .filter(Boolean); // remove undefined / null / empty

        if (credentialIds.length === 0) {
            return NextResponse.json(
                { success: false, error: "credentialId is required for all certificates" },
                { status: 400 }
            );
        }

        // 🔹 Check if any of these credentialIds already exist
        const existing = await CertificateSchema.find({
            credentialId: { $in: credentialIds },
        }).lean();

        if (existing.length > 0) {
            const existingIds = existing.map((doc) => doc.credentialId);
            return NextResponse.json(
                {
                    success: false,
                    error: "One or more credentials already exist",
                    existingCredentialIds: existingIds,
                },
                { status: 409 }
            );
        }

        // 🔹 Same certificationId for this batch (if that's your intention)

        // 🔹 Build docs for insertMany
        const docsToInsert = items.map((item) => {
            const doc = {
                certificationId:item.certificationId,
                userid: userId,
                name: item.name,
                issuer: item.issuer,
                issueDate: item.issueDate,
                credentialId: item.credentialId,
                credentialUrl: item.credentialUrl,
                logo: item.logo,
                skills: item.skills,
                description: item.description,
            };

            // only set expiryDate if it has a non-empty value
            if (item.expiryDate) {
                doc.expiryDate = item.expiryDate;
            }

            return doc;
        });

        const savedDocs = await CertificateSchema.insertMany(docsToInsert);

        return NextResponse.json(
            {
                success: true,
                message: "certification schema created",
                data: savedDocs,
            },
            { status: 201 }
        );
    } catch(error){
        if (error instanceof ApiError){
            return NextResponse.json(error.toJSON(),{status:error.statusCode || 401})
        }
        const fallbackError = ApiError.from(request,501,error.message || "internal server error")
        return NextResponse.json( fallbackError.toJSON(),{status:501});
    }
}
