const path = require('path'),
    passport = require('passport'),
    express = require('express'),
    bodyParser = require('body-parser'),
    { auth, users, posts, reactions, comments } = require('./routes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
//==========================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//==========================================================================
app.use(passport.initialize());
require('./config/passport')(passport);
require('./config/passport-google')(passport);
//==========================================================================
app.get('/',(req,res) => res.send("Server Online..."));
app.use('/auth', auth);
app.use('/users', users);
app.use('/posts', posts);
app.use('/reactions', reactions);
app.use('/comments', comments);
//==========================================================================
/*app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});*/
app.listen(port, () => console.log(`Server Online on port ${port}...`));
