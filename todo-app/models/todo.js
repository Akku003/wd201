"use strict";
const { Model, Op } = require("sequelize"); // Add this import at the top

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title, dueDate, completed: false });
    }

    static getOverdueTodos() {
      return this.findAll({
        where: {
          dueDate: { [Op.lt]: new Date().toISOString().split('T')[0] },
          completed: false
        }
      });
    }

    static getDueTodayTodos() {
      return this.findAll({
        where: {
          dueDate: new Date().toISOString().split('T')[0],
          completed: false
        }
      });
    }

    static getDueLaterTodos() {
      return this.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toISOString().split('T')[0] },
          completed: false
        }
      });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};