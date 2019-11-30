const express = require('express'),
    passport = require('passport');
const { User, Post, View, Reaction, Follow, Comment } = require('../models');
// ============================================================================
const router = express.Router();
const isEmpty = require('../validation/is-empty');
const validateProfileUpdate = require('../validation/updateProfile');
// ============================================================================
//@route    PUT: /users
//@desc     Updates the Logged-in User's Profile Information
//@access   Private

router.put(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateProfileUpdate,
    async (req, res) => {
        let newData = {};
        if (!isEmpty(req.body.firstName))
            newData.firstName = req.body.firstName;
        if (!isEmpty(req.body.lastName)) newData.lastName = req.body.lastName;
        if (!isEmpty(req.body.gender)) newData.gender = req.body.gender;
        if (!isEmpty(req.body.profilePic))
            newData.profilePic = req.body.profilePic;
        if (!isEmpty(req.body.bio)) newData.bio = req.body.bio;
        if (!isEmpty(req.body.tw)) newData.tw = req.body.tw;
        if (!isEmpty(req.body.fb)) newData.fb = req.body.fb;
        if (!isEmpty(req.body.ig)) newData.ig = req.body.ig;

        if (req.body.profilePic === '<#REMOVE>') newData.profilePic = '';
        if (req.body.bio === '<#REMOVE>') newData.bio = '';
        if (req.body.tw === '<#REMOVE>') newData.tw = '';
        if (req.body.fb === '<#REMOVE>') newData.fb = '';
        if (req.body.ig === '<#REMOVE>') newData.ig = '';

        newData = await User.findByIdAndUpdate(req.user.id, newData, {
            new: true,
        })
            .select('-password')
            .lean();
        res.json(result);
    },
);
// ============================================================================
//@route    GET: /users/feed/:page
//@desc     Returns the posts to show in the specified user's feed
//@access   Private

router.get(
    '/feed/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        let posts = await Post.find({})
            .skip((page - 1) * size)
            .limit(size)
            .sort({ dtTime: -1 })
            .populate('user', '-passowrd', null, null)
            .lean()
            .catch(e => {});
        const asyncPostHandler = async post => {
            let newView = {
                pid: post._id,
                uid: req.user.id,
            };
            newView = new View(newView);
            await newView.save();
            await Post.findByIdAndUpdate(post._id, { $inc: { nViews: 1 } });
            const query = {
                pid: post._id,
                uid: post.user[0]._id,
            };
            const exists = await Reaction.findOne(query)
                .lean()
                .catch(e => {});
            post.reaction = exists ? exists.type : null;
            post.reactionDtTime = exists ? exists.dtTime : null;
            return post;
        };
        posts = await Promise.all(posts.map(post => asyncPostHandler(post)));
        res.json(posts);
    },
);
// ============================================================================
//@route    GET: /users/:uid
//@desc     Returns the public details about the specified user
//@access   Private

router.get(
    '/:uid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.params.uid === 'me') req.params.uid = req.user.id;
        const user = await User.findById(req.params.uid)
            .select('-password')
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(404).json({ user: 'User Not Found!' });
            return;
        }
        const follow = {
            master: req.params.uid,
            slave: req.user.id,
        };
        const exists = await Follow.findOne(follow)
            .lean()
            .catch(e => {});
        user.isFollowed = !isEmpty(exists);
        res.json(user);
    },
);
// ============================================================================
//@route    GET: /users/:uid/posts/:page
//@desc     Returns all the posts of the specified user
//@access   Private

router.get(
    '/:uid/posts/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.params.uid === 'me') req.params.uid = req.user.id;
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(error => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }

        /* const { posts } = await User.findById(user._id)
            .populate({
                path: 'posts',
                options: {
                    skip: (page - 1) * size,
                    limit: size,
                    sort: { dtTime: -1 },
                },
            })
            .lean();
        res.json(posts); */



        let posts = await Post.find({ uid: req.params.uid })
            .skip((page - 1) * size)
            .limit(size)
            .sort({ dtTime: -1 })
            .populate('user', '-passowrd', null, null)
            .lean()
            .catch(e => {});
        const asyncPostHandler = async post => {
            let newView = {
                pid: post._id,
                uid: req.user.id,
            };
            newView = new View(newView);
            await newView.save();
            await Post.findByIdAndUpdate(post._id, { $inc: { nViews: 1 } });
            const query = {
                pid: post._id,
                uid: post.user[0]._id,
            };
            const exists = await Reaction.findOne(query)
                .lean()
                .catch(e => {});
            post.reaction = exists ? exists.type : null;
            post.reactionDtTime = exists ? exists.dtTime : null;
            return post;
        };
        posts = await Promise.all(posts.map(post => asyncPostHandler(post)));
        res.json(posts);

    },
);
// ============================================================================
//@route    GET: /users/:uid/reactions/:page
//@desc     Returns all the reactions of the specified user
//@access   Private

