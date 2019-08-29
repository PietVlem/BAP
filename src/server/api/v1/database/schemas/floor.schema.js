import mongoose from 'mongoose';

const { Schema } = mongoose;

const FloorSchema = new Schema(
    {
        name: { type: String, required: true },
        floorplan: {
            type: String, required: true
        },
        buildingId:{ type: Schema.Types.ObjectId, ref: 'Building', required: false }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

FloorSchema.virtual('building', {
    ref: 'Building',
    localField: 'buildingId',
    foreignField: '_id',
    justOne: true,
});

FloorSchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('Floor', FloorSchema);
