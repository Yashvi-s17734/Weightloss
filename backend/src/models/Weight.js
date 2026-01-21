const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Weight = sequelize.define(
  "Weight",
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
      },
    ],
  },
);
User.hasMany(Weight, { foreignKey: "userId" });
Weight.belongsTo(User, { foreignKey: "userId" });

module.exports = Weight;
