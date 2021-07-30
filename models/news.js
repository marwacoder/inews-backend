'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    newsId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    description: DataTypes.STRING,
    sourceName: DataTypes.STRING,
    sourceTitle: DataTypes.STRING,
    category: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  News.associate = function(models) {
    // associations can be defined here
  };
  return News;
};