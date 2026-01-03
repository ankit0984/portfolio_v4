import mongoose from "mongoose";

const VisitorSessionSchema = new mongoose.Schema({
    ipHash: String,
    year: Number,
    month: Number,
    week: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// src/models/VisitorSession.model.js
VisitorSessionSchema.index(
    { ipHash: 1, year: 1, month: 1, week: 1 }, // Added week
    { unique: true }
);

// Auto-delete after 90 days
VisitorSessionSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

const visitorSession = mongoose.models.VisitorSession ||
    mongoose.model("VisitorSession", VisitorSessionSchema);

export default visitorSession