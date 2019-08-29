import mongoose from 'mongoose';

const { Schema } = mongoose;

const FacilitySchema = new Schema(
    {
        name: { type: String, required: true },
        iconName:{ type: String, required: true },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

FacilitySchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('Facility', FacilitySchema);
