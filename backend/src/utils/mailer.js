import nodemailer from 'nodemailer';

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendWelcomeEmail(user) {
    const { email, name } = user;
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Welcome to the Blood and Organ Donation System',
      html: `
        <div>
          <h2>Welcome to our community, ${name}!</h2>
          <p>Thank you for joining the Blood and Organ Donation System. Your contribution can help save lives.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The Blood and Organ Donation Team</p>
        </div>
      `,
    };
    return this.transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(user, token) {
    const { email, name } = user;
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Please verify your email address',
      html: `
        <div>
          <h2>Hello ${name},</h2>
          <p>Please verify your email address by clicking the link below:</p>
          <p><a href="${verificationUrl}">Verify my email</a></p>
          <p>If you did not create an account, please ignore this email.</p>
          <p>Best regards,<br>The Blood and Organ Donation Team</p>
        </div>
      `,
    };
    return this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(user, token) {
    const { email, name } = user;
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div>
          <h2>Hello ${name},</h2>
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <p><a href="${resetUrl}">Reset my password</a></p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,<br>The Blood and Organ Donation Team</p>
        </div>
      `,
    };
    return this.transporter.sendMail(mailOptions);
  }

  async sendMatchNotificationEmail(donor, request) {
    const { email, name } = donor;
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Donation Match Found!',
      html: `
        <div>
          <h2>Hello ${name},</h2>
          <p>Great news! We've identified a potential match for your donation.</p>
          <p>Details:</p>
          <ul>
            <li>Request ID: ${request.id}</li>
            <li>Hospital: ${request.hospital.name}</li>
            <li>Requested Type: ${request.type}</li>
            <li>Urgency Level: ${request.urgencyLevel}</li>
          </ul>
          <p>Please log in to your account to respond to this match request.</p>
          <p>Thank you for your generosity!</p>
          <p>Best regards,<br>The Blood and Organ Donation Team</p>
        </div>
      `,
    };
    return this.transporter.sendMail(mailOptions);
  }

  async sendHospitalMatchNotificationEmail(hospital, match) {
    const { email, name } = hospital;
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'New Donation Match Available',
      html: `
        <div>
          <h2>Hello ${name},</h2>
          <p>A new donation match has been found for one of your requests.</p>
          <p>Details:</p>
          <ul>
            <li>Match ID: ${match.id}</li>
            <li>Request ID: ${match.request.id}</li>
            <li>Donor ID: ${match.donor.id}</li>
            <li>Match Status: ${match.status}</li>
          </ul>
          <p>Please log in to your dashboard to review this match and take appropriate action.</p>
          <p>Best regards,<br>The Blood and Organ Donation Team</p>
        </div>
      `,
    };
    return this.transporter.sendMail(mailOptions);
  }
}

const mailer = new Mailer();
export default mailer;
