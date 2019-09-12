const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function(req, res, next) {
    const data = req.body;
    let errors = {};
    data.desc = !isEmpty(data.desc) ? data.desc : '';
    data.resources = !isEmpty(data.resources) ? data.resources : [];

    if (validator.isEmpty(data.desc) && isEmpty(data.resources))
        errors.desc = 'Cannot create blank post!';

    if (!isEmpty(data.resources) && typeof data.resources === 'object')
        data.resources.forEach(resource => {
            if (!validator.isURL(resource)) errors.resource = 'Invalid Resource!';
        });

    if (typeof data.resources === 'string' && !validator.isURL(data.resources))
        errors.resource = 'Invalid Resource!';

    if (!isEmpty(errors)) return res.status(400).json({ post: errors });

    next();
};
