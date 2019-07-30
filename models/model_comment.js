const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const commentSchema = new Schema({});
// ============================================================================
module.exports = mongoose.model('Comment', commentSchema);
