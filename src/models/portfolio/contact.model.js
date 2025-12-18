import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import HeroModel from "@/models/portfolio/hero.model";
import SectionsSchema from "@/models/portfolio/sections.model";


const contactModel = new mongoose.Schema({
    contactId: {
        type: String,
        default: uuidv4, // pass the function, mongoose will call it per-doc
        unique: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authentications",
        required: true,
    },

    // recommended: keep DB relation to hero document
    heroRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hero", // ensure hero model is defined as mongoose.model("Hero", ...)
        required: false, // set required:true if you always want a hero link
    },

    // optional: store the hero public UUID (string), useful for URLs or external lookups
    heroId: {
        type: String,
        required: false,
    },

    email: { type: String, lowercase: true, required: true },
    phone: { type: Number, required: true },
    location: { type: String, required: true },

    socialLinks: [
        {
            platform: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
});

// pre-validate: fill email and heroRef/heroId from Hero doc
contactModel.pre("validate", async function (next) {
    try {
        // Find hero by userid. If you need to find by heroId instead,
        // change the filter to { heroId: someValue }.
        const hero = await HeroModel.findOne({ userid: this.userid }).lean();

        if (!hero) {
            const err = new mongoose.Error.ValidationError(this);
            err.addError(
                "userid",
                new mongoose.Error.ValidatorError({
                    message: "Hero not found for this userid",
                })
            );
            return next(err);
        }

        // copy fields from hero
        this.email = this.email || hero.email;

        // Save ObjectId reference to the hero document:
        // hero._id is the ObjectId; keep it in heroRef for populate()
        this.heroRef = hero._id;

        // Also store the public UUID (hero.heroId) if you want it available
        // for quick queries / external IDs:
        if (hero.heroId) {
            this.heroId = hero.heroId;
        }

        next();
    } catch (e) {
        next(e);
    }
});

// todo: added post hook (experimental)


contactModel.post("save", async function () {
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            contact: {
                id: this.contactId,
                email: this.email,
            },
        },
        { upsert: true }
    );
});

const ContactSchema = mongoose.models.Contact || mongoose.model("Contact", contactModel);
export default ContactSchema;
