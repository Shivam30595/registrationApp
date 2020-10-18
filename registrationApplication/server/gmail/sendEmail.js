const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    // please enter your email and password from which you want to send the mail
    // and you also have to give the permission from your gmail account to send the emails
    // https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4P7zMhyXtAZOEQPdSeUwPV2EEXNhFEisRHsj6Wt18feabmzOtzaD-KZXButM9LMHzub2eyPI1PKfuZtDpy3BrBh98uxfg
    auth: {
        user: '',
        pass: ''
    }
});

//please write emails in from and to coloumn
let mailOptions = {
    from: '',
    to: '',
    subject: 'Sending Email using Node.js',
    text: `Hi user,
           Thanks for registering with us.`
    };

function sendMail() {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports.sendMail = sendMail;