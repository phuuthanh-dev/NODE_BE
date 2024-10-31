const consultationServive = require("../services/consultationService");

const getAllConsultations = async (req, res) => {
    try {
        const result = await consultationServive.getAllConsultations();
        return res.json(result);

    } catch (error) {
        console.error("Error in getAllConsultationsController:", error);
        return res.json({ errCode: 1, message: "Server error" });
    }
}

const getConsultationById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await consultationServive.getConsultationById(id);
        return res.json(result);

    } catch (error) {
        console.error("Error in getConsultationByIdController:", error);
        return res.json({ errCode: 1, message: "Server error" });
    }
}

const changeConsultationStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status, rejectionReason } = req.body;

        console.log("changeConsultationStatus", id, status);
        const result = await consultationServive.changeConsultationStatus(id, status, rejectionReason);
        return res.json(result);

    } catch (error) {
        console.error("Error in changeConsultationStatusController:", error);
        return res.json({ errCode: 1, message: "Server error" });
    }
}

const addPropertyToConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        const { koiFishBreed, pondFeature, destiny } = req.body;
        const result = await consultationServive.addPropertyToConsultation(id, koiFishBreed, pondFeature, destiny);
        return res.status(200).json(result);

    } catch (error) {
        console.error("Error in addPropertyToConsultationController:", error);
        return res.json({ errCode: 1, message: "Server error" });
    }
}

module.exports = {
    getAllConsultations,
    getConsultationById,
    addPropertyToConsultation,
    changeConsultationStatus
}