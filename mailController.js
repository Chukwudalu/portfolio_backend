const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

exports.sendEmail = (req, res, next) => {
    // const name = req.body.firstName + ' ' + req.body.lastName;
    console.log(req.body)
    const email = req.body.email;
    const phone = req.body.phone;
    const message = `${req.body.message}. My phone number is ${phone} and my name is ${req.body.firstName}`;
    

    const mailOptions = {
        from: email,
        to: process.env.MAILGUN_RECIPIENT,
        subject: "Contact Form Submission - Portfolio",
        text: message
    };

    transporter.sendMail(mailOptions, (error) => {
        if(error) return res.status(500).json({ code: 500, status: 'fail', message: "Your message could not be sent"})

        return res.status(200).json({ code: 200, status: 'success', message: "Your message has been sent successfully"})
    })

}


