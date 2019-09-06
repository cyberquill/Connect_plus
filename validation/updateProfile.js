const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function(req, res, next) {
    const data = req.body;
    let errors = {};

    next();
};
