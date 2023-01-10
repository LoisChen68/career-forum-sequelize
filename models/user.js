'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    role: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    account: DataTypes.STRING,
    avatar: DataTypes.STRING,
    cover: DataTypes.STRING,
    cover: DataTypes.STRING,
    cover: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    approvalStatus: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isSuspended: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: false,
  });
  return User;
};