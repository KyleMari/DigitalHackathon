const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendConfirmationEmail = functions.https.onCall(async(data, context) => {
    const nodemailer = require('nodemailer');
    const xoauth2 = require('xoauth2');
    const gmailEmail = functions.config().gmail.email;
    const gmailPassword = functions.config().gmail.password;
    const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
        }
    });

    const mailOptions = {
        from: `Accenture Cashier Team <noreply@accenture.com>`,
        to: "torralba.kylemarin41@gmail.com"
    };

    mailOptions.subject = `ACTION REQUIRED Transaction Confirmation <noreply@accenture.com>`;
    mailOptions.text = 'Request to confirm the transaction: \n' +
        'Employee name: Jessica Carolina M. Rodriguez \n' +
        'Employee id: jessica.c.rodriguez@accenture.com \n' +
        'Career level: 11 \n' +
        'Account ID: 1234567 \n' +
        'Transaction type: Lost ID \n' +
        'Amount: Php 300 \n';
    return mailTransport.sendMail(mailOptions).then(() => {
        return console.log('New welcome email sent to torralba.kylemarin41@gmail.com');
    });

});
