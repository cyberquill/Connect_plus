const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const postSchema = new Schema({});
// ============================================================================
module.exports = mongoose.model('Post', postSchema);
