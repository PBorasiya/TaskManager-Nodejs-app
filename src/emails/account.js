const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'borasiyapranav@gmail.com',
        subject : 'Thanks for Joining our Service',
        text : `Welcome to the app, ${name}. Wassup wassup mah man!!`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'borasiyapranav@gmail.com',
        subject : 'Sad to see you go',
        text : `Welcome to the app, ${name}. We are sad to see you go!!`
    })
}

module.exports = {
    sendWelcomeEmail, //ES6 shorthand syntax
    sendGoodbyeEmail
}