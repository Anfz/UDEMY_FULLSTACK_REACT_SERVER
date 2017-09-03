const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//get the user model from mongoose.  We loaded it in User.js
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
}); 

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then( user => {
    done(null, user); 
  });
});

//Allowing passport to use google oauth 2.0
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID, 
      clientSecret: keys.googleClientSecret, 
      callbackURL: '/auth/google/callback', //handles user coming back to application 
      proxy: true // if request runs through proxy, use https :) 
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