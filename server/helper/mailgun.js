const api_key = process.env.APIKEY;
const domain = 'sandbox49ba6eff39d04eac9d1317fcbbbd1ae4.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

module.exports = {
    sendEmail(data) {
        const email = {
            from: "me@samples.mailgun.org",
            to: "fetuvici@gmail.com",
            subject: data.title,
            text: `<p>${data.album}</p>`
        };

        return mailgun.messages().send(email, function(error, body) {
            console.log(body);
        });
    }
}