const express = require('express'),
    passport = require('passport');
const {} = require('../models');
// ============================================================================
const router = express.Router();
const isEmpty = require('../validation/is-empty');
const { User, Post, Reaction, Follow, Comment } = require('../models');
// ============================================================================
//@route    GET: /comments/:pid/:uid
//@desc     Returns the comments on the specified post by the specified user
//@access   Private

// ============================================================================
//@route    GET: /comments/:pid/all
//@desc     Returns a list of all the comments on the specified post
//@access   Private

// ============================================================================
//@route    GET: /comments/:cid/user
//@desc     Returns the user who created the specified comment
//@access   Private

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
