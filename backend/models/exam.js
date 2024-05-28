'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exam.hasOne(models.Result, { foreignKey: 'resId', as: 'result' });
    }
  }
  Exam.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    description: DataTypes.STRING,
    // date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};