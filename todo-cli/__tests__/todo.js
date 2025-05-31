/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// const todoList = require(`../todo`);

// const { all, markAsComplete, add } = todoList();

// describe("Todolist Test Suite", () => {
//     beforeAll(() => {
//         add(
//             {
//                 title: "Test todo",
//                 completed: false,
//                 dueDate: new Date().toISOString().slice(0, 10)
//             }
//         );
//     })
//     test("Should add new todo", () => {
//         // expect(all.length).toBe(0);
//         const todoItemsCount = all.length;
//         add(
//             {
//                 title: "Test todo",
//                 completed: false,
//                 dueDate: new Date().toISOString().slice(0, 10)
//             }
//         );
//         expect(all.length).toBe(todoItemsCount + 1);
//     });

//     test("Should mark a todo as complete", () => {
//         expect(all[0].completed).toBe(false);
//         markAsComplete(0);
//         expect(all[0].completed).toBe(true);
//     })
// })

const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList } = todoList();

describe("Todo List Test Suite", () => {
    // Reset the todo list before each test
    beforeEach(() => {
        all.length = 0;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        add({
            title: "Overdue Task",
            dueDate: yesterday.toISOString().split("T")[0],
            completed: false,
        });
        add({
            title: "Due Today Task",
            dueDate: today.toISOString().split("T")[0],
            completed: false,
        });
        add({
            title: "Due Later Task",
            dueDate: tomorrow.toISOString().split("T")[0],
            completed: false,
        });
    });

    test("Adds a new todo", () => {
        const initialCount = all.length;
        add({
            title: "New Task",
            dueDate: new Date().toISOString().split("T")[0],
            completed: false
        });
        expect(all.length).toBe(initialCount + 1);
    });

    test("Marks a todo as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("Retrieves overdue items", () => {
        const overdueItems = overdue();
        expect(overdueItems.length).toBe(1);
        expect(overdueItems[0].title).toBe("Overdue Task");
    });

    test("Retrieves due today items", () => {
        const dueTodayItems = dueToday();
        expect(dueTodayItems.length).toBe(1);
        expect(dueTodayItems[0].title).toBe("Due Today Task");
    });

    test("Retrieves due later items", () => {
        const dueLaterItems = dueLater();
        expect(dueLaterItems.length).toBe(1);
        expect(dueLaterItems[0].title).toBe("Due Later Task");
    });
});