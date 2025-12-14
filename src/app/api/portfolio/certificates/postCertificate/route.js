import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config.js";
import {JwtTokenData} from "@/utils/tokendata.js";
import {checkAdminPrivilege} from "@/utils/isAdmin.js";
import CertificateSchema from "@/models/portfolio/certificate.model";

export async function POST(request) {
    try {
        await connectionDb();
        // token exists?
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                {success: false, error: "Invalid token or Unauthorized User"},
                {status: 401}
            );
        }

        // decode token
        const {id: userId} = JwtTokenData(request);
        if (!userId) {
            return NextResponse.json(
                {success: false, error: "userid not found"},
                {status: 401}
            );
        }

        // NOTE: only keep this if *only admins* should create hero profiles
        const adminCheck = await checkAdminPrivilege(request);
        if (!adminCheck.isAdmin) {
            const status = adminCheck.status || 403;
            const error = adminCheck.error || "Access Denied: Admins Only";
            return NextResponse.json({success: false, error}, {status});
        }
        const reqBody = await request.json()
        const {name, issuer, issueDate, expiryDate, credentialId,description, credentialUrl, logo, skills} = reqBody;

        const certificateData = new CertificateSchema({
            userid: userId,
            name,
            issuer,
            issueDate,
            expiryDate,
            credentialUrl,
            logo,
            description,
            skills,
            credentialId
        })
        const savedCertificate = await certificateData.save()
        return NextResponse.json({success: true, certificate: savedCertificate},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, error: error});
    }
}