"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Questions",
      [
        {
          question: "How do I connect my wireless controller to my xbox one? ",
          title: 'Wireless Controller'
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "How do I beat level 5 on Gears5",
          title:
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Where is the RadAway in fallout shelter? ",
          title:
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "What is the best position to play in 2k?",
          title:
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "How do I earn VC in 2k?",
          title:
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "How do I defeat the Enderman in Minecraft? ",
          title:
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "What are the best cheats for SIMS 4?",
          title:
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", null, {});
  },
};
