const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//Allowing passport to use google oauth 2.0
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID, 
    clientSecret: keys.googleClientSecret, 
    callbackURL: '/auth/google/callback' //handles user coming back to application 
  }, (accessToken, refreshToken, profile, done) => {
     console.log('access Token ' , accessToken);
     console.log('Refresh Token', refreshToken);
     console.log('profile: ', profile); 
  })
);