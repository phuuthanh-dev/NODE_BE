const KoiFishBreed = require("../models/KoiFishBreed");
const User = require("../models/User");
const Advertisement = require("../models/Advertisement");
const Consultation = require("../models/Consultation");
const getRevenew = async () => {
    try {
        const users = await User.countDocuments();
        const koiFishBreeds = await KoiFishBreed.countDocuments();
        const advertisements = await Advertisement.countDocuments();
        const stats = { totalUsers: users, koiVarieties: koiFishBreeds, totalAds: advertisements };
        return { errCode: 0, message: "Success", stats };
    } catch (error) {
        console.error("Error in getRevenew:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getPieChartData = async () => {
    try {
        let users = await User.find({}).populate("zodiac_element");

        const elementCounts = users.reduce((acc, user) => {
            const element = user.zodiac_element.name;
            if (!acc[element]) {
                acc[element] = 0;
            }
            acc[element]++;
            return acc;
        }, {});

        const elementDistribution = Object.keys(elementCounts).map(element => {
            let color;
            switch (element) {
                case "Kim":
                    color = "#FFD700";
                    break;
                case "Mộc":
                    color = "#228B22";
                    break;
                case "Thủy":
                    color = "#1E90FF";
                    break;
                case "Hỏa":
                    color = "#FF4500";
                    break;
                case "Thổ":
                    color = "#8B4513";
                    break;
                default:
                    color = "#000000";
            }
            return { name: element, value: elementCounts[element], color: color };
        });

        return { errCode: 0, message: "Success", elementDistribution };
    } catch (error) {
        console.error("Error in getPieChartData:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getBarChartData = async () => {
    try {
        let advertisements = await Advertisement.find({});

        // Initialize the monthly stats structure for 12 months
        const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
            month: `T${i + 1}`,
            consultations: 0,
            revenue: 0,
            ads: 0
        }));

        // Count advertisements for each month using createdAt
        advertisements.forEach(ad => {
            const month = new Date(ad.createdAt).getMonth();
            monthlyStats[month].ads++;
        });

        return { errCode: 0, message: "Success", monthlyStats };
    } catch (error) {
        console.error("Error in getBarChartData:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getNearlyConsultation = async () => {
    try {
        const recentConsultationsFind = await Consultation.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .populate({
                path: 'user',
                select: 'name',
                populate: {
                    path: 'zodiac_element',
                    select: 'name'
                }
            })
            .populate({
                path: 'koiFishBreed', 
                select: 'name'
            });

        // Transform the data to match your desired format
        const recentConsultations = recentConsultationsFind.map(consultation => ({
            id: consultation._id,
            userName: consultation.user.name,
            element: consultation.user.zodiac_element.name,
            koiType: consultation.koiFishBreed.name,
            status: consultation.status,
            createdAt: consultation.createdAt
        }));

        return { errCode: 0, message: "Success", recentConsultations };
    } catch (error) {
        console.error("Error in getNearlyConsultation:", error);
        return { errCode: 1, message: "Server error" };
    }
}


module.exports = {
    getRevenew,
    getPieChartData,
    getBarChartData,
    getNearlyConsultation
}