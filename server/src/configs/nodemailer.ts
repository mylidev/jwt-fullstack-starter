/**
 * nodemailer.ts
 */

import { SendMailOptions } from 'nodemailer';

export const nodemailerTransportOptions = {
    host: 'PLACEHOLDER_MAIL_HOST',
    port: 587,
    secure: false,
    auth: {
        user: 'PLACEHOLDER_USERNAME',
        pass: 'PLACEHOLDER_PASSWORD'
    }
};

export const resetPasswordEmailOptions = (
    receiver: string,
    token: string,
    _id: string
): SendMailOptions => {
    return {
        from: 'PLACEHOLDER_EMAIL_ADDRESS',
        to: receiver,
        subject: 'Reset Password',
        text: `[PLACEHOLDER_URL]/reset/${_id}/${token}`
    };
};
