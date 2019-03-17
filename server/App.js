
const 
    passport = require('passport'),
    express = require('express'),
    bodyParser = require('body-parser');

const
    
    { users, profile, posts } = require('./routes/api');
const app = express();
const port = process.env.PORT || 3001;
//==========================================================================
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//==========================================================================
app.use(passport.initialize());
require('./config/passport')(passport);
//==========================================================================
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
//==========================================================================
app.listen(port, () => console.log(`Server Online on port ${port}...`));
