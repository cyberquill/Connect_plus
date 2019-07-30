const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const likeSchema = new Schema({});
// ============================================================================
module.exports = mongoose.model('Like', likeSchema);
