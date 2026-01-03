// import { NextResponse } from "next/server";
// import SHA256 from "crypto-js/sha256";
// import encHex from "crypto-js/enc-hex";
// import {connectionDb} from "@/db/config";
// import { getGeo } from "@/utils/geo";
// import {isRateLimited} from "@/utils/rateLimit";
// import StatsModel from "@/models/stats.model";
// import VisitorModel from "@/models/visitor.model";
// import VisitorSessionModel from "@/models/VisitorSession.model";
//
// export async function POST(req) {
//     if (req.headers.get("x-bot") === "1") {
//         return NextResponse.json({ ignored: true });
//     }
//
//     await connectionDb()
//     const ip =
//         req.headers.get("x-forwarded-for")?.split(",")[0] ||
//         "unknown";
//
//     if (isRateLimited(ip)) {
//         return NextResponse.json({ error: "Too many requests" }, { status: 429 });
//     }
//
//     const body = await req.json().catch(() => ({}));
//     const path = body?.path || "/";
//     const referrer = body?.referrer || null;
//
//     const ipHash = SHA256(ip).toString(encHex);
//     const userAgent = req.headers.get("user-agent");
//
//     const { country, region, city } = await getGeo(ip);
//
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth() + 1;
//
//     // ✅ 1. Save RAW visit
//     await VisitorModel.create({
//         ipHash,
//         userAgent,
//         country,
//         region,
//         city,
//         path,
//     });
//
//     // ✅ 2. Unique visitor detection
//     let isNewVisitor = false;
//     try {
//         await VisitorSessionModel.create({
//             ipHash,
//             year,
//             month,
//             country,
//             region,
//             city
//         });
//         isNewVisitor = true;
//     } catch {
//         isNewVisitor = false;
//     }
//
//     // ✅ 3. Increment stats ONLY if unique
//     if (isNewVisitor) {
//         await StatsModel.updateOne(
//             { period: "geo", year, month, country, region: null, city: null },
//             { $inc: { visitors: 1 }, $set: { updatedAt: new Date() } },
//             { upsert: true }
//         );
//
//         await StatsModel.updateOne(
//             { period: "geo", year, month, country, region, city: null },
//             { $inc: { visitors: 1 }, $set: { updatedAt: new Date() } },
//             { upsert: true }
//         );
//
//         await StatsModel.updateOne(
//             { period: "geo", year, month, country, region, city },
//             { $inc: { visitors: 1 }, $set: { updatedAt: new Date() } },
//             { upsert: true }
//         );
//     }
//
//     return NextResponse.json({
//         success: true,
//         isNewVisitor
//     });
// }


import { NextResponse } from "next/server";
import SHA256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";
import {connectionDb} from "@/db/config";
import { getISOWeek } from "@/lib/date";
import { isRateLimited } from "@/utils/rateLimit";
import StatsModel from "@/models/stats.model";
import VisitorSessionModel from "@/models/VisitorSession.model";
import VisitorModel from "@/models/visitor.model";

export async function POST(req) {
    await connectionDb()
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const path = body?.path || "/";
    const referrer = body?.referrer || null;

    const ipHash = SHA256(ip).toString(encHex);
    const userAgent = req.headers.get("user-agent");

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const week = getISOWeek(now);

    // 1️⃣ Save raw visit
    await VisitorModel.create({
        ipHash,
        userAgent,
        path,
        referrer
    });

    // 2️⃣ Unique visitor (per month)
    let isNewVisitor = false;
    try {
        await VisitorSessionModel.create({
            ipHash,
            year,
            month,
            week
        });
        isNewVisitor = true;
    } catch {
        isNewVisitor = false;
    }

    // 3️⃣ Update stats ONLY if unique
    if (isNewVisitor) {
        // Monthly
        await StatsModel.updateOne(
            { period: "monthly", year, month },
            { $inc: { visitors: 1 }, $set: { updatedAt: new Date() } },
            { upsert: true }
        );

        // Weekly
        await StatsModel.updateOne(
            { period: "weekly", year, week },
            { $inc: { visitors: 1 }, $set: { updatedAt: new Date() } },
            { upsert: true }
        );
    }

    return NextResponse.json({ success: true, isNewVisitor });
}