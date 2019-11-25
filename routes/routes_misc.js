const express = require('express'),
    passport = require('passport'),
    multer = require('multer'),
    cloudinary = require('cloudinary');
const {} = require('../models');
// ============================================================================
const router = express.Router();
const isEmpty = require('../validation/is-empty');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { User, Post, Reaction, Follow, Comment } = require('../models');
// ============================================================================
//@route    POST: /imageupload
//@desc
//@access

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
//@desc
//@access

router.get('/', (req, res) => res.send('Server Online'));
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
// ============================================================================
module.exports = router;
