const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    gender: { type: String },
    profilePic: { type: String },
    regMode: {type: String, required: true}
});
// ============================================================================
module.exports = mongoose.model('User', userSchema);
