const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = Schema({
    job: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
    },
    finishDate: {
        type: Date
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Experience", ExperienceSchema);