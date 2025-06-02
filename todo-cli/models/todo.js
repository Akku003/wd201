'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');  // Add this line

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo-list\n");

      console.log("Overdue");
      const overdueItems = await this.overdue();
      console.log(overdueItems.map(item => item.displayableString()).join("\n"));
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await this.dueToday();
      console.log(dueTodayItems.map(item => item.displayableString()).join("\n"));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await this.dueLater();
      console.log(dueLaterItems.map(item => item.displayableString()).join("\n"));
    }

    static async overdue() {
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.lt]: today.toISOString().split('T')[0],
            [Sequelize.Op.not]: today.toISOString().split('T')[0]
          },
          completed: false
        },
        order: [['id', 'ASC']]
      });
    }

    static async dueToday() {
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: today.toISOString().split('T')[0]
        },
        order: [['id', 'ASC']]
      });
    }

    static async dueLater() {
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.gt]: today.toISOString().split('T')[0]
          },
          completed: false
        },
        order: [['id', 'ASC']]
      });
    }

    static async markAsComplete(id) {
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id
          }
        }
      );
    }

    displayableString() {
      const today = new Date();
      const dueDate = new Date(this.dueDate);
      const isDueToday = dueDate.toDateString() === today.toDateString();
      let checkbox = this.completed ? "[x]" : "[ ]";
      const displayDate = isDueToday ? "" : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${displayDate}`.trim();
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};