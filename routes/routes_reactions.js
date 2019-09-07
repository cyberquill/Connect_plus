const express = require('express'),
    passport = require('passport');
const {} = require('../models');
// ============================================================================
const router = express.Router();
const isEmpty = require('../validation/is-empty');
const { User, Post, Reaction, Follow, Comment } = require('../models');
// ============================================================================
//@route    GET: /likes/:pid/:uid
//@desc     Returns the likes on the specified post by the specified user
//@access   Private

// ============================================================================
//@route    GET: /likes/:pid/all
//@desc     Returns a list of all the likes on the specified post
//@access   Private

// ============================================================================
//@route    GET: /likes/:lid/user
//@desc     Returns the user who created the specified like
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
