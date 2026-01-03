import { NextResponse } from "next/server";
import { calculateGrowth } from "@/lib/growth";
import StatsModel from "@/models/stats.model";
import {connectionDb} from "@/db/config";

export async function GET() {
    await connectionDb()

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    /* ---------------- WEEKLY ---------------- */

    const weeklyStats = await StatsModel.find({
        period: "weekly",

        year
    })
        .sort({ week: 1 })
        .select("week visitors -_id");

    const currentWeek = weeklyStats.at(-1);
    const previousWeek = weeklyStats.at(-2);

    const wowGrowth = calculateGrowth(
        currentWeek?.visitors || 0,
        previousWeek?.visitors || 0
    );

    /* ---------------- MONTHLY ---------------- */

    const monthlyStats = await StatsModel.find({
        period: "monthly",
        year
    })
        .sort({ month: 1 })
        .select("month visitors -_id");

    const currentMonth = monthlyStats.at(-1);
    const previousMonth = monthlyStats.at(-2);

    const momGrowth = calculateGrowth(
        currentMonth?.visitors || 0,
        previousMonth?.visitors || 0
    );

    /* ---------------- LAST 3 MONTHS ---------------- */

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
    }).select("year month visitors -_id");

    /* ---------------- TOTAL VISITORS ---------------- */

    const totalAgg = await StatsModel.aggregate([
        { $match: { period: "monthly" } },
        { $group: { _id: null, total: { $sum: "$visitors" } } }
    ]);

    const totalVisitors = totalAgg[0]?.total || 0;

    return NextResponse.json({
        weekly: weeklyStats,
        monthly: monthlyStats,
        growth: {
            wow: {
                currentWeek: currentWeek?.week || null,
                percentage: wowGrowth
            },
            mom: {
                currentMonth: currentMonth?.month || null,
                percentage: momGrowth
            }
        },
        last3Months: last3MonthsData,
        totalVisitors
    });
}
