import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

function makeSlug(text) {
    return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")   // remove non-alphanumeric
        .replace(/\s+/g, "-")           // spaces -> dashes
        .replace(/-+/g, "-");           // collapse multiple dashes
}

const blogsModel = new mongoose.Schema(
    {
        blogId: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "authentications",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        publishedTime: {
            type: Date,
            default: Date.now,
            required: true,
        },
        readTime: {
            type: Number,
            default: 10,
            required: true,
        },
        featuredImage: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

// ✅ Single document: auto-generate unique slug from title
blogsModel.pre("validate", async function (next) {
    // If title not changed and slug already set, skip
    if (!this.isModified("title") && this.slug) return next();

    const baseSlug = makeSlug(this.title || "");
    let slug = baseSlug || uuidv4();
    let counter = 1;

    // Use this.constructor (the model) to check uniqueness
    const Model = this.constructor;

    while (await Model.findOne({ slug })) {
        slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
    next();
});

// ✅ Bulk insert: also generate unique slugs for every doc
blogsModel.pre("insertMany", async function (next, docs) {
    try {
        const usedSlugs = new Set();

        for (const doc of docs) {
            if (doc.slug) {
                // if caller provided slug, still ensure no clash within this batch
                if (usedSlugs.has(doc.slug)) {
                    let baseSlug = doc.slug;
                    let slug = baseSlug;
                    let counter = 1;
                    while (usedSlugs.has(slug) || await mongoose.model("blogs").findOne({ slug })) {
                        slug = `${baseSlug}-${counter++}`;
                    }
                    doc.slug = slug;
                }
                usedSlugs.add(doc.slug);
                continue;
            }

            const baseSlug = makeSlug(doc.title || "");
            let slug = baseSlug || uuidv4();
            let counter = 1;

            // avoid clashes with db and within this batch
            // eslint-disable-next-line no-await-in-loop
            while (
                usedSlugs.has(slug) ||
                await mongoose.model("blogs").findOne({ slug })
                ) {
                slug = `${baseSlug}-${counter++}`;
            }

            doc.slug = slug;
            usedSlugs.add(slug);
        }

        next();
    } catch (err) {
        next(err);
    }
});

const BlogSchema =
    mongoose.models.blogs || mongoose.model("blogs", blogsModel);

export default BlogSchema;
