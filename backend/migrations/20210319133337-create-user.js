'use strict';
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { stringify } = require('querystring');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.JSON
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isInactive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    }).then(() => {
      // Cryptage
      function crypted(elem) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(crypto.randomBytes(32)), crypto.randomBytes(16));
        return cipher.update(elem, 'utf-8', 'hex');
      }

      function cryptedHmac(elem, key) {
        return crypto.createHmac("sha256", key).update(elem).digest("hex");
      }

      let email = {
        // Mail Identifier permet de crypter l'e-mail de maniere unidirectionnel 
        mailIdentifier: cryptedHmac('admin@groupomania.com', process.env.PASSWORDMAIL),
        // Mail Data crypte l'email mais avec possibilité de récupéré la chaine de caractere original
        mailData: crypted('admin@groupomania.com')
      };
      email = JSON.stringify(email);
      let password = bcrypt.hashSync('Admin1', 10);

      queryInterface.sequelize.query(`INSERT INTO Users (email, username, isAdmin, password) VALUES ('${email}', 'admin', 1, '${password}')`)
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};