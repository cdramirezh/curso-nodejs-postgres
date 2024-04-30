const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');
const { transporter } = require('../utils/mail');

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
    const info = await transporter.sendMail({
      to: user.email,
      subject: 'Recupera tu password',
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
