'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Question;
};
