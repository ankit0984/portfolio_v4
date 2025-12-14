import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import { JwtTokenData } from "@/utils/tokendata";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import { ApiError } from "@/utils/apiError";
import ServiceSchema from "@/models/portfolio/service.model";

export async function POST(request) {
    try {
        await connectionDb();
// todo update codebase according to the data of imagekit
        await EnsureAdmin(request);
        const { id: userId } = JwtTokenData(request);

        // Parse body (could be array or object)
        const reqBody = await request.json();
        if (!Array.isArray(reqBody)) {
            return NextResponse.json(
                { success: false, message: "Data must be an array of objects." },
                { status: 400 }
            );
        }

        const docs = Array.isArray(reqBody) ? reqBody : [reqBody];

        // Basic safety checks
        const MAX_BATCH_SIZE = 10; // tune as needed
        if (docs.length === 0) {
            return NextResponse.json({ success: false, message: "No documents provided" }, { status: 400 });
        }
        if (docs.length > MAX_BATCH_SIZE) {
            return NextResponse.json(
                { success: false, message: `Too many documents. Max ${MAX_BATCH_SIZE} allowed` },
                { status: 413 }
            );
        }

        const validatedDocs = docs.map((d) => {
            // only pick allowed fields to avoid storing unexpected data
            const {
                title,
                icon,
                shortDescription,
                fullDescription,
                features,
                technologies,
                deliverable,
                pricing,
                timeline,
                featured,
            } = d || {};
            return {
                userid: userId,
                title,
                icon,
                shortDescription,
                fullDescription,
                features,
                technologies,
                deliverable,
                pricing,
                timeline,
                featured,
            };
        });

        // Insert many
        // ordered: false => continue inserting others when one fails (useful for bulk)
        const insertedDocs = await ServiceSchema.insertMany(validatedDocs, { ordered: false });

        return NextResponse.json(
            { success: true, message: "Bulk upload complete", count: insertedDocs.length, data: insertedDocs },
            { status: 201 }
        );
    } catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), { status: err.statusCode || 500 });
        }
        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), { status: 500 });
    }
}
