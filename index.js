const { Band } = require("./models/Band");
const { Musician } = require("./models/Musician");
const { Song } = require("./models/Song");
// Define associations here
// 1: many
Band.hasMany(Musician);
Musician.belongsTo(Band);

// many:many
Band.belongsToMany(Song, { through: "band-song" });
Song.belongsToMany(Band, { through: "band-song" });

module.exports = {
    Band,
    Musician,
    Song,
};
