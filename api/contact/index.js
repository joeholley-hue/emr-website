
const sgMail = require('@sendgrid/mail');

module.exports = async function (context, req) {
    const { name, email, agency, message } = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: "admin@emergencymedicalresources.com",
        from: "admin@emergencymedicalresources.com",
        subject: "New Contact Form Submission",
        text: `
New contact form submission:

Name: ${name}
Email: ${email}
Agency: ${agency}
Message: ${message}
        `
    };

    try {
        await sgMail.send(msg);
        context.res = {
            status: 200,
            body: "Message sent successfully."
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error sending message."
        };
    }
};
