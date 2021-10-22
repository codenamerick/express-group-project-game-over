'use strict';
const bcrypt = require('bcryptjs');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
const password = bcrypt.hashSync('Scarecrows!4', 10);

     let users = [
       {
         first_name: "Demo",
         last_name: "User",
         user_name: "demo_user",
         email: "demo@demo.com",
         hashed_password: password,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         first_name: "Kendra",
         last_name: "Miller",
         user_name: "ken_mill",
         email: "ken_mill@gameoverapp.com",
         hashed_password: password,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         first_name: "Rick",
         last_name: "Arocho",
         user_name: "rick_arocho",
         email: "rick_a@gamoverapp.com",
         hashed_password: password,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         first_name: "Tanner",
         last_name: "Hladek",
         user_name: "tanner_h",
         email: "tanner_h@gameoverapp.com",
         hashed_password: password,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         first_name: "Nik",
         last_name: "Tyler",
         user_name: "nik_tyler",
         email: "nik_t@gameoverapp.com",
         hashed_password: password,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
     ];

    const numNewUsers = 95;

    for(let i =6; i < numNewUsers; i++) {
      let newUser = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        user_name: faker.internet.userName(),
        email: faker.internet.email(),
        hashed_password: bcrypt.hashSync(`password${i}`, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
    }

    return queryInterface.bulkInsert('Users', users, {})
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });

  }
};
