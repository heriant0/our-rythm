const api_key = process.env.APIKEY;
const domain = 'mail.yohanpn.com';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

module.exports = {
    sendEmail(data) {
        const email = {
            from: "OurRythm@mail.yohanpn.com",
            to: data.to,
            subject: data.subject,
            html: data.html
        };

        return mailgun.messages().send(email, function(error, body) {
            console.log(body);
        });
    }
}