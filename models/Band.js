const { db, DataTypes, Model } = require("../db");

class Band extends Model {}

Band.init(
    {
        name: DataTypes.STRING,
        genre: DataTypes.STRING,
        showCount: DataTypes.INTEGER,
    },
    {
        sequelize: db,
        modelName: "Band",
    }
);

module.exports = {
    Band,
};
