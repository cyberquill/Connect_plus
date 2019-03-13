
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: this }]
});

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'uid'
});

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'uid'
});

// ============================================================================
module.exports = mongoose.model('User', userSchema);
