const Advertisement = require('../models/Advertisement');
const KoiFishBreed = require('../models/KoiFishBreed');
const ZodiacElement = require('../models/Zodiac');
const PondFeature = require('../models/PondFeature');
const AdvertisementFengShuiTarget = require('../models/AdvertisementFengShuiTarget ');

const handleGetAllAdvertisement = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let advertisements = await Advertisement.find({});

            if (!advertisements) {
                resolve({ errCode: 1, message: "Cannot get advertisement" });
            }
            resolve(advertisements);
        } catch (error) {
            console.error("Error in handleGetAllAdvertisement:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });

        }
    });
}

const handleGetAdvertisementById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let advertisement = await Advertisement.findById(id).populate({
                path: "tags",
                populate: {
                    path: "attribute_id",
                    model: ["KoiFishBreed", "ZodiacElement", "PondFeature"]
                }
            });

            if (!advertisement) {
                resolve({ errCode: 1, message: "Cannot get advertisement" });
            }

            resolve(advertisement);
        } catch (error) {
            console.error("Error in handleGetAdvertisementById:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    });
}

const handleCreateAdvertisement = (title, content, image, tags, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const predefinedTags = [
                "Giống Cá Koi",
                "Tính Năng Hồ",
                "Yếu Tố Cung Hoàng Đạo",
            ];
            const advertisement = new Advertisement({
                title: title,
                content: content,
                image: image,
                status: false,
                user_id: user.id
            });

            for (const tagGroup of tags) {
                const tag = tagGroup.tag;
                if (predefinedTags.includes(tag)) {
                    const childTags = tagGroup.childTags;
                    for (const childTag of childTags) {
                        if (tag === "Giống Cá Koi") {
                            const koiFishBreed = await KoiFishBreed.findOne({ name: childTag });
                            if (koiFishBreed) {
                                const advertisementFengShuiTarget = new AdvertisementFengShuiTarget({
                                    attribute_id: koiFishBreed._id,
                                    TargetType: "KoiFishBreeds"
                                });
                                await advertisementFengShuiTarget.save();
                                advertisement.tags.push(advertisementFengShuiTarget._id);
                            }
                        } else if (tag === "Yếu Tố Cung Hoàng Đạo") {
                            const zodiacElement = await ZodiacElement.findOne({ name: childTag });
                            if (zodiacElement) {
                                const advertisementFengShuiTarget = new AdvertisementFengShuiTarget({
                                    attribute_id: zodiacElement._id,
                                    TargetType: "ZodiacElements"
                                });
                                await advertisementFengShuiTarget.save();
                                advertisement.tags.push(advertisementFengShuiTarget._id);
                            }
                        } else if (tag === "Tính Năng Hồ") {
                            const [targetType, value] = childTag.split(":");
                            const pondFeature = await PondFeature.findOne({ targetType: targetType, value: value });

                            if (pondFeature) {
                                const advertisementFengShuiTarget = new AdvertisementFengShuiTarget({
                                    attribute_id: pondFeature._id,
                                    TargetType: "PondFeatures"
                                });
                                await advertisementFengShuiTarget.save();
                                advertisement.tags.push(advertisementFengShuiTarget._id);
                            }
                        }
                    }
                }
            }

            await advertisement.save();
            resolve(advertisement);
        } catch (error) {
            console.error("Error in handleCreateAdvertisement:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    });
}

const handleUpdateAdvertisement = (id, title, content, image) => {
    return new Promise(async (resolve, reject) => {
        try {
            const advertisement = await Advertisement.findById(id);

            if (!advertisement) {
                resolve({ errCode: 1, message: "Cannot find advertisement" });
            }

            advertisement.title = title;
            advertisement.content = content;
            advertisement.image = image;
            
            await advertisement.save();
            resolve(advertisement);
        } catch (error) {
            console.error("Error in handleUpdateAdvertisement:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    });
}

module.exports = {
    handleGetAllAdvertisement,
    handleGetAdvertisementById,
    handleCreateAdvertisement,
    handleUpdateAdvertisement
}