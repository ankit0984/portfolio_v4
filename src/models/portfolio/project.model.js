import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const projectModel = new mongoose.Schema({
    projectId: {
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
        required:[true,"provide project title"]
    },
    description:{
        type:String,
        required:[true,"provide project description"]
    },
    liveUrl:{
        type:String,
        required:[true,"provide project live url"]
    },
    category:{
        type:String,
        required:[true,"provide project category"]
    },
    technologies:{
        type:[String],
        required:[true,"provide project technologies"]
    },
    coverImage:{
        type:String,
        required:[true,"provide project image url"]
    },
    githubUrl:{
        type:String,
        required:[true,"provide project link"]
    },
})
const ProjectSchema = mongoose.models.projects || mongoose.model("projects",projectModel);
export default ProjectSchema;