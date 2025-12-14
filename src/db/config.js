import { Redis } from "@upstash/redis/cloudflare";
import mongoose from "mongoose";
import {databaseUrl,redisToken,redisUrl} from "../imports/import.js"

// Production-grade Redis configuration
const redisConfig = {
	url: redisUrl,
	token: redisToken,
	retry: {
		retries: 3,
		backoff: (retryCount) => Math.min(1000 * 2 ** retryCount, 30000)
	},
	automaticDeserialization: false
};

let redisClient = null;
let redisConnected = false;

export function getRedisClient() {
	if (!redisClient) {
		if (!redisConfig.url || !redisConfig.token) {
			console.warn('⚠️ Redis credentials missing - Redis disabled');
			return null;
		}
		redisClient = new Redis(redisConfig);
		testRedisConnection();
	}
	return redisClient;
}

async function testRedisConnection() {
	try {
		await redisClient.ping();
		redisConnected = true;
		console.log('✅ Redis connected successfully');
	} catch (error) {
		redisConnected = false;
		console.error('❌ Redis connection failed:', error.message);
	}
}

export function isRedisConnected() {
	return redisConnected;
}

// mongodb connection
export async function connectionDb() {
	try {
		const dburl = databaseUrl;
		if (!dburl) {
			console.warn("⚠️ DATABASE_URL missing - MongoDB disabled");
			return;
		}
		mongoose.connect(dburl);
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


/** check connections for debug purpose 
await connectionDb();
// Redis only if credentials exist
getRedisClient();

*/