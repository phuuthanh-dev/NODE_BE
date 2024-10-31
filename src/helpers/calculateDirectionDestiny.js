const moment = require("moment");
const lunar = require('lunar-calendar');

const convertToLunar = (birth) => {
    const gregorianDate = moment(birth, "YYYY-MM-DD");
    const day = gregorianDate.date();
    const month = gregorianDate.month() + 1;
    const year = gregorianDate.year();

    const lunarDate = lunar.solarToLunar(year, month, day);
    return {
        day: lunarDate.lunarDay,
        month: lunarDate.lunarMonth,
        year: lunarDate.lunarYear,
        isLeapMonth: lunarDate.isLeap !== undefined ? lunarDate.isLeap : false
    };
};
const formatLunarDate = (lunarDate) => {
    return `${String(lunarDate.day).padStart(2, '0')}/${String(lunarDate.month).padStart(2, '0')}/${lunarDate.year}`;
};

const calculateDirectionDestiny = async (birth, gender) => {
    const lunarDate = convertToLunar(birth);
    const formattedLunarDate = formatLunarDate(lunarDate);
    const lunarYear = lunarDate.year;
    let destiny;
    const yearDigitsSum = String(lunarYear).split('').reduce((sum, digit) => sum + Number(digit), 0);
    if (gender === 'male') {
        destiny = maleDestiny.find((item) => item.value == (yearDigitsSum % 9))
    } else if (gender === 'female') {
        destiny = femaleDestiny.find((item) => item.value == (yearDigitsSum % 9))
    } else {
        throw new Error("Invalid gender specified.");
    }
    return { destiny, lunarDate: formattedLunarDate };
}

const maleDestiny = [
    { value: 1, destiny: "Khảm" },
    { value: 2, destiny: "Ly" },
    { value: 3, destiny: "Cấn" },
    { value: 4, destiny: "Đoài" },
    { value: 5, destiny: "Càn" },
    { value: 6, destiny: "Khôn" },
    { value: 7, destiny: "Tốn" },
    { value: 8, destiny: "Chấn" }
];

const femaleDestiny = [
    { value: 1, destiny: "Cấn" },
    { value: 2, destiny: "Càn" },
    { value: 3, destiny: "Đoài" },
    { value: 4, destiny: "Cấn" },
    { value: 5, destiny: "Ly" },
    { value: 6, destiny: "Khảm" },
    { value: 7, destiny: "Khôn" },
    { value: 8, destiny: "Chấn" }
];

module.exports = { calculateDirectionDestiny }
