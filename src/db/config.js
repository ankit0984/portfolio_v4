import mongoose from "mongoose";
import {databaseUrl} from "@/imports/import";

// mongodb connection
export async function connectionDb() {
	try {
		const dburl = databaseUrl;
		if (!dburl) {
			console.warn("⚠️ DATABASE_URL missing - MongoDB disabled");
			return;
		}
		await mongoose.connect(dburl);
		const connection = mongoose.connection;
		connection.on("connected", () => {
			console.log("✅ MongoDB connected");
		});
		connection.on("error", (err) => {
			console.log("❌ MongoDB connection error: " + err);
			process.exit(1);
		});
	} catch (error) {
		console.log(error, "MongoDB connection failed");
	}
}