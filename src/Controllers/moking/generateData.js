const { faker } = require('@faker-js/faker');

const generateMockUsers = (req, res) => {
    const users = [];
    for (let i = 0; i < 50; i++) {
        users.push({
            first_name: faker.person.firstName(), // Cambiado de faker.name.firstName()
            last_name: faker.person.lastName(),   // Cambiado de faker.name.lastName()
            age: faker.number.int({ min: 18, max: 80 }).toString(), // Cambiado de faker.datatype.number()
            email: faker.internet.email(),
            password: faker.internet.password(), // Para encriptar, cambiar este valor más adelante
            cartId: null,
            role: faker.helpers.arrayElement(['user', 'admin', 'premium']), // Cambiado a arrayElement
            documents: [],
            last_connection: faker.date.recent(),
        });
    }
    res.json(users);
};

module.exports = {
    generateMockUsers,
};
