// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";
//
// const heroModel = new mongoose.Schema({
//     heroId: {
//         type: String,
//         default: uuidv4, // generates a unique UUID when new doc is created
//         unique: true,
//     },
//     userid:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"authentications",
//         required:true
//     },
//     fullName:{
//         type:String,
//         required:[true,"Full name required"]
//     },
//     email:{
//         type:String,
//         required:[true,"Email required"]
//     },
//     location:{
//         type:String,
//         required:[true,"Location required"]
//     },
//     flipText: {
//         type: [String], // <-- make this an array of strings
//         required: [true, "Flip text is required (array of strings)"],
//     },
//     bio:{
//         type:String,
//         required:[true,"provide project description"]
//     },
//     socialLinks: {
//         type: [
//             {
//                 platform: {
//                     type: String,
//                     enum: ["github", "youtube", "medium", "leetcode"],
//                     required: true,
//                 },
//                 url: {
//                     type: String,
//                     required: true,
//                 },
//             },
//         ],
//         validate: {
//             validator: function (arr) {
//                 // Ensure each of the 4 platforms appears only once
//                 const platforms = arr.map((item) => item.platform);
//                 return new Set(platforms).size === platforms.length;
//             },
//             message: "Each social platform should appear only once.",
//         },
//         required: true,
//     },
//     imageUrl:{
//         type:String,
//         required:[true,"provide project image url"]
//     }
// })
// const HeroSchema = mongoose.models.hero || mongoose.model("heroschema",heroModel);
// export default HeroSchema;
//
// src/models/portfolio/hero.model.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import SectionsSchema from "@/models/portfolio/sections.model";

const heroModel = new mongoose.Schema({
    heroId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authentications",
        required: true,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },

    flipText: {
        type: [String],
        required: true,
    },

    bio: { type: String, required: true },

    socialLinks: {
        type: [
            {
                platform: {
                    type: String,
                    enum: ["github", "youtube", "medium", "leetcode"],
                    required: true,
                },
                url: { type: String, required: true },
            },
        ],
        validate: {
            validator: function (arr) {
                const platforms = arr.map((item) => item.platform);
                return new Set(platforms).size === platforms.length;
            },
            message: "Each social platform should appear only once.",
        },
        required: true,
    },

    imageUrl: { type: String, required: true },
});

// todo: added post hook (experimental)
heroModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            hero: {
                id: this.heroId,
                name: this.fullName,
            },
        },
        { upsert: true }
    );
});

const HeroSchema = mongoose.models.Hero || mongoose.model("Hero", heroModel);
export default HeroSchema;
