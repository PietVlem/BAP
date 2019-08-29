import mongoose from 'mongoose';

const { Schema } = mongoose;

const BuildingSchema = new Schema(
    {
        name: { type: String, required: true },
        image: {
            type: String, required: true
        },
        coords:{
            longitude: { type: String, required: true },
            latitude: { type: String, required: true }
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

BuildingSchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('Building', BuildingSchema);
