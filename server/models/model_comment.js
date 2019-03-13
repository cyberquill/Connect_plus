const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const commentSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, required: true },
    pid: { type: Schema.Types.ObjectId, required: true },
    created_date: { type: Date, default: Date.now },
    nlikes: { type: Number, default: 0 },
    nreplies: { type: Number, default: 0 },
    replies: [{ type: Schema.Types.ObjectId, ref: this }]
});
// ============================================================================
module.exports = mongoose.model('Comment', commentSchema);
