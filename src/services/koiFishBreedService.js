const KoiFishBreed = require("../models/KoiFishBreed");

const getAllKoiFishBreeds = async () => {
    try {
        const koiFishBreeds = await KoiFishBreed.find().populate("zodiac_element");
        return { errCode: 0, message: "Success", koiFishBreeds };
    } catch (error) {
        console.error("Error in getAllKoiFishBreeds:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const createKoiFishBreed = async (name, description, image_url, zodiac_element) => {
    try {
        const newKoiFishBreed = new KoiFishBreed({ name, description, image_url, zodiac_element });
        await newKoiFishBreed.save();
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in createKoiFishBreed:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getKoiFishByZodiac = async (zodiacId) => {
    try {
        const koiFishBreeds = await KoiFishBreed.find({ zodiac_element: zodiacId });
        return { errCode: 0, message: "Success", koiFishBreeds };
    } catch (error) {
        console.error("Error in getKoiFishByZodiac:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getKoiFishById = async (id) => {
    try {
        const koiFishBreed = await KoiFishBreed.findById(id).populate("zodiac_element");
        return { errCode: 0, message: "Success", koiFishBreed };
    } catch (error) {
        console.error("Error in getKoiFishById:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const updateKoiFishBreed = async (id, name, description, imageUrl, zodiacElementId) => {
    try {
        await KoiFishBreed.findByIdAndUpdate(id, { name, description, image_url: imageUrl, zodiac_element: zodiacElementId });
        return { errCode: 0, message: "Success" };
    }
    catch (error) {
        console.error("Error in updateKoiFishBreed:", error);
        return { errCode: 1, message: "Server error" };
    }
}
      
const updateKoiFishBreedStatus = async (id) => {
    try {
        const koiFishBreed = await KoiFishBreed.findById(id);
        koiFishBreed.status = koiFishBreed.status === "Active" ? "Inactive" : "Active";
        await koiFishBreed.save();
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in updateKoiFishBreedStatus:", error);
        return { errCode: 1, message: "Server error" };
    }
}

module.exports = {
    getAllKoiFishBreeds,
    createKoiFishBreed,
    getKoiFishByZodiac,
    getKoiFishById,
    updateKoiFishBreed,
    updateKoiFishBreedStatus
};