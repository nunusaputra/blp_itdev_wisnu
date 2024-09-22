"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      desc: DataTypes.TEXT,
      image: DataTypes.STRING,
      document: DataTypes.STRING,
      imageURL: DataTypes.STRING,
      documentURL: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
