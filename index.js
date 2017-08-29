//node server only supports commonjs 
// no support for es2015 modules
const express = require('express'); 


//could have mutiple applications 
//most projects will only use one
const app = express(); 

app.get('/', (req, res) => {
  res.send
  (
    { hi: 'there'}
  );
});

//heroku environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT); 
