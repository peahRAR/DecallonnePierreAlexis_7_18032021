'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });

      models.Message.belongsTo(models.Message, {
        foreignKey: {
          allowNull: true
        }
      })
    }
  };
  Message.init({
    idUSERS: DataTypes.INTEGER,
    idParent: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    tags : DataTypes.JSON,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};