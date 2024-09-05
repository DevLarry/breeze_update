// src/mailer/mailer.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    }
    catch(e) {
      throw new InternalServerErrorException();
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions, (err: any, info: any) => {
        if (err) throw err;
      });
      return this.createResponse(true);
    } catch (e) {
      throw new InternalServerErrorException('Failed to send Email!');
    }
  }

  createResponse(success: boolean) {
    return {
      success,
      message: success ? 'Mail Sent!' : 'An error ocuured while sending mail',
    };
  }

  async sendConfirmationEmail(email: string, code: string) {
    const link = `${process.env.CONFIRM_EMAIL_PATH}?code=${code}&email=${email}&type=1`;
    const template = `<body>
    <h2>Your Email confirmation code is:</h2>
      <h3>${code}</h3>
      you can also  click <a href="${link}">this link</a> to confirm your Email
    </body>`;
    const res = await this.sendEmail(email, 'Confirm your Email!', template);
    return res;
  }

  async sendForgotPasswordEmail(email: string, code: string) {
    const link = `${process.env.CONFIRM_EMAIL_PATH}?code=${code}&email=${email}&type=2`;
    const template = `<body>
    <h2>Your Email confirmation code is:</h2>
      <h3>${code}</h3>
      you can also  click <a href="${link}">this link</a> to confirm your Email
    </body>`;
    const res = await this.sendEmail(email, 'Confirm your Email!', template);

    return res;
  }
}
