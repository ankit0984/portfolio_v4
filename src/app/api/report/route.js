import { NextResponse } from "next/server";
import {connectionDb} from "@/db/config";
import StatsModel from "@/models/stats.model";

export async function GET() {
    await connectionDb()
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    // 1️⃣ Weekly visitors (current year)
    const weekly = await StatsModel.find({
        period: "weekly",
        year
    })
        .sort({ week: 1 })
        .select("week visitors -_id");

    // 2️⃣ Monthly visitors (current year)
    const monthly = await StatsModel.find({
        period: "monthly",
        year
    })
        .sort({ month: 1 })
        .select("month visitors -_id");

    // 3️⃣ Last 3 months visitors
    const lastThreeMonths = [];
    for (let i = 0; i < 3; i++) {
        const d = new Date(year, month - 1 - i);
        lastThreeMonths.push({
            year: d.getFullYear(),
            month: d.getMonth() + 1
        });
    }

    const last3MonthsData = await StatsModel.find({
        period: "monthly",
        $or: lastThreeMonths
    })
        .sort({ year: 1, month: 1 })
        .select("year month visitors -_id");

    // 4️⃣ Total visitors (lifetime)
    const totalAgg = await StatsModel.aggregate([
        { $match: { period: "monthly" } },
        { $group: { _id: null, total: { $sum: "$visitors" } } }
    ]);

    const totalVisitors = totalAgg[0]?.total || 0;

    return NextResponse.json({
        weekly,
        monthly,
        last3Months: last3MonthsData,
        totalVisitors
    });
}
