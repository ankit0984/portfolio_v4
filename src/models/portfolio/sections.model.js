import mongoose from "mongoose";

const RefWithTitleSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },      // UUID
        title: { type: String, required: true },   // name / title
    },
    { _id: false }
);

const sectionsSchema = new mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "authentications",
            required: true,
            unique: true,
        },

        /* ===== SINGLE SECTIONS ===== */
        hero: {
            id: String,
            name: String, // fullName
        },

        about: {
            id: String,
            title: String,
        },

        contact: {
            id: String,
            email: String,
        },

        /* ===== MULTI SECTIONS ===== */
        blogs: {
            type: [RefWithTitleSchema], // blogId + title
            default: [],
        },

        achievements: {
            type: [RefWithTitleSchema], // achievementId + title
            default: [],
        },

        certifications: {
            type: [
                {
                    id: { type: String, required: true },      // certificationId
                    name: { type: String, required: true },    // certificate name
                    issuer: { type: String },
                },
            ],
            default: [],
        },

        education: {
            type: [
                {
                    id: { type: String, required: true },      // educationId
                    institution: { type: String, required: true },
                    degree: { type: String, required: true },
                },
            ],
            default: [],
        },

        experience: {
            type: [
                {
                    id: { type: String, required: true },      // experienceId
                    company: { type: String, required: true },
                    position: { type: String, required: true },
                },
            ],
            default: [],
        },

        projects: {
            type: [
                {
                    id: { type: String, required: true },      // projectId
                    title: { type: String, required: true },
                    category: { type: String },
                },
            ],
            default: [],
        },

        services: {
            type: [
                {
                    id: { type: String, required: true },      // serviceId
                    title: { type: String, required: true },
                    featured: { type: Boolean },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

const SectionsSchema =
    mongoose.models.Sections || mongoose.model("Sections", sectionsSchema);

export default SectionsSchema;
