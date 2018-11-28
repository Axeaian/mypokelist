const sgMail = require("@sendgrid/mail");

module.exports.mailer = (name, email, verifcode) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`,
    from: process.env.EMAIL,
    subject: "Welcome to mypokelist!",
    text: `Hello ${name}! Thanks for signing up!
    Your account has been created, you can login after you have activated your account.Please click the following link to activate your account`,
    html: `<strong> Hello ${name}! </strong> <br/> <p>Thanks for signing up!
      Your account has been created, you can login after you have activated your account.</p>
       <p>Please click this link to activate your account:
       <a href="http://localhost:3001/verify?hash=${verifcode}">Link</a>
      `
  };
  sgMail.send(msg);
};
