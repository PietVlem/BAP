import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const MeetingSchema = new Schema(
    {
        title: { type: String, required: true, max: 128 },
        details: { type: String, required: false },
        date: { type: String, required: true },
        startTime: { type: String, required: true },
        EndTime:{ type: String, required: true },
        room: { type: String, required: true },
        participantIds: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }],
        runningOrder: { type: Array, required: true },
        dresscode: { type: String, required: true},
        deleted_at: { type: Date, required: false },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

MeetingSchema.virtual('id').get(function () { return this._id; });

MeetingSchema.virtual('participants', {
    ref: 'User',
    localField: 'participantIds',
    foreignField: '_id'
})

MeetingSchema.plugin(mongoosePaginate);
export default mongoose.model('Meeting', MeetingSchema);
