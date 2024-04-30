const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');
const { transporter } = require('../utils/mail');
const UserService = require('./user.service');

const userService = new UserService();

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
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `https://el-fontend.com/recovery?token=${token}`;

    await userService.update(user.id, { recoveryToken: token });

    const info = await transporter.sendMail({
      to: user.email,
      subject: 'Recupera tu password',
      html: `<html>
        <ul>
          <li>id: ${user.id}</li>
          <li>role: ${user.role}</li>
          <li>created at: ${user.createdAt}</li>
        </ul>
        <a href="${link}">Clic here to recuperar el password</a>
        <small>${token}</small>
      </html>`,
    });

    return info;
  }
}

module.exports = AuthService;
