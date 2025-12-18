import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
    ipHash: String,
    country: String,
    city: String,
    visitedAt: {
        type: Date,
        default: Date.now
    }
});

// Auto delete after 90 days
VisitorSchema.index(
    { visitedAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 * 90 }
);
const VisitorModel= mongoose.models.Visitor ||
    mongoose.model("Visitor", VisitorSchema);
export default VisitorModel