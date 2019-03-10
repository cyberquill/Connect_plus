
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//==========================================================================
app.use(bodyParser.urlencoded({ extended: false }));
//==========================================================================
app.get('/',(req,res) => {
    res.send("Hi There!");
    console.log('Server Accessed!');
});
//==========================================================================
app.listen(3001, () => console.log('Server Online on port 3001...'));
