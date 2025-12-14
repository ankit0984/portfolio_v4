// import {checkAdminPrivilege} from "@/utils/isAdmin";
// import {ApiError} from "@/utils/apiError";
//
// export default async function EnsureAdmin(request){
//
//     // try {
//     //     // 🔹 token exists?
//     //     const token = request.cookies.get("token")?.value;
//     //     if (!token) {
//     //         throw new ApiError(401, "Invalid token or Unauthorized User");
//     //     }
//     //
//     //     // NOTE: only keep this if *only admins* should create hero profiles
//     //     const adminCheck = await checkAdminPrivilege(request);
//     //     if (!adminCheck.isAdmin) {
//     //         throw new ApiError(403, `${adminCheck.error} || Access Denied: Admins Only `)
//     //     }
//     // }catch (error) {
//     //     throw new ApiError(500,`Something went wrong: ${error}`);
//     // }
//
//     // token check (synchronous)
//     const token = request?.cookies?.get?.("token")?.value;
//     if (!token) {
//         throw new ApiError(401, "Invalid token or Unauthorized User");
//     }
//
//     try {
//         const adminCheck = await checkAdminPrivilege(request);
//         if (!adminCheck || !adminCheck.isAdmin) {
//             // adminCheck may include `.error` explaining why
//             throw new ApiError(403, `${adminCheck?.error || "Access Denied"} - Admins Only`);
//         }
//
//         // Optionally return something useful
//         return { ok: true, isAdmin: true };
//     } catch (err) {
//         // If it's already an ApiError, preserve it (don't wrap)
//         if (err instanceof ApiError) {
//             throw err;
//         }
//
//         // Unexpected error -> wrap as 500 but preserve message
//         throw new ApiError(500, `Error checking admin privilege: ${err?.message || String(err)}`);
//     }
//
// }

//
// import { checkAdminPrivilege } from "@/utils/isAdmin";
// import { ApiError } from "@/utils/apiError";
//
// export default async function EnsureAdmin(request) {
//     const token = request.cookies.get("token")?.value;
//
//     if (!token) {
//         throw new ApiError(401, "Invalid token or Unauthorized User");
//     }
//
//     try {
//         const adminCheck = await checkAdminPrivilege(request);
//
//         if (!adminCheck.isAdmin) {
//             throw new ApiError(
//                 403,
//                 `${adminCheck.error || "Forbidden"} - Admins Only`
//             );
//         }
//
//         return true;
//     } catch (err) {
//         if (err instanceof ApiError) throw err;
//
//         throw new ApiError(500, err.message || "Something went wrong");
//     }
// }

//  version 3
// utils/ensureAdmin.js
import { checkAdminPrivilege } from "@/utils/isAdmin";
import { ApiError } from "@/utils/apiError";

/**
 * EnsureAdmin: verifies the request belongs to an admin user.
 *
 * Returns the adminCheck object on success (so callers can read user info),
 * and throws ApiError on any failure (rich with request metadata via ApiError.from).
 *
 * @param {NextRequest | { headers, cookies, ... }} request
 * @returns {Promise<Object>} adminCheck  (e.g. { isAdmin: true, user: {...} })
 * @throws {ApiError}
 */
export default async function EnsureAdmin(request) {
    // Robust token extraction: cookie 'token' preferred, fallback to Authorization header Bearer token
    const cookieToken = request?.cookies?.get?.("token")?.value ?? request?.cookies?.get?.("token")?.value;
    const authHeader = request?.headers?.get?.("authorization") || request?.headers?.get?.("Authorization");
    const bearerToken = authHeader && typeof authHeader === "string"
        ? authHeader.replace(/^Bearer\s+/i, "").trim()
        : null;

    const token = cookieToken || bearerToken;

    if (!token) {
        // Use ApiError.from to capture request metadata
        throw ApiError.from(request, 401, "Missing authentication token or unauthorized", ["token_missing"]);
    }

    try {
        // If your checkAdminPrivilege needs the token, pass it. If it only needs request, keep as-is.
        // Adjust the signature below if your isAdmin util accepts (request, token) or just request.
        const adminCheck = await checkAdminPrivilege(request, token);

        // normalize result checks
        if (!adminCheck) {
            throw ApiError.from(request, 500, "Admin check did not return a result", ["admin_check_failed"]);
        }

        if (!adminCheck.isAdmin) {
            // If the isAdmin util provides an error message, use it; else default to Forbidden
            const message = adminCheck.error ? `${adminCheck.error} - Admins Only` : "Forbidden - Admins Only";
            throw ApiError.from(request, 403, message, adminCheck.errors || ["not_admin"]);
        }

        // success: return adminCheck so callers can read user data if needed
        return adminCheck;
    } catch (err) {
        // rethrow ApiError instances untouched
        if (err instanceof ApiError) {
            throw err;
        }

        // wrap unexpected errors with context
        const extraMeta = {
            originalErrorName: err?.name || "Error",
            originalMessage: err?.message || String(err)
        };

        throw ApiError.from(request, 500, err?.message || "Something went wrong during admin verification", [err?.message || "internal_error"], extraMeta);
    }
}

