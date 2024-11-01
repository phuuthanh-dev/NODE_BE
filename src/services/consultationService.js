const Consultation = require("../models/Consultation");

const getAllConsultations = async () => {
    try {
        const consultations = await Consultation.find()
            .populate({
                path: 'user',
                populate: { path: 'zodiac_element' }
            })
            .populate('koiFishBreed')
            .populate('pondFeature')
            .populate('destiny');

        return { errCode: 0, message: "Success", consultations };
    } catch (error) {
        console.error("Error in getAllConsultations:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getConsultationById = async (id) => {
    try {
        const consultation = await Consultation.findById(id).populate({
            path: 'user',
            populate: { path: 'zodiac_element' }
        })
            .populate('koiFishBreed')
            .populate('pondFeature')
            .populate('destiny');

        return { errCode: 0, message: "Success", consultation };
    } catch (error) {
        console.error("Error in getConsultationById:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const changeConsultationStatus = async (id, status, rejectionReason) => {
    try {
        const consultation = await Consultation.findById(id);
        consultation.status = status;
        if (status === "Từ chối") {
            consultation.rejectionReason = rejectionReason;
        }
        await consultation.save();
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in changeConsultationStatus:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const addPropertyToConsultation = async (id, koiFishBreed, pondFeature, destiny) => {
    try {
        let updateFields = {};
        if (koiFishBreed) updateFields.koiFishBreed = koiFishBreed;
        if (pondFeature) updateFields.pondFeature = pondFeature;
        if (destiny) updateFields.destiny = destiny;

        const updatedConsultation = await Consultation.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );
        if (!updatedConsultation) {
            return res.status(404).json({ errCode: 1, message: "Consultation not found" });
        }

        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in addPropertyToConsultation:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getConsultationsByUserId = async (id) => {
    try {
        const consultations = await Consultation.find({ user: id })
            .populate({ path: 'user', populate: { path: 'zodiac_element' } })
            .populate('koiFishBreed')
            .populate('pondFeature')
            .populate('destiny');

        return { errCode: 0, message: "Success", consultations };
    }
    catch (error) {
        console.error("Error in getConsultationsByUserId:", error);
        return { errCode: 1, message: "Server error" };
    }
}

module.exports = {
    getAllConsultations,
    getConsultationById,
    changeConsultationStatus,
    addPropertyToConsultation,
    getConsultationsByUserId
}