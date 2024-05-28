'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Result.belongsTo(models.Exam, { foreignKey: 'resId', as: 'exam' });
    }
  }
  Result.init({
    resId: DataTypes.INTEGER,
    color: DataTypes.STRING,
    long: DataTypes.STRING,
    slant: DataTypes.STRING,
    reflex: DataTypes.STRING,
    sign: DataTypes.INTEGER,
    line: DataTypes.INTEGER,
    giving: DataTypes.INTEGER,
    practice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};