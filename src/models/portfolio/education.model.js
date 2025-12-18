import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const educationModel = new mongoose.Schema({
    educationId: {
        type: String,
        default: uuidv4,
        unique: true,
    },

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authentications",
        required: true
    },
    institution:{
        type:String,
        required:[true,"institution name is required"],
    },
    degree:{
        type:String,
        required:[true,"degree name is required"],
    },
    fieldOfStudy:{
        type:String,
        required:[true,"fieldOfStudy name is required"],
    },
    start_date:{
        type:Date,
        required:[true,"start_date is required"],
    },
    end_date:{
        type: Date,
        required: [true,"education completion date is required"],
    },
    current:{
        type:Boolean,
        default: false,
        required:true
    },
    gpa:{
        type:Number,
    },
    achievement:{
        type:[String],
        required:[true, "achievements required."],
    },
    description:{
        type:String,
        required:[true, "Description is required"],
    },

})


// todo: added post hook (experimental)
import SectionsSchema from "@/models/portfolio/sections.model";

educationModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        { $pull: { education: { id: this.educationId } } }
    );

    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            $addToSet: {
                education: {
                    id: this.educationId,
                    institution: this.institution,
                    degree: this.degree,
                },
            },
        },
        { upsert: true }
    );
});

// insert bulk data
educationModel.post("insertMany", async function (docs) {
    if (!Array.isArray(docs) || docs.length === 0) return;

    // Group by userid to minimize DB round-trips
    const byUser = new Map();
    for (const d of docs) {
        const key = String(d.userid);
        if (!byUser.has(key)) byUser.set(key, []);
        byUser.get(key).push({
            id: d.educationId,
            institution: d.institution,
            degree: d.degree,
        });
    }

    const ops = [];
    for (const [userid, items] of byUser) {
        ops.push(
            SectionsSchema.updateOne(
                { userid },
                { $addToSet: { education: { $each: items } } },
                { upsert: true }
            )
        );
    }

    await Promise.all(ops);
});
educationModel.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    await SectionsSchema.findOneAndUpdate(
        { userid: doc.userid },
        { $pull: { education: { id: doc.educationId } } }
    );
});



const EducationSchema = mongoose.models.education || mongoose.model("education",educationModel);
export default EducationSchema;