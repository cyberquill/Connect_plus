require('dotenv').config();

module.exports = {
    mongoURI: process.env.URI,
    secretOrKey: process.env.KEY,
    google: {
        clientID: process.env.GS_CLIENT_ID,
        secret: process.env.GS_SECRET,
    },
};
