"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Questions",
      [
        {
          question: "How do I connect my wireless controller to my xbox one? ",
          title: 'Wireless Controller',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "How do I beat level 5 on Gears5",
          title:'Stuck on Gears 5',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Where is the RadAway in fallout shelter? ",
          title:'Help Finding RadAway',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "What is the best position to play in 2k?",
          title:'2K Position Choice',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "How do I earn VC in 2k?",
          title:'Earning VC',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "How do I defeat the Enderman in Minecraft? ",
          title:'Defeating Enderman',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "What are the best mods and cheats for SIMS 4? I want to have unlimited money!",
          title:'SIMS 4 Mods',
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
