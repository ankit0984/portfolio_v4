
import { NextResponse } from "next/server";
import {connectionDb} from "@/db/config";
import { getGeo } from "@/utils/geo";
import VisitorModel from "@/models/visitor.model";
import {isRateLimited} from "@/utils/rateLimit";
import StatsModel from "@/models/stats.model";
export async function POST(req) {
    if (req.headers.get("x-bot") === "1") {
        return NextResponse.json({ ignored: true });
    }

    await connectionDb();

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // const ipHash = crypto
    //     .createHash("sha256")
    //     .update(ip)
    //     .digest("hex");

    const { country, city } = await getGeo(ip);

    // Save raw visit (optional)
    await VisitorModel.create({
        ip,
        country,
        city
    });

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    // 🔥 GEO AGGREGATION
    await StatsModel.updateOne(
        {
            period: "geo",
            year,
            month,
            country,
            city
        },
        {
            $inc: { visitors: 1 },
            $set: { updatedAt: new Date() }
        },
        { upsert: true }
    );

    return NextResponse.json({ success: true });
}
