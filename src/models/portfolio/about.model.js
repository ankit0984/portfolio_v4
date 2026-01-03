import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import SectionsSchema from "@/models/portfolio/sections.model";

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
// todo: added post hook (experimental)

aboutModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            about: {
                id: this.aboutId,
                title: this.title,
            },
        },
        { upsert: true }
    );
});
const AboutSchema = mongoose.models.about || mongoose.model("about",aboutModel);
export default AboutSchema;