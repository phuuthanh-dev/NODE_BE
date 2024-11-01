var koiFishBreedService = require("../services/koiFishBreedService");

const getAllKoiFishBreeds = async (req, res) => {
    try {
        let data = await koiFishBreedService.getAllKoiFishBreeds();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const createKoiFishBreed = async (req, res) => {
    try {
        let { name, description, image_url, zodiac_element } = req.body;
        let data = await koiFishBreedService.createKoiFishBreed(name, description, image_url, zodiac_element);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getKoiFishById = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await koiFishBreedService.getKoiFishById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getKoiFishByZodiac = async (req, res) => {
    try {
        const { zodiacId } = req.body;

        let data = await koiFishBreedService.getKoiFishByZodiac(zodiacId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateKoiFishBreed = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, description, image_url, zodiac_element } = req.body;

  
        let data = await koiFishBreedService.updateKoiFishBreed(id, name, description, image_url, zodiac_element);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateKoiFishBreedStatus = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await koiFishBreedService.updateKoiFishBreedStatus(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getAllKoiFishBreeds,
    createKoiFishBreed,
    getKoiFishByZodiac,
    getKoiFishById,
    updateKoiFishBreed,
    updateKoiFishBreedStatus
}