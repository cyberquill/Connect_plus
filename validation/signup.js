const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function(req, res, next) {
    const data = req.body;
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';

    if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = 'Name must be between 2 to 30 characters!';
    }

    if (validator.isEmpty(data.firstName)) {
        errors.firstName = 'Name field is required!';
    }

    if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = 'Name must be between 2 to 30 characters!';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 to 30 characters!';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match!';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required!';
    }

    if (!validator.isIn(data.gender, ['M', 'F', 'O'])) {
        errors.gender = 'Please specify a valid gender!';
    }

    if (validator.isEmpty(data.gender)) {
        errors.gender = 'Please select a Gender!';
    }

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
};
