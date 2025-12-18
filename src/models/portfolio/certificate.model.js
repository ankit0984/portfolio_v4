import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import SectionsSchema from "@/models/portfolio/sections.model";

const certificationModel = new mongoose.Schema({
    certificationId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authentications",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    issuer:{
        type:String,
        required:true
    },
    issueDate:{
        type:Date,
        required:true
    },
    expiryDate:{
        type:Date,
        default:null
    },
    credentialId:{
        type:String,
        required:true
    },
    credentialUrl:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    skills:{
        type:[
            {
                name:{
                    type:String,
                    required:true
                },
                category:{
                    type:String,
                    required:true
                }
            }
        ],
    },
    description:{
        type:String,
        required:true
    }
})

// todo: added post hook (experimental)
certificationModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        { $pull: { certifications: { id: this.certificationId } } }
    );

    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            $addToSet: {
                certifications: {
                    id: this.certificationId,
                    name: this.name,
                    issuer: this.issuer,
                },
            },
        },
        { upsert: true }
    );
});
certificationModel.post("insertMany", async function (docs) {
    if (!docs || docs.length === 0) return;

    // Group certifications by userid
    const grouped = new Map();

    for (const doc of docs) {
        if (!grouped.has(doc.userid.toString())) {
            grouped.set(doc.userid.toString(), []);
        }

        grouped.get(doc.userid.toString()).push({
            id: doc.certificationId,
            name: doc.name,
            issuer: doc.issuer,
        });
    }

    // Update sections per user
    for (const [userid, certs] of grouped.entries()) {
        // Remove possible duplicates first
        await SectionsSchema.findOneAndUpdate(
            { userid },
            {
                $pull: {
                    certifications: { id: { $in: certs.map(c => c.id) } },
                },
            }
        );

        // Add all certifications
        await SectionsSchema.findOneAndUpdate(
            { userid },
            {
                $addToSet: {
                    certifications: { $each: certs },
                },
            },
            { upsert: true }
        );
    }
});


const CertificateSchema = mongoose.models.certification || mongoose.model("certification",certificationModel);
export default CertificateSchema;