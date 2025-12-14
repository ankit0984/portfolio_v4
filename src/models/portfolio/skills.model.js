import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const SkillModel = new mongoose.Schema({
    skillsId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authentications",
        required:true
    },
    skills:{
        type:[
            {
                technologies:{
                    type:String,
                    required:true,
                },
                category:{
                    type:String,
                    required:true,
                },
                proficiency:{
                    type:Number,
                    required:true,
                }
            }
        ],
        required:[true,"skills required "],
    },
    title:{
        type:String,
        required:[true,"title is required"],
    },
})
const SkillSchema = mongoose.models.skills || mongoose.model("skills",SkillModel);
export default SkillSchema;