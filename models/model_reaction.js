const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const reactionSchema = new Schema({
    pid: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, default: 'like' },
    dtTime: { type: Date, default: Date.now },
});
// ============================================================================
reactionSchema.virtual('user', {
    ref: 'User',
    localField: 'uid',
    foreignField: '_id',
});

reactionSchema.virtual('post', {
    ref: 'Post',
    localField: 'pid',
    foreignField: '_id',
});
// ============================================================================
module.exports = mongoose.model('Reaction', reactionSchema);
