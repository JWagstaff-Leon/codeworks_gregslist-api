import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const JobSchema = new Schema(
    {
        jobTitle: { type: String, required: true },
        rate: { type: Number, required: true, min: 0 },
        hours: { type: Number, required: true, min: 1 },
        description: { type: String, required: true },
        company: { type: String, required: true },
        creatorID: { type: Schema.Types.ObjectId, ref: "Account", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    });

JobSchema.virtual("creator", {
    localField: "creatorID",
    ref: "Account",
    foreignField: "_id",
    justOne: true
});