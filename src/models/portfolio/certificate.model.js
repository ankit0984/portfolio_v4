import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

const CertificateSchema = mongoose.models.certification || mongoose.model("certification",certificationModel);
export default CertificateSchema;