const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectsSchema = Schema({
    project: {
        type: String,
        require: true
    },
    excerpt: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    github: {
        type: String
    },
    gitlab: {
        type: String
    },
    website: {
        type: String
    }
})

module.exports = mongoose.model("Projects", ProjectsSchema);