'use strict';
module.exports = (DataTypes, DataTypes) => {
  const User = DataTypes.define(
    "User",
    {
      first_name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      user_name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100),
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100),
      },
      hashed_password: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
      },
    },
    {}
  );
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
