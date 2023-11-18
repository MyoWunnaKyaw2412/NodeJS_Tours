const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
    // 1) Set Up

    const transportMail =  nodemailer.createTransport({
        secure: true,
        host:"smtp.gmail.com",
        port: 465,
        auth: {
            user: "h2wy.mog@gmail.com",
            pass: "lprj pypx gchh ynyo",
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    console.log(transportMail);

    // 2) Option - to who,from,subject,messaage
    const mailOptions = {
        from: "nodemailer",
        to: option.email,
        subject: option.subject,
        text: option.message,
    };
    console.log(mailOptions);

    await transportMail.sendMail(mailOptions);
};

module.exports = sendEmail;