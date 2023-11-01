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
            name: "Bugs",
            genre: "rock",
        });
        expect(newBand.name).toBe("Bugs");
        expect(newBand.genre).toBe("rock");
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
        });
        newBand.update({ name: "Cartoons", genre: "funk" });
        expect(newBand.name).toBe("Cartoons");
        expect(newBand.genre).toBe("funk");
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
});
