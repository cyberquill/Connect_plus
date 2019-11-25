const GoogleStrategy = require('passport-google-oauth20'),
    { User } = require('../models'),
    { google } = require('./keys');

module.exports = passport => {
    passport.use(
        new GoogleStrategy(
            {
                callbackURL: '/auth/google/redirect',
                clientID: google.clientID,
                clientSecret: google.secret,
            },
            async (accessToken, refreshToken, profile, done) => {
                const user = await User.findOne({ email: profile.emails[0].value });
                if (user) return done(null, user);
                let newUser = new User({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    gender: profile.gender,
                    profilePic: profile.photos[0].value,
                    regMode: 'Google',
                });
                newUser = await newUser.save();
                return done(null, newUser);
            },
        ),
    );
};
