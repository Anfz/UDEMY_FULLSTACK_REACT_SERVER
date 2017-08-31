//node server only supports commonjs 
// no support for es2015 modules
const express = require('express'); 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

//could have mutiple applications 
//most projects will only use one
const app = express(); 

//Allowing passport to use google oauth 2.0
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID, 
    clientSecret: keys.googleClientSecret, 
    callbackURL: '/auth/google/callback' //handles user coming back to application 
  }, (accessToken) => {
     console.log(accessToken); 
  })
);


app.get(
  '/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']  //ask google to give access to...
  })
);

//heroku environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT); 
