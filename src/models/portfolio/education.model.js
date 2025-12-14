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

const EducationSchema = mongoose.models.education || mongoose.model("education",educationModel);
export default EducationSchema;