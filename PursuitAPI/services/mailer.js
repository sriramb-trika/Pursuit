let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let handlebars = require('handlebars');
let fs = require('fs');
let config = require('config');
let path = require('path');

let sendMail = (htmlFileNameWithExt, toUsers, subject, replacements, cc = '') => {

    let readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
            }
            else {
                callback(null, html);
            }
        });
    };
    smtpTransportObj = nodemailer.createTransport(smtpTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: config.mail.secure,
        auth: config.mail.auth
    }));
    let fileHtmlPath = path.join(__dirname, '..', 'public/mail_templates', htmlFileNameWithExt);

    readHTMLFile(fileHtmlPath, function (err, html) {
        let template = handlebars.compile(html);
    
        replacements.year = config.mail.year;
        let htmlToSend = template(replacements);
        let mailOptions = {
            from: "Pursuit <" + config.mail.auth.user + ">",
            to: toUsers,
            subject: subject,
            html: htmlToSend
        };
        if (cc) {
            mailOptions.cc = cc;
        }
        smtpTransportObj.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log('Mail sent successfully')
            }
        });
    });
}

module.exports = {
    sendMail
}
