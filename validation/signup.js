const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function(req, res, next) {
    const data = req.body;
    const regModes = ['Native', 'Google'];
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.regMode = !isEmpty(data.regMode) ? data.regMode : '';

    if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = 'First name must be between 2 to 30 characters!';
    }

    if (validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required!';
    }

    if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = 'Last name must be between 2 to 30 characters!';
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required!';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required!';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 to 30 characters!';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match!';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Password confirmation is required!';
    }

    if (!isEmpty(data.gender))
        if (!validator.isIn(data.gender, ['Male', 'Female', 'Other', 'None'])) {
            errors.gender = 'Please specify a valid gender!';
        }

    if (!isEmpty(data.regMode) && !validator.isIn(data.regMode, regModes)) {
        errors.regMode = 'Please specify a valid regMode!';
    }

    if (!isEmpty(errors)) return res.status(400).json({ user: errors });

    next();
};
