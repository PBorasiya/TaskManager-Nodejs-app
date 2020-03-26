const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(sendgridAPIkey)

sgMail.send({
    to : 'borasiyapranav@gmail.com',
    from : 'borasiyapranav@gamil.com',
    subject : 'Democheck for Sendgrid',
    text : 'Hello Pranav from developer side'
})

//democheck