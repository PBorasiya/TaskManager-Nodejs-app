const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(sendgridAPIkey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'borasiyapranav@gmail.com',
        subject : 'Thanks for Joining our Service',
        text : `Welcome to the app, ${name}. Wassup wassup mah man!!`
    })
}

module.exports = {
    sendWelcomeEmail //ES6 shorthand syntax
}