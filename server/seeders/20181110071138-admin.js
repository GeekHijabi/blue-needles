const bcrypt = require('bcrypt');

const password = 'password';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
    userName: 'Admin',
    email: 'test@admin.com',
    role_id: 1,
    password: bcrypt.hashSync(password, 10),
    createdAt: new Date(),
    updatedAt: new Date()
    }], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})

};
