const express = require('express'),
    passport = require('passport');
const { User, Post, Reaction, Follow, Comment } = require('../models');
// ============================================================================
const router = express.Router();
const isEmpty = require('../validation/is-empty');
const validatePostInput = require('../validation/createPost');
const validateReactionInput = require('../validation/createReaction');
const validateCommentInput = require('../validation/createComment');
// ============================================================================
//@route    POST: /posts
//@desc     Creates a new Post
//@access   Private

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validatePostInput,
    async (req, res) => {
        let newPost = { uid: req.user.id };
        if (!isEmpty(req.body.desc)) newPost.desc = req.body.desc;
        if (!isEmpty(req.body.resources))
            newPost.resources = req.body.resources;
        if (!isEmpty(req.body.access)) newPost.access = req.body.access;

        newPost = new Post(newPost);
        await newPost.save();
        await User.findByIdAndUpdate(req.user.id, { $inc: { nPosts: 1 } });
        res.json(newPost);
    },
);
// ============================================================================
//@route    POST: /posts/:pid/reaction
//@desc     Adds a reaction to the specified post from the logged-in user
//@access   Private

router.post(
    '/:pid/reaction',
    passport.authenticate('jwt', { session: false }),
    validateReactionInput,
    async (req, res) => {
        const post = await Post.findById(req.params.pid)
            .lean()
            .catch(e => {});
        if (!post) {
            res.status(400).json({ post: 'Post does not exist!' });
            return;
        }
        let newReaction = {
            pid: post._id,
            uid: req.user.id,
        };

        const exits = await Reaction.findOne(newReaction)
            .lean()
            .catch(e => {});
        if (!isEmpty(req.body.type)) newReaction.type = req.body.type;

        if (exits) {
            newReaction = await Reaction.findByIdAndUpdate(
                exits._id,
                newReaction,
                { new: true },
            );
        } else {
            newReaction = new Reaction(newReaction);
            await newReaction.save();
            await Post.findByIdAndUpdate(post._id, { $inc: { nReactions: 1 } });
        }

        res.json(newReaction);
    },
);
// ============================================================================
//@route    POST: /posts/:pid/comment
//@desc     Adds a comment to the specified post from the logged-in user
//@access   Private

router.post(
    '/:pid/comment',
    passport.authenticate('jwt', { session: false }),
    validateCommentInput,
    async (req, res) => {
        const post = await Post.findById(req.params.pid)
            .lean()
            .catch(e => {});
        if (!post) {
            res.status(400).json({ post: 'Post does not exist!' });
            return;
        }
        let newComment = {
            pid: post._id,
            uid: req.user.id,
        };
        if (!isEmpty(req.body.text)) newComment.text = req.body.text;
        if (!isEmpty(req.body.resource))
            newComment.resource = req.body.resource;
        newComment = new Comment(newComment);
        await newComment.save();
        await Post.findByIdAndUpdate(post._id, { $inc: { nComments: 1 } });
        res.json(newComment);
    },
);
// ============================================================================
//@route    GET: /posts/:pid
//@desc     Returns the specified post
//@access   Private

router.get(
    '/:pid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const post = await Post.findById(req.params.pid)
            .lean()
            .catch(e => {});
        if (!post) res.status(404).json({ post: 'Post Not Found!' });
        res.json(post);
    },
);
// ============================================================================
//@route    GET: /posts/:pid/views/:page
//@desc     Returns all the reactions on the specified post
//@access   Private

router.get(
    '/:pid/views/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const post = await Post.findById(req.params.pid)
            .lean()
            .catch(e => {});
        if (!post) {
            res.status(400).json({ post: 'Post does not exist!' });
            return;
        }
        const { views } = await Post.findById(post._id)
            .populate({
                path: 'views',
                populate: {
                    path: 'user',
                    select: '-password',
                },
                options: {
                    skip: (page - 1) * size,
                    limit: size,
                    sort: { dtTime: -1 },
                },
            })
            .lean();
        res.json(views);
    },
);
// ============================================================================
//@route    GET: /posts/:pid/reactions/:page
//@desc     Returns all the reactions on the specified post
//@access   Private

router.get(
    '/:pid/reactions/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const post = await Post.findById(req.params.pid)
            .lean()
            .catch(e => {});
        if (!post) {
            res.status(400).json({ post: 'Post does not exist!' });
            return;
        }
        const { reactions } = await Post.findById(post._id)
            .populate({
                path: 'reactions',
                populate: {
                    path: 'user',
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
//@route    GET: /posts/:pid/comments/:page
//@desc     Returns all the comments on the specified post
//@access   Private

router.get(
    '/:pid/comments/:page',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const size = 20;
        const post = await Post.findById(req.params.pid)
            .lean()
            .catch(e => {});
        if (!post) {
            res.status(400).json({ post: 'Post does not exist!' });
            return;
        }
        const { comments } = await Post.findById(post._id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '-password',
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
//@route    POST: /posts
//@desc     Delete Post
//@access
// ============================================================================
//@route    GET:
//@desc     Edit Post
//@access   Private
// ============================================================================
//@route    GET:
//@desc     Edit Reaction
//@access   Private
// ============================================================================
//@route    GET:
//@desc     Edit Comment
//@access   Private
// ============================================================================
//@route    GET:
//@desc     Delete Reaction
//@access   Private
// ============================================================================
//@route    GET:
//@desc     Delete Comment
//@access   Private
// ============================================================================
//@route    GET:
//@desc
//@access   Private
// ============================================================================
//@route    GET:
//@desc
//@access   Private

// ============================================================================
module.exports = router;
