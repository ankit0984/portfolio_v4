import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
    period: String, // daily | monthly | yearly | geo
    year: Number,
    month: Number,
    country: String,
    city: String,
    visitors: Number,
    updatedAt: Date
});

StatsSchema.index({
    period: 1,
    year: 1,
    month: 1,
    country: 1,
    city: 1
});

const StatsModel = mongoose.models.Stats ||
    mongoose.model("Stats", StatsSchema);

export default StatsModel
