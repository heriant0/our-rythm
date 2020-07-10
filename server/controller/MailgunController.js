const {sendEmail} = require('../helper/mailgun')
class MailgunController{
    static send(req,res){
        let mail = req.body
        console.log(req.body)
        sendEmail(mail)

    }
}

module.exports = MailgunController