import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
    period: String, // weekly | monthly
    year: Number,
    month: Number,
    week: Number,
    visitors: {
        type: Number,
        default: 0
    },
    updatedAt: Date
});

StatsSchema.index({
    period: 1,
    year: 1,
    month: 1,
    week: 1
});

const StatsModel = mongoose.models.Stats ||
    mongoose.model("Stats", StatsSchema);

export default StatsModel
