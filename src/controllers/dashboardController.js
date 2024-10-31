const dashboardService = require('../services/dashboardService');

const getRevenew = async (req, res) => {
    try {
        let data = await dashboardService.getRevenew();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPieChartData = async (req, res) => {
    try {
        let data = await dashboardService.getPieChartData();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getBarChartData = async (req, res) => {
    try {
        let data = await dashboardService.getBarChartData();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getNearlyConsultation = async (req, res) => {
    try {
        let data = await dashboardService.getNearlyConsultation();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports = {
    getRevenew,
    getPieChartData,
    getBarChartData,
    getNearlyConsultation
}