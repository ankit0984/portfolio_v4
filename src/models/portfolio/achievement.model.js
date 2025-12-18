import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";
import SectionsSchema from "@/models/portfolio/sections.model";

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

// todo: added post hook (experimental)
achievementModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        { $pull: { achievements: { id: this.achievementId } } }
    );

    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            $addToSet: {
                achievements: {
                    id: this.achievementId,
                    title: this.title,
                },
            },
        },
        { upsert: true }
    );
});

achievementModel.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    await SectionsSchema.findOneAndUpdate(
        { userid: doc.userid },
        { $pull: { achievements: { id: doc.achievementId } } }
    );
});


const AchievementSchema = mongoose.models.achievement || mongoose.model("achievement", achievementModel);
export default AchievementSchema;