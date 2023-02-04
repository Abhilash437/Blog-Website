const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: 'f67ff866834c0e36222f3c0887cd4c5b-1b3a03f6-a144af1f',
    domain: 'sandbox10798bd8f80d4fb38cd44184dd57f5f3.mailgun.org'
  }
}

const transporter = nodemailer.createTransport(mailgun(auth));

const sendEmail = (email,subject,text,cb)=>{
  const mailOptions = {
    from: email,
    to: 'abhilashhathwar20@gmail.com',
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions,(err,data)=>{
    if(err){
      cb(err,null);
    }else{
      cb(null,data)
    }
  })

}

// const mailOptions = {
//     from: 'abhilashhathwar@gmail.com',
//     to: 'abhilashhathwar20@gmail.com',
//     subject: "This is a test mail",
//     text: "This is a test mail"
//   };
//
//   transporter.sendMail(mailOptions,(err,data)=>{
//     if(err){
//       //cb(err,null);
//       console.log(err);
//     }else{
//       //cb(null,data);
//       console.log("Successfully sent email to abhilash");
//     }
//   })

module.exports = sendEmail;
