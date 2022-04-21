

const router = require("express").Router();
const auth = require("../verifyToken");
const Measure = require("../models/Measure");
const Air = require("../models/Air")
const { response } = require("../server/app");
const Particle = require("../models/Particle");

var thisWeek = getNumberOfWeek()
console.log("this week is ", thisWeek)
// var days = ["","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    console.log("first day of the year", firstDayOfYear)
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    console.log("past day of the year ", pastDaysOfYear)
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
}
router.get("/co_day", auth, (req, res) => {
    Air.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$CO.ppm",
            },
        },
        {
            $match: {
                tsWeek: thisWeek - 1
            },
        },
        {
            $group: {
                _id: "$day",
                avg: { $avg: "$value" },
            },
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/so_day", auth, (req, res) => {
    Air.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$SO.ppm",
            },
        },
        {
            $match: {
                tsWeek: thisWeek - 1
            },
        },
        {
            $group: {
                _id: "$day",
                avg: { $avg: "$value" },
            },
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/no_day", auth, (req, res) => {
    Air.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$NO.ppm",
            },
        },
        {
            $match: {
                tsWeek: thisWeek - 1
            },
        },
        {
            $group: {
                _id: "$day",
                avg: { $avg: "$value" },
            },
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/ox_day", auth, (req, res) => {
    Air.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$OX.ppm",
            },
        },
        {
            $match: {
                tsWeek: thisWeek - 1
            },
        },
        {
            $group: {
                _id: "$day",
                avg: { $avg: "$value" },
            },
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/pm1_day", auth, (req, res) => {
    Particle.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$ph1",
            },
        },
        {
            $match: {
                tsWeek: thisWeek - 1
            },
        },
        {
            $group: {
                _id: "$day",
                avg_ph: { $avg: "$value" },
            },
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/pm2_5_day", auth, (req, res) => {
    Measure.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$ph2_5",
            },
        },
        {
            $match: {
                tsWeek: thisWeek - 1
            },
        },
        {
            $group: {
                _id: "$day",
                avg_ph: { $avg: "$value" },
            },
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/pm10_day", auth, (req, res) => {
    Measure.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$ph10",
            },
        },
        {
            $match: {
                tsWeek: thisWeek - 1
            },
        },
        {
            $group: {
                _id: "$day",
                avg_ph: { $avg: "$value" },
            },
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/ox", auth, (req, res) => {
    Air.aggregate([
        {
            $project: {
                type: "OX",
                value: "$OX.ppm",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$OX.ppm", 7] }, then: "Too low" },
                            { case: { $lte: ["$OX.ppm", 9] }, then: "Perfect" },
                            { case: { $gt: ["$OX.ppm", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
        {$sort : {date : 1}}
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/so", auth, (req, res) => {
    Air.aggregate([
        {
            $project: {
                type: "SO2",
                value: "$SO.ppm",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$SO.ppm", 7] }, then: "Too low" },
                            { case: { $lte: ["$SO.ppm", 9] }, then: "Perfect" },
                            { case: { $gt: ["$SO.ppm", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
        {$sort : {date : 1}}
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/no", auth, (req, res) => {
    Air.aggregate([
        {
            $project: {
                type: "NO2",
                value: "$NO.ppm",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$NO.ppm", 7] }, then: "Too low" },
                            { case: { $lte: ["$NO.ppm", 9] }, then: "Perfect" },
                            { case: { $gt: ["$NO.ppm", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
        {$sort : {date : 1}}
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/co", auth, (req, res) => {
    Air.aggregate([
        {
            $project: {
                type: "CO",
                value: "$CO.ppm",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$CO.ppm", 7] }, then: "Too low" },
                            { case: { $lte: ["$CO.ppm", 9] }, then: "Perfect" },
                            { case: { $gt: ["$CO.ppm", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
        {$sort : {date : 1}}
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/pm1", auth, (req, res) => {
    Particle.aggregate([
        {
            $project: {
                type: "pm1",
                value: "$pm1",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$pm1", 7] }, then: "Too low" },
                            { case: { $lte: ["$pm1", 9] }, then: "Perfect" },
                            { case: { $gt: ["$pm1", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/pm2_5", auth, (req, res) => {
    Particle.aggregate([
        {
            $project: {
                type: "pm2_5",
                value: "$pm2_5",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$pm2_5", 7] }, then: "Too low" },
                            { case: { $lte: ["$pm2_5", 9] }, then: "Perfect" },
                            { case: { $gt: ["$pm2_5", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
router.get("/pm10", auth, (req, res) => {
    Particle.aggregate([
        {
            $project: {
                type: "pm10",
                value: "$pm10",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$pm10", 7] }, then: "Too low" },
                            { case: { $lte: ["$pm10", 9] }, then: "Perfect" },
                            { case: { $gt: ["$pm10", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
module.exports = router;
