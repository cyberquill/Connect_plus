const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const postSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resources: [String],
    desc: { type: String },
    dtTime: { type: Date, default: Date.now },
    access: { type: String, default: 'public' },
    nViews: { type: Number, default: 0 },
    nReactions: { type: Number, default: 0 },
    nComments: { type: Number, default: 0 },
});
// ============================================================================
postSchema.virtual('views', {
    ref: 'View',
    localField: '_id',
    foreignField: 'pid',
});

postSchema.virtual('reactions', {
    ref: 'Reaction',
    localField: '_id',
    foreignField: 'pid',
});

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'pid',
});

postSchema.virtual('user', {
    ref: 'User',
    localField: 'uid',
    foreignField: '_id',
});
// ============================================================================
module.exports = mongoose.model('Post', postSchema);
