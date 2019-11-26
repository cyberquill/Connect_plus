const path = require('path'),
    passport = require('passport'),
    express = require('express'),
    cors = require('cors'),
    cloudinary = require('cloudinary'),
    bodyParser = require('body-parser'),
    { auth, users, posts, reactions, comments, misc } = require('./routes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
//==========================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//==========================================================================
app.use(passport.initialize());
require('./config/passport')(passport);
require('./config/passport-google')(passport);
//==========================================================================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
//==========================================================================
app.use('/auth', auth);
app.use('/users', users);
app.use('/posts', posts);
app.use('/reactions', reactions);
app.use('/comments', comments);
app.use('/', misc);
//==========================================================================
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Server Online on port ${port}...`));
