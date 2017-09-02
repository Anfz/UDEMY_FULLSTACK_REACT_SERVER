const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//get the user model from mongoose.  We loaded it in User.js
const User = mongoose.model('users');

//Allowing passport to use google oauth 2.0
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID, 
      clientSecret: keys.googleClientSecret, 
      callbackURL: '/auth/google/callback' //handles user coming back to application 
    }, 
    (accessToken, refreshToken, profile, done) => 
      {
        //this is async 
        //use a promise for this one
        User.findOne({
          googleId: profile.id
        })
        .then((existingUser) => {
          if (existingUser){
            done(null, existingUser);
          } else {
            new User({googleId: profile.id})
            .save()
            .then(user => done(null, user));

          }
        })
      }
    )
);