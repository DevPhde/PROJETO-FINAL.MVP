import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";
import { Expense } from "./Expense.js";

export const TypeExpense = sequelize.define('TypeExpense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

TypeExpense.hasMany(Expense, {foreignKey: 'TypeExpenseId'});
Expense.belongsTo(TypeExpense, {foreignKey: 'TypeExpenseId'});