const { db } = require("./db");
const { Band, Musician, Song, Manager } = require("./index");
const {
    bandSeeds,
    musicianSeeds,
    songSeeds,
    managerSeeds,
} = require("./seeds/seeds");

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
        await Manager.bulkCreate(managerSeeds);
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

    // test("theLongestSong method for Song Model", async () => {
    //     const allSongs = await Song.findAll();
    //     const theLongestSong = Song.theLongestSong(allSongs);
    //     expect(theLongestSong).toEqual({});
    // });
    test("tests 1 to many band-musician association", async () => {
        const bands = await Band.findAll();
        expect(bands[0] instanceof Band).toEqual(true);
        expect(bands[0]).toEqual(expect.objectContaining({ name: "Apples" }));
        const foundBand = await Band.findOne({ where: { name: "Mangoes" } });
        const musician1 = await Musician.findByPk(1);
        const musician2 = await Musician.findByPk(2);
        await foundBand.addMusicians([musician1, musician2]);
        const band = await Band.findOne({
            where: { name: "Mangoes" },
            include: Musician,
        });
        //console.log(JSON.stringify(band, null, 2));
        const musiciansAssociatedWithBand = await foundBand.getMusicians();
        expect(musiciansAssociatedWithBand.length).toBe(2);
        expect(musiciansAssociatedWithBand[0]).toEqual(
            expect.objectContaining({ name: "Ben" })
        );
    });

    // tests many to many associations between Band and Song
    test("tests many to many bands-songs association", async () => {
        const band = await Band.findByPk(5);
        const song1 = await Song.findByPk(4);
        const song2 = await Song.findByPk(3);
        await band.addSongs([song1, song2]);
        const bandWithSongs = await band.getSongs();
        expect(bandWithSongs.length).toBe(2);
        expect(bandWithSongs[0] instanceof Song).toBe(true);
    });

    test("tests many to many songs-bands association", async () => {
        const band1 = await Band.findByPk(5);
        const band2 = await Band.findByPk(3);
        const song = await Song.findByPk(4);
        await song.addBands([band1, band2]);
        const bands = await song.getBands();
        expect(bands.length).toBe(2);
        expect(bands[0] instanceof Band).toBe(true);
    });

    test("tests 1 to 1 band-manager association", async () => {
        const band = await Band.findByPk(1);
        const manager = await Manager.findByPk(3);
        await band.setManager(manager);
        const associatedManager = await band.getManager();
        expect(associatedManager.name).toEqual("Lilly");
        const bandWithManager = await Band.findByPk(1, { include: Manager });
        console.log(JSON.stringify(bandWithManager, null, 2));
        expect(bandWithManager.Manager.salary).toBe(90000);
    });
});
