import mongoose from 'mongoose';

const { Schema } = mongoose;

const HelpCentreItemSchema = new Schema(
    {
        question: { type: String, required: true },
        steps:{ type: Array, required: true }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

HelpCentreItemSchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('HelpCentreItem', HelpCentreItemSchema);
