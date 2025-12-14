import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import Auth from "@/models/user.model";
import jwt from "jsonwebtoken";
import VerificationEmail from "@/template/verifyEmail";
import PasswordReset from "@/template/passwordreset";
import { tokenSecret,smtpHost,smtpPort,smtpUser,smtpPass,senderEmail } from "../imports/import.js";

export const sendEmail = async ({ email, emailType, userId, username }) => {
	try {
		const hashedToken = bcrypt.hashSync(userId.toString(), 10); // bcrypt for verify email

		const token = jwt.sign({ userId }, tokenSecret, {
			expiresIn: "1h",
		}); //jwt for reset password

		let actionUrl;
		if (emailType === "VERIFY") {
			actionUrl = `${
				process.env.DOMAIN_URL
			}/verifyemail?token=${encodeURIComponent(hashedToken)}`;
			await Auth.findByIdAndUpdate(userId, {
				verifytoken: hashedToken,
				verifytokenexpiry: Date.now() + 5 * 60 * 1000, // 5 minutes instead of 10
			});
		} else if (emailType === "RESET") {
			await Auth.findByIdAndUpdate(userId, {
				forgotpasswordtoken: token,
				forgotpasswordtokenexpiry: Date.now() + 5 * 60 * 1000, // 5 minutes instead of 10,
			});
			actionUrl = `${process.env.DOMAIN_URL}/reset-password?token=${token}`;
		} else {
			throw new Error("Invalid emailType provided");
		}

		let htmlContent;
		if (emailType === "VERIFY") {
			htmlContent = await render(
				<VerificationEmail username={username} verificationUrl={actionUrl} />
			);
		} else if (emailType === "RESET") {
			htmlContent = await render(
				<PasswordReset username={username} resetUrl={actionUrl} />
			);
		}

		const transporter = nodemailer.createTransport({
			host: smtpHost,
			port: smtpPort,
			auth: {
				user: smtpUser,
				pass: smtpPass,
			},
		});

		const mailoptions = {
			from: senderEmail,
			to: email,
			subject: emailType === "VERIFY" ? "verify email" : "Reset your password",
			html: htmlContent,
		};
		const mailresponse = await transporter.sendMail(mailoptions);
		return mailresponse;
	} catch (error) {
		console.log(error.message);
		throw new Error(error.message);
	}
};
