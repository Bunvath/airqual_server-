

const router = require("express").Router();
const auth = require("../verifyToken");
const Measure = require("../models/Measure");
const { response } = require("../server/app");

var month = "08";
var year = "2023";
var day = "05";
var time = 13;

var thisWeek = getNumberOfWeek();


function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
router.get("/ph_day", auth, (req, res) => {
    Measure.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$ph",
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

router.get("/salt_day", auth, (req, res) => {
    Measure.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$salt",
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

router.get("/temp_day", auth, (req, res) => {
    Measure.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$temp",
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

router.get("/tds_day", auth, (req, res) => {
    Measure.aggregate([
        {
            $addFields: {
                tsWeek: { $week: "$date" },
                year: { $year: "$date" },
                day: { $dayOfWeek: "$date" },
                value: "$tds",
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
router.get("/ph", auth, (req, res) => {
    Measure.aggregate([
        {
            $project: {
                type: "PH",
                value: "$ph",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$ph", 7] }, then: "Too low" },
                            { case: { $lte: ["$ph", 9] }, then: "Perfect" },
                            { case: { $gt: ["$ph", 9] }, then: "Too high" },
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

router.get("/salt", auth, (req, res) => {
    Measure.aggregate([
        {
            $project: {
                type: "salinity",
                value: "$salt",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$salt", 7] }, then: "Too low" },
                            { case: { $lte: ["$salt", 9] }, then: "Perfect" },
                            { case: { $gt: ["$salt", 9] }, then: "Too high" },
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

router.get("/temp", auth, (req, res) => {
    Measure.aggregate([
        {
            $project: {
                type: "Temp",
                value: "$temp",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$temp", 7] }, then: "Too low" },
                            { case: { $lte: ["$temp", 9] }, then: "Perfect" },
                            { case: { $gt: ["$temp", 9] }, then: "Too high" },
                        ],
                    },
                },
            },
        },
    ])
        .then((data) => {
            const obj = JSON.parse(JSON.stringify(data));

            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/tds", auth, (req, res) => {
    Measure.aggregate([
        {
            $project: {
                type: "TDS",
                value: "$tds",
                date: 1,
                _id: 0,
                status: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$tds", 7] }, then: "Too low" },
                            { case: { $lte: ["$tds", 9] }, then: "Perfect" },
                            { case: { $gt: ["$tds", 9] }, then: "Too high" },
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
router.get("/test", (req, res) => {
    res.send("hello")
})
module.exports = router;
