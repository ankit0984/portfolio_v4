import { connectionDb } from "@/db/config";
import { NextResponse } from "next/server";
import ContactSchema from "@/models/portfolio/contact.model";
import {ApiError} from "@/utils/apiError";

export async function GET(request) {
    try {
        await connectionDb();
        const { searchParams } = new URL(request.url);
        const heroId = searchParams.get("heroId");

        const contacts = await ContactSchema.find({heroId})
            .select("-__v")
            .lean();

        if (!contacts || contacts.length === 0) {
            const fallbackError = ApiError.from(request,404, "No contacts found",[`data not found associated with heroId not found: ${heroId}`])
            return NextResponse.json(fallbackError.toJSON(),{status:404})
        }

        return NextResponse.json(
            {
                success: true,
                message: "Contacts fetched successfully.",
                data: contacts,
            },
            { status: 200 }
        );
    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}
