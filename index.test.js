const { db } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the
        // test suite is run
        await db.sync({ force: true });
    });

    test("can create a Band", async () => {
        const newBand = await Band.create({
            name: "Peace",
            genre: "Rock",
        });
        expect(newBand.name).toBe("Peace");
        expect(newBand.genre).toBe("Rock");
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
            name: "Peace",
            genre: "Rock",
        });
        const newBand2 = await Band.create({
            name: "War",
            genre: "Jazz",
        });
        newBand2.update({ name: "Be happy", genre: "soul" });
        expect(newBand2.name).toBe("Be happy");
        expect(newBand2.genre).toBe("soul");
    });

    test("can update a Musician", async () => {
        const newMusician = await Musician.create({
            name: "Harry",
            instrument: "piano",
        });
        const newMusician2 = await Musician.create({
            name: "Ben",
            instrument: "drums",
        });
        newMusician2.update({ name: "Bill" });
        expect(newMusician2.name).toBe("Bill");
        expect(newMusician2.instrument).toBe("drums");
    });

    test("can delete a Band", async () => {
        const newBand = await Band.create({
            name: "Peace",
            genre: "Rock",
        });
        const newBand2 = await Band.create({
            name: "War",
            genre: "Jazz",
        });
        const deletedBand = await newBand.destroy();
        expect(deletedBand).toEqual(newBand);
    });

    test("can delete a Musician", async () => {
        const newMusician = await Musician.create({
            name: "Harry",
            instrument: "piano",
        });
        const newMusician2 = await Musician.create({
            name: "Ben",
            instrument: "drums",
        });
        const deletedMusician = await newMusician.destroy();
        expect(deletedMusician).toBe(newMusician);
    });
});
