// utils/serializeError.js
import { ApiError } from "./apiError";

/**
 * Returns a plain object suitable for JSON responses.
 * Accepts ApiError or any Error (or any value).
 */
export function serializeError(err) {
    if (!err) {
        return {
            success: false,
            statusCode: 500,
            message: "Unknown error",
            errors: [],
        };
    }

    // ApiError exposes toJSON; prefer that
    if (err instanceof ApiError) {
        return err.toJSON();
    }

    // Generic Error
    if (err instanceof Error) {
        return {
            success: false,
            statusCode: 500,
            message: err.message || "Something went wrong",
            errors: [],
            ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
        };
    }

    // If user passed a plain object
    if (typeof err === "object") {
        return {
            success: false,
            statusCode: err.statusCode || 500,
            message: err.message || "Something went wrong",
            errors: err.errors || [],
            ...(process.env.NODE_ENV === "development" && err.stack ? { stack: err.stack } : {}),
        };
    }

    // Fallback for strings or other types
    return {
        success: false,
        statusCode: 500,
        message: String(err),
        errors: [],
    };
}

export default serializeError;
