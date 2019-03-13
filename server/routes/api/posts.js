const express = require('express');
const router = express.Router();
//==========================================================================
//@route    GET: api/posts/
//@desc     Test
//@access   Public
router.get("/", (req, res) => {
    res.json({ msg: 'Success' });
});
//==========================================================================
module.exports = router;