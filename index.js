//node server only supports commonjs 
// no support for es2015 modules
const express = require('express'); 

const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); 
const passport = require('passport'); 
const bodyParser = require('body-parser');
const keys = require('./config/keys');


//make sure you define models first 
require('./models/User');
require('./models/Survey');
require('./services/passport'); // run everything in passport js 

const app = express(); 
mongoose.connect(keys.mongoURI);

//could have mutiple applications 
//most projects will only use one

//getting express to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // has to passed in microseconds
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize()); 
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/authRoutes')(app); 
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){
  //ensure express will serve up assets 
  app.use(express.static('client/build'));

  //express will serve up index.html if it doesn't know the route 
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


//heroku environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT); 
