const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "place",
    {
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      title: { type: Sequelize.STRING },
      location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT), // stores [latitude, longitude]
      },
      status: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      reviewercomment: { type: Sequelize.STRING, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "places",
    }
  );
};
