import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const NewsPostSchema = new Schema(
    {
        title: { type: String, required: true, max: 128 },
        body: { type: String, required: false },
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

NewsPostSchema.virtual('id').get(function () { return this._id; });

NewsPostSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

NewsPostSchema.virtual('user', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true,
});

NewsPostSchema.plugin(mongoosePaginate);
export default mongoose.model('NewsPost', NewsPostSchema);
