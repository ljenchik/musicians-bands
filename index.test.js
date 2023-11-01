const { db } = require("./db");
const { Band, Musician, Song } = require("./index");
const { bandSeeds, musicianSeeds, songSeeds } = require("./seeds/seeds");

describe("Band, Musician, and Song Models", () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the
        // test suite is run
        await db.sync({ force: true });
        await Band.bulkCreate(bandSeeds);
        await Musician.bulkCreate(musicianSeeds);
        await Song.bulkCreate(songSeeds);
    });

    test("can create a Band", async () => {
        const newBand = await Band.create({
            name: "Bugs",
            genre: "rock",
            showCount: 100,
        });
        expect(newBand.name).toBe("Bugs");
        expect(newBand.genre).toBe("rock");
        expect(newBand.showCount).toBe(100);
    });

    test("can create a Musician", async () => {
        const newMusician = await Musician.create({
            name: "John",
            instrument: "guitar",
        });
        expect(newMusician.name).toBe("John");
        expect(newMusician.instrument).toBe("guitar");
    });

    test("can update a Band", async () => {
        const newBand = await Band.create({
            name: "Animals",
            genre: "Jazz",
            showCount: 1000,
        });
        newBand.update({ name: "Cartoons", genre: "funk" });
        expect(newBand.name).toBe("Cartoons");
        expect(newBand.genre).toBe("funk");
        expect(newBand.showCount).toBe(1000);
    });

    test("can update a Musician", async () => {
        const newMusician = await Musician.create({
            name: "Ben",
            instrument: "drums",
        });
        newMusician.update({ name: "Bill" });
        expect(newMusician.name).toBe("Bill");
        expect(newMusician.instrument).toBe("drums");
    });

    test("can delete a Band", async () => {
        const newBand = await Band.create({
            name: "Bugs",
            genre: "Rock",
            showCount: 100,
        });
        const deletedBand = await newBand.destroy();
        expect(deletedBand).toEqual(newBand);
    });

    test("can delete a Musician", async () => {
        const newMusician = await Musician.create({
            name: "Harry",
            instrument: "piano",
        });
        const deletedMusician = await newMusician.destroy();
        expect(deletedMusician).toBe(newMusician);
    });

    test("increment method", async () => {
        let newSong = await Song.findOne({
            where: {
                title: "Valentine",
            },
        });
        expect(newSong.length).toBe(457);
        await newSong.increment("length", { by: 5 });
        newSong = await Song.findOne({
            where: {
                title: "Valentine",
            },
        });
        expect(newSong.length).toBe(462);
    });

    test("toMinutes method for Song Model", async () => {
        let newSong = await Song.findOne({
            where: {
                title: "Valentine",
            },
        });
        await newSong.update({ length: newSong.toMinutes(newSong.length) });
        expect(newSong.length).toEqual("7:42");
    });
});
