'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {

      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });

      models.Message.belongsTo(models.Message, {
        as: 'message',
        foreignKey: 'userId',
        targetKey: 'id'
      })

      models.Message.hasMany(models.Like, {
        as: 'like',
        foreignKey: {
          name: 'messageId',
          allowNull: true
        }
      })
    }
  };
  Message.init({
    userId: DataTypes.INTEGER,
    idParent: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};