import { NextResponse } from "next/server";
import { connectionDb } from "@/db/config";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import ExperienceSchema from "@/models/portfolio/experience.model";
import {ApiError} from "@/utils/apiError";
import {JwtTokenData} from "@/utils/tokendata";
import { v4 as uuidv4 } from "uuid";


export async function POST(request) {
    try {
        await connectionDb();
        // 🔹 decode token
        const { id: userId } = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "userid not found" },
                { status: 401 }
            );
        }
        await EnsureAdmin(request);

        const reqBody = await request.json();


        // 2) normalize/unwrap fields so they match schema expectations
        // description/responsibilities/achievements may be passed as string or array
        const normalizeToArray = (v) => {
            if (v == null) return undefined;
            if (Array.isArray(v)) return v;
            if (typeof v === "string" && v.trim() === "") return [];
            return typeof v === "string" ? [v] : Array.isArray(v) ? v : [String(v)];
        };

        // technologies might be an array of objects ({name, category}) — map to names
        const normalizeTechnologies = (v) => {
            if (v == null) return undefined;
            if (!Array.isArray(v)) {
                // if it's a string, convert to single-element array
                return typeof v === "string" ? [v] : [String(v)];
            }
            // map objects to their 'name' or string entries unchanged
            return v.map(item => {
                if (item == null) return String(item);
                if (typeof item === "string") return item;
                if (typeof item === "object" && ("name" in item)) return String(item.name);
                // fallback to JSON string
                return typeof item === "object" ? JSON.stringify(item) : String(item);
            }).filter(Boolean);
        };

        const {
            company,
            position,
            employment_type,
            location,
            start_date,
            end_date,
            current,
            description,
            responsibilities,
            achievements,
            technologies,
            company_logo,
            category
        } = reqBody;

        // Find the first experience that has the same category
        const existingCategoryEntry = await ExperienceSchema.findOne({ category });

        let categoryId;
        if (existingCategoryEntry) {
            // category already exists → reuse its UUID
            categoryId = existingCategoryEntry.categoryId;
        } else {
            // new category → generate new UUID
            categoryId = uuidv4();
        }



        // 3) required field check (smart)
        const requiredChecks = {
            company,
            position,
            employment_type,
            location,
            start_date,
            // end_date required only when current is falsy
            company_logo,
            category,
            // description/responsibilities/technologies must be non-empty (we'll check arrays)
        };

        // gather missing basics (not checking arrays yet)
        const missingBasics = Object.entries(requiredChecks)
            .filter(([k, v]) => v === undefined || v === null || (typeof v === "string" && v.trim() === ""))
            .map(([k]) => k);

        // normalize arrays for checking
        const normalizedDescription = normalizeToArray(description);
        const normalizedResponsibilities = normalizeToArray(responsibilities);
        const normalizedAchievements = normalizeToArray(achievements) ?? [];
        const normalizedTechnologies = normalizeTechnologies(technologies);

        const missingArrayFields = [];
        if (!normalizedDescription || normalizedDescription.length === 0) missingArrayFields.push("description");
        if (!normalizedResponsibilities || normalizedResponsibilities.length === 0) missingArrayFields.push("responsibilities");
        if (!normalizedTechnologies || normalizedTechnologies.length === 0) missingArrayFields.push("technologies");

        // end_date logic: if current is falsy, require end_date (treat empty string as missing)
        const isCurrent = Boolean(current);
        const parsedEndDate = (typeof end_date === "string" && end_date.trim() === "") ? null : end_date;
        if (!isCurrent && (parsedEndDate === undefined || parsedEndDate === null || parsedEndDate === "")) {
            missingArrayFields.push("end_date");
        }

        const missingFields = [...missingBasics, ...missingArrayFields];

        if (missingFields.length > 0) {
            const errorsArray = missingFields.map(f => ({
                code: "FIELD_REQUIRED",
                field: f,
                message: `${f} is required`
            }));

            const fieldError = ApiError.from(
                request,
                400,
                "Validation error: required fields missing",
                errorsArray
            );

            return NextResponse.json(fieldError.toJSON(), { status: 400 });
        }

        // 4) Prepare DB-ready payload
        const payload = {
            userid:userId,
            company: String(company).trim(),
            position: String(position).trim(),
            employment_type: String(employment_type).trim(),
            location: String(location).trim(),
            start_date: new Date(start_date),
            end_date: parsedEndDate ? new Date(parsedEndDate) : undefined,
            current: Boolean(current),
            description: normalizedDescription,
            responsibilities: normalizedResponsibilities,
            achievements: normalizedAchievements,
            technologies: normalizedTechnologies,
            company_logo: String(company_logo).trim(),
            category,
            categoryId   // <-- added this

        };

        // 5) Create & save
        const expDoc = new ExperienceSchema(payload);
        const savedExpData = await expDoc.save();

        return NextResponse.json({ success: true, data: savedExpData }, { status: 201 });

    } catch (error) {
        // 6) Map Mongoose validation error -> structured ApiError
        // Note: Mongoose ValidationError has name === "ValidationError" and error.errors map
        try {
            if (error?.name === "ValidationError" && error.errors) {
                const errorsArray = Object.values(error.errors).map(e => ({
                    field: e.path,
                    message: e.message,
                    kind: e.kind,
                    value: e.value
                }));

                const apiErr = ApiError.from(request, 400, "Validation failed", errorsArray);
                return NextResponse.json(apiErr.toJSON(), { status: 400 });
            }
        } catch (error) {
            console.error("error mapping mongoose validation error:", error);
        }

        // If it's already an ApiError, just return it
        if (error instanceof ApiError) {
            return NextResponse.json(error.toJSON(), { status: error.statusCode || 400 });
        }

        // Fallback: return structured wrapper so `errors` is populated
        const originalErrorInfo = {
            name: error?.name || "Error",
            message: error?.message || "Unknown error"
        };

        const fallbackError = ApiError.from(
            request,
            500,
            error?.message || "internal server error",
            [originalErrorInfo],
            { originalStack: error?.stack }
        );

        return NextResponse.json(fallbackError.toJSON(), { status: 500 });
    }
}
