import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import CertificateSchema from "@/models/portfolio/certificate.model";

export async function GET(request) {
    try {
        await connectionDb();
        const certs = await CertificateSchema.find(
            {},
            { _id: 0, userid: 0 }
        ).lean();

        if (!certs || certs.length === 0) {
            return NextResponse.json(
                { success: false, error: "certificationId data not available." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "certification data",
                data: certs, // 👈 array
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("GET /certification error:", err);
        return NextResponse.json(
            { success: false, error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
