import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import SectionsSchema from "@/models/portfolio/sections.model";

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


// todo: added post hook (experimental)

projectModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        { $pull: { projects: { id: this.projectId } } }
    );

    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            $addToSet: {
                projects: {
                    id: this.projectId,
                    title: this.title,
                    category: this.category,
                },
            },
        },
        { upsert: true }
    );
});

projectModel.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    await SectionsSchema.findOneAndUpdate(
        { userid: doc.userid },
        { $pull: { projects: { id: doc.projectId } } }
    );
});



const ProjectSchema = mongoose.models.projects || mongoose.model("projects",projectModel);
export default ProjectSchema;