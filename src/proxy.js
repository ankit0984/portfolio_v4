import { NextResponse } from "next/server";

const BOT_REGEX = /bot|crawl|spider|slurp|facebook|whatsapp/i;

export default function middleware(req) {
	const ua = req.headers.get("user-agent") || "";

	if (BOT_REGEX.test(ua)) {
		return NextResponse.next({ headers: { "x-bot": "1" } });
	}

	return NextResponse.next();
}
