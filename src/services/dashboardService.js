const KoiFishBreed = require("../models/KoiFishBreed");
const User = require("../models/User");
const Advertisement = require("../models/Advertisement");
const Consultation = require("../models/Consultation");
const Transaction = require("../models/transaction");
const UserPackage = require("../models/UserPackage");
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

        const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
            month: `T${i + 1}`,
            consultations: 0,
            revenue: 0,
            ads: 0
        }));

        let advertisements = await Advertisement.find({});

        advertisements.forEach(ad => {
            const month = new Date(ad.createdAt).getMonth();
            monthlyStats[month].ads++;
        });

        const consultations = await Consultation.find({ status: "Hoàn thành" });

        consultations.forEach(consultation => {
            const month = new Date(consultation.createdAt).getMonth();
            const revenue = consultations.length * 200000;
            monthlyStats[month].revenue += revenue;
            monthlyStats[month].consultations++;
        });

        //tính doanh thu ở transaction summ amount where type = Buy package money
        const packageMoneyTransactions = await Transaction.aggregate([
            { $match: { type: "Buy package money" } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        packageMoneyTransactions.forEach(transaction => {
            const monthIndex = transaction._id.month - 1;
            monthlyStats[monthIndex].revenue += transaction.totalAmount;
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

        // Define compatibility based on status
        const getCompatibility = (status) => {
            switch (status) {
                case 'Chưa nhận':
                    return 10
                case 'Đã nhận':
                    return 20;
                case 'Từ chối':
                    return 0;
                case 'Đang tư vấn':
                    return 40;
                case 'Hoàn thành':
                    return 100;
                case 'Hủy':
                    return 0;
                default:
                    return 0;
            }
        };

        const recentConsultations = recentConsultationsFind.map(consultation => ({
            id: consultation._id,
            userName: consultation.user.name,
            element: consultation.user.zodiac_element.name,
            koiType: consultation.koiFishBreed ? consultation.koiFishBreed.name : 'Unknown',
            status: consultation.status,
            createdAt: consultation.createdAt,
            compatibility: getCompatibility(consultation.status)
        }));

        return { errCode: 0, message: "Success", recentConsultations };
    } catch (error) {
        console.error("Error in getNearlyConsultation:", error);
        return { errCode: 1, message: "Server error" };
    }
}


const getPremiumUser = async () => {
    try {
        // Find all UserPackage entries and populate related user data
        const premiumUserPackages = await UserPackage.find({})
            .populate({
                path: 'user_id',
                select: 'email name gender birth zodiac_element status role balance',
                populate: {
                    path: 'zodiac_element',
                    select: 'name'
                }
            });

        // Map to transform the data for each premium user
        const premiumUsers = premiumUserPackages.map(pkg => ({
            userId: pkg.user_id._id,
            name: pkg.user_id.name,
            email: pkg.user_id.email,
            gender: pkg.user_id.gender,
            birth: pkg.user_id.birth,
            zodiacElement: pkg.user_id.zodiac_element?.name,
            status: pkg.user_id.status,
            role: pkg.user_id.role,
            balance: pkg.user_id.balance,
            tokenPoint: pkg.tokenPoint,
        }));

        return { errCode: 0, message: "Success", premiumUsers };
    } catch (error) {
        console.error("Error in getPremiumUser:", error);
        return { errCode: 1, message: "Server error" };
    }
};


module.exports = {
    getRevenew,
    getPieChartData,
    getBarChartData,
    getNearlyConsultation,
    getPremiumUser
}