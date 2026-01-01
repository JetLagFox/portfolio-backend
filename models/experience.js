const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const ExperienceSchema = Schema({
  job: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
});

ExperienceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Experience", ExperienceSchema);
