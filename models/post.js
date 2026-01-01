const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  post_type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  date_published: {
    type: Date,
    required: true,
  },
  date_updated: {
    type: Date,
  },
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
