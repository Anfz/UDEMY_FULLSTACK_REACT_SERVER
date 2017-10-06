const sendgrid = require('sendgrid');
const helper = sendgrid.mail; 

const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // restricts the first element will need to have subject and recipients field (kinda like a interface)
  constructor({ subject, recipients}, content) {
    super(); 

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients); 
  }

  formatAddresses (recipients){
    return recipients.map( ({email}) =>{
      return new helper.Email(email);
    });
  }

  
}


module.exports = Mailer; 