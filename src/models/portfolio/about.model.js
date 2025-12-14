import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const aboutModel = new mongoose.Schema({
    aboutId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authentications",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:[String],
        required:true
    }
})

const AboutSchema = mongoose.models.about || mongoose.model("aboutschema",aboutModel);
export default AboutSchema;