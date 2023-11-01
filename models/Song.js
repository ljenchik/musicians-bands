const { db, DataTypes, Model } = require("../db");

class Song extends Model {}

Song.init(
    {
        title: DataTypes.STRING,
        year: DataTypes.INTEGER,
        length: DataTypes.INTEGER,
    },
    {
        sequelize: db,
        modelName: "Song",
    }
);

Song.prototype.toMinutes = function (length) {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    return `${minutes}:${seconds}`;
};

module.exports = {
    Song,
};
