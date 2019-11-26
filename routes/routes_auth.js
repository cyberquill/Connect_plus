const bcrypt = require('bcryptjs'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    { secretOrKey } = require('../config/keys'),
    { User } = require('../models');
//==========================================================================
const router = express.Router();
const isEmpty = require('../validation/is-empty');
const validateRegisterInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');
//==========================================================================
//@route    POST: /auth/signup
//@desc     Sign-Up Functionality
//@access   Public

router.post('/signup', validateRegisterInput, async (req, res) => {
    let { firstName, lastName, email, password, gender, profilePic } = req.body;
    if (isEmpty(gender)) gender = 'None';
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ user: { email: 'Email already registered!' } });

    let newUser = new User({
        firstName,
        lastName,
        email,
        gender,
        profilePic,
        regMode: 'Native',
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser = await newUser.save();
            const payload = {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                gender: newUser.gender,
                profilePic: newUser.profilePic,
                nPosts: newUser.nPosts,
                nFollowers: newUser.nFollowers,
                nFollowing: newUser.nFollowing,
                bio: newUser.bio,
                tw: newUser.tw,
                fb: newUser.fb,
                ig: newUser.ig,
            };
            jwt.sign(payload, secretOrKey, { expiresIn: '7d' }, (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                });
            });
        });
    });
});
//==========================================================================
//@route    POST: /auth/login
//@desc     Login user and generate token
//@access   Public

router.post('/login', validateLoginInput, async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
        .lean()
        .catch(e => {});
    if (!user) return res.status(404).json({ user: { email: 'User not found!' } });
    if (!user.password || user.regMode !== 'Native')
        return res.status(400).json({ user: { email: 'User not registered locally!' } });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(400).json({ user: { password: 'password incorrect!' } });

    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic,
        nPosts: user.nPosts,
        nFollowers: user.nFollowers,
        nFollowing: user.nFollowing,
        bio: user.bio,
        tw: user.tw,
        fb: user.fb,
        ig: user.ig,
    };
    jwt.sign(payload, secretOrKey, { expiresIn: '7d' }, (err, token) => {
        res.json({
            success: true,
            token: 'Bearer ' + token,
        });
    });
});
// ============================================================================
//@route    GET: /auth/google/*
//@desc     Signup/Login using GoogleStrategy
//@access   Public

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
    const payload = {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        gender: req.user.gender,
        profilePic: req.user.profilePic,
        nPosts: req.user.nPosts,
        nFollowers: req.user.nFollowers,
        nFollowing: req.user.nFollowing,
        bio: req.user.bio,
        tw: req.user.tw,
        fb: req.user.fb,
        ig: req.user.ig,
    };
    jwt.sign(payload, secretOrKey, { expiresIn: '7d' }, (err, token) => {
        if (process.env.NODE_ENV === 'production')
            res.redirect(`https://connect-plus.herokuapp.com/?token=Bearer ${token}`);
        else res.redirect('http://localhost:3000?token=Bearer ' + token);
    });
});
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
//@route    POST:
//@desc
//@access

//==========================================================================
//@route    POST: /auth/current
//@desc     Return Current user
//@access   Private

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});
//==========================================================================
module.exports = router;
