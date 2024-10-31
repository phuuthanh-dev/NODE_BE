const moment = require("moment");

const calculateZodiac = async (birth) => {
    const year = moment(birth, "YYYY-MM-DD").year();
    const chi = year % 12;
    const can = year % 10;

    const canlist = [
        { name: "Canh", value: 0 },
        { name: "Tân", value: 1 },
        { name: "Nhâm", value: 2 },
        { name: "Quý", value: 3 },
        { name: "Giáp", value: 4 },
        { name: "Ất", value: 5 },
        { name: "Bính", value: 6 },
        { name: "Đinh", value: 7 },
        { name: "Mậu", value: 8 },
        { name: "Kỷ", value: 9 }
    ];

    const chiList = [
        { name: "Tý", value: 4 },
        { name: "Sửu", value: 5 },
        { name: "Dần", value: 6 },
        { name: "Mão", value: 7 },
        { name: "Thìn", value: 8 },
        { name: "Tỵ", value: 9 },
        { name: "Ngọ", value: 10 },
        { name: "Mùi", value: 11 },
        { name: "Thân", value: 0 },
        { name: "Dậu", value: 1 },
        { name: "Tuất", value: 2 },
        { name: "Hợi", value: 3 }
    ];

    const upCan = [
        { name: ["Giáp", "Ất"], value: 1 },
        { name: ["Bính", "Đinh"], value: 2 },
        { name: ["Mậu", "Kỷ"], value: 3 },
        { name: ["Canh", "Tân"], value: 4 },
        { name: ["Nhâm", "Quý"], value: 5 }
    ]

    const diaChi = [
        { name: ["Tý", "Sửu", "Ngọ", "Mùi"], value: 0 },
        { name: ["Dần", "Mão", "Thân", "Dậu"], value: 1 },
        { name: ["Thìn", "Tỵ", "Tuất", "Hợi"], value: 2 }
    ]

    const element = [
        { name: "Kim", value: 1 },
        { name: "Mộc", value: 5 },
        { name: "Thủy", value: 2 },
        { name: "Hỏa", value: 3 },
        { name: "Thổ", value: 4 }
    ];
    const myCan = canlist.find((item) => item.value === can);
    const myChi = chiList.find((item) => item.value === chi);
    const myCanChi = myCan.name + " " + myChi.name
    let zodiacElement = 0;
    upCan.forEach((item) => {
        if (item.name.includes(myCan.name)) {
            zodiacElement = item.value;
            return;
        }
    })
    diaChi.forEach((item) => {
        if (item.name.includes(myChi.name)) {
            zodiacElement += item.value;
            return;
        }
    })
    if (zodiacElement > 5) {
        zodiacElement = zodiacElement - 5;
    }
    const zodiacElementName = element.find((item) => item.value === zodiacElement).name;

    if (!myCanChi || !zodiacElementName) {
        return null;
    }

    return { myCanChi, zodiacElementName };
}

module.exports = {
    calculateZodiac
};