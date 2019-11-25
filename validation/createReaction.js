const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function(req, res, next) {
    const data = req.body;
    let errors = {};
    const reactions = ['like','love','haha','amazed','sad','angry'];

    data.type = !isEmpty(data.type) ? data.type : '';

    if (!validator.isEmpty(data.type) && !validator.isIn(data.type,reactions))
        errors.type = 'Invalid Reaction!';

    if (!isEmpty(errors)) return res.status(400).json({ reaction: errors });

    next();
};
