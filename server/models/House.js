import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const HouseSchema = new Schema(
    {
        year: { type: Number, required: true},
        price: { type: Number, required: true, min: 1 },
        bathrooms: {type: Number, required: true, min: 1 },
        bedrooms: { type: Number, required: true, min: 1 },
        levels: { type: Number, required: true, min: 1 },
        imgUrl: { type: String, required: true },
        description: { type: String, maxlength: 300 },
        creatorID: { type: Schema.Types.ObjectId, ref: "Account", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    });

HouseSchema.virtual("creator", {
    localField: "creatorID",
    ref: "Account",
    foreignField: "_id",
    justOne: true
});