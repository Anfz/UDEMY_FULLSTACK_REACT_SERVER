//node server only supports commonjs 
// no support for es2015 modules
const express = require('express'); 

const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');


require('./services/passport'); // run everything in passport js 
require('./models/User');


mongoose.connect(keys.mongoURI);

//could have mutiple applications 
//most projects will only use one
const app = express(); 
authRoutes(app); 

//heroku environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT); 
