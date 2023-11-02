const { db, DataTypes, Model } = require("../db");

class Song extends Model {
    theLongestSong(allSongs) {
        let longestSong = allSongs[0];
        for (const song of allSongs) {
            if (song.length > longest) {
                longestSong = song;
            }
        }
        return longestSong;
    }
}

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
