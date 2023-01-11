'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Question, { foreignKey: 'questionId' })
    }
  }
  Answer.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'Answers'
  });
  return Answer;
};