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
        foreignKey: 'idParent',
        targetKey: 'id',
        onDelete: 'CASCADE'
      })

      models.Message.hasMany(models.Like, {
        as: 'like',
        foreignKey: {
          name: 'messageId',
          allowNull: true
        },
        onDelete: 'CASCADE'
      })
    }
  };
  Message.init({
    userId: DataTypes.INTEGER,
    idParent: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN,
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};