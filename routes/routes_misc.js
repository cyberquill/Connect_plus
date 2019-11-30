const express = require('express'),
    passport = require('passport'),
    multer = require('multer'),
    cloudinary = require('cloudinary');
const { User, Post, Reaction, Follow, Comment } = require('../models');
// ============================================================================
const router = express.Router();
const isEmpty = require('../validation/is-empty');
const storage = multer.memoryStorage();
const upload = multer({ storage });
// ============================================================================
//@route    POST: /imageupload
//@desc     Allows users to upload local images for the posts to the website
//@access   PRIVATE

router.post(
    '/imageupload',
    passport.authenticate('jwt', { session: false }),
    upload.array('photos', 20),
    async (req, res) => {
        let res_promises = req.files.map(
            file =>
                new Promise((resolve, reject) => {
                    cloudinary.v2.uploader
                        .upload_stream(
                            {
                                folder: 'Connect_plus',
                                public_id: req.user.id + Date.now(),
                                unique_filename: false,
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result.secure_url);
                            },
                        )
                        .end(file.buffer);
                }),
        );

        Promise.all(res_promises)
            .then(result => res.json(result))
            .catch(error => console.log(error));
    },
);
// ============================================================================
//@route    GET: /
//@desc     Simple route to check Server connection
//@access   PUBLIC

router.get('/hello', (req, res) => res.json({ msg: 'Server Online' }));
// ============================================================================
//@route    POST: /search/:query
//@desc     Search the Connect+ database for users and posts
//@access   PRIVATE

router.post(
    '/search/:query',
    passport.authenticate('jwt', { session: false }),
    upload.array('photos', 20),
    async (req, res) => {
        const query = req.params.query;
        let users = await User.find()
            .or([
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { tw: { $regex: query, $options: 'i' } },
                { fb: { $regex: query, $options: 'i' } },
                { ig: { $regex: query, $options: 'i' } },
                { bio: { $regex: query, $options: 'i' } },
            ])
            .sort({ firstName: 1, lastName: 1, email: 1 })
            .select('-password')
            .lean();

        const asyncUserHandler = async user => {
            const follow = {
                master: user._id,
                slave: req.user.id,
            };
            const exists = await Follow.findOne(follow)
                .lean()
                .catch(e => {});
            user.isFollowed = !isEmpty(exists);
            return user;
        };
        users = await Promise.all(users.map(user => asyncUserHandler(user)));

        const posts = await Post.find({ desc: { $regex: query, $options: 'i' } })
            .sort({ dtTime: -1 })
            .populate('user', '-passowrd', null, null)
            .lean();

        res.json({ query: req.params.query, users: users, posts: posts });
    },
);
// ============================================================================
//@route    POST:
//@desc
//@access
// ============================================================================
//@route    POST:
//@desc
//@access
// ============================================================================
//@route    POST:
//@desc
//@access
// ============================================================================
//@route    POST:
//@desc
//@access
// ============================================================================
module.exports = router;
