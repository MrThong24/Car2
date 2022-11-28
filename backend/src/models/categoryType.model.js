const mongoose = require('mongoose');

const categoryTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const CategoryType = mongoose.model('categoryType', categoryTypeSchema);

module.exports = CategoryType;
