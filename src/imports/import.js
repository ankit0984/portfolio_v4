import { config } from "dotenv";
config({ path: "../../.env" });

const databaseUrl = process.env.DATABASE_URL;
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const tokenSecret = process.env.TOKEN_SECRET;
const smtpHost= process.env.SMTP_HOST;
const smtpPort= process.env.SMTP_PORT;
const smtpUser= process.env.SMTP_USER;
const smtpPass= process.env.SMTP_PASS;
const senderEmail= process.env.SENDER_EMAIL;

export { databaseUrl, redisUrl, redisToken, tokenSecret,smtpHost,smtpPass,smtpPort,smtpUser,senderEmail };