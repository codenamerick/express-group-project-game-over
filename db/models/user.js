'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashed_password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Question, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true});
    User.hasMany(models.Answer, { foreignKey: 'user_id',  onDelete: 'CASCADE', hooks: true});
    User.hasMany(models.Vote, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return User;
};
