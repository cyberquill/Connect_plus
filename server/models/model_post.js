const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const postSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, required: true },
    pic: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    nLikes: { type: Number, default: 0 },
    nComments: { type: Number, default: 0 },
});

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'pid'
});
// ============================================================================
module.exports = mongoose.model('Post', postSchema);
