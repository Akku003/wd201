module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Todos', [{
            title: 'First Todo',
            description: 'This is a sample todo',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Todos', null, {});
    }
};