//node server only supports commonjs 
// no support for es2015 modules
const express = require('express'); 
require('./services/passport'); // run everything in passport js 
const authRoutes = require('./routes/authRoutes');
//could have mutiple applications 
//most projects will only use one
const app = express(); 
authRoutes(app); 

//heroku environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT); 
