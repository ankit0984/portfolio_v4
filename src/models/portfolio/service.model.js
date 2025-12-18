import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const ServiceModel = new mongoose.Schema({
    serviceId:{
        type:String,
        default:uuidv4,
        unique:true,
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
    icon:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    fullDescription:{
        type:String,
        required:true
    },
    features:{
        type:[String],
        required:true
    },
    technologies:{
        type:[
            {
                name:{
                    type:String,
                    required:true
                },
                category:{
                    type:String,
                    required:true
                }
            }
        ]
    },
    deliverable:{
        type:String,
        required:true
    },
    pricing:{
        type:[{
            startingPrice:{
                type:Number,
                required:true
            },
            priceType:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            }
        }],
        required:true
    },
    timeline:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    },
})

// todo: added post hook (experimental)

import SectionsSchema from "@/models/portfolio/sections.model";

/**
 * ADD or UPDATE service in sections
 */
ServiceModel.post("save", async function () {
    // Remove old entry (in case title/featured changed)
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        { $pull: { services: { id: this.serviceId } } }
    );

    // Add updated entry
    await SectionsSchema.findOneAndUpdate(
        { userid: this.userid },
        {
            $addToSet: {
                services: {
                    id: this.serviceId,
                    title: this.title,
                    featured: this.featured,
                },
            },
        },
        { upsert: true }
    );
});

/**
 * ADD MANY services in sections (bulk insert)
 */
ServiceModel.post("insertMany", async function (docs) {
    if (!docs || docs.length === 0) return;

    // Group services by userid
    const grouped = new Map();

    for (const doc of docs) {
        const uid = doc.userid.toString();

        if (!grouped.has(uid)) {
            grouped.set(uid, []);
        }

        grouped.get(uid).push({
            id: doc.serviceId,
            title: doc.title,
            featured: doc.featured,
        });
    }

    // Update sections per user
    for (const [userid, services] of grouped.entries()) {
        // Remove existing entries (avoid duplicates / stale data)
        await SectionsSchema.findOneAndUpdate(
            { userid },
            {
                $pull: {
                    services: { id: { $in: services.map(s => s.id) } },
                },
            }
        );

        // Insert all services
        await SectionsSchema.findOneAndUpdate(
            { userid },
            {
                $addToSet: {
                    services: { $each: services },
                },
            },
            { upsert: true }
        );
    }
});


/**
 * REMOVE service from sections
 */
ServiceModel.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    await SectionsSchema.findOneAndUpdate(
        { userid: doc.userid },
        { $pull: { services: { id: doc.serviceId } } }
    );
});


const ServiceSchema = mongoose.models.services || mongoose.model("service", ServiceModel);
export default ServiceSchema;