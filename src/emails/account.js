const sgMail = require('@sendgrid/mail')

//const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

sgMail.send({
    to : 'borasiyapranav@gmail.com',
    from : 'borasiyapranav@gamil.com',
    subject : 'Democheck for Sendgrid',
    text : 'Hello Pranav from developer side'
})
