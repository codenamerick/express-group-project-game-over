'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    up_vote: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    answer_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo( models.User, {foreignKey: 'user_id'});
    Vote.belongsTo( models.Answer, {foreignKey: 'answer_id'});
  };
  return Vote;
};
