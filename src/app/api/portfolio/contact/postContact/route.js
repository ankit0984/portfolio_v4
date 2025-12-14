import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {JwtTokenData} from "@/utils/tokendata";
import {ApiError} from "@/utils/apiError";
import ContactModel from "@/models/portfolio/contact.model";

export async function POST(request) {
    try {
        await connectionDb()
        await EnsureAdmin(request)
        const reqBody = await request.json()

        const {id: userId} = JwtTokenData(request)
        if (!userId) {
            return NextResponse.json(
                {success: false, error: "userid not found"},
                {status: 401}
            );
        }

        const {phone, email, socialLinks: socialObj, location} = reqBody;
        const requiredFields = {phone, socialLinks: socialObj};

        // 2. Gather missing fields
        const missingFields = Object.entries(requiredFields)
            .filter(([key, value]) =>
                value === undefined ||
                value === null ||
                value === "" ||
                (Array.isArray(value) && value.length === 0)
            )
            .map(([key]) => key);
        // 3. If any missing, return ApiError with clear details
        if (missingFields.length > 0) {
            const fieldError = ApiError.from(
                request,
                400,
                "Validation error: required fields missing",
                missingFields.map(f => ({
                    code: "FIELD_REQUIRED",
                    field: f,
                    message: `${f} is required`,
                }))
            );

            return NextResponse.json(fieldError.toJSON(), { status: 400 });
        }

// if client sent object like { github: "...", linkedin: "..." }
        const socialLinksArray = [];
        if (socialObj && typeof socialObj === "object" && !Array.isArray(socialObj)) {
            for (const [platform, url] of Object.entries(socialObj)) {
                // optional: skip falsy urls
                if (url) socialLinksArray.push({platform, url});
            }
        } else if (Array.isArray(socialObj)) {
            // already an array — use as-is (optionally validate)
            socialLinksArray.push(...socialObj);
        }

        const existingData = await ContactModel.findOne({email})
        if (existingData) {
            return NextResponse.json(existingData);
        }

        const contactDetails = new ContactModel({
            userid: userId,
            phone,
            location,
            socialLinks: socialLinksArray,
        });
        const savedContactDetails = await contactDetails.save();
        return NextResponse.json({
            success: true,
            data: savedContactDetails,
            message: "successfully data saved."
        }, {status: 200})

    } catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}