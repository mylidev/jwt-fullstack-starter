/**
 * transporter.ts
 */

import nodemailer from 'nodemailer';
import { nodemailerTransportOptions } from '../configs/nodemailer';

export default nodemailer.createTransport(nodemailerTransportOptions);
