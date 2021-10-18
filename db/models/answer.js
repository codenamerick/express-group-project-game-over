'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Answer.associate = function(models) {
    Answer.hasMany(models.Vote, { foreignKey: 'answer_id', onDelete: 'CASCADE', hooks: true });
    Answer.belongsTo(models.User, { foreignKey: 'user_id' });
    Answer.belongsTo(models.Question, { foreignKey: 'question_id' });
  };
  return Answer;
};
