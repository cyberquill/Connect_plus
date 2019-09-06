const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function(req, res, next) {
    const data = req.body;
    let errors = {};

    if (isEmpty(data.text) && isEmpty(data.resource)) errors.text = 'Cannot create blank post!';

    if (!isEmpty(data.resource))
        if (!validator.isURL(data.resource)) errors.resource = 'Invalid Resource!';

    if (!isEmpty(errors)) return res.status(400).json({ comment: errors });

    next();
};
