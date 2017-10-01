const passport = require('passport');


module.exports = (app) => {

  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']  //ask google to give access to...
    })
  );

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) =>{
      res.redirect('/surveys');
    }  
  );

  app.get(
    '/api/logout', 
    (req, res) => {
      req.logout(); //passport attaches the logout function
      //passport will now kill the cookie
      res.redirect('/');  
    }
  );


  app.get('/api/current_user', (req, res) => {
    res.send(req.user); 
  });
}