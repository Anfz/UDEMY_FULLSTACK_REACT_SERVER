const passport = require('passport');


module.exports = (app) => {

  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']  //ask google to give access to...
    })
  );

  app.get('/auth/google/callback', 
          passport.authenticate('google'));
}