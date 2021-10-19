'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Questions', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Questions', 'title');

  }
};
