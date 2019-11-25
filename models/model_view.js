const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const viewSchema = new Schema({
    pid: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dtTime: { type: Date, default: Date.now },
});
// ============================================================================
viewSchema.virtual('user', {
    ref: 'User',
    localField: 'uid',
    foreignField: '_id',
});

viewSchema.virtual('post', {
    ref: 'Post',
    localField: 'pid',
    foreignField: '_id',
});
// ============================================================================
module.exports = mongoose.model('View', viewSchema);
