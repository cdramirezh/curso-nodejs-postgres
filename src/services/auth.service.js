const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

class AuthService {
  constructor() {}

  async getUser() {
    throw boom.badImplementation('Me rehuso a hacerlo');
  }

  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async sendRecoveryEmail(user) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });

    const info = await transporter.sendMail({
      from: config.emailUser,
      to: user.email,
      subject: 'Recupera tu password',
      text: 'Recuperame esta',
      html: `<html>
        <ul>
          <li>id: ${user.id}</li>
          <li>role: ${user.role}</li>
          <li>created at: ${user.createdAt}</li>
        </ul>
      </html>`,
    });

    return info;
  }
}

module.exports = AuthService;
