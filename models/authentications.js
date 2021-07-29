'use strict';
module.exports = (sequelize, DataTypes) => {
  const Authentications = sequelize.define('Authentications', {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        allowNull: false,
      },
  }, {});
  Authentications.associate = function(models) {
    // associations can be defined here
  };
  return Authentications;
};