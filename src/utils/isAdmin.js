import Auth from "@/models/user.model";
import { JwtTokenData } from "@/utils/tokendata";

export async function checkAdminPrivilege(request) {
	try {
		// Decode JWT using your existing helper
		const decoded = JwtTokenData(request);

		if (!decoded?.id) {
			console.log("⚠️ Invalid or missing token in admin check");
			return { isAdmin: false, error: "Invalid token", status: 401 };
		}

		// ✅ If JWT already includes `isAdmin`, trust it
		if (typeof decoded.isAdmin !== "undefined") {
			if (decoded.isAdmin) {
				return { isAdmin: true, user: decoded };
			} else {
				return {
					isAdmin: false,
					error: "Access Denied: Admins Only",
					status: 403,
				};
			}
		}

		// 🧭 Otherwise verify via DB
		const user = await Auth.findById(decoded.id).select(
			"isAdmin username email"
		);

		if (!user) {
			return { isAdmin: false, error: "User not found", status: 401 };
		}

		if (!user.isAdmin) {
			return {
				isAdmin: false,
				error: "Access Denied: Admins Only",
				status: 403,
			};
		}

		return { isAdmin: true, user };
	} catch (error) {
		return {
			isAdmin: false,
			error: "Internal Server Error",
			status: 500,
		};
	}
}