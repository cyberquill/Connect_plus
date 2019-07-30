const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('--------------- Database Online ---------------'))
    .catch(err => console.log(err));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// ============================================================================
// When the connection is disconnected:
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection:
process.on('SIGINT', function() {
    mongoose.connection.close(() => {
        console.log(
            'Mongoose default connection disconnected through app termination',
        );
        process.exit(0);
    });
});
// ============================================================================
module.exports.User = require('./model_user');
module.exports.Post = require('./model_post');
module.exports.Like = require('./model_like');
module.exports.Comment = require('./model_comment');
