const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const userSchema = new Schema({
    regMode: { type: String, required: true },
    password: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, default: 'None' },
    profilePic: {
        type: String,
        default:
            'https://res.cloudinary.com/brij1999/image/upload/v1574787385/Connect_plus/user_purple.png',
    },
    joinDtTime: { type: Date, default: Date.now },
    nPosts: { type: Number, default: 0 },
    nFollowers: { type: Number, default: 0 },
    nFollowing: { type: Number, default: 0 },
    bio: { type: String },
    tw: { type: String },
    fb: { type: String },
    ig: { type: String },
});
// ============================================================================
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'uid',
});

userSchema.virtual('views', {
    ref: 'View',
    localField: '_id',
    foreignField: 'uid',
});

userSchema.virtual('reactions', {
    ref: 'Reaction',
    localField: '_id',
    foreignField: 'uid',
});

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'uid',
});

userSchema.virtual('followers', {
    ref: 'Follow',
    localField: '_id',
    foreignField: 'master',
});

userSchema.virtual('following', {
    ref: 'Follow',
    localField: '_id',
    foreignField: 'slave',
});
// ============================================================================
module.exports = mongoose.model('User', userSchema);
