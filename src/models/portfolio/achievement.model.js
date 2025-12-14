import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const achievementModel = new mongoose.Schema({
    achievementId:{
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
    type:{
        type:String,
        required:true
    },
    issuer:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    url:{
        type:String,
    },
    featured:{
        type:Boolean,
        required:true
    }
})

const AchievementSchema = mongoose.models.achievement || mongoose.model("achievement", achievementModel);
export default AchievementSchema;