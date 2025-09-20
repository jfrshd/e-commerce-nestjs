import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(email: string, code: string) {
    console.log('🔍 EmailService.sendVerificationEmail: Sending verification email');
    console.log('🔍 EmailService.sendVerificationEmail: Email:', email);
    console.log('🔍 EmailService.sendVerificationEmail: Code:', code);
    
    // For development, just log the verification code instead of sending email
    console.log('📧 DEVELOPMENT MODE: Email verification code for', email, 'is:', code);
    console.log('📧 In production, this would be sent via email');
    
    // Skip actual email sending in development if SMTP is not configured
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com') {
      console.log('✅ EmailService.sendVerificationEmail: Skipping email send (development mode)');
      return;
    }
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Verify Your Email - E-commerce App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Thank you for signing up! Please use the following code to verify your email address:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
      `,
    };

    try {
      console.log('🔍 EmailService.sendVerificationEmail: Sending email via SMTP');
      await this.transporter.sendMail(mailOptions);
      console.log('✅ EmailService.sendVerificationEmail: Verification email sent successfully');
    } catch (error) {
      console.error('❌ EmailService.sendVerificationEmail: Failed to send email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendPasswordResetEmail(email: string, code: string) {
    console.log('🔍 EmailService.sendPasswordResetEmail: Sending password reset email');
    console.log('🔍 EmailService.sendPasswordResetEmail: Email:', email);
    console.log('🔍 EmailService.sendPasswordResetEmail: Code:', code);
    
    // For development, just log the password reset code instead of sending email
    console.log('📧 DEVELOPMENT MODE: Password reset code for', email, 'is:', code);
    console.log('📧 In production, this would be sent via email');
    
    // Skip actual email sending in development if SMTP is not configured
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com') {
      console.log('✅ EmailService.sendPasswordResetEmail: Skipping email send (development mode)');
      return;
    }
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Reset Your Password - E-commerce App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>You requested to reset your password. Please use the following code to reset your password:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #dc3545; font-size: 32px; margin: 0; letter-spacing: 5px;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
      `,
    };

    try {
      console.log('🔍 EmailService.sendPasswordResetEmail: Sending email via SMTP');
      await this.transporter.sendMail(mailOptions);
      console.log('✅ EmailService.sendPasswordResetEmail: Password reset email sent successfully');
    } catch (error) {
      console.error('❌ EmailService.sendPasswordResetEmail: Failed to send email:', error);
      throw new Error('Failed to send password reset email');
    }
  }
}
