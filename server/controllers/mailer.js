//! NOT WORKING, FIX ISSUESSSSSS
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: process.env.TEMP_EMAIL,
        pass: process.env.TEMP_EMAIL_PASS,
    },
});

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/',
    },
});

/** POST: http://localhost:8080/api/send-mail
 * @param: {
  "username" : "the_247",
  "userEmail" : "the_247@superverse.com",
  "text" : "Hello, This is a test mail sent to you! Please Ignore it.",
  "subject" : "TEST MAIL",
}
*/
export default async function sendMail(req, res) {
    try {
        const { username, userEmail, text, subject } = req.body;

        const emailHTML = MailGenerator.generate({
            body: {
                name: username,
                intro: text || "Welcome to Superverse! We're very excited to have you on board.",
                outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
            },
        });

        const email = {
            from: process.env.TEMP_EMAIL,
            to: userEmail,
            subject: subject || 'Notice/Update for you from Superverse',
            html: emailHTML,
        };

        transporter
            .sendMail(email)
            .then(() => res.status(200).send({ msg: 'Email sent successfully' }))
            .catch((err) => res.status(500).send({ error: 'Email not sent', err }));
    } catch (err) {
        res.status(401).send(err);
    }
}
