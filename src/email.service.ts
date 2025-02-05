/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailerService.name);

  constructor() {
    //  environment variables
    this.validateConfig();
    
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      //  timeout settings
      tls: {
        rejectUnauthorized: false 
      },
      pool: true, 
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5
    });

    // Verify connection configuration
    this.verifyConnection();
  }

  private validateConfig() {
    const requiredEnvVars = [
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASSWORD',
      'SMTP_FROM'
    ];
    
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }
  }

  private async verifyConnection() {
    try {
      await this.transporter.verify();
      // this.logger.log('SMTP connection verified successfully');
      return { success: true, message: 'SMTP connection successful' };
    } catch (error) {
      this.logger.error('Failed to verify SMTP connection:', error);
      // throw new Error('Failed to establish SMTP connection');
      return { success: false, error: error.message };
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    if (!to || !subject || !html) {
      throw new Error('Missing required email parameters');
    }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully. Message ID: ${info.messageId}`);
      
      return {
        success: true,
        message: 'Mail Sent!',
        messageId: info.messageId
      };
    } catch (error) {
      this.logger.error('Failed to send email:', {
        error: error.message,
        stack: error.stack,
        to,
        subject
      });

      //  more specific error messages
      if (error.code === 'ECONNREFUSED') {
        throw new InternalServerErrorException('Failed to connect to email server');
      } else if (error.code === 'ETIMEDOUT') {
        throw new InternalServerErrorException('Email server connection timed out');
      } else if (error.responseCode === 553) {
        throw new InternalServerErrorException('Invalid recipient email address');
      }

      throw new InternalServerErrorException(
        `Failed to send email: ${error.message}`
      );
    }
  }

  async sendConfirmationEmail(email: string, code: string) {
    if (!process.env.CONFIRM_EMAIL_PATH) {
      throw new Error('CONFIRM_EMAIL_PATH environment variable is not set');
    }

    const link = `${process.env.CONFIRM_EMAIL_PATH}?code=${code}&email=${email}&type=1`;
    const template = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Email Confirmation</h2>
          <p>Your confirmation code is:</p>
          <h3 style="background-color: #f4f4f4; padding: 10px; text-align: center;">${code}</h3>
          <p>You can also confirm your email by clicking the button below:</p>
          <a href="${link}" 
             style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
                    color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
            Confirm Email
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            If you didn't request this email, please ignore it.
          </p>
        </div>
      </body>
    </html>`;

    return await this.sendEmail(email, 'Confirm your Email!', template);
  }

  async sendForgotPasswordEmail(email: string, code: string) {
    if (!process.env.CONFIRM_EMAIL_PATH) {
      throw new Error('CONFIRM_EMAIL_PATH environment variable is not set');
    }

    const link = `${process.env.CONFIRM_EMAIL_PATH}?code=${code}&email=${email}&type=2`;
    const template = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Your password reset code is:</p>
          <h3 style="background-color: #f4f4f4; padding: 10px; text-align: center;">${code}</h3>
          <p>You can also reset your password by clicking the button below:</p>
          <a href="${link}" 
             style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
                    color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
            Reset Password
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            If you didn't request this password reset, please ignore this email.
          </p>
        </div>
      </body>
    </html>`;

    return await this.sendEmail(email, 'Reset your Password!', template);
  }
}