import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import isURL from "validator/lib/isURL";
import SectionsSchema from "@/models/portfolio/sections.model";

const experienceModel = new mongoose.Schema({
    experienceId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authentications",
        required: [true, "userid is required"]
    },
    categoryId: {
        type: String,
        required: true,
        index: true
    },
    category: {
        type: String,
        required: [true, "provide category of your profile."],
    },
    company: {
        type: String,
        required: [true, "provide company name"],
        trim: true,
        minlength: [2, "company name too short"]
    },
    position: {
        type: String,
        required: [true, "provide your job role"],
        trim: true
    },
    // example: restrict to common employment types (optional)
    employment_type: {
        type: String,
        required: [true, "provide employment_type"],
        enum: {
            values: ["full-time", "part-time", "contract", "internship", "freelance", "temporary"],
            message: "employment_type must be one of full-time, part-time, contract, internship, freelance, temporary"
        }
    },
    location: {
        type: String,
        required: [true, "provide company location category"],
        trim: true
    },
    start_date: {
        type: Date,
        required: [true, "provide experience start_date"]
    },
    end_date: {
        type: Date,
        // not always required if `current` === true — we'll enforce with custom logic
    },
    current: {                  // store boolean instead of string
        type: Boolean,
        required: [true, "provide employment current (true/false)"],
        default: false
    },
    description: {
        type: [String],
        required: [true, "provide experience description"],
        validate: {
            validator: arr => Array.isArray(arr) && arr.length > 0,
            message: "description must be a non-empty array of strings"
        }
    },
    responsibilities: {
        type: [String],
        required: [true, "provide experience responsibilities"],
        validate: {
            validator: arr => Array.isArray(arr) && arr.length > 0,
            message: "responsibilities must be a non-empty array of strings"
        }
    },
    achievements: {
        type: [String],
        default: []
    },
    technologies: {
        type: [String],
        required: [true, "provide experienced technologies"],
        validate: {
            validator: arr => Array.isArray(arr) && arr.length > 0,
            message: "technologies must be a non-empty array"
        }
    },
    company_logo: {
        type: String,
        required: [true, "provide company image url"],
        validate: {
            validator: v => isURL(v, { require_protocol: true }),
            message: props => `${props.value} is not a valid URL`
        }
    }
}, {
    timestamps: true
});

// todo: added post hook (experimental)

experienceModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        { $pull: { experience: { id: this.experienceId } } }
    );

    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            $addToSet: {
                experience: {
                    id: this.experienceId,
                    company: this.company,
                    position: this.position,
                },
            },
        },
        { upsert: true }
    );
});

experienceModel.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    await Sections.findOneAndUpdate(
        { userid: doc.userid },
        { $pull: { experience: { id: doc.experienceId } } }
    );
});



const ExperienceSchema = mongoose.models.experience || mongoose.model("experience",experienceModel);
export default ExperienceSchema;