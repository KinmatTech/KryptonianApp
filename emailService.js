import nodemailer from 'nodemailer';
import { emailUser, emailPass } from '../config.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: emailUser,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