router.get(
    '/:uid/reactions/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.params.uid === 'me') req.params.uid = req.user.id;
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }
        const { reactions } = await User.findById(user._id)
            .populate({
                path: 'reactions',
                populate: {
                    path: 'post user',
                    select: '-password',
                },
                options: {
                    skip: (page - 1) * size,
                    limit: size,
                    sort: { dtTime: -1 },
                },
            })
            .lean();
        res.json(reactions);
    },
);
// ============================================================================
//@route    GET: /users/:uid/comments/:page
//@desc     Returns all the comments of the specified user
//@access   Private

router.get(
    '/:uid/comments/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.params.uid === 'me') req.params.uid = req.user.id;
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }
        const { comments } = await User.findById(user._id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'post user',
                },
                options: {
                    skip: (page - 1) * size,
                    limit: size,
                    sort: { dtTime: -1 },
                },
            })
            .lean();
        res.json(comments);
    },
);
// ============================================================================
//@route    GET: /users/:uid/following/:page
//@desc     Returns the list of the followers of the specified user
//@access   Private

router.get(
    '/:uid/following/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.params.uid === 'me') req.params.uid = req.user.id;
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }
        const { following } = await User.findById(user._id)
            .populate({
                path: 'following',
                populate: {
                    path: 'masterUser',
                    select: '-password',
                },
                options: {
                    skip: (page - 1) * size,
                    limit: size,
                    sort: { dtTime: -1 },
                },
            })
            .lean();
        res.json(following);
    },
);
// ============================================================================
//@route    GET: /users/:uid/followers/:page
//@desc     Returns the list of users followed by the specified user
//@access   Private

router.get(
    '/:uid/followers/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.params.uid === 'me') req.params.uid = req.user.id;
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }
        const { followers } = await User.findById(user._id)
            .populate({
                path: 'followers',
                populate: {
                    path: 'slaveUser',
                    select: '-password',
                },
                options: {
                    skip: (page - 1) * size,
                    limit: size,
                    sort: { dtTime: -1 },
                },
            })
            .lean();
        res.json(followers);
    },
);
// ============================================================================
//@route    POST: /users/follow/:uid
//@desc     Makes the logged-in user the follower of the specified user
//@access   Private

router.post(
    '/follow/:uid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }
        if (user._id == req.user.id) {
            res.status(400).json({ user: 'User cannot follow itself!' });
            return;
        }
        let follow = {
            master: user._id,
            slave: req.user.id,
        };
        const exists = await Follow.findOne(follow)
            .lean()
            .catch(e => {});
        if (exists) {
            res.json({
                follow: 'User is already a follower of the target-user',
            });
            return;
        }
        follow = new Follow(follow);
        await follow.save();
        await User.findByIdAndUpdate(user._id, { $inc: { nFollowers: 1 } });
        await User.findByIdAndUpdate(req.user.id, { $inc: { nFollowing: 1 } });
        follow = await Follow.findById(follow._id)
            .populate('masterUser slaveUser', '-password', null, null)
            .lean();
        res.json(follow);
    },
);
// ============================================================================
//@route    POST: /users/unfollow/:uid
//@desc     Makes the logged-in user the follower of the specified user
//@access   Private

router.post(
    '/unfollow/:uid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }
        if (user._id == req.user.id) {
            res.status(400).json({ user: 'User cannot unfollow itself!' });
            return;
        }
        let unFollow = {
            master: user._id,
            slave: req.user.id,
        };
        const exists = await Follow.findOne(unFollow)
            .lean()
            .catch(e => {});
        if (!exists) {
            res.json({ follow: 'User is not following the target-user' });
            return;
        }
        unFollow = await Follow.findOneAndDelete(unFollow).lean();
        await User.findByIdAndUpdate(user._id, { $inc: { nFollowers: -1 } });
        await User.findByIdAndUpdate(req.user.id, { $inc: { nFollowing: -1 } });
        res.json(unFollow);
    },
);
// ============================================================================
//@route    GET: /users/follows/:uid
//@desc     Checks whether the logged-in user follows the specified user
//@access   Private

router.get(
    '/follows/:uid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = await User.findById(req.params.uid)
            .lean()
            .catch(e => {});
        if (!user) {
            res.status(400).json({ user: 'User does not exist!' });
            return;
        }
        if (user._id == req.user.id) {
            res.status(400).json({ user: 'User cannot follow itself!' });
            return;
        }
        const payload = {
            master: user._id,
            slave: req.user.id,
        };
        const result = await Follow.findOne(payload)
            .lean()
            .catch(e => {});
        if (!result) res.json({ result: false });
        else res.json({ result: true });
    },
);
// ============================================================================
//@route    GET:
//@desc     Delete User's Account
//@access   Private
// ============================================================================
//@route    GET:
//@desc
//@access   Private

// ============================================================================
module.exports = router;
