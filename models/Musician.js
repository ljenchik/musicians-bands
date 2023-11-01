const { db, DataTypes, Model } = require("../db");

class Musician extends Model {}

Musician.init(
    {
        name: DataTypes.STRING,
        instrument: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "Musician",
    }
);

module.exports = {
    Musician,
};
