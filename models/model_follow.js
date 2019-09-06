const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const followSchema = new Schema({
    master: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slave: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dtTime: { type: Date, default: Date.now },
});
// ============================================================================
followSchema.virtual('masterUser', {
    ref: 'User',
    localField: 'master',
    foreignField: '_id',
});

followSchema.virtual('slaveUser', {
    ref: 'User',
    localField: 'slave',
    foreignField: '_id',
});
// ============================================================================
module.exports = mongoose.model('Follow', followSchema);
