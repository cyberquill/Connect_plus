const path = require('path'),
    passport = require('passport'),
    express = require('express'),
    bodyParser = require('body-parser'),
    { users, posts, likes, comments } = require('./routes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
//==========================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//==========================================================================
app.use(passport.initialize());
require('./config/passport')(passport);
//==========================================================================
app.get('/',(req,res) => res.send("Server Online..."));
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/likes', likes);
app.use('/api/comments', comments);
//==========================================================================
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.listen(port, () => console.log(`Server Online on port ${port}...`));
